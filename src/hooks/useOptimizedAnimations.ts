
import { useState, useEffect, useRef } from 'react';
import { useGlobalPerformanceManager } from './useGlobalPerformanceManager';

export const useOptimizedAnimations = () => {
  const { config, canStartAnimation, startAnimation, endAnimation } = useGlobalPerformanceManager();
  const [isReducedMotion, setIsReducedMotion] = useState(config.isReducedMotion);
  const [isMobile, setIsMobile] = useState(config.isMobile);
  const activeAnimationRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const shouldAnimate = !isReducedMotion && canStartAnimation();

  const startOptimizedAnimation = () => {
    if (!activeAnimationRef.current && startAnimation()) {
      activeAnimationRef.current = true;
      setTimeout(() => {
        endAnimation();
        activeAnimationRef.current = false;
      }, isMobile ? 300 : 500);
      return true;
    }
    return false;
  };

  const getAnimationConfig = () => {
    if (isReducedMotion) {
      return { duration: 0, ease: "linear" };
    }
    
    if (isMobile) {
      return { duration: 0.2, ease: "easeOut" };
    }
    
    return { duration: 0.4, ease: "easeOut" };
  };

  return {
    shouldAnimate,
    startAnimation: startOptimizedAnimation,
    getAnimationConfig,
    isReducedMotion,
    isMobile
  };
};
