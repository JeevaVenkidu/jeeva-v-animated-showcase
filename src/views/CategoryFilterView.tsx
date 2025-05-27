
import React from 'react';
import { motion } from 'framer-motion';
import { ProjectCategory } from '../models/projectModel';

interface CategoryFilterViewProps {
  categories: ProjectCategory[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryFilterView: React.FC<CategoryFilterViewProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap justify-center gap-4 mb-12"
    >
      {categories.map((category) => (
        <motion.button
          key={category.id}
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category.id)}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            selectedCategory === category.id
              ? 'bg-blue-600 text-white shadow-lg transform scale-105'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg'
          }`}
        >
          {category.name}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default CategoryFilterView;
