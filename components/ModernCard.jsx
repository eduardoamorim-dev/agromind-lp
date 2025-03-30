// components/ModernCard.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export default function ModernCard({
  icon,
  title,
  description,
  image,
  link = '#',
  glowColor = 'rgba(34, 197, 94, 0.4)',
  hoverAnimation = true,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-md transition-all duration-300"
      whileHover={hoverAnimation ? { y: -8, scale: 1.02 } : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), ${glowColor}, transparent 40%)`,
          zIndex: 0,
        }}
        animate={{
          '--mouse-x': isHovered ? '50%' : '0%',
          '--mouse-y': isHovered ? '50%' : '0%',
        }}
      />

      <div className="p-6 sm:p-8 relative z-10">
        {/* Icon */}
        {icon && (
          <div className="inline-flex items-center justify-center w-12 h-12 mb-5 rounded-xl bg-gradient-to-br from-green-100 to-emerald-50 text-green-600">
            {icon}
          </div>
        )}

        {/* Content */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 mb-5">{description}</p>
        </div>
      </div>

      {/* Image */}
      {image && (
        <div className="absolute -right-10 -bottom-10 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity">
          <Image
            loading="lazy"
            src={image}
            alt={title}
            fill
            className="object-contain"
          />
        </div>
      )}
    </motion.div>
  );
}
