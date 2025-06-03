import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag } from 'lucide-react';
import ParticleBackground from '../components/effects/ParticleBackground';
import SimpleParticleBackground from '../components/effects/SimpleParticleBackground';

const Articles = () => {
  const [filter, setFilter] = useState('all');

  const articles = [
    {
      title: 'Building Scalable REST APIs with Node.js and Express',
      excerpt: 'Learn the best practices for creating robust and scalable REST APIs that can handle thousands of requests...',
      date: '2024-03-15',
      readTime: '8 min read',
      tags: ['Node.js', 'Express.js', 'API', 'Backend'],
      category: 'backend',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    },
    {
      title: 'Database Design Patterns with PostgreSQL and Prisma',
      excerpt: 'Explore advanced database design patterns and how to implement them efficiently using PostgreSQL and Prisma ORM...',
      date: '2024-03-10',
      readTime: '12 min read',
      tags: ['PostgreSQL', 'Prisma', 'Database', 'ORM'],
      category: 'backend',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    },
    {
      title: 'Authentication and Authorization in Modern Web Apps',
      excerpt: 'A comprehensive guide to implementing secure authentication and authorization using JWT and OAuth...',
      date: '2024-03-05',
      readTime: '10 min read',
      tags: ['Authentication', 'JWT', 'Security', 'OAuth'],
      category: 'security',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    },
    {
      title: 'From Backend to Full-Stack: My Learning Journey',
      excerpt: 'My personal experience transitioning from backend development to full-stack, including challenges and lessons learned...',
      date: '2024-02-28',
      readTime: '6 min read',
      tags: ['Career', 'Learning', 'Full-Stack', 'Personal'],
      category: 'career',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'backend', name: 'Backend' },
    { id: 'security', name: 'Security' },
    { id: 'career', name: 'Career' },
  ];

  const filteredArticles = filter === 'all' 
    ? articles 
    : articles.filter(article => article.category === filter);

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
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-blue-50/80 via-white/90 to-purple-50/80 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden"
    >
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
            Articles & <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Blogs</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Sharing knowledge and insights from my development journey
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
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8"
        >
          {filteredArticles.map((article, index) => (
            <motion.article
              key={article.title}
              layout
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="h-48 overflow-hidden">
                <motion.img
                  src={article.image}
                  alt={article.title}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <motion.div 
                    className="flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Calendar size={16} />
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Clock size={16} />
                    <span>{article.readTime}</span>
                  </motion.div>
                </div>

                <motion.h2 
                  className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {article.title}
                </motion.h2>

                <motion.p 
                  className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {article.excerpt}
                </motion.p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * tagIndex }}
                      whileHover={{ scale: 1.1 }}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full"
                    >
                      <Tag size={12} />
                      {tag}
                    </motion.span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ x: 5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
                >
                  Read More →
                </motion.button>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">No articles found in this category.</p>
          </motion.div>
        )}
      </div>

      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/20 dark:from-gray-900/20 dark:via-transparent dark:to-gray-900/20 pointer-events-none" />
    </motion.div>
  );
};

export default Articles;
