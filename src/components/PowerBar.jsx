import React from 'react';
import './PowerBar.css';

/*
  ICONOS DE PODERES → public/images/
  power-5050.png, power-skip.png, power-double.png, power-vocero.png
*/

const powerInfo = {
  fiftyFifty: { img: '/images/power-5050.png', label: '50/50', desc: 'Elimina dos opciones incorrectas' },
  skip: { img: '/images/power-skip.png', label: 'Saltar', desc: 'Salta esta pregunta' },
  double: { img: '/images/power-double.png', label: 'Doble', desc: 'Intenta responder de nuevo' },
  vocero: { img: '/images/power-vocero.png', label: 'Vocero', desc: 'Ve las votaciones del público' }
};

export default function PowerBar({ powers, onUsePower, disabled, doubleActive }) {
  return (
    <div className="power-bar">
      {Object.entries(powerInfo).map(([key, info]) => {
        const isDoubleGlow = key === 'double' && doubleActive;
        return (
          <button
            key={key}
            className={`power-btn ${powers[key] ? '' : 'power-used'} ${disabled ? 'power-disabled' : ''} ${isDoubleGlow ? 'power-double-active' : ''}`}
            onClick={() => onUsePower(key)}
            disabled={!powers[key] || disabled || isDoubleGlow}
            title={isDoubleGlow ? 'Activo: si fallas tendrás otra oportunidad' : info.desc}
          >
            <img className="power-icon-img" src={info.img} alt={info.label} draggable={false} />
            <span className="power-label">{info.label}</span>
          </button>
        );
      })}
    </div>
  );
}
