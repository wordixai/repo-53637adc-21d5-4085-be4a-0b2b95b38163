import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface LogoMorphProps {
  startFrame: number;
  endFrame: number;
  colors: string[];
  size?: number;
}

export const LogoMorph: React.FC<LogoMorphProps> = ({
  startFrame,
  endFrame,
  colors = ['#3b82f6', '#8b5cf6', '#f59e0b'],
  size = 120
}) => {
  const frame = useCurrentFrame();
  
  const progress = interpolate(
    frame,
    [startFrame, endFrame],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  // Morphing transformations
  const rotation = interpolate(progress, [0, 1], [0, 720]);
  const scale = interpolate(
    Math.sin(progress * Math.PI * 4),
    [-1, 1],
    [0.8, 1.2]
  );
  
  const borderRadius = interpolate(
    Math.sin(progress * Math.PI * 3),
    [-1, 1],
    [20, 60]
  );
  
  // Color cycling
  const colorIndex = Math.floor(progress * colors.length * 3) % colors.length;
  const currentColor = colors[colorIndex];
  
  // Glow intensity
  const glowIntensity = interpolate(
    Math.sin(progress * Math.PI * 6),
    [-1, 1],
    [0.3, 1]
  );
  
  return (
    <div
      style={{
        width: size,
        height: size,
        background: `linear-gradient(45deg, ${currentColor}, ${colors[(colorIndex + 1) % colors.length]})`,
        borderRadius: `${borderRadius}%`,
        transform: `rotate(${rotation}deg) scale(${scale})`,
        boxShadow: `0 0 ${40 * glowIntensity}px ${currentColor}80`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Inner morphing elements */}
      <div
        style={{
          width: '60%',
          height: '60%',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: `${100 - borderRadius}%`,
          transform: `rotate(${-rotation * 0.5}deg)`,
          position: 'absolute'
        }}
      />
      
      <div
        style={{
          width: '30%',
          height: '30%',
          background: 'rgba(255, 255, 255, 0.4)',
          borderRadius: '50%',
          transform: `rotate(${rotation * 1.5}deg) translateX(${Math.sin(progress * Math.PI * 2) * 10}px)`,
          position: 'absolute'
        }}
      />
      
      {/* Animated particles */}
      {[...Array(6)].map((_, i) => {
        const particleRotation = rotation + (i * 60);
        const particleDistance = interpolate(
          Math.sin(progress * Math.PI * 2 + i),
          [-1, 1],
          [size * 0.3, size * 0.5]
        );
        
        return (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              background: '#fff',
              borderRadius: '50%',
              position: 'absolute',
              transform: `rotate(${particleRotation}deg) translateX(${particleDistance}px)`,
              opacity: 0.8
            }}
          />
        );
      })}
    </div>
  );
};