
import { useState, useEffect } from 'react';

export const useWelcomeOverlay = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [isWelcomeComplete, setIsWelcomeComplete] = useState(false);

  useEffect(() => {
    // Check if user has seen welcome before
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    
    if (!hasSeenWelcome) {
      // Shorter delay for quicker start
      const timer = setTimeout(() => {
        setShowWelcome(true);
      }, 100);
      
      return () => clearTimeout(timer);
    } else {
      setIsWelcomeComplete(true);
    }
  }, []);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    setIsWelcomeComplete(true);
  };

  const resetWelcome = () => {
    localStorage.removeItem('hasSeenWelcome');
    setShowWelcome(true);
    setIsWelcomeComplete(false);
  };

  return {
    showWelcome,
    isWelcomeComplete,
    handleWelcomeComplete,
    resetWelcome,
  };
};
