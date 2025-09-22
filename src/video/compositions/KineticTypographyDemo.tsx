import React from 'react';
import { Sequence } from 'remotion';
import { KineticText } from '../components/KineticText';

export const KineticTypographyDemo: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(45deg, #0f172a, #1e293b, #334155)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      <Sequence from={0} durationInFrames={90}>
        <div style={{ marginBottom: '60px' }}>
          <KineticText 
            text="KINETIC"
            startFrame={0}
            endFrame={90}
            fontSize={96}
            color="#3b82f6"
            animationType="bounce"
          />
        </div>
      </Sequence>
      
      <Sequence from={90} durationInFrames={90}>
        <div style={{ marginBottom: '60px' }}>
          <KineticText 
            text="TYPOGRAPHY"
            startFrame={90}
            endFrame={180}
            fontSize={96}
            color="#8b5cf6"
            animationType="wave"
          />
        </div>
      </Sequence>
      
      <Sequence from={180} durationInFrames={90}>
        <div style={{ marginBottom: '60px' }}>
          <KineticText 
            text="IN MOTION"
            startFrame={180}
            endFrame={270}
            fontSize={96}
            color="#f59e0b"
            animationType="elastic"
          />
        </div>
      </Sequence>
      
      <Sequence from={270} durationInFrames={90}>
        <div>
          <KineticText 
            text="DYNAMIC ANIMATIONS"
            startFrame={270}
            endFrame={360}
            fontSize={64}
            color="#ef4444"
            animationType="stagger"
          />
        </div>
      </Sequence>
    </div>
  );
};