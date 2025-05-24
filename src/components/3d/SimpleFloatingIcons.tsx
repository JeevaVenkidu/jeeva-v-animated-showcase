
import React from 'react';
import { motion } from 'framer-motion';

const SimpleFloatingIcons = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Create animated circles and squares instead of 3D objects */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-600/10"
          initial={{
            x: Math.random() * 100 - 50 + '%',
            y: Math.random() * 100 - 50 + '%',
            scale: Math.random() * 0.6 + 0.5,
          }}
          animate={{
            x: [
              Math.random() * 100 - 50 + '%',
              Math.random() * 100 - 50 + '%',
              Math.random() * 100 - 50 + '%',
            ],
            y: [
              Math.random() * 100 - 50 + '%',
              Math.random() * 100 - 50 + '%',
              Math.random() * 100 - 50 + '%',
            ],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: (Math.random() * 100 + 50) + 'px',
            height: (Math.random() * 100 + 50) + 'px',
          }}
        />
      ))}
      
      {/* Create animated squares */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`square-${i}`}
          className="absolute bg-purple-600/10 rounded-lg"
          initial={{
            x: Math.random() * 100 - 50 + '%',
            y: Math.random() * 100 - 50 + '%',
            rotate: Math.random() * 180,
            scale: Math.random() * 0.6 + 0.5,
          }}
          animate={{
            x: [
              Math.random() * 100 - 50 + '%',
              Math.random() * 100 - 50 + '%',
              Math.random() * 100 - 50 + '%',
            ],
            y: [
              Math.random() * 100 - 50 + '%',
              Math.random() * 100 - 50 + '%',
              Math.random() * 100 - 50 + '%',
            ],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: Math.random() * 30 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: (Math.random() * 80 + 30) + 'px',
            height: (Math.random() * 80 + 30) + 'px',
          }}
        />
      ))}
    </div>
  );
};

export default SimpleFloatingIcons;
