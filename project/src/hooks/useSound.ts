import { useCallback } from 'react';

// Comic and soothing sound effects
const clickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3'); // Soft pop
const playerXWinSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2580/2580-preview.mp3'); // Gentle success chime
const playerOWinSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3'); // Happy bell
const tieSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3'); // Gentle bell

export default function useSound(enabled: boolean) {
  const playSound = useCallback((sound: HTMLAudioElement) => {
    if (enabled) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  }, [enabled]);

  return {
    playClick: useCallback(() => playSound(clickSound), [playSound]),
    playXWin: useCallback(() => playSound(playerXWinSound), [playSound]),
    playOWin: useCallback(() => playSound(playerOWinSound), [playSound]),
    playTie: useCallback(() => playSound(tieSound), [playSound]),
  };
}