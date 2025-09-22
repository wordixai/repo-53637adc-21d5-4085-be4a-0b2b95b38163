import React from 'react';
import { useCurrentFrame, interpolate, useVideoConfig } from 'remotion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language: string;
  startFrame: number;
  endFrame: number;
  lineByLine?: boolean;
  typewriterEffect?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  startFrame,
  endFrame,
  lineByLine = true,
  typewriterEffect = false
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const lines = code.split('\n');
  const totalLines = lines.length;
  
  // Calculate which lines should be visible
  const progress = interpolate(
    frame,
    [startFrame, endFrame],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  const visibleLineCount = lineByLine 
    ? Math.floor(progress * totalLines)
    : totalLines;
  
  // Typewriter effect for current line
  const currentLineProgress = lineByLine 
    ? (progress * totalLines) % 1
    : progress;
  
  const visibleCode = lines.slice(0, visibleLineCount).join('\n');
  const currentLine = lines[visibleLineCount] || '';
  
  const typewriterLength = typewriterEffect 
    ? Math.floor(currentLineProgress * currentLine.length)
    : currentLine.length;
  
  const displayCode = visibleCode + 
    (visibleLineCount < totalLines ? '\n' + currentLine.slice(0, typewriterLength) : '');
  
  // Animation styles
  const containerScale = interpolate(
    frame,
    [startFrame, startFrame + 15],
    [0.8, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  const containerOpacity = interpolate(
    frame,
    [startFrame, startFrame + 10],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        transform: `scale(${containerScale})`,
        opacity: containerOpacity,
        background: 'hsl(222, 84%, 5%)',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid hsl(217, 33%, 17%)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        fontFamily: 'JetBrains Mono, Monaco, monospace',
        fontSize: '18px',
        lineHeight: '1.6',
        maxWidth: '800px',
        width: '100%'
      }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '16px',
        paddingBottom: '12px',
        borderBottom: '1px solid hsl(217, 33%, 17%)'
      }}>
        <div style={{ display: 'flex', gap: '8px', marginRight: '12px' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            borderRadius: '50%', 
            background: '#ff5f56' 
          }} />
          <div style={{ 
            width: '12px', 
            height: '12px', 
            borderRadius: '50%', 
            background: '#ffbd2e' 
          }} />
          <div style={{ 
            width: '12px', 
            height: '12px', 
            borderRadius: '50%', 
            background: '#27ca3f' 
          }} />
        </div>
        <span style={{ 
          color: 'hsl(215, 20%, 65%)', 
          fontSize: '14px',
          fontWeight: '500'
        }}>
          {language}.{language === 'javascript' ? 'js' : language === 'typescript' ? 'ts' : 'py'}
        </span>
      </div>
      
      <SyntaxHighlighter
        language={language}
        style={{
          ...vscDarkPlus,
          'pre[class*="language-"]': {
            ...vscDarkPlus['pre[class*="language-"]'],
            background: 'transparent',
            margin: 0,
            padding: 0,
            fontSize: 'inherit',
            lineHeight: 'inherit'
          },
          'code[class*="language-"]': {
            ...vscDarkPlus['code[class*="language-"]'],
            background: 'transparent',
            fontSize: 'inherit',
            lineHeight: 'inherit'
          }
        }}
        customStyle={{
          background: 'transparent',
          padding: 0,
          margin: 0,
          fontSize: 'inherit',
          lineHeight: 'inherit'
        }}
      >
        {displayCode}
      </SyntaxHighlighter>
      
      {typewriterEffect && visibleLineCount < totalLines && (
        <span style={{ 
          color: 'hsl(220, 100%, 50%)',
          animation: 'cursor-blink 1s infinite'
        }}>
          |
        </span>
      )}
    </div>
  );
};