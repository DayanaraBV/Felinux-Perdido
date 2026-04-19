import React, { useState, useCallback, useEffect } from 'react';
import FelinuxCharacter from './FelinuxCharacter';
import PowerBar from './PowerBar';
import QuestionCard from './QuestionCard';
import { generateFakeVotes, recordVote, getRealVotes, getRealVotesRaw } from '../data/questions';
import './GameScreen.css';

const TRANSITION_DELAY = 1800;

export default function GameScreen({ questions, onFinish, selectedPower }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(1);

  // Solo el poder seleccionado está disponible (double se auto-activa)
  const powerKeyMap = { '5050': 'fiftyFifty', 'skip': 'skip', 'double': 'double', 'vocero': 'vocero' };
  const activePowerKey = powerKeyMap[selectedPower] || null;

  const [powers, setPowers] = useState({
    fiftyFifty: activePowerKey === 'fiftyFifty',
    skip: activePowerKey === 'skip',
    double: false,
    vocero: activePowerKey === 'vocero'
  });
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [felinuxEmotion, setFelinuxEmotion] = useState('neutral');
  const [votes, setVotes] = useState(null);
  const [voteCounts, setVoteCounts] = useState(null);
  const [doubleActive, setDoubleActive] = useState(activePowerKey === 'double');
  const [doubleUsedThisQuestion, setDoubleUsedThisQuestion] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [sceneBg, setSceneBg] = useState('outdoor');
  const [powerMessage, setPowerMessage] = useState('');

  const question = questions[currentQ];

  // Alternar escenarios de fondo
  useEffect(() => {
    const scenes = ['outdoor', 'indoor', 'lab'];
    setSceneBg(scenes[currentQ % scenes.length]);
  }, [currentQ]);

  const goToNextQuestion = useCallback((wasCorrect = false, wasSkipped = false) => {
    let nextScore = score;
    if (wasCorrect) nextScore = score + 1;
    // Si fue saltada, el score no cambia
    if (currentQ + 1 >= questions.length) {
      // Ganador si no perdió, aunque haya usado skip
      onFinish({ score: nextScore, total: questions.length, won: true });
    } else {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQ(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setHiddenOptions([]);
        setVotes(null);
        setDoubleUsedThisQuestion(false);
        setFelinuxEmotion('neutral');
        setDisabled(false);
        setIsTransitioning(false);
        setPowerMessage('');
        if (wasCorrect) setScore(prev => prev + 1);
      }, 600);
    }
  }, [currentQ, questions.length, score, onFinish]);

  const handleAnswer = useCallback((index) => {
    if (disabled || showResult) return;
    
    // Registrar el clic para estadísticas del vocero
    recordVote(question.question, index, question.options.length);

    setSelectedAnswer(index);
    const isCorrect = index === question.correct;

    if (isCorrect) {
      setShowResult(true);
      setDisabled(true);
      setFelinuxEmotion('happy');
      // Si el doble se usó en esta pregunta, consumirlo permanentemente
      if (doubleUsedThisQuestion) {
        setDoubleActive(false);
        setPowers(prev => ({ ...prev, double: false }));
      }
      setTimeout(() => goToNextQuestion(true, false), TRANSITION_DELAY);
    } else {
      // Respuesta incorrecta
      if (doubleActive && !doubleUsedThisQuestion) {
        // El doble está activo: dar segunda oportunidad
        setDoubleUsedThisQuestion(true);
        setFelinuxEmotion('sad');
        setPowerMessage('¡Tienes otra oportunidad! Responde de nuevo.');
        setTimeout(() => {
          setSelectedAnswer(null);
          setFelinuxEmotion('neutral');
          setPowerMessage('');
        }, 1200);
      } else {
        // Pierde
        setShowResult(true);
        setDisabled(true);
        setFelinuxEmotion('sad');
        setTimeout(() => {
          onFinish({ score, total: questions.length, won: false });
        }, TRANSITION_DELAY);
      }
    }
  }, [disabled, showResult, question, doubleActive, doubleUsedThisQuestion, goToNextQuestion, score, questions.length, onFinish]);

  const handleUsePower = useCallback((powerKey) => {
    if (!powers[powerKey] || disabled) return;

    // Marcar poder como usado
    setPowers(prev => ({ ...prev, [powerKey]: false }));
    setFelinuxEmotion('power');
    
    setTimeout(() => {
      if (felinuxEmotion === 'power') {
        setFelinuxEmotion('neutral');
      }
    }, 1500);

    switch (powerKey) {
      case 'fiftyFifty': {
        setPowerMessage('¡50/50! Se eliminaron 2 opciones incorrectas.');
        const incorrectIndices = question.options
          .map((_, i) => i)
          .filter(i => i !== question.correct && !hiddenOptions.includes(i));
        
        // Mezclar y tomar 2
        const shuffled = incorrectIndices.sort(() => Math.random() - 0.5);
        const toHide = shuffled.slice(0, 2);
        setHiddenOptions(prev => [...prev, ...toHide]);
        break;
      }
      case 'skip': {
        setPowerMessage('¡Pregunta saltada!');
        setDisabled(true);
        setTimeout(() => {
          setDisabled(false);
          goToNextQuestion(false, true);
        }, 1000);
        break;
      }
      case 'double': {
        setPowerMessage('¡Doble activado! Si fallas, tendrás otra oportunidad.');
        setDoubleActive(true);
        break;
      }
      case 'vocero': {
        setPowerMessage('¡Vocero activado! Mira las votaciones del público.');
        // Mostrar siempre los votos y porcentajes en tiempo real, aunque sean 0
        const realCounts = getRealVotesRaw(question.question, question.options.length);
        const total = realCounts.reduce((a, b) => a + b, 0);
        const realVotes = total === 0
          ? new Array(question.options.length).fill(0)
          : realCounts.map(c => Math.round((c / total) * 100));
        setVotes(realVotes);
        setVoteCounts(realCounts);
        break;
      }
      default:
        break;
    }
  }, [powers, disabled, question, hiddenOptions, goToNextQuestion, felinuxEmotion]);

  return (
    <div className={`game-screen scene-${sceneBg} ${isTransitioning ? 'transitioning' : ''}`}>
      {/* Fondo como imagen → public/images/bg-game-1.png, bg-game-2.png, bg-game-3.png */}
      <div className="game-bg-image"></div>

      {/* HUD superior */}
      <div className="game-hud">
        <div className="hud-question-num">
          <span className="hud-label">Pregunta</span>
          <span className="hud-value">{currentQ + 1}/{questions.length}</span>
        </div>
        <PowerBar powers={powers} onUsePower={handleUsePower} disabled={disabled || showResult} doubleActive={doubleActive} />
      </div>

      {/* Mensaje de poder */}
      {powerMessage && (
        <div className="power-message">
          <span>{powerMessage}</span>
        </div>
      )}

      {/* Área principal */}
      <div className="game-main">
        <div className="game-felinux-area">
          <FelinuxCharacter emotion={felinuxEmotion} size="medium" />
        </div>

        <div className="game-question-area">
          <QuestionCard
            question={question}
            questionNumber={currentQ + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            hiddenOptions={hiddenOptions}
            selectedAnswer={selectedAnswer}
            correctAnswer={question.correct}
            showResult={showResult}
            votes={votes}
            voteCounts={voteCounts}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}
