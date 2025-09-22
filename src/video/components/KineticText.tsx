import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface KineticTextProps {
  text: string;
  startFrame: number;
  endFrame: number;
  fontSize?: number;
  color?: string;
  animationType?: 'bounce' | 'wave' | 'elastic' | 'stagger';
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  startFrame,
  endFrame,
  fontSize = 64,
  color = '#ffffff',
  animationType = 'wave'
}) => {
  const frame = useCurrentFrame();
  
  const progress = interpolate(
    frame,
    [startFrame, endFrame],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  const letters = text.split('');
  
  const getLetterAnimation = (index: number) => {
    const delay = index * 0.1;
    const letterProgress = Math.max(0, progress - delay);
    
    switch (animationType) {
      case 'bounce':
        return {
          transform: `translateY(${interpolate(
            Math.sin(letterProgress * Math.PI * 4),
            [-1, 1],
            [-20, 20]
          )}px) scale(${interpolate(
            letterProgress,
            [0, 0.2, 1],
            [0, 1.2, 1]
          )})`,
          opacity: interpolate(letterProgress, [0, 0.1], [0, 1])
        };
      
      case 'wave':
        return {
          transform: `translateY(${Math.sin(letterProgress * Math.PI * 2 + index * 0.5) * 30}px) rotate(${Math.sin(letterProgress * Math.PI + index) * 10}deg)`,
          opacity: interpolate(letterProgress, [0, 0.2], [0, 1])
        };
      
      case 'elastic':
        const elasticValue = letterProgress < 1 
          ? Math.pow(2, -10 * letterProgress) * Math.sin((letterProgress - 0.1) * 2 * Math.PI / 0.4) + 1
          : 1;
        return {
          transform: `scale(${elasticValue}) rotate(${(1 - letterProgress) * 180}deg)`,
          opacity: interpolate(letterProgress, [0, 0.1], [0, 1])
        };
      
      case 'stagger':
        return {
          transform: `translateX(${interpolate(
            letterProgress,
            [0, 0.5, 1],
            [-100, 20, 0]
          )}px) scale(${interpolate(
            letterProgress,
            [0, 0.3, 1],
            [0.5, 1.1, 1]
          )})`,
          opacity: interpolate(letterProgress, [0, 0.2], [0, 1])
        };
      
      default:
        return { transform: 'none', opacity: 1 };
    }
  };
  
  return (
    <div
      style={{
        display: 'flex',
        fontSize: fontSize,
        fontWeight: 'bold',
        color: color,
        fontFamily: 'Inter, Arial, sans-serif',
        letterSpacing: '0.02em'
      }}
    >
      {letters.map((letter, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            ...getLetterAnimation(index),
            marginRight: letter === ' ' ? '0.3em' : '0'
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </div>
  );
};