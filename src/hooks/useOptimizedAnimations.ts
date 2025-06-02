
import { useState, useEffect, useRef } from 'react';

export const useOptimizedAnimations = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const animationCount = useRef(0);
  const maxAnimations = useRef(3); // Limit concurrent animations

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    // Check if mobile
    const isMobileDevice = window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobile(isMobileDevice);

    // Reduce max animations on mobile
    if (isMobileDevice) {
      maxAnimations.current = 2;
    }

    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const shouldAnimate = () => {
    return !isReducedMotion && animationCount.current < maxAnimations.current;
  };

  const startAnimation = () => {
    if (shouldAnimate()) {
      animationCount.current++;
      return true;
    }
    return false;
  };

  const endAnimation = () => {
    animationCount.current = Math.max(0, animationCount.current - 1);
  };

  const getAnimationConfig = () => {
    if (isReducedMotion) {
      return { duration: 0, ease: "linear" };
    }
    
    if (isMobile) {
      return { duration: 0.3, ease: "easeOut" };
    }
    
    return { duration: 0.5, ease: "easeOut" };
  };

  return {
    shouldAnimate: shouldAnimate(),
    startAnimation,
    endAnimation,
    getAnimationConfig,
    isReducedMotion,
    isMobile,
    activeAnimations: animationCount.current
  };
};
