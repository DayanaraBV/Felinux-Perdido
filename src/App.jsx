import React, { useState, useCallback } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import { getRandomQuestions } from './data/questions';
import './App.css';

const SCREENS = {
  START: 'start',
  GAME: 'game',
  RESULT: 'result'
};

export default function App() {
  const [screen, setScreen] = useState(SCREENS.START);
  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState(null);
  const [fadeClass, setFadeClass] = useState('');
  const [selectedPower, setSelectedPower] = useState(null);

  const transitionTo = useCallback((nextScreen, setup) => {
    setFadeClass('fade-out');
    setTimeout(() => {
      if (setup) setup();
      setScreen(nextScreen);
      setFadeClass('fade-in');
    }, 400);
  }, []);

  const handleStart = useCallback((power) => {
    transitionTo(SCREENS.GAME, () => {
      setQuestions(getRandomQuestions(5));
      setResult(null);
      setSelectedPower(power);
    });
  }, [transitionTo]);

  const handleFinish = useCallback((gameResult) => {
    transitionTo(SCREENS.RESULT, () => {
      setResult(gameResult);
    });
  }, [transitionTo]);

  const handleRestart = useCallback(() => {
    transitionTo(SCREENS.START);
  }, [transitionTo]);

  return (
    <div className={`app-container ${fadeClass}`}>
      {screen === SCREENS.START && <StartScreen onStart={handleStart} />}
      {screen === SCREENS.GAME && questions.length > 0 && (
        <GameScreen questions={questions} onFinish={handleFinish} selectedPower={selectedPower} />
      )}
      {screen === SCREENS.RESULT && result && (
        <ResultScreen result={result} onRestart={handleRestart} />
      )}
    </div>
  );
}
