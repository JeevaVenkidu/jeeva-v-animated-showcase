
import React from 'react';
import { motion } from 'framer-motion';
import { useHomeController } from '../controllers/useHomeController';
import Hero from '../components/sections/Hero';

const Home = () => {
  const { heroData, use3D, isLoading } = useHomeController();

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
      transition={{ duration: 0.5 }}
    >
      <Hero use3D={use3D} />
    </motion.div>
  );
};

export default Home;
