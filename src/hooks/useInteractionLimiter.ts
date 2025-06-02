
import { useState, useRef, useCallback } from 'react';
import { useGlobalPerformanceManager } from './useGlobalPerformanceManager';

interface InteractionLimiterConfig {
  clickCooldown?: number;
  maxActiveAnimations?: number;
  throttleDelay?: number;
}

export const useInteractionLimiter = (config: InteractionLimiterConfig = {}) => {
  const { canClick, registerClick, config: globalConfig } = useGlobalPerformanceManager();
  const [isThrottled, setIsThrottled] = useState(false);
  const throttleTimeout = useRef<NodeJS.Timeout | null>(null);

  const actualCooldown = config.clickCooldown || globalConfig.clickCooldown;
  const throttleDelay = config.throttleDelay || 100;

  const canInteract = useCallback(() => {
    return !isThrottled && canClick();
  }, [isThrottled, canClick]);

  const handleClick = useCallback((callback: () => void) => {
    if (!canInteract() || !registerClick()) {
      return;
    }

    setIsThrottled(true);
    
    // Execute the callback
    callback();

    // Clear throttle after delay
    if (throttleTimeout.current) {
      clearTimeout(throttleTimeout.current);
    }

    throttleTimeout.current = setTimeout(() => {
      setIsThrottled(false);
    }, throttleDelay);
  }, [canInteract, registerClick, throttleDelay]);

  const handleHover = useCallback((callback: () => void) => {
    // Only allow hover effects if system isn't overloaded
    if (canInteract()) {
      callback();
    }
  }, [canInteract]);

  return {
    canInteract: canInteract(),
    handleClick,
    handleHover,
    isThrottled
  };
};
