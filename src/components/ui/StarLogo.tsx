import React from 'react';

interface StarLogoProps {
  size?: number;
  animated?: boolean;
  glow?: boolean;
  className?: string;
  color?: string;
}

/**
 * Northern Star 8-pointed compass star SVG mark.
 * Matches the brand identity from the reference design system.
 */
const StarLogo: React.FC<StarLogoProps> = ({
  size = 32,
  animated = false,
  glow = false,
  className = '',
  color = '#C6A16E',
}) => {
  const glowFilter = glow ? 'url(#starGlow)' : undefined;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor="#4DA8A5" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* 8-pointed Northern Star / compass rose */}
      <g
        filter={glowFilter}
        style={animated ? { animation: 'star-rotate 30s linear infinite', transformOrigin: '20px 20px' } : undefined}
      >
        {/* Main 4 long points (N, E, S, W) */}
        <path
          d="M20 2 L21.6 18.4 L38 20 L21.6 21.6 L20 38 L18.4 21.6 L2 20 L18.4 18.4 Z"
          fill={`url(#starGrad)`}
        />
        {/* 4 short diagonal points (NE, SE, SW, NW) */}
        <path
          d="M20 5.5 L21.2 16.8 L28.7 11.3 L23.2 18.8 L34.5 20 L23.2 21.2 L28.7 28.7 L21.2 23.2 L20 34.5 L18.8 23.2 L11.3 28.7 L16.8 21.2 L5.5 20 L16.8 18.8 L11.3 11.3 L18.8 16.8 Z"
          fill={color}
          opacity="0.5"
        />
        {/* Center dot */}
        <circle cx="20" cy="20" r="2" fill={color} opacity="0.9" />
      </g>
    </svg>
  );
};

export default StarLogo;
