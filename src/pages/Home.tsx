
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/sections/Hero';

const Home = () => {
  const [use3D, setUse3D] = useState(true);
  
  // Check if Three.js related modules are available
  useEffect(() => {
    const check3DSupport = async () => {
      try {
        await import('@react-three/fiber');
        await import('@react-three/drei');
        setUse3D(true);
      } catch (error) {
        console.warn('3D libraries not available, falling back to 2D animations');
        setUse3D(false);
      }
    };
    
    check3DSupport();
  }, []);

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
