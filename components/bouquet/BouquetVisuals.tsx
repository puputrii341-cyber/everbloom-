import React from 'react';

export const BouquetBackground = ({ color = "#d7ccc8" }: { color?: string }) => {
  return (
    <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-md" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
        </filter>
        <linearGradient id="foldGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(0,0,0,0.1)" />
          <stop offset="50%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
        </linearGradient>
      </defs>
      
      {/* Outer Flared Wrapper */}
      <path d="M 20 80 Q 200 -20 380 80 L 260 340 L 140 340 Z" fill={color} filter="url(#shadow)" />
      {/* Inner layer 1 */}
      <path d="M 60 120 Q 200 20 340 120 L 250 340 L 150 340 Z" fill={color} />
      <path d="M 60 120 Q 200 20 340 120 L 250 340 L 150 340 Z" fill="url(#foldGrad)" />
      {/* Inner layer 2 */}
      <path d="M 100 160 Q 200 80 300 160 L 240 340 L 160 340 Z" fill={color} />
      <path d="M 100 160 Q 200 80 300 160 L 240 340 L 160 340 Z" fill="rgba(0,0,0,0.05)" />
    </svg>
  );
};

export const BouquetForeground = ({ wrapperColor = "#d7ccc8", ribbonColor = "#B07490" }: { wrapperColor?: string, ribbonColor?: string }) => {
  const showRibbon = ribbonColor && ribbonColor !== "transparent";

  return (
    <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-lg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id="ribbonShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.25" />
        </filter>
        <linearGradient id="handleGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(0,0,0,0.2)" />
          <stop offset="30%" stopColor="rgba(0,0,0,0)" />
          <stop offset="70%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
        </linearGradient>
      </defs>

      {/* Front Handle Wrapper */}
      <path d="M 140 340 Q 200 360 260 340 L 280 500 L 120 500 Z" fill={wrapperColor} />
      <path d="M 140 340 Q 200 360 260 340 L 280 500 L 120 500 Z" fill="url(#handleGrad)" />
      
      {/* Front Fold Flap */}
      <path d="M 140 340 Q 100 300 80 260 Q 150 320 200 340 Z" fill={wrapperColor} />
      <path d="M 260 340 Q 300 300 320 260 Q 250 320 200 340 Z" fill={wrapperColor} />

      {/* Ribbon */}
      {showRibbon && (
        <g filter="url(#ribbonShadow)">
          {/* Left Tail (Wavy) */}
          <path d="M 190 350 C 160 400 130 420 140 480 C 150 490 120 500 120 500 C 120 500 100 450 160 380 C 170 360 190 350 190 350 Z" fill={ribbonColor} />
          {/* Right Tail (Wavy) */}
          <path d="M 210 350 C 240 400 270 420 260 480 C 250 490 280 500 280 500 C 280 500 300 450 240 380 C 230 360 210 350 210 350 Z" fill={ribbonColor} />
          
          {/* Left Loop */}
          <path d="M 200 350 C 120 320 100 380 200 350 Z" fill={ribbonColor} />
          {/* Right Loop */}
          <path d="M 200 350 C 280 320 300 380 200 350 Z" fill={ribbonColor} />
          
          {/* Center Knot */}
          <ellipse cx="200" cy="350" rx="15" ry="12" fill={ribbonColor} />
        </g>
      )}
    </svg>
  );
};
