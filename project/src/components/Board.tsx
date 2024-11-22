import React from 'react';
import Cell from './Cell';
import { useGame } from '../context/GameContext';

const Board: React.FC = () => {
  const { board, makeMove } = useGame();

  return (
    <div className="grid grid-cols-3 gap-2 w-full max-w-md">
      {board.map((value, index) => (
        <Cell 
          key={index}
          value={value}
          onClick={() => makeMove(index)}
        />
      ))}
    </div>
  );
};

export default Board;