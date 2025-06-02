
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

interface WelcomeOverlayProps {
  onComplete: () => void;
  duration?: number;
}

const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({ 
  onComplete, 
  duration = 2500 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user has seen welcome before (for returning visitors)
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (hasSeenWelcome) {
      setIsVisible(false);
      onComplete();
      return;
    }

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + (100 / (duration / 50));
      });
    }, 50);

    // Auto-dismiss timer
    const timer = setTimeout(() => {
      handleComplete();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [duration, onComplete]);

  const handleComplete = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenWelcome', 'true');
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  const handleSkip = () => {
    handleComplete();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          {/* Cinematic scanlines */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="w-full h-px bg-white opacity-20"
                style={{ marginTop: '20px' }}
              />
            ))}
          </div>

          {/* Skip button */}
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 flex items-center gap-1 text-white/60 hover:text-white transition-colors text-xs bg-white/5 backdrop-blur-sm rounded-full px-3 py-1 hover:bg-white/10"
            aria-label="Skip welcome message"
          >
            <span>Skip</span>
            <X size={12} />
          </button>

          {/* Main content with movie title style */}
          <div className="text-center text-white max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Main title with cinematic styling */}
              <motion.h1 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl md:text-8xl font-bold mb-4 tracking-wider"
                style={{
                  fontFamily: 'serif',
                  textShadow: '0 0 20px rgba(255,255,255,0.3)',
                  background: 'linear-gradient(45deg, #ffffff, #e0e0e0, #ffffff)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                JEEVA
              </motion.h1>
              
              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-2"
              >
                <div className="h-px w-32 bg-white mx-auto mb-4"></div>
                <p className="text-lg md:text-xl text-gray-300 tracking-widest uppercase">
                  Portfolio
                </p>
                <p className="text-sm text-gray-400 font-light">
                  Backend to Full-Stack Excellence
                </p>
              </motion.div>
            </motion.div>

            {/* Minimal progress indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.0 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-48 h-0.5 bg-white/10 overflow-hidden"
            >
              <motion.div
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeOverlay;
