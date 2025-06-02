
import React from 'react';
import { motion } from 'framer-motion';
import { useHomeController } from '../controllers/useHomeController';
import { useOptimizedAnimations } from '../hooks/useOptimizedAnimations';
import Hero from '../components/sections/Hero';
import SEOHead from '../components/seo/SEOHead';
import homeConfig from '../config/homeConfig.json';

const Home = () => {
  const { heroData, use3D, isLoading } = useHomeController();
  const { getAnimationConfig } = useOptimizedAnimations();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
        <div className="text-xl text-gray-600 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={getAnimationConfig()}
    >
      <SEOHead
        title={homeConfig.seo.title}
        description={homeConfig.seo.description}
        keywords={homeConfig.seo.keywords}
        url={homeConfig.seo.url}
      />
      <Hero use3D={use3D} />
    </motion.div>
  );
};

export default Home;
