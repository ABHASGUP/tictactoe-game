import React from 'react';
import { GameProvider } from './context/GameContext';
import Board from './components/Board';
import GameControls from './components/GameControls';
import ScoreBoard from './components/ScoreBoard';
import GameStatus from './components/GameStatus';
import GameHistory from './components/GameHistory';
import { Gamepad2 } from 'lucide-react';

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">
          <div className="flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-800">Tic Tac Toe</h1>
          </div>

          <ScoreBoard />
          <GameStatus />
          <Board />
          <GameControls />
          <GameHistory />
        </div>
      </div>
    </GameProvider>
  );
}

export default App;