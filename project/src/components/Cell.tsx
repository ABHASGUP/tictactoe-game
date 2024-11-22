import React from 'react';
import { Cell as CellType } from '../types/game';
import { X, Circle } from 'lucide-react';

interface CellProps {
  value: CellType;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ value, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="aspect-square bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center justify-center text-4xl font-bold"
      disabled={value !== null}
    >
      {value === 'X' && <X className="w-12 h-12 text-blue-500" />}
      {value === 'O' && <Circle className="w-12 h-12 text-red-500" />}
    </button>
  );
};

export default Cell;