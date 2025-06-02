
import { useState, useEffect, useRef, useCallback } from 'react';
import { useGlobalPerformanceManager } from './useGlobalPerformanceManager';

interface ParticleInstance {
  id: string;
  timestamp: number;
}

export const usePopupParticles = (triggerDelay: number = 1000) => {
  const { canStartParticleEffect, startParticleEffect, endParticleEffect, config } = useGlobalPerformanceManager();
  const [activeParticles, setActiveParticles] = useState<ParticleInstance[]>([]);
  const [showParticles, setShowParticles] = useState(false);
  const lastTriggerTime = useRef<number>(0);
  const maxParticles = config.isMobile ? 1 : 2;
  const cooldownPeriod = config.clickCooldown;

  useEffect(() => {
    if (!config.isReducedMotion) {
      const timer = setTimeout(() => {
        triggerParticles();
      }, triggerDelay);

      return () => clearTimeout(timer);
    }
  }, [triggerDelay, config.isReducedMotion]);

  const cleanupExpiredParticles = useCallback(() => {
    const currentTime = Date.now();
    setActiveParticles(prev => {
      const filtered = prev.filter(particle => currentTime - particle.timestamp < 1500);
      // End particle effects for expired particles
      const expired = prev.length - filtered.length;
      for (let i = 0; i < expired; i++) {
        endParticleEffect();
      }
      return filtered;
    });
  }, [endParticleEffect]);

  const triggerParticles = useCallback(() => {
    const currentTime = Date.now();
    
    // Check cooldown and system capacity
    if (currentTime - lastTriggerTime.current < cooldownPeriod || 
        !canStartParticleEffect() || 
        config.isReducedMotion) {
      return;
    }

    lastTriggerTime.current = currentTime;
    cleanupExpiredParticles();

    setActiveParticles(prev => {
      let updatedParticles = [...prev];
      
      // If at max capacity, remove oldest and end its effect
      if (updatedParticles.length >= maxParticles) {
        updatedParticles = updatedParticles.slice(1);
        endParticleEffect();
      }
      
      // Start new particle effect
      if (startParticleEffect()) {
        const newParticle: ParticleInstance = {
          id: `particle_${currentTime}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: currentTime
        };
        
        return [...updatedParticles, newParticle];
      }
      
      return updatedParticles;
    });

    setShowParticles(true);
    
    setTimeout(() => {
      setShowParticles(false);
    }, 1500);
  }, [maxParticles, cooldownPeriod, cleanupExpiredParticles, canStartParticleEffect, startParticleEffect, endParticleEffect, config.isReducedMotion]);

  // Cleanup interval
  useEffect(() => {
    const cleanupInterval = setInterval(cleanupExpiredParticles, 1000);
    return () => clearInterval(cleanupInterval);
  }, [cleanupExpiredParticles]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // End all active particle effects
      activeParticles.forEach(() => endParticleEffect());
      setActiveParticles([]);
      setShowParticles(false);
    };
  }, []);

  return {
    showParticles: showParticles && activeParticles.length > 0 && !config.isReducedMotion,
    triggerParticles,
    setShowParticles,
    activeParticleCount: activeParticles.length,
    canTrigger: canStartParticleEffect() && Date.now() - lastTriggerTime.current >= cooldownPeriod,
  };
};
