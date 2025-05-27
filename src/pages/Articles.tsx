import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag } from 'lucide-react';
import SimpleParticleBackground from '../components/effects/SimpleParticleBackground';

const Articles = () => {
  const [filter, setFilter] = useState('all');

  const articles = [
    {
      title: 'Building Scalable APIs with Node.js and Express',
      excerpt: 'Learn how to create robust, scalable backend APIs using Node.js, Express.js, and best practices for production applications.',
      date: '2024-01-15',
      readTime: '8 min read',
      tags: ['Node.js', 'Express.js', 'Backend', 'API'],
      category: 'backend',
      slug: 'building-scalable-apis-nodejs-express'
    },
    {
      title: 'Database Design with PostgreSQL and Prisma',
      excerpt: 'Explore advanced database design patterns and how to implement them using PostgreSQL with Prisma ORM for type-safe database operations.',
      date: '2024-01-10',
      readTime: '12 min read',
      tags: ['PostgreSQL', 'Prisma', 'Database', 'ORM'],
      category: 'backend',
      slug: 'database-design-postgresql-prisma'
    },
    {
      title: 'Authentication & Authorization Best Practices',
      excerpt: 'A comprehensive guide to implementing secure authentication and authorization in modern web applications using JWT and OAuth.',
      date: '2024-01-05',
      readTime: '10 min read',
      tags: ['Authentication', 'Security', 'JWT', 'OAuth'],
      category: 'security',
      slug: 'authentication-authorization-best-practices'
    },
    {
      title: 'Transitioning from Backend to Full-Stack Development',
      excerpt: 'My personal journey and insights on expanding from backend development to full-stack, including challenges and learning strategies.',
      date: '2023-12-20',
      readTime: '6 min read',
      tags: ['Career', 'Full-Stack', 'Learning', 'Development'],
      category: 'career',
      slug: 'backend-to-fullstack-transition'
    }
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 relative overflow-hidden"
    >
      {/* Use only SimpleParticleBackground to avoid WebGL conflicts */}
      <SimpleParticleBackground />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Tech <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Articles</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on backend development and technology
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                filter === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md border border-gray-200 dark:border-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredArticles.map((article, index) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                    >
                      <Tag size={12} className="mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2">
                  {article.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {new Date(article.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {article.readTime}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                >
                  Read Article
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-600 dark:text-gray-300 text-lg">No articles found in this category.</p>
          </motion.div>
        )}
      </div>

      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/20 dark:from-gray-900/20 dark:via-transparent dark:to-gray-900/20 pointer-events-none" />
    </motion.div>
  );
};

export default Articles;
