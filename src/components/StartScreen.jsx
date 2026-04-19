import React, { useState } from 'react';
import './StartScreen.css';

export default function StartScreen({ onStart }) {
  const [expandedPower, setExpandedPower] = useState(null);
  const [selectedPower, setSelectedPower] = useState(null);

  const togglePower = (key) => {
    setExpandedPower(prev => prev === key ? null : key);
    setSelectedPower(key);
  };

  const handleStart = () => {
    if (!selectedPower) return;
    onStart(selectedPower);
  };

  return (
    <div className="start-screen">
      <div className="start-bg-image"></div>

      <div className="start-grid">
        {/* === COL IZQUIERDA: Logo + Lore === */}
        <div className="col-left">
          <img
            className="logo-img"
            src="/images/logo-title.png"
            alt="Felinux Perdido"
            draggable={false}
          />
          <div className="lore-box">
            <p>
              <strong>Felinux se ha perdido en la FIEC 🐱</strong><br />
              Responde preguntas sobre la FIEC y ayúdalo a encontrar el camino
              para ubicarse nuevamente.
            </p>
          </div>
        </div>

        {/* === COL CENTRO: Personaje === */}
        <div className="col-center">
          <div className="character-wrapper">
            <img
              className="character-img"
              src="/images/felinux-neutral.png"
              alt="Felinux"
              draggable={false}
            />
          </div>
        </div>

        {/* === COL DERECHA: Poderes === */}
        <div className="col-right">
          <div className="powers-panel">
            <div className="powers-header">
              <span className="star">★</span>
              <span className="powers-title">ELIGE 1 PODER</span>
              <span className="star">★</span>
            </div>
            <p className="powers-sub">Te ayudará en tu aventura</p>

            <div className="powers-list">
              <div className={`pwr-card pwr-blue ${expandedPower === '5050' ? 'pwr-expanded' : ''} ${selectedPower === '5050' ? 'pwr-selected' : ''}`} onClick={() => togglePower('5050')}>
                <div className="pwr-icon-circle pwr-ic-blue">
                  <img src="/images/power-5050.png" alt="50/50" />
                </div>
                <div className="pwr-info">
                  <strong>50/50</strong>
                  {expandedPower === '5050' && <p>Elimina dos opciones incorrectas.</p>}
                </div>
              </div>

              <div className={`pwr-card pwr-green ${expandedPower === 'skip' ? 'pwr-expanded' : ''} ${selectedPower === 'skip' ? 'pwr-selected' : ''}`} onClick={() => togglePower('skip')}>
                <div className="pwr-icon-circle pwr-ic-green">
                  <img src="/images/power-skip.png" alt="Saltar" />
                </div>
                <div className="pwr-info">
                  <strong>SALTAR</strong>
                  {expandedPower === 'skip' && <p>Salta una pregunta y continúa tu camino.</p>}
                </div>
              </div>

              <div className={`pwr-card pwr-purple ${expandedPower === 'double' ? 'pwr-expanded' : ''} ${selectedPower === 'double' ? 'pwr-selected' : ''}`} onClick={() => togglePower('double')}>
                <div className="pwr-icon-circle pwr-ic-purple">
                  <img src="/images/power-double.png" alt="Doble" />
                </div>
                <div className="pwr-info">
                  <strong>DOBLE</strong>
                  {expandedPower === 'double' && <p>Si te equivocas, puedes responder de nuevo.</p>}
                </div>
              </div>

              <div className={`pwr-card pwr-amber ${expandedPower === 'vocero' ? 'pwr-expanded' : ''} ${selectedPower === 'vocero' ? 'pwr-selected' : ''}`} onClick={() => togglePower('vocero')}>
                <div className="pwr-icon-circle pwr-ic-amber">
                  <img src="/images/power-vocero.png" alt="Vocero" />
                </div>
                <div className="pwr-info">
                  <strong>VOCERO</strong>
                  {expandedPower === 'vocero' && <p>Ve cuántas personas eligieron cada respuesta.</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === BOTÓN CENTRADO ABAJO === */}
      <button className={`btn-start ${!selectedPower ? 'btn-start-disabled' : ''}`} onClick={handleStart}>
        COMENZAR AVENTURA
      </button>
    </div>
  );
}
