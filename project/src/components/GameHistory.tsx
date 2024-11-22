import React, { useEffect, useState } from 'react';
import { getRecentGames, GameRecord } from '../firebase/gameService';
import { History } from 'lucide-react';

const GameHistory: React.FC = () => {
  const [recentGames, setRecentGames] = useState<(GameRecord & { id: string })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRecentGames = async () => {
      const games = await getRecentGames(5);
      setRecentGames(games);
      setIsLoading(false);
    };

    loadRecentGames();
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading history...</div>;
  }

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold">Recent Games</h2>
      </div>
      <div className="space-y-2">
        {recentGames.map((game) => (
          <div key={game.id} className="border-b pb-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {game.gameMode === 'single' ? 'vs AI' : 'vs Player'} 
                {game.difficulty ? ` (${game.difficulty})` : ''}
              </span>
              <span className="text-gray-500">
                {new Date(game.timestamp.seconds * 1000).toLocaleDateString()}
              </span>
            </div>
            <div className="text-sm font-medium">
              {game.winner === 'tie' ? 'Tie Game' : 
               game.winner ? `${game.winner} Won!` : 'Incomplete'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameHistory;