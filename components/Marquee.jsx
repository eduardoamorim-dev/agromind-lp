'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

export default function Marquee({ reversed = false, speed = 15 }) {
  const marqueeRef = useRef(null);
  const isInView = useInView(marqueeRef, { once: false });

  const partners = [
    { name: 'Biofy', logo: '/images/biofy.svg' },
    { name: 'NVIDIA', logo: '/images/nvidia.png' },
    { name: 'Oracle', logo: '/images/oracle.png' },
  ];

  // Duplicamos os parceiros várias vezes para garantir que preencham a tela
  const allPartners = [
    ...partners,
    ...partners,
    ...partners,
    ...partners,
    ...partners,
    ...partners,
    ...partners,
    ...partners,
    ...partners,
  ];

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-1 bg-green-50 rounded-full mb-4 text-green-600 font-medium text-sm">
            <span>Parceiros e Clientes</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Empresas que confiam na nossa tecnologia
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Nosso sistema é recomendado e utilizado por importantes empresas e
            instituições do agronegócio brasileiro.
          </p>
        </motion.div>
      </div>

      <div ref={marqueeRef} className="relative w-full py-4 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <motion.div
            className="flex items-center gap-12 ml-full"
            animate={{ x: [0, -2000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 30,
                ease: 'linear',
              },
              pause: !isInView,
            }}
          >
            {allPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 h-16 relative flex items-center justify-center group"
              >
                <div className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 w-32 h-16 relative">
                  <Image
                    loading="lazy"
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                    onError={(e) => {
                      console.error(`Error loading image: ${partner.logo}`);
                      e.target.src = '/images/placeholder-logo.png';
                    }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
