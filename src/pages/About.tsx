import React from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from '../components/effects/ParticleBackground';
import SimpleParticleBackground from '../components/effects/SimpleParticleBackground';
import SEOHead from '../components/seo/SEOHead';
import aboutConfig from '../config/aboutConfig.json';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-blue-50/80 via-white/90 to-purple-50/80 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden"
    >
      <SEOHead
        title={aboutConfig.seo.title}
        description={aboutConfig.seo.description}
        keywords={aboutConfig.seo.keywords}
        url={aboutConfig.seo.url}
      />

      {/* Animated background gradients */}
      <div className="absolute inset-0 -z-30">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-400/20 to-transparent dark:from-blue-600/10 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-0 -right-1/4 w-2/3 h-2/3 bg-gradient-to-tl from-purple-400/20 to-transparent dark:from-purple-600/10 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '12s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 bg-gradient-to-bl from-cyan-400/20 to-transparent dark:from-cyan-600/10 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '10s' }}></div>
      </div>

      <ParticleBackground />
      <SimpleParticleBackground />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6"
          >
            {aboutConfig.hero.title} <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {aboutConfig.hero.titleHighlight}
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            {aboutConfig.hero.subtitle}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            className="backdrop-blur-sm bg-white/20 dark:bg-gray-900/20 p-8 rounded-xl border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-2xl transition-shadow duration-500"
          >
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6"
            >
              {aboutConfig.journey.title}
            </motion.h2>
            <motion.div 
              className="space-y-4 text-gray-700 dark:text-gray-300"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {aboutConfig.journey.content.map((paragraph, index) => (
                <motion.p key={index} variants={itemVariants}>
                  {paragraph.includes('**') ? (
                    <>
                      {paragraph.split('**')[0]}
                      <strong className="text-blue-600 dark:text-blue-400">
                        {paragraph.split('**')[1]}
                      </strong>
                      {paragraph.split('**')[2]}
                    </>
                  ) : (
                    paragraph
                  )}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            className="backdrop-blur-sm bg-white/20 dark:bg-gray-900/20 p-8 rounded-xl border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-2xl transition-shadow duration-500"
          >
            <motion.h2 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6"
            >
              {aboutConfig.skills.title}
            </motion.h2>
            <motion.div 
              className="flex flex-wrap gap-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {aboutConfig.skills.items.map((skill, index) => (
                <motion.span
                  key={skill}
                  variants={skillVariants}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg shadow-md text-gray-700 dark:text-gray-300 font-medium border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="mt-16 text-center"
        >
          <div className="backdrop-blur-sm bg-white/20 dark:bg-gray-900/20 p-8 rounded-xl border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-2xl transition-shadow duration-500">
            <motion.h3 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4"
            >
              {aboutConfig.currentFocus.title}
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="text-gray-700 dark:text-gray-300"
            >
              {aboutConfig.currentFocus.description}
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/20 dark:from-gray-900/20 dark:via-transparent dark:to-gray-900/20 pointer-events-none" />
    </motion.div>
  );
};

export default About;
