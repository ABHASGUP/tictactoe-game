import React from 'react';
import { useGame } from '../context/GameContext';

const ScoreBoard: React.FC = () => {
  const { scores, gameMode } = useGame();

  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-md">
      <div className="bg-blue-500 text-white p-4 rounded-lg text-center">
        <div className="text-sm">Player X</div>
        <div className="text-2xl font-bold">{scores.X}</div>
      </div>
      <div className="bg-gray-500 text-white p-4 rounded-lg text-center">
        <div className="text-sm">Ties</div>
        <div className="text-2xl font-bold">{scores.ties}</div>
      </div>
      <div className="bg-red-500 text-white p-4 rounded-lg text-center">
        <div className="text-sm">{gameMode === 'single' ? 'AI' : 'Player O'}</div>
        <div className="text-2xl font-bold">{scores.O}</div>
      </div>
    </div>
  );
};

export default ScoreBoard;