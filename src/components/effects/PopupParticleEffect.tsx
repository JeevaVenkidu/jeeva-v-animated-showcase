
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalPerformanceManager } from '../../hooks/useGlobalPerformanceManager';

interface PopupParticleEffectProps {
  isVisible: boolean;
  duration?: number;
  particleCount?: number;
  instanceId?: string;
}

const PopupParticleEffect: React.FC<PopupParticleEffectProps> = ({ 
  isVisible, 
  duration = 2000, 
  particleCount = 15,
  instanceId = 'default'
}) => {
  const { config } = useGlobalPerformanceManager();
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

  // Reduce particle count on mobile or if reduced motion
  const actualParticleCount = config.isReducedMotion ? 0 : 
    config.isMobile ? Math.min(8, particleCount) : 
    Math.min(15, particleCount);

  const colors = useMemo(() => [
    'rgba(59, 130, 246, 0.7)', 
    'rgba(139, 92, 246, 0.7)', 
    'rgba(6, 182, 212, 0.7)',
    'rgba(16, 185, 129, 0.7)',
    'rgba(245, 158, 11, 0.7)'
  ], []);

  useEffect(() => {
    if (isVisible && actualParticleCount > 0) {
      const newParticles = Array.from({ length: actualParticleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2 + 1.5,
        speedX: (Math.random() - 0.5) * (config.isMobile ? 1 : 1.2),
        speedY: (Math.random() - 0.5) * (config.isMobile ? 1 : 1.2),
        opacity: Math.random() * 0.4 + 0.3,
      }));
      
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]);
      }, duration);

      return () => {
        clearTimeout(timer);
        setParticles([]);
      };
    } else {
      setParticles([]);
    }
  }, [isVisible, duration, actualParticleCount, colors, config.isMobile]);

  useEffect(() => {
    return () => setParticles([]);
  }, []);

  if (!isVisible || particles.length === 0 || config.isReducedMotion) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`particles-${instanceId}-${isVisible ? 'visible' : 'hidden'}`}
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
      >
        {particles.map((particle) => (
          <motion.div
            key={`${instanceId}-${particle.id}`}
            className="absolute rounded-full"
            style={{
              backgroundColor: particle.color,
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              willChange: 'transform, opacity',
            }}
            initial={{
              scale: 0,
              x: 0,
              y: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              x: particle.speedX * (config.isMobile ? 40 : 60),
              y: particle.speedY * (config.isMobile ? 40 : 60),
              opacity: [0, particle.opacity, 0],
            }}
            transition={{
              duration: duration / 1000,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default PopupParticleEffect;
