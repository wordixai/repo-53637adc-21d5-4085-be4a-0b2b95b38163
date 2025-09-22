import React from 'react';
import { useCurrentFrame, useVideoConfig, Sequence, interpolate } from 'remotion';
import { CodeBlock } from '../components/CodeBlock';
import { LogoMorph } from '../components/LogoMorph';
import { KineticText } from '../components/KineticText';
import { GeometricShapes } from '../components/GeometricShapes';

interface TechVideoProps {
  title: string;
  subtitle: string;
}

const sampleCode = `// Advanced React Component with Hooks
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TechComponent: React.FC<Props> = ({ data, onUpdate }) => {
  const [state, setState] = useState<State>({ 
    loading: false, 
    items: [] 
  });
  
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: true,
      timestamp: Date.now()
    }));
  }, [data]);
  
  useEffect(() => {
    const fetchData = async () => {
      setState(prev => ({ ...prev, loading: true }));
      try {
        const response = await api.getData();
        setState({ loading: false, items: response.data });
        onUpdate?.(response.data);
      } catch (error) {
        console.error('Failed to fetch:', error);
        setState(prev => ({ ...prev, loading: false }));
      }
    };
    
    fetchData();
  }, [onUpdate]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="tech-container"
    >
      <AnimatePresence>
        {state.loading ? (
          <motion.div
            key="loading"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            Loading...
          </motion.div>
        ) : (
          <motion.ul
            key="content"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
          >
            {processedData.map(item => (
              <motion.li
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};`;

export const TechVideo: React.FC<TechVideoProps> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const backgroundOpacity = interpolate(frame, [0, 30], [0, 1]);
  
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, hsl(222, 84%, 5%), hsl(217, 33%, 17%))`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background geometric shapes */}
      <Sequence from={0} durationInFrames={600}>
        <GeometricShapes startFrame={0} endFrame={600} count={8} />
      </Sequence>
      
      {/* Title sequence */}
      <Sequence from={30} durationInFrames={120}>
        <div style={{ 
          position: 'absolute', 
          top: '20%', 
          textAlign: 'center',
          zIndex: 2
        }}>
          <KineticText 
            text={title}
            startFrame={30}
            endFrame={90}
            fontSize={72}
            color="#ffffff"
            animationType="elastic"
          />
          <div style={{ marginTop: '20px' }}>
            <KineticText 
              text={subtitle}
              startFrame={60}
              endFrame={120}
              fontSize={32}
              color="#94a3b8"
              animationType="wave"
            />
          </div>
        </div>
      </Sequence>
      
      {/* Logo animation */}
      <Sequence from={150} durationInFrames={150}>
        <div style={{ 
          position: 'absolute', 
          top: '15%', 
          right: '10%',
          zIndex: 3
        }}>
          <LogoMorph 
            startFrame={150}
            endFrame={300}
            colors={['#3b82f6', '#8b5cf6', '#f59e0b']}
            size={160}
          />
        </div>
      </Sequence>
      
      {/* Code reveal sequence */}
      <Sequence from={200} durationInFrames={250}>
        <div style={{ 
          position: 'absolute', 
          bottom: '15%', 
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2
        }}>
          <CodeBlock 
            code={sampleCode}
            language="typescript"
            startFrame={200}
            endFrame={450}
            lineByLine={true}
            typewriterEffect={true}
          />
        </div>
      </Sequence>
      
      {/* Final kinetic text */}
      <Sequence from={480} durationInFrames={120}>
        <div style={{ 
          position: 'absolute', 
          bottom: '10%', 
          textAlign: 'center',
          zIndex: 3
        }}>
          <KineticText 
            text="INNOVATION IN MOTION"
            startFrame={480}
            endFrame={600}
            fontSize={48}
            color="#f59e0b"
            animationType="stagger"
          />
        </div>
      </Sequence>
      
      {/* Tech grid overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: backgroundOpacity * 0.1,
          background: `
            linear-gradient(90deg, transparent 99px, rgba(59, 130, 246, 0.3) 100px),
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          zIndex: 1
        }}
      />
    </div>
  );
};