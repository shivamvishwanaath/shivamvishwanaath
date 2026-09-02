'use client';

import React from 'react';

interface RealisticPinProps {
  color?: 'red' | 'brass' | 'blue' | 'green' | 'white';
  size?: number;        // Outer size in px (default 28)
  glowing?: boolean;   // Adds a radial glow ring (used when isConnectingFrom)
  pulsing?: boolean;   // Animate pulse (used when isConnectingTo)
}

export const RealisticPin: React.FC<RealisticPinProps> = ({
  color = 'red',
  size = 28,
  glowing = false,
  pulsing = false,
}) => {
  // Color-specific head gradients
  const headColors = {
    red:   { top: '#ff6b6b', mid: '#ef4444', base: '#b91c1c', shine: 'rgba(255,255,255,0.55)' },
    brass: { top: '#fde68a', mid: '#d97706', base: '#92400e', shine: 'rgba(255,255,255,0.45)' },
    blue:  { top: '#93c5fd', mid: '#3b82f6', base: '#1d4ed8', shine: 'rgba(255,255,255,0.50)' },
    green: { top: '#6ee7b7', mid: '#10b981', base: '#065f46', shine: 'rgba(255,255,255,0.45)' },
    white: { top: '#f5f5f5', mid: '#d4d4d4', base: '#737373', shine: 'rgba(255,255,255,0.80)' },
  };
  const c = headColors[color] || headColors.red;

  return (
    <svg
      width={size}
      height={size * 1.35}   // Taller than wide to accommodate the shank
      viewBox="0 0 28 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-lg transition-transform duration-200 ${pulsing ? 'animate-pulse' : ''} ${glowing ? 'filter drop-shadow-[0_0_6px_rgba(239,68,68,0.9)]' : ''}`}
    >
      <defs>
        {/* Elliptical shadow beneath the head */}
        <radialGradient id={`shadow-${color}`} cx="50%" cy="100%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        {/* Pin head radial gradient — gives a convex 3D look */}
        <radialGradient id={`head-${color}`} cx="38%" cy="30%" r="65%">
          <stop offset="0%" stopColor={c.top} />
          <stop offset="55%" stopColor={c.mid} />
          <stop offset="100%" stopColor={c.base} />
        </radialGradient>
        {/* Shiny specular highlight */}
        <radialGradient id={`shine-${color}`} cx="35%" cy="25%" r="35%">
          <stop offset="0%" stopColor={c.shine} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        {/* Metal shank gradient */}
        <linearGradient id="shank" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6b7280" />
          <stop offset="40%" stopColor="#d1d5db" />
          <stop offset="70%" stopColor="#9ca3af" />
          <stop offset="100%" stopColor="#6b7280" />
        </linearGradient>
      </defs>

      {/* Drop shadow ellipse */}
      <ellipse cx="14" cy="21" rx="9" ry="3.5" fill={`url(#shadow-${color})`} opacity="0.7" />

      {/* Metal shank (thin needle pointing down) */}
      <path
        d="M13.2 18 L14 34 L14.8 18 Z"
        fill="url(#shank)"
        opacity="0.95"
      />

      {/* Pin head circle */}
      <circle cx="14" cy="12" r="11" fill={`url(#head-${color})`} />

      {/* Specular shine */}
      <circle cx="14" cy="12" r="11" fill={`url(#shine-${color})`} />

      {/* Tiny bright highlight spot (top-left) */}
      <circle cx="10" cy="8.5" r="2.5" fill="white" opacity="0.35" />
    </svg>
  );
};
