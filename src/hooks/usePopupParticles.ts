
import { useState, useEffect, useRef, useCallback } from 'react';

interface ParticleInstance {
  id: string;
  timestamp: number;
}

export const usePopupParticles = (triggerDelay: number = 1000, maxParticles: number = 2) => {
  const [activeParticles, setActiveParticles] = useState<ParticleInstance[]>([]);
  const [showParticles, setShowParticles] = useState(false);
  const lastTriggerTime = useRef<number>(0);
  const cooldownPeriod = 800; // Increased cooldown for better performance

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
      prev.filter(particle => currentTime - particle.timestamp < 2000) // Reduced duration
    );
  }, []);

  const triggerParticles = useCallback(() => {
    const currentTime = Date.now();
    
    // Prevent rapid triggering with longer cooldown
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
        updatedParticles = updatedParticles.slice(1);
      }
      
      // Add new particle
      const newParticle: ParticleInstance = {
        id: `particle_${currentTime}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: currentTime
      };
      
      return [...updatedParticles, newParticle];
    });

    // Show particles effect with reduced duration
    setShowParticles(true);
    
    setTimeout(() => {
      setShowParticles(false);
    }, 2000); // Reduced from 3000ms
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
