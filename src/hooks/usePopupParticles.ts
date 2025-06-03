
import { useState, useEffect } from 'react';

export const usePopupParticles = (triggerDelay: number = 1000) => {
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    // Trigger particles after component mounts with a delay
    const timer = setTimeout(() => {
      setShowParticles(true);
    }, triggerDelay);

    return () => clearTimeout(timer);
  }, [triggerDelay]);

  const triggerParticles = () => {
    setShowParticles(true);
    // Auto-hide after effect duration
    setTimeout(() => {
      setShowParticles(false);
    }, 3000);
  };

  return {
    showParticles,
    triggerParticles,
    setShowParticles,
  };
};
