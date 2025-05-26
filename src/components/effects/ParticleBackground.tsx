
import React, { useCallback } from 'react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
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
      options={{
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: 'push',
            },
            onHover: {
              enable: true,
              mode: 'grab',
              parallax: {
                enable: true,
                force: 60,
                smooth: 10
              }
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            grab: {
              distance: 140,
              links: {
                opacity: 0.8,
                color: {
                  value: ['#3b82f6', '#8b5cf6', '#06b6d4']
                }
              }
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'],
          },
          links: {
            color: {
              value: ['#3b82f6', '#8b5cf6', '#06b6d4']
            },
            distance: 150,
            enable: true,
            opacity: 0.6,
            width: 1.5,
            triangles: {
              enable: true,
              opacity: 0.15
            }
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'bounce',
            },
            random: true,
            speed: 1.5,
            straight: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: {
              min: 0.4,
              max: 0.9
            },
            animation: {
              enable: true,
              speed: 1.5,
              minimumValue: 0.3
            }
          },
          shape: {
            type: ['circle', 'triangle', 'polygon'],
          },
          size: {
            value: { min: 1, max: 4 },
            animation: {
              enable: true,
              speed: 3,
              minimumValue: 0.5
            }
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.08,
              opacity: 1
            }
          }
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticleBackground;
