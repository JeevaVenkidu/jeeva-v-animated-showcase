
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag } from 'lucide-react';

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Articles & <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Blogs</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sharing knowledge and insights from my development journey
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                filter === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 gap-8"
        >
          {filteredArticles.map((article, index) => (
            <motion.article
              key={article.title}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h2>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                    >
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ x: 5 }}
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                >
                  Read More →
                </motion.button>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-600 text-lg">No articles found in this category.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Articles;
