import React from 'react';
import { GeometricShapes } from '../components/GeometricShapes';

export const GeometricShapesDemo: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #000000, #1a1a2e, #16213e)',
        position: 'relative'
      }}
    >
      <GeometricShapes 
        startFrame={0}
        endFrame={450}
        count={16}
        colors={['#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981', '#06b6d4']}
      />
      
      {/* Central focal point */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#ffffff',
          textAlign: 'center'
        }}
      >
        GEOMETRIC
        <br />
        PRECISION
      </div>
    </div>
  );
};