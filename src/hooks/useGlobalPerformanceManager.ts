
import { useState, useRef, useCallback, useEffect } from 'react';

interface PerformanceConfig {
  maxConcurrentAnimations: number;
  maxParticleEffects: number;
  clickCooldown: number;
  isMobile: boolean;
  isReducedMotion: boolean;
}

class GlobalPerformanceManager {
  private static instance: GlobalPerformanceManager;
  private activeAnimations = 0;
  private activeParticleEffects = 0;
  private lastClickTime = 0;
  private config: PerformanceConfig;
  private subscribers: Set<() => void> = new Set();

  constructor() {
    this.config = {
      maxConcurrentAnimations: this.detectMobile() ? 2 : 4,
      maxParticleEffects: this.detectMobile() ? 1 : 2,
      clickCooldown: this.detectMobile() ? 800 : 500,
      isMobile: this.detectMobile(),
      isReducedMotion: this.detectReducedMotion()
    };
  }

  static getInstance(): GlobalPerformanceManager {
    if (!GlobalPerformanceManager.instance) {
      GlobalPerformanceManager.instance = new GlobalPerformanceManager();
    }
    return GlobalPerformanceManager.instance;
  }

  private detectMobile(): boolean {
    return window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  private detectReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  subscribe(callback: () => void) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  private notify() {
    this.subscribers.forEach(callback => callback());
  }

  canStartAnimation(): boolean {
    return !this.config.isReducedMotion && this.activeAnimations < this.config.maxConcurrentAnimations;
  }

  canStartParticleEffect(): boolean {
    return !this.config.isReducedMotion && this.activeParticleEffects < this.config.maxParticleEffects;
  }

  canClick(): boolean {
    const now = Date.now();
    return now - this.lastClickTime >= this.config.clickCooldown;
  }

  startAnimation(): boolean {
    if (this.canStartAnimation()) {
      this.activeAnimations++;
      this.notify();
      return true;
    }
    return false;
  }

  endAnimation() {
    this.activeAnimations = Math.max(0, this.activeAnimations - 1);
    this.notify();
  }

  startParticleEffect(): boolean {
    if (this.canStartParticleEffect()) {
      this.activeParticleEffects++;
      this.notify();
      return true;
    }
    return false;
  }

  endParticleEffect() {
    this.activeParticleEffects = Math.max(0, this.activeParticleEffects - 1);
    this.notify();
  }

  registerClick(): boolean {
    if (this.canClick()) {
      this.lastClickTime = Date.now();
      return true;
    }
    return false;
  }

  getConfig(): PerformanceConfig {
    return { ...this.config };
  }

  getStats() {
    return {
      activeAnimations: this.activeAnimations,
      activeParticleEffects: this.activeParticleEffects,
      maxAnimations: this.config.maxConcurrentAnimations,
      maxParticleEffects: this.config.maxParticleEffects
    };
  }
}

export const useGlobalPerformanceManager = () => {
  const manager = GlobalPerformanceManager.getInstance();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = manager.subscribe(() => {
      forceUpdate({});
    });
    return unsubscribe;
  }, [manager]);

  return {
    canStartAnimation: useCallback(() => manager.canStartAnimation(), [manager]),
    canStartParticleEffect: useCallback(() => manager.canStartParticleEffect(), [manager]),
    canClick: useCallback(() => manager.canClick(), [manager]),
    startAnimation: useCallback(() => manager.startAnimation(), [manager]),
    endAnimation: useCallback(() => manager.endAnimation(), [manager]),
    startParticleEffect: useCallback(() => manager.startParticleEffect(), [manager]),
    endParticleEffect: useCallback(() => manager.endParticleEffect(), [manager]),
    registerClick: useCallback(() => manager.registerClick(), [manager]),
    config: manager.getConfig(),
    stats: manager.getStats()
  };
};
