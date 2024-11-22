import React from 'react';
import { useGame } from '../context/GameContext';
import { Volume2, VolumeX, Users, Cpu } from 'lucide-react';

const GameControls: React.FC = () => {
  const { 
    difficulty, 
    setDifficulty, 
    soundEnabled, 
    toggleSound, 
    resetGame,
    gameMode,
    setGameMode
  } = useGame();

  return (
    <div className="flex flex-col gap-4 w-full max-w-xs">
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          {gameMode === 'single' ? <Cpu className="w-6 h-6 text-indigo-600" /> : <Users className="w-6 h-6 text-indigo-600" />}
          <span className="font-medium">Game Mode</span>
        </div>
        <button
          onClick={() => setGameMode(gameMode === 'single' ? 'multi' : 'single')}
          className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          {gameMode === 'single' ? 'vs AI' : 'vs Player'}
        </button>
      </div>

      {gameMode === 'single' && (
        <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-md">
          <label className="font-medium">AI Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as any)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={toggleSound}
          className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
        >
          {soundEnabled ? (
            <><Volume2 className="w-4 h-4" /> On</>
          ) : (
            <><VolumeX className="w-4 h-4" /> Off</>
          )}
        </button>
        <button
          onClick={resetGame}
          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default GameControls;