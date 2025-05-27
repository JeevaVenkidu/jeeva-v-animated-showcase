
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/sections/Hero';

const Home = () => {
  const [use3D, setUse3D] = useState(false); // Start with false to avoid WebGL issues
  
  // Check if Three.js related modules are available and WebGL is supported
  useEffect(() => {
    const check3DSupport = async () => {
      try {
        // Check WebGL support first
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) {
          console.warn('WebGL not supported, using 2D animations');
          setUse3D(false);
          return;
        }
        
        // Check if Three.js libraries are available
        await import('@react-three/fiber');
        await import('@react-three/drei');
        setUse3D(true);
        console.log('3D support enabled');
      } catch (error) {
        console.warn('3D libraries not available or WebGL failed, falling back to 2D animations:', error);
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
