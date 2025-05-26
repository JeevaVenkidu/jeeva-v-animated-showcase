
import React, { useEffect, useRef } from 'react';

const SimpleParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    // Create particles
    const particlesArray: Particle[] = [];
    const numberOfParticles = 120;
    
    // Enhanced colors for better visibility in both themes
    const lightModeColors = [
      'rgba(59, 130, 246, 0.8)', 
      'rgba(139, 92, 246, 0.8)', 
      'rgba(6, 182, 212, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(245, 158, 11, 0.8)'
    ];
    
    const darkModeColors = [
      'rgba(59, 130, 246, 0.9)', 
      'rgba(139, 92, 246, 0.9)', 
      'rgba(6, 182, 212, 0.9)',
      'rgba(16, 185, 129, 0.9)',
      'rgba(245, 158, 11, 0.9)'
    ];

    // Detect dark mode
    const isDarkMode = () => {
      return document.documentElement.classList.contains('dark') || 
             window.matchMedia('(prefers-color-scheme: dark)').matches;
    };

    const mousePosition = {
      x: null as number | null,
      y: null as number | null,
    };

    // Track mouse position for interactivity
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.x = e.x;
      mousePosition.y = e.y;
    };

    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      baseX: number;
      baseY: number;
      density: number;
      opacity: number;
      baseOpacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 6 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.density = Math.random() * 30 + 1;
        this.baseOpacity = Math.random() * 0.4 + 0.4;
        this.opacity = this.baseOpacity;
        this.updateColor();
      }

      updateColor() {
        const colors = isDarkMode() ? darkModeColors : lightModeColors;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Update color based on current theme
        this.updateColor();

        // Mouse interaction
        if (mousePosition.x != null && mousePosition.y != null) {
          const dx = mousePosition.x - this.x;
          const dy = mousePosition.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          
          // Max distance for mouse interaction
          const maxDistance = 100;
          let force = (maxDistance - distance) / maxDistance;
          
          if (force < 0) force = 0;
          
          const directionX = forceDirectionX * force * this.density;
          const directionY = forceDirectionY * force * this.density;
          
          if (distance < maxDistance) {
            this.x -= directionX;
            this.y -= directionY;
            this.opacity = Math.min(1, this.baseOpacity + force * 0.4);
          } else {
            // Return to original position
            if (this.x !== this.baseX) {
              const dx = this.x - this.baseX;
              this.x -= dx / 15;
            }
            if (this.y !== this.baseY) {
              const dy = this.y - this.baseY;
              this.y -= dy / 15;
            }
            this.opacity = this.baseOpacity;
          }
        }

        // Normal movement
        this.x += this.speedX * 0.3;
        this.y += this.speedY * 0.3;

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }

      draw() {
        if (!ctx) return;
        
        // Create gradient for better visibility
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        const baseColor = this.color.replace(/[\d\.]+\)$/g, `${this.opacity})`);
        gradient.addColorStop(0, baseColor);
        gradient.addColorStop(1, baseColor.replace(/[\d\.]+\)$/g, '0)'));
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      drawConnection(otherParticle: Particle) {
        if (!ctx) return;
        const dx = this.x - otherParticle.x;
        const dy = this.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100;

        if (distance < maxDistance) {
          const opacity = isDarkMode() ? 0.4 : 0.3;
          const connectionOpacity = opacity * (1 - distance / maxDistance);
          ctx.strokeStyle = `rgba(59, 130, 246, ${connectionOpacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      }
    }

    function init() {
      particlesArray.length = 0;
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        for (let j = i + 1; j < particlesArray.length; j++) {
          particlesArray[i].drawConnection(particlesArray[j]);
        }
      }
      
      requestAnimationFrame(animate);
    }

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      // Force particle color update when theme changes
      particlesArray.forEach(particle => particle.updateColor());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    init();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default SimpleParticleBackground;
