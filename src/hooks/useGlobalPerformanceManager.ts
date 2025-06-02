
import { useState, useEffect, useCallback, useRef } from 'react';

interface PerformanceMetrics {
  activeAnimations: number;
  activeParticles: number;
  clicksPerSecond: number;
  isMobile: boolean;
  reducedMotion: boolean;
}

interface PerformanceConfig {
  maxAnimations: number;
  maxParticles: number;
  clickCooldown: number;
  particleCooldown: number;
}

class GlobalPerformanceManager {
  private static instance: GlobalPerformanceManager;
  private metrics: PerformanceMetrics;
  private config: PerformanceConfig;
  private clickTimes: number[] = [];
  private lastParticleTime = 0;
  private lastClickTime = 0;
  private subscribers: Set<() => void> = new Set();

  private constructor() {
    this.metrics = {
      activeAnimations: 0,
      activeParticles: 0,
      clicksPerSecond: 0,
      isMobile: this.detectMobile(),
      reducedMotion: this.detectReducedMotion(),
    };

    this.config = {
      maxAnimations: this.metrics.isMobile ? 2 : 3,
      maxParticles: this.metrics.isMobile ? 15 : 25,
      clickCooldown: this.metrics.isMobile ? 500 : 300,
      particleCooldown: this.metrics.isMobile ? 800 : 500,
    };
  }

  static getInstance(): GlobalPerformanceManager {
    if (!GlobalPerformanceManager.instance) {
      GlobalPerformanceManager.instance = new GlobalPerformanceManager();
    }
    return GlobalPerformanceManager.instance;
  }

  private detectMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth < 768;
  }

  private detectReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  private notifySubscribers(): void {
    this.subscribers.forEach(callback => callback());
  }

  subscribe(callback: () => void): () => void {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  canTriggerClick(): boolean {
    const now = Date.now();
    if (now - this.lastClickTime < this.config.clickCooldown) {
      return false;
    }

    // Update click rate tracking
    this.clickTimes.push(now);
    this.clickTimes = this.clickTimes.filter(time => now - time < 1000);
    this.metrics.clicksPerSecond = this.clickTimes.length;

    this.lastClickTime = now;
    this.notifySubscribers();
    return true;
  }

  canTriggerParticles(): boolean {
    const now = Date.now();
    if (now - this.lastParticleTime < this.config.particleCooldown) {
      return false;
    }

    if (this.metrics.activeParticles >= this.config.maxParticles) {
      return false;
    }

    if (this.metrics.reducedMotion) {
      return false;
    }

    this.lastParticleTime = now;
    return true;
  }

  incrementParticles(): void {
    this.metrics.activeParticles++;
    this.notifySubscribers();
  }

  decrementParticles(): void {
    this.metrics.activeParticles = Math.max(0, this.metrics.activeParticles - 1);
    this.notifySubscribers();
  }

  incrementAnimations(): void {
    this.metrics.activeAnimations++;
    this.notifySubscribers();
  }

  decrementAnimations(): void {
    this.metrics.activeAnimations = Math.max(0, this.metrics.activeAnimations - 1);
    this.notifySubscribers();
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  getConfig(): PerformanceConfig {
    return { ...this.config };
  }

  shouldReduceAnimations(): boolean {
    return this.metrics.reducedMotion || 
           this.metrics.activeAnimations >= this.config.maxAnimations ||
           this.metrics.clicksPerSecond > 5;
  }
}

export const useGlobalPerformanceManager = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>(() => 
    GlobalPerformanceManager.getInstance().getMetrics()
  );
  
  const manager = useRef(GlobalPerformanceManager.getInstance());

  const updateMetrics = useCallback(() => {
    setMetrics(manager.current.getMetrics());
  }, []);

  useEffect(() => {
    const unsubscribe = manager.current.subscribe(updateMetrics);
    return unsubscribe; // This now correctly returns void
  }, [updateMetrics]);

  return {
    metrics,
    config: manager.current.getConfig(),
    canTriggerClick: manager.current.canTriggerClick.bind(manager.current),
    canTriggerParticles: manager.current.canTriggerParticles.bind(manager.current),
    incrementParticles: manager.current.incrementParticles.bind(manager.current),
    decrementParticles: manager.current.decrementParticles.bind(manager.current),
    incrementAnimations: manager.current.incrementAnimations.bind(manager.current),
    decrementAnimations: manager.current.decrementAnimations.bind(manager.current),
    shouldReduceAnimations: manager.current.shouldReduceAnimations.bind(manager.current),
  };
};
