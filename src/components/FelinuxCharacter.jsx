import React from 'react';
import './FelinuxCharacter.css';

/*
  IMÁGENES → public/images/
  felinux-neutral.png, felinux-happy.png, felinux-sad.png,
  felinux-power.png, felinux-victory.png, felinux-lost.png
*/

const imageMap = {
  neutral: '/images/felinux-neutral.png',
  happy: '/images/felinux-happy.png',
  sad: '/images/felinux-sad.png',
  victory: '/images/felinux-victory.png',
  lost: '/images/felinux-lost.png',
  power: '/images/felinux-power.png',
  thinking: '/images/felinux-neutral.png'
};

export default function FelinuxCharacter({ emotion = 'neutral', size = 'medium' }) {
  const sizeClass = `felinux-${size}`;
  const animClass = `felinux-anim-${emotion}`;
  const src = imageMap[emotion] || imageMap.neutral;

  return (
    <div className={`felinux-character ${sizeClass} ${animClass}`}>
      <img
        className="felinux-img"
        src={src}
        alt={`Felinux ${emotion}`}
        draggable={false}
      />

      {/* Efectos especiales */}
      {(emotion === 'victory' || emotion === 'power') && (
        <div className="felinux-sparkles">
          <span className="sparkle s1">✦</span>
          <span className="sparkle s2">★</span>
          <span className="sparkle s3">✦</span>
          <span className="sparkle s4">⭐</span>
        </div>
      )}

      {emotion === 'sad' && (
        <div className="felinux-tears">
          <span className="tear tear-left">💧</span>
          <span className="tear tear-right">💧</span>
        </div>
      )}
    </div>
  );
}
