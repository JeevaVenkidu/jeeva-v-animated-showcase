
import React from 'react';
import { motion } from 'framer-motion';
import { useCodingController } from '../controllers/useCodingController';
import CodingProfileView from '../views/CodingProfileView';
import SimpleParticleBackground from '../components/effects/SimpleParticleBackground';

const Coding = () => {
  const { profiles, stats, isLoading } = useCodingController();

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-300">Loading coding profiles...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 relative overflow-hidden"
    >
      <SimpleParticleBackground />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Coding <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Profiles</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore my coding journey across different platforms and challenges
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {profiles.map((profile, index) => (
            <CodingProfileView
              key={profile.platform}
              profile={profile}
              index={index}
            />
          ))}
        </div>

        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
              Coding Journey Highlights
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stats.problemsSolved}+</div>
                <p className="text-gray-600 dark:text-gray-400">Problems Solved</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{stats.projectsBuilt}+</div>
                <p className="text-gray-600 dark:text-gray-400">Projects Built</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{stats.certifications}+</div>
                <p className="text-gray-600 dark:text-gray-400">Certifications</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/20 dark:from-gray-900/20 dark:via-transparent dark:to-gray-900/20 pointer-events-none" />
    </motion.div>
  );
};

export default Coding;
