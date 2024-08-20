import React from 'react';
import { motion } from 'framer-motion';
import { TrashIcon } from 'lucide-react';

const GalleryCard = ({ title, imageSrc, isDark, onDelete, isLoggedIn }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className={`relative ${isDark ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-lg overflow-hidden`}
  >
    {isLoggedIn && (
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
      >
        <TrashIcon className="h-6 w-6" />
      </button>
    )}
    <img src={imageSrc} alt={title} className="w-full h-48 object-cover rounded-md" />
    <p className={`mt-2 text-center ${isDark ? 'text-blue-300' : 'text-green-700'} font-medium`}>
      {title}
    </p>
  </motion.div>
);

export default GalleryCard;
