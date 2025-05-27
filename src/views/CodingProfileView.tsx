
import React from 'react';
import { motion } from 'framer-motion';
import { CodingProfile } from '../models/codingModel';

interface CodingProfileViewProps {
  profile: CodingProfile;
  index: number;
}

const CodingProfileView: React.FC<CodingProfileViewProps> = ({ profile, index }) => {
  const IconComponent = profile.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ y: -10 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
    >
      <div className={`h-32 bg-gradient-to-br ${profile.color} relative flex items-center justify-center`}>
        <IconComponent size={48} className="text-white" />
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
  );
};

export default CodingProfileView;
