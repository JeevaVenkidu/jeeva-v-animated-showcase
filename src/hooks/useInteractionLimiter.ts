
import { useState, useRef, useCallback } from 'react';

interface InteractionLimiterConfig {
  clickCooldown?: number;
  maxActiveAnimations?: number;
  throttleDelay?: number;
}

export const useInteractionLimiter = (config: InteractionLimiterConfig = {}) => {
  const {
    clickCooldown = 300, // 300ms between clicks
    maxActiveAnimations = 2, // Max 2 active animations
    throttleDelay = 100 // 100ms throttle
  } = config;

  const [isThrottled, setIsThrottled] = useState(false);
  const [activeAnimations, setActiveAnimations] = useState(0);
  const lastClickTime = useRef<number>(0);
  const throttleTimeout = useRef<NodeJS.Timeout | null>(null);

  const canInteract = useCallback(() => {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime.current;
    
    return !isThrottled && 
           timeSinceLastClick >= clickCooldown && 
           activeAnimations < maxActiveAnimations;
  }, [isThrottled, clickCooldown, activeAnimations, maxActiveAnimations]);

  const handleClick = useCallback((callback: () => void) => {
    if (!canInteract()) {
      return;
    }

    lastClickTime.current = Date.now();
    setIsThrottled(true);
    setActiveAnimations(prev => prev + 1);

    // Execute the callback
    callback();

    // Clear throttle after delay
    if (throttleTimeout.current) {
      clearTimeout(throttleTimeout.current);
    }

    throttleTimeout.current = setTimeout(() => {
      setIsThrottled(false);
    }, throttleDelay);

    // Clear animation after a longer delay
    setTimeout(() => {
      setActiveAnimations(prev => Math.max(0, prev - 1));
    }, 1000);
  }, [canInteract, throttleDelay]);

  const handleHover = useCallback((callback: () => void) => {
    // Limit hover effects to prevent excessive animations
    if (activeAnimations < maxActiveAnimations / 2) {
      callback();
    }
  }, [activeAnimations, maxActiveAnimations]);

  return {
    canInteract: canInteract(),
    handleClick,
    handleHover,
    isThrottled,
    activeAnimations
  };
};
