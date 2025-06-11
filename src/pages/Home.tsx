
import React from 'react';
import { motion } from 'framer-motion';
import { useHomeController } from '../controllers/useHomeController';
import Hero from '../components/sections/Hero';
import SEOHead from '../components/seo/SEOHead';
import homeConfig from '../config/homeConfig.json';

const Home = () => {
  const { heroData, use3D, isLoading } = useHomeController();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50/80 via-white/90 to-purple-50/80 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <div className="backdrop-blur-sm bg-white/20 dark:bg-gray-900/20 p-6 rounded-xl border border-white/20 dark:border-gray-700/20 shadow-lg">
          <div className="text-xl text-gray-600 dark:text-gray-300">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
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
