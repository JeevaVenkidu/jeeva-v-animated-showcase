
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/cards/ProjectCard';
import SimpleParticleBackground from '../components/effects/SimpleParticleBackground';
import ParticleBackground from '../components/effects/ParticleBackground';

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      title: 'E-Commerce API',
      description: 'Comprehensive e-commerce backend built with Node.js, Express.js, and PostgreSQL. Features include user authentication with Keycloak, product management, order processing, and payment integration.',
      tags: ['Node.js', 'Express.js', 'PostgreSQL', 'Keycloak', 'REST API'],
      category: 'backend',
      featured: true,
      githubUrl: '#',
    },
    {
      title: 'CRM System',
      description: 'Customer Relationship Management system with token-based authentication, role-based access control, and comprehensive customer data management.',
      tags: ['Node.js', 'JWT', 'PostgreSQL', 'Prisma'],
      category: 'backend',
      githubUrl: '#',
    },
    {
      title: 'Auto Fertilizer Mixer',
      description: 'PLC-based precision agriculture system for automated fertilizer mixing and distribution, improving crop yield and reducing waste.',
      tags: ['PLC', 'IoT', 'Agriculture', 'Automation'],
      category: 'academic',
      githubUrl: '#',
    },
    {
      title: 'Portfolio Website',
      description: 'Interactive portfolio website built with React.js, featuring 3D animations, particle effects, and responsive design.',
      tags: ['React.js', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
      category: 'frontend',
      githubUrl: '#',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'backend', name: 'Backend' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'academic', name: 'Academic' },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 relative overflow-hidden"
    >
      {/* Particle effects for both light and dark modes */}
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

        {/* Filter Buttons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                filter === category.id
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
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
