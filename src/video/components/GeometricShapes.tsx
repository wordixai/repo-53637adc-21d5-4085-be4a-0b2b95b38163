import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface GeometricShapesProps {
  startFrame: number;
  endFrame: number;
  count?: number;
  colors?: string[];
}

export const GeometricShapes: React.FC<GeometricShapesProps> = ({
  startFrame,
  endFrame,
  count = 12,
  colors = ['#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981']
}) => {
  const frame = useCurrentFrame();
  
  const progress = interpolate(
    frame,
    [startFrame, endFrame],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  const shapes = Array.from({ length: count }, (_, i) => ({
    id: i,
    type: ['triangle', 'square', 'circle', 'hexagon'][i % 4],
    initialX: Math.random() * 1920,
    initialY: Math.random() * 1080,
    color: colors[i % colors.length],
    size: 40 + Math.random() * 60,
    speed: 0.5 + Math.random() * 2
  }));
  
  const renderShape = (shape: any) => {
    const rotation = progress * 360 * shape.speed;
    const scale = interpolate(
      Math.sin(progress * Math.PI * 2 + shape.id),
      [-1, 1],
      [0.8, 1.2]
    );
    
    const x = shape.initialX + Math.sin(progress * Math.PI * 2 + shape.id) * 200;
    const y = shape.initialY + Math.cos(progress * Math.PI * 2 + shape.id) * 150;
    
    const opacity = interpolate(
      progress,
      [0, 0.1, 0.9, 1],
      [0, 1, 1, 0]
    );
    
    const baseStyle = {
      position: 'absolute' as const,
      left: x,
      top: y,
      width: shape.size,
      height: shape.size,
      transform: `rotate(${rotation}deg) scale(${scale})`,
      opacity,
      background: shape.color,
      boxShadow: `0 0 20px ${shape.color}40`
    };
    
    switch (shape.type) {
      case 'triangle':
        return (
          <div
            key={shape.id}
            style={{
              ...baseStyle,
              width: 0,
              height: 0,
              background: 'transparent',
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}`
            }}
          />
        );
      
      case 'square':
        return (
          <div
            key={shape.id}
            style={{
              ...baseStyle,
              borderRadius: '8px'
            }}
          />
        );
      
      case 'circle':
        return (
          <div
            key={shape.id}
            style={{
              ...baseStyle,
              borderRadius: '50%'
            }}
          />
        );
      
      case 'hexagon':
        return (
          <div
            key={shape.id}
            style={{
              ...baseStyle,
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'
            }}
          />
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {shapes.map(renderShape)}
      
      {/* Mathematical grid lines */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: interpolate(progress, [0, 0.2, 0.8, 1], [0, 0.3, 0.3, 0])
        }}
      >
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Animated connecting lines */}
        {shapes.slice(0, 6).map((shape, i) => {
          const nextShape = shapes[(i + 1) % 6];
          const lineOpacity = interpolate(
            Math.sin(progress * Math.PI * 2 + i),
            [-1, 1],
            [0.1, 0.8]
          );
          
          return (
            <line
              key={`line-${i}`}
              x1={shape.initialX + shape.size / 2}
              y1={shape.initialY + shape.size / 2}
              x2={nextShape.initialX + nextShape.size / 2}
              y2={nextShape.initialY + nextShape.size / 2}
              stroke={shape.color}
              strokeWidth="2"
              strokeOpacity={lineOpacity}
              strokeDasharray="5,5"
              strokeDashoffset={-progress * 50}
            />
          );
        })}
      </svg>
    </div>
  );
};