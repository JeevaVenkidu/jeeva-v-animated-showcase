
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PopupParticleEffectProps {
  isVisible: boolean;
  duration?: number;
  particleCount?: number;
}

const PopupParticleEffect: React.FC<PopupParticleEffectProps> = ({ 
  isVisible, 
  duration = 3000, 
  particleCount = 50 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
  }>>([]);

  const colors = [
    'rgba(59, 130, 246, 0.8)', 
    'rgba(139, 92, 246, 0.8)', 
    'rgba(6, 182, 212, 0.8)',
    'rgba(16, 185, 129, 0.8)',
    'rgba(245, 158, 11, 0.8)'
  ];

  useEffect(() => {
    if (isVisible) {
      // Generate particles when effect becomes visible
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.6 + 0.4,
      }));
      
      setParticles(newParticles);

      // Clear particles after duration
      const timer = setTimeout(() => {
        setParticles([]);
      }, duration);

      return () => clearTimeout(timer);
    } else {
      setParticles([]);
    }
  }, [isVisible, duration, particleCount]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 pointer-events-none z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                backgroundColor: particle.color,
                width: particle.size,
                height: particle.size,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                opacity: particle.opacity,
              }}
              initial={{
                scale: 0,
                x: 0,
                y: 0,
              }}
              animate={{
                scale: [0, 1, 0],
                x: particle.speedX * 100,
                y: particle.speedY * 100,
                opacity: [0, particle.opacity, 0],
              }}
              transition={{
                duration: duration / 1000,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupParticleEffect;
