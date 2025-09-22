import React from 'react';
import { LogoMorph } from '../components/LogoMorph';

export const LogoAnimationDemo: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at center, #1e293b, #0f172a)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      <LogoMorph 
        startFrame={0}
        endFrame={240}
        colors={['#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981']}
        size={200}
      />
      
      {/* Multiple logos for complex animation */}
      <div style={{ position: 'absolute', top: '20%', left: '20%' }}>
        <LogoMorph 
          startFrame={60}
          endFrame={240}
          colors={['#f59e0b', '#ef4444']}
          size={100}
        />
      </div>
      
      <div style={{ position: 'absolute', bottom: '20%', right: '20%' }}>
        <LogoMorph 
          startFrame={120}
          endFrame={240}
          colors={['#10b981', '#3b82f6']}
          size={80}
        />
      </div>
    </div>
  );
};