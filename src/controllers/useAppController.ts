
import { useState, useEffect } from 'react';

export const useAppController = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return {
    theme,
    isMobile,
    toggleTheme,
  };
};
