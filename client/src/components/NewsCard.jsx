// src/components/NewsCard.js
import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper } from 'lucide-react';

const NewsCard = ({ title, date, description, isDark }) => (
  <motion.div
    className={`${
      isDark ? 'bg-gray-800' : 'bg-white'
    } p-6 rounded-lg shadow-lg`}
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-center mb-4">
      <Newspaper
        size={24}
        className={isDark ? 'text-blue-400' : 'text-green-500'}
      />
      <h3
        className={`text-xl font-semibold ml-2 ${
          isDark ? 'text-blue-300' : 'text-green-700'
        }`}
      >
        {title}
      </h3>
    </div>
    <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
      {date}
    </p>
    <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
      {description}
    </p>
  </motion.div>
);

export default NewsCard;
