import { Board, Player, Difficulty } from '../types/game';

export const calculateWinner = (board: Board): Player | 'tie' | null => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6], // diagonals
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as Player;
    }
  }

  if (board.every(cell => cell !== null)) return 'tie';
  return null;
};

const getEmptyCells = (board: Board): number[] => 
  board.reduce<number[]>((acc, cell, idx) => 
    cell === null ? [...acc, idx] : acc, []);

const minimax = (
  board: Board,
  depth: number,
  isMaximizing: boolean,
  alpha: number = -Infinity,
  beta: number = Infinity
): number => {
  const winner = calculateWinner(board);
  if (winner === 'O') return 10 - depth;
  if (winner === 'X') return depth - 10;
  if (winner === 'tie') return 0;

  const emptyCells = getEmptyCells(board);
  
  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const cell of emptyCells) {
      const newBoard = [...board];
      newBoard[cell] = 'O';
      const evaluation = minimax(newBoard, depth + 1, false, alpha, beta);
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const cell of emptyCells) {
      const newBoard = [...board];
      newBoard[cell] = 'X';
      const evaluation = minimax(newBoard, depth + 1, true, alpha, beta);
      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) break;
    }
    return minEval;
  }
};

export const getAIMove = (board: Board, difficulty: Difficulty): number | null => {
  const emptyCells = getEmptyCells(board);
  if (emptyCells.length === 0) return null;

  switch (difficulty) {
    case 'easy':
      return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    
    case 'medium': {
      // 70% chance of making the best move
      if (Math.random() < 0.7) {
        return getBestMove(board);
      }
      return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }
    
    case 'hard':
      return getBestMove(board);
  }
};

const getBestMove = (board: Board): number => {
  const emptyCells = getEmptyCells(board);
  let bestScore = -Infinity;
  let bestMove = emptyCells[0];

  for (const cell of emptyCells) {
    const newBoard = [...board];
    newBoard[cell] = 'O';
    const score = minimax(newBoard, 0, false);
    if (score > bestScore) {
      bestScore = score;
      bestMove = cell;
    }
  }

  return bestMove;
};