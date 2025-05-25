
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
      className="absolute inset-0 -z-10 pointer-events-none"
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
                opacity: 0.5,
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
            opacity: 0.4,
            width: 1,
            triangles: {
              enable: true,
              opacity: 0.1
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
            value: 100,
          },
          opacity: {
            value: {
              min: 0.3,
              max: 0.8
            },
            animation: {
              enable: true,
              speed: 1.5,
              minimumValue: 0.2
            }
          },
          shape: {
            type: ['circle', 'triangle', 'polygon'],
          },
          size: {
            value: { min: 1, max: 5 },
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
        style: {
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: -10,
        }
      }}
    />
  );
};

export default ParticleBackground;
