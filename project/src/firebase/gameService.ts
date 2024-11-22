import { db } from './config';
import { collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { GameState } from '../types/game';

export interface GameRecord {
  timestamp: Date;
  winner: string | null;
  gameMode: string;
  difficulty?: string;
  scores: {
    X: number;
    O: number;
    ties: number;
  };
  finalBoard: (string | null)[];
}

export const saveGameResult = async (gameState: GameState) => {
  try {
    const gameRecord: GameRecord = {
      timestamp: new Date(),
      winner: gameState.winner,
      gameMode: gameState.gameMode,
      difficulty: gameState.gameMode === 'single' ? gameState.difficulty : undefined,
      scores: gameState.scores,
      finalBoard: gameState.board
    };

    await addDoc(collection(db, 'games'), gameRecord);
  } catch (error) {
    console.error('Error saving game result:', error);
  }
};

export const getRecentGames = async (limit_: number = 10) => {
  try {
    const gamesRef = collection(db, 'games');
    const q = query(gamesRef, orderBy('timestamp', 'desc'), limit(limit_));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching recent games:', error);
    return [];
  }
};