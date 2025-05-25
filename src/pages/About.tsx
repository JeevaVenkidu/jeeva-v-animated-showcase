
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const skills = [
    'Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'REST APIs',
    'HTML', 'CSS', 'React.js', 'JavaScript', 'TypeScript'
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Backend developer with a passion for creating robust, scalable solutions and transitioning into full-stack development.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">My Journey</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                Currently working as a Backend Developer at <strong className="text-blue-600 dark:text-blue-400">Viskamnix Technology</strong>, 
                where I specialize in building robust APIs and scalable backend solutions using Node.js, Express.js, and PostgreSQL.
              </p>
              <p>
                My expertise lies in creating efficient database schemas with Prisma, implementing secure authentication systems, 
                and developing RESTful APIs that power modern applications.
              </p>
              <p>
                I'm actively expanding my skill set by learning frontend technologies including HTML, CSS, and React.js 
                to become a well-rounded full-stack developer.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Technical Skills</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md text-gray-700 dark:text-gray-300 font-medium border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Current Focus</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Mastering React.js and modern frontend development practices to complement my backend expertise 
              and deliver complete, end-to-end solutions.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
