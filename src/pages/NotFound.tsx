
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from 'framer-motion';
import SimpleParticleBackground from '../components/effects/SimpleParticleBackground';
import ParticleBackground from '../components/effects/ParticleBackground';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 -z-30">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-400/20 to-transparent dark:from-blue-600/10 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-0 -right-1/4 w-2/3 h-2/3 bg-gradient-to-tl from-purple-400/20 to-transparent dark:from-purple-600/10 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '12s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 bg-gradient-to-bl from-cyan-400/20 to-transparent dark:from-cyan-600/10 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '10s' }}></div>
      </div>

      {/* Particle effects for both light and dark modes */}
      <ParticleBackground />
      <SimpleParticleBackground />
      
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center relative z-10"
      >
        <motion.h1 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl font-bold mb-4 text-gray-900 dark:text-gray-100"
        >
          404
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-gray-600 dark:text-gray-300 mb-8"
        >
          Oops! Page not found
        </motion.p>
        <motion.a 
          href="/" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Return to Home
        </motion.a>
      </motion.div>
    </div>
  );
};

export default NotFound;
