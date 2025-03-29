'use client';

import { motion } from 'framer-motion';

export default function FeatureCard({ icon, title, description, variants }) {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
      variants={variants}
    >
      <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
        <div className="text-green-600">{icon}</div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
