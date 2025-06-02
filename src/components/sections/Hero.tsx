
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInteractionLimiter } from '../../hooks/useInteractionLimiter';
import { useOptimizedAnimations } from '../../hooks/useOptimizedAnimations';
import FloatingIcons from '../3d/FloatingIcons';
import SimpleFloatingIcons from '../3d/SimpleFloatingIcons';
import ParticleBackground from '../effects/ParticleBackground';
import SimpleParticleBackground from '../effects/SimpleParticleBackground';
import OptimizedButton from '../ui/OptimizedButton';

const Hero = ({ use3D = true }) => {
  const { handleClick } = useInteractionLimiter({
    clickCooldown: 500,
    maxActiveAnimations: 1
  });
  
  const { getAnimationConfig, shouldAnimate } = useOptimizedAnimations();

  const downloadResume = () => {
    handleClick(() => {
      console.log('Downloading resume...');
    });
  };

  const scrollToNext = () => {
    handleClick(() => {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    });
  };

  const animationConfig = getAnimationConfig();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50/80 via-white/90 to-purple-50/80 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 pt-16">
      {/* Animated background gradients */}
      <div className="absolute inset-0 -z-30">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-400/20 to-transparent dark:from-blue-600/10 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-0 -right-1/4 w-2/3 h-2/3 bg-gradient-to-tl from-purple-400/20 to-transparent dark:from-purple-600/10 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '12s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 bg-gradient-to-bl from-cyan-400/20 to-transparent dark:from-cyan-600/10 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '10s' }}></div>
      </div>
      
      {use3D ? (
        <>
          <ParticleBackground />
          <FloatingIcons />
        </>
      ) : (
        <>
          <SimpleParticleBackground />
          <SimpleFloatingIcons />
        </>
      )}
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={animationConfig}
        >
          <motion.h1 
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="block text-gray-900 dark:text-gray-100 mb-2">Hello, I'm</span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Jeeva V
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-4">
              Backend Developer transitioning to
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="inline-block"
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Full-Stack Excellence
              </span>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed backdrop-blur-sm bg-white/20 dark:bg-gray-900/20 p-4 rounded-xl border border-white/20 dark:border-gray-700/20 shadow-lg"
          >
            Crafting robust APIs and scalable backend solutions at{' '}
            <span className="font-semibold text-blue-600 dark:text-blue-400">Viskamnix Technology</span>, 
            while mastering modern frontend technologies to become a complete full-stack developer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...animationConfig, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <OptimizedButton 
              onClick={downloadResume}
              className="backdrop-blur-sm bg-gradient-to-r from-blue-600/90 to-purple-600/90 hover:from-blue-700/90 hover:to-purple-700/90 dark:from-blue-700/90 dark:to-purple-700/90 dark:hover:from-blue-600/90 dark:hover:to-purple-600/90 shadow-lg px-6 py-3 rounded-lg text-white font-medium"
            >
              Download Resume
            </OptimizedButton>
            
            <Link to="/projects">
              <OptimizedButton 
                className="backdrop-blur-sm bg-white/10 dark:bg-gray-800/10 border border-white/40 dark:border-gray-600/40 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 hover:border-blue-500/60 hover:text-blue-700 dark:hover:text-blue-300 shadow-lg px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                View Projects
              </OptimizedButton>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...animationConfig, delay: 1.2 }}
            className="mt-16"
          >
            <OptimizedButton
              onClick={scrollToNext}
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2"
            >
              <motion.div
                animate={shouldAnimate ? { y: [0, 10, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowDown size={32} />
              </motion.div>
            </OptimizedButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/20 dark:from-gray-900/20 dark:via-transparent dark:to-gray-900/20 pointer-events-none" />
    </section>
  );
};

export default Hero;
