
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Award, Code } from 'lucide-react';

const Coding = () => {
  const profiles = [
    {
      platform: 'GitHub',
      username: 'jeeva-v',
      stats: { repos: 25, followers: 150, contributions: 500 },
      url: '#',
      icon: Github,
      color: 'from-gray-600 to-gray-800',
    },
    {
      platform: 'LeetCode',
      username: 'jeeva-v',
      stats: { solved: 180, ranking: '85k', streak: 45 },
      url: '#',
      icon: Code,
      color: 'from-orange-500 to-red-600',
    },
    {
      platform: 'HackerRank',
      username: 'jeeva-v',
      stats: { badges: 12, rank: 'Gold', points: 2500 },
      url: '#',
      icon: Award,
      color: 'from-green-500 to-emerald-600',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <motion.div
              key={profile.platform}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              <div className={`h-32 bg-gradient-to-br ${profile.color} relative flex items-center justify-center`}>
                <profile.icon size={48} className="text-white" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {profile.platform}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">@{profile.username}</p>

                <div className="space-y-3 mb-6">
                  {Object.entries(profile.stats).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400 capitalize">{key}:</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">{value}</span>
                    </div>
                  ))}
                </div>

                <motion.a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`block w-full text-center py-3 px-4 bg-gradient-to-r ${profile.color} text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300`}
                >
                  View Profile
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

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
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-gray-600 dark:text-gray-400">Problems Solved</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
              <p className="text-gray-600 dark:text-gray-400">Projects Built</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">12+</div>
              <p className="text-gray-600 dark:text-gray-400">Certifications</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Coding;
