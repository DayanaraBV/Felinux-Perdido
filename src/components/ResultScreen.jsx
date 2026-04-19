import React from 'react';
import FelinuxCharacter from './FelinuxCharacter';
import './ResultScreen.css';

export default function ResultScreen({ result, onRestart }) {
  const { score, total, won } = result;

  return (
    <div className={`result-screen ${won ? 'result-win' : 'result-lose'}`}>
      {/* Fondo como imagen → public/images/bg-victory.png o bg-lose.png */}
      <div className={`result-bg-image ${won ? 'bg-victory' : 'bg-lose'}`}></div>

      {won && (
        <div className="confetti-container">
          {Array.from({ length: 40 }, (_, i) => (
            <div key={i} className="confetti-piece" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              backgroundColor: ['#ffd54f', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ff9ff3', '#54a0ff'][i % 7]
            }} />
          ))}
        </div>
      )}

      <div className="result-content">
        {won ? (
          <>
            <h1 className="result-title result-title-win">
              ¡FELICIDADES!
            </h1>
            <div className="result-subtitle">🎉 Misión Cumplida 🎉</div>

            <div className="result-felinux-wrapper">
              <div className="result-message-box win-box">
                <p className="result-message">
                  ¡Felinux llegó a la <strong>novatada de FIEC</strong>! 🐱🎓
                </p>
                <p className="result-sub-message">
                  Gracias a ti, Felinux encontró el camino y ahora está celebrando 
                  con todos los nuevos estudiantes.
                </p>
              </div>

              <div className="result-felinux">
                <FelinuxCharacter emotion="victory" size="large" />
              </div>
            </div>

            <div className="result-score">
              <div className="score-circle win-circle">
                <span className="score-num">{score}</span>
                <span className="score-sep">/</span>
                <span className="score-total">{total}</span>
              </div>
              <span className="score-label">Respuestas correctas</span>
            </div>

            {/* Edificio FIEC celebración (eliminado el banner) */}
            {/* <div className="fiec-celebration">
              <div className="fiec-banner">🏛️ FIEC - NOVATADA 🎊</div>
            </div> */}
          </>
        ) : (
          <>
            <h1 className="result-title result-title-lose">
              ¡Oh no!
            </h1>
            <div className="result-subtitle-lose">Felinux sigue perdido...</div>

            <div className="result-felinux-wrapper">
              <div className="result-message-box lose-box">
                <p className="result-message">
                  Felinux no pudo encontrar el camino a la FIEC 😿
                </p>
                <p className="result-sub-message">
                  No pudiste ayudar a Felinux a llegar a la novatada, lo siento mucho.
                </p>
              </div>

              <div className="result-felinux">
                <FelinuxCharacter emotion="lost" size="large" />
              </div>
            </div>

            <div className="result-score">
              <div className="score-circle lose-circle">
                <span className="score-num">{score}</span>
                <span className="score-sep">/</span>
                <span className="score-total">{total}</span>
              </div>
              <span className="score-label">Respuestas correctas</span>
            </div>
          </>
        )}

        <button className="btn-restart" onClick={onRestart}>
          {won ? 'JUGAR DE NUEVO 🐾' : 'INTENTAR DE NUEVO 🐾'}
        </button>
      </div>
    </div>
  );
}
