import React from 'react';
import { useGame } from '../context/GameContext';

const GameStatus: React.FC = () => {
  const { winner, currentPlayer, gameMode } = useGame();

  if (!winner) {
    return (
      <div className="text-xl font-semibold text-gray-700">
        {currentPlayer === 'X' ? "Player X's Turn" : (
          gameMode === 'single' ? "AI's Turn" : "Player O's Turn"
        )}
      </div>
    );
  }

  if (winner === 'tie') {
    return <div className="text-xl font-semibold text-gray-700">It's a Tie!</div>;
  }

  return (
    <div className="text-xl font-semibold text-gray-700">
      {winner === 'X' ? 'Player X Wins!' : (
        gameMode === 'single' ? 'AI Wins!' : 'Player O Wins!'
      )}
    </div>
  );
};

export default GameStatus;