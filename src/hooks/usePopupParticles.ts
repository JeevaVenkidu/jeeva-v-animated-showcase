
import { useState, useEffect, useRef, useCallback } from 'react';

interface ParticleInstance {
  id: string;
  timestamp: number;
}

export const usePopupParticles = (triggerDelay: number = 1000, maxParticles: number = 3) => {
  const [activeParticles, setActiveParticles] = useState<ParticleInstance[]>([]);
  const [showParticles, setShowParticles] = useState(false);
  const lastTriggerTime = useRef<number>(0);
  const cooldownPeriod = 500; // Minimum time between triggers (ms)

  useEffect(() => {
    // Auto-trigger particles after component mounts with a delay
    const timer = setTimeout(() => {
      triggerParticles();
    }, triggerDelay);

    return () => clearTimeout(timer);
  }, [triggerDelay]);

  const cleanupExpiredParticles = useCallback(() => {
    const currentTime = Date.now();
    setActiveParticles(prev => 
      prev.filter(particle => currentTime - particle.timestamp < 3000) // Remove particles older than 3 seconds
    );
  }, []);

  const triggerParticles = useCallback(() => {
    const currentTime = Date.now();
    
    // Prevent rapid triggering
    if (currentTime - lastTriggerTime.current < cooldownPeriod) {
      return;
    }

    lastTriggerTime.current = currentTime;

    // Clean up expired particles first
    cleanupExpiredParticles();

    setActiveParticles(prev => {
      let updatedParticles = [...prev];
      
      // If we're at max capacity, remove the oldest particle
      if (updatedParticles.length >= maxParticles) {
        updatedParticles = updatedParticles.slice(1); // Remove the oldest
      }
      
      // Add new particle
      const newParticle: ParticleInstance = {
        id: `particle_${currentTime}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: currentTime
      };
      
      return [...updatedParticles, newParticle];
    });

    // Show particles effect
    setShowParticles(true);
    
    // Auto-hide after effect duration
    setTimeout(() => {
      setShowParticles(false);
    }, 3000);
  }, [maxParticles, cooldownPeriod, cleanupExpiredParticles]);

  // Cleanup interval to remove expired particles
  useEffect(() => {
    const cleanupInterval = setInterval(cleanupExpiredParticles, 1000);
    return () => clearInterval(cleanupInterval);
  }, [cleanupExpiredParticles]);

  // Cleanup all particles when component unmounts
  useEffect(() => {
    return () => {
      setActiveParticles([]);
      setShowParticles(false);
    };
  }, []);

  return {
    showParticles: showParticles && activeParticles.length > 0,
    triggerParticles,
    setShowParticles,
    activeParticleCount: activeParticles.length,
    canTrigger: Date.now() - lastTriggerTime.current >= cooldownPeriod,
  };
};
