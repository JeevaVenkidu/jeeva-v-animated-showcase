
import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/sections/Hero';

const Home = ({ use3D = true }) => {
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
