
import React from 'react';
import { motion } from 'framer-motion';
import { useProjectController } from '../controllers/useProjectController';
import ProjectCardView from '../views/ProjectCardView';
import CategoryFilterView from '../views/CategoryFilterView';
import ParticleBackground from '../components/effects/ParticleBackground';
import SimpleParticleBackground from '../components/effects/SimpleParticleBackground';
import SEOHead from '../components/seo/SEOHead';
import projectsConfig from '../config/projectsConfig.json';

const Projects = () => {
  const {
    projects,
    categories,
    selectedCategory,
    isLoading,
    handleCategoryChange,
  } = useProjectController();

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
      <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-blue-50/80 via-white/90 to-purple-50/80 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex items-center justify-center">
        <div className="backdrop-blur-sm bg-white/20 dark:bg-gray-900/20 p-6 rounded-xl border border-white/20 dark:border-gray-700/20 shadow-lg">
          <div className="text-xl text-gray-600 dark:text-gray-300">Loading projects...</div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-blue-50/80 via-white/90 to-purple-50/80 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden"
    >
      <SEOHead
        title={projectsConfig.seo.title}
        description={projectsConfig.seo.description}
        keywords={projectsConfig.seo.keywords}
        url={projectsConfig.seo.url}
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
            {projectsConfig.hero.title} <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {projectsConfig.hero.titleHighlight}
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto backdrop-blur-sm bg-white/20 dark:bg-gray-900/20 p-4 rounded-xl border border-white/20 dark:border-gray-700/20 shadow-lg"
          >
            {projectsConfig.hero.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="backdrop-blur-sm bg-white/10 dark:bg-gray-900/10 p-6 rounded-xl border border-white/20 dark:border-gray-700/20 shadow-lg mb-12"
        >
          <CategoryFilterView
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </motion.div>

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
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="backdrop-blur-sm bg-white/10 dark:bg-gray-900/10 rounded-xl border border-white/20 dark:border-gray-700/20 shadow-lg overflow-hidden"
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
            className="text-center py-16 backdrop-blur-sm bg-white/20 dark:bg-gray-900/20 rounded-xl border border-white/20 dark:border-gray-700/20 shadow-lg"
          >
            <p className="text-gray-600 dark:text-gray-300 text-lg">{projectsConfig.emptyState.message}</p>
          </motion.div>
        )}
      </div>

      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/20 dark:from-gray-900/20 dark:via-transparent dark:to-gray-900/20 pointer-events-none" />
    </motion.div>
  );
};

export default Projects;
