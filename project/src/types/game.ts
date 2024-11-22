export type Player = 'X' | 'O';
export type Cell = Player | null;
export type Board = Cell[];
export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameMode = 'single' | 'multi';

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | 'tie' | null;
  scores: {
    X: number;
    O: number;
    ties: number;
  };
  gameMode: GameMode;
  difficulty: Difficulty;
  soundEnabled: boolean;
}

export interface GameContextType extends GameState {
  makeMove: (index: number) => void;
  resetGame: () => void;
  setGameMode: (mode: GameMode) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  toggleSound: () => void;
}