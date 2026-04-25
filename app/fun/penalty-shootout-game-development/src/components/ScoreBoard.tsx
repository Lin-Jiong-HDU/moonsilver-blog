import React from 'react';
import { RoundScore } from '../types/game';

interface ScoreBoardProps {
  playerScore: number;
  cpuScore: number;
  currentRound: number;
  maxRounds: number;
  isSuddenDeath: boolean;
  roundHistory: RoundScore[];
  isPlayerTurn: boolean;
}

const ResultDot: React.FC<{ result: 'goal' | 'saved' | 'miss' | null; size?: number }> = ({
  result,
  size = 14,
}) => {
  if (result === null) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.3)',
          background: 'transparent',
        }}
      />
    );
  }
  const color =
    result === 'goal'
      ? '#22c55e'
      : result === 'saved'
      ? '#ef4444'
      : '#f59e0b';
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 6px ${color}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {result === 'goal' ? (
        <span style={{ fontSize: size * 0.55, color: 'white' }}>⚽</span>
      ) : result === 'saved' ? (
        <span style={{ fontSize: size * 0.55, color: 'white' }}>✋</span>
      ) : (
        <span style={{ fontSize: size * 0.55, color: 'white' }}>✗</span>
      )}
    </div>
  );
};

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  playerScore,
  cpuScore,
  currentRound,
  maxRounds,
  isSuddenDeath,
  roundHistory,
  isPlayerTurn,
}) => {
  const displayRounds = isSuddenDeath ? Math.max(5, roundHistory.length + 1) : maxRounds;

  return (
    <div
      style={{
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 16,
        padding: '12px 20px',
        color: 'white',
        minWidth: 320,
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        {isSuddenDeath ? (
          <span
            style={{
              background: 'linear-gradient(90deg,#ef4444,#f97316)',
              borderRadius: 20,
              padding: '2px 12px',
              fontSize: 12,
              fontWeight: 'bold',
              letterSpacing: 2,
              textTransform: 'uppercase',
              animation: 'pulse 1s infinite',
            }}
          >
            ⚡ Sudden Death
          </span>
        ) : (
          <span style={{ fontSize: 12, opacity: 0.7, letterSpacing: 1 }}>
            Round {Math.min(currentRound + 1, maxRounds)} / {maxRounds}
          </span>
        )}
      </div>

      {/* Scores */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginBottom: 12 }}>
        {/* Player */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              opacity: 0.8,
              marginBottom: 2,
              color: isPlayerTurn ? '#60a5fa' : 'white',
            }}
          >
            🧑 YOU
          </div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 900,
              lineHeight: 1,
              color: isPlayerTurn ? '#60a5fa' : 'white',
              textShadow: isPlayerTurn ? '0 0 16px #3b82f6' : 'none',
            }}
          >
            {playerScore}
          </div>
        </div>

        <div style={{ fontSize: 22, fontWeight: 900, opacity: 0.4 }}>–</div>

        {/* CPU */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              opacity: 0.8,
              marginBottom: 2,
              color: !isPlayerTurn ? '#f87171' : 'white',
            }}
          >
            CPU 🤖
          </div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 900,
              lineHeight: 1,
              color: !isPlayerTurn ? '#f87171' : 'white',
              textShadow: !isPlayerTurn ? '0 0 16px #ef4444' : 'none',
            }}
          >
            {cpuScore}
          </div>
        </div>
      </div>

      {/* Round dots */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* Player row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 11, width: 28, opacity: 0.6 }}>YOU</span>
          <div style={{ display: 'flex', gap: 5 }}>
            {Array.from({ length: displayRounds }).map((_, i) => {
              const round = roundHistory[i];
              return (
                <ResultDot
                  key={i}
                  result={round ? round.player : null}
                  size={i < roundHistory.length ? 16 : 14}
                />
              );
            })}
          </div>
        </div>
        {/* CPU row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 11, width: 28, opacity: 0.6 }}>CPU</span>
          <div style={{ display: 'flex', gap: 5 }}>
            {Array.from({ length: displayRounds }).map((_, i) => {
              const round = roundHistory[i];
              return (
                <ResultDot
                  key={i}
                  result={round ? round.cpu : null}
                  size={i < roundHistory.length ? 16 : 14}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
