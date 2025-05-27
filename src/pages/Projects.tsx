import React from 'react';
import { motion } from 'framer-motion';
import { useProjectController } from '../controllers/useProjectController';
import ProjectCardView from '../views/ProjectCardView';
import CategoryFilterView from '../views/CategoryFilterView';
import SimpleParticleBackground from '../components/effects/SimpleParticleBackground';
import PopupParticleEffect from '../components/effects/PopupParticleEffect';
import { usePopupParticles } from '../hooks/usePopupParticles';

const Projects = () => {
  const {
    projects,
    categories,
    selectedCategory,
    isLoading,
    handleCategoryChange,
  } = useProjectController();

  const { showParticles, triggerParticles } = usePopupParticles(1200);

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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
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

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-300">Loading projects...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 relative overflow-hidden"
    >
      <SimpleParticleBackground />
      <PopupParticleEffect isVisible={showParticles} duration={2500} particleCount={60} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6"
          >
            My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            A showcase of my backend expertise and growing full-stack capabilities
          </motion.p>
        </motion.div>

        <CategoryFilterView
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => {
            handleCategoryChange(category);
            triggerParticles();
          }}
        />

        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              layout
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              onHoverStart={triggerParticles}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ProjectCardView project={project} featured={project.featured} />
            </motion.div>
          ))}
        </motion.div>

        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <p className="text-gray-600 dark:text-gray-300 text-lg">No projects found in this category.</p>
          </motion.div>
        )}
      </div>

      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/20 dark:from-gray-900/20 dark:via-transparent dark:to-gray-900/20 pointer-events-none" />
    </motion.div>
  );
};

export default Projects;
