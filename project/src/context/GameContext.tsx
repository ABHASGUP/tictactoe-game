import React, { createContext, useContext, useState, useCallback } from 'react';
import { GameContextType, GameState, Player, GameMode, Difficulty } from '../types/game';
import { calculateWinner, getAIMove } from '../utils/gameLogic';
import useSound from '../hooks/useSound';
import { saveGameResult } from '../firebase/gameService';

const initialState: GameState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  scores: { X: 0, O: 0, ties: 0 },
  gameMode: 'single',
  difficulty: 'medium',
  soundEnabled: true,
};

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>(initialState);
  const [isAIThinking, setIsAIThinking] = useState(false);
  const { playClick, playXWin, playOWin, playTie } = useSound(state.soundEnabled);

  const makeMove = useCallback((index: number) => {
    setState(prev => {
      if (prev.board[index] || prev.winner) return prev;
      if (prev.gameMode === 'single' && prev.currentPlayer === 'O') return prev;
      if (isAIThinking) return prev;

      const newBoard = [...prev.board];
      newBoard[index] = prev.currentPlayer;
      
      if (prev.soundEnabled) playClick();

      const winner = calculateWinner(newBoard);
      const newScores = { ...prev.scores };

      if (winner) {
        if (winner === 'tie') {
          newScores.ties++;
          if (prev.soundEnabled) playTie();
        } else {
          newScores[winner]++;
          if (prev.soundEnabled) {
            winner === 'X' ? playXWin() : playOWin();
          }
        }

        // Save game result to Firestore when game ends
        const newState = {
          ...prev,
          board: newBoard,
          winner,
          scores: newScores,
        };
        saveGameResult(newState);
      }

      if (!winner && prev.gameMode === 'single' && prev.currentPlayer === 'X') {
        setIsAIThinking(true);
        setTimeout(() => {
          const aiMove = getAIMove(newBoard, prev.difficulty);
          if (aiMove !== null) {
            setState(current => {
              const aiBoard = [...current.board];
              aiBoard[aiMove] = 'O';
              
              if (current.soundEnabled) playClick();

              const aiWinner = calculateWinner(aiBoard);
              const aiScores = { ...current.scores };

              if (aiWinner) {
                if (aiWinner === 'tie') {
                  aiScores.ties++;
                  if (current.soundEnabled) playTie();
                } else {
                  aiScores[aiWinner]++;
                  if (current.soundEnabled) {
                    aiWinner === 'X' ? playXWin() : playOWin();
                  }
                }

                // Save game result to Firestore when AI wins or ties
                const newState = {
                  ...current,
                  board: aiBoard,
                  winner: aiWinner,
                  scores: aiScores,
                };
                saveGameResult(newState);
              }

              return {
                ...current,
                board: aiBoard,
                currentPlayer: 'X',
                winner: aiWinner,
                scores: aiScores,
              };
            });
          }
          setIsAIThinking(false);
        }, 700);
      }

      return {
        ...prev,
        board: newBoard,
        currentPlayer: prev.gameMode === 'single' ? 'O' : (prev.currentPlayer === 'X' ? 'O' : 'X'),
        winner,
        scores: newScores,
      };
    });
  }, [playClick, playXWin, playOWin, playTie, isAIThinking]);

  const resetGame = useCallback(() => {
    setState(prev => ({
      ...prev,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
    }));
    setIsAIThinking(false);
  }, []);

  const setGameMode = useCallback((mode: GameMode) => {
    setState(prev => ({
      ...prev,
      gameMode: mode,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      scores: { X: 0, O: 0, ties: 0 },
    }));
    setIsAIThinking(false);
  }, []);

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    setState(prev => ({ ...prev, difficulty }));
  }, []);

  const toggleSound = useCallback(() => {
    setState(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, []);

  return (
    <GameContext.Provider 
      value={{
        ...state,
        makeMove,
        resetGame,
        setGameMode,
        setDifficulty,
        toggleSound,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};