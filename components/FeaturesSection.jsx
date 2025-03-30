'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import {
  Check,
  Database,
  Zap,
  BarChart,
  Globe,
  Shield,
  SquareActivity,
} from 'lucide-react';
import ModernCard from './ModernCard';

export default function FeaturesSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: '-100px 0px',
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const features = [
    {
      icon: <SquareActivity size={24} />,
      title: 'Identificação Precisa',
      description:
        'Identifique pragas e doenças com precisão de até 97% usando apenas uma foto da planta afetada.',
    },
    {
      icon: <Database size={24} />,
      title: 'Base Científica',
      description:
        'Acesse conhecimento científico das maiores instituições de pesquisa agrícola do Brasil.',
    },
    {
      icon: <Zap size={24} />,
      title: 'Resposta Rápida',
      description:
        'Receba diagnósticos e recomendações de tratamento em segundos, não em dias.',
    },
  ];

  return (
    <section
      ref={containerRef}
      className="py-20 px-4 relative overflow-hidden bg-white"
    >
      {/* Background Design Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute right-0 top-40 w-72 h-72 rounded-full bg-green-50"
          style={{ y }}
        />
        <motion.div
          className="absolute -left-20 bottom-20 w-80 h-80 rounded-full bg-green-50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute w-full h-full bg-[url('/images/grid-pattern.png')] opacity-5" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-1 bg-green-50 rounded-full mb-4 text-green-600 font-medium text-sm">
            <span>Recursos Principais</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Tecnologia de ponta para{' '}
            <span className="text-green-600">
              potencializar suas consultorias
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nossa plataforma combina IA avançada e conhecimento agrícola com
            base científica para oferecer diagnósticos precisos e recomendações
            técnicas que elevam o valor de seus serviços.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <ModernCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              glowColor={
                index % 2 === 0
                  ? 'rgba(34, 197, 94, 0.4)'
                  : 'rgba(16, 185, 129, 0.3)'
              }
            />
          ))}
        </div>

        {/* Highlight Feature */}
        <motion.div
          className="mt-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">
                Respostas precisas para suas consultas técnicas
              </h3>
              <p className="text-green-50 mb-8">
                Nossa tecnologia RAG (Retrieval-Augmented Generation) organiza e
                sintetiza conhecimento agrícola avançado para responder
                exatamente o que você precisa saber.
              </p>

              <ul className="space-y-3">
                {[
                  'Informações contextualizadas para diferentes condições climáticas',
                  'Dados técnicos adaptados a diversos sistemas de manejo',
                  'Respostas específicas para cada estágio fenológico das culturas',
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="bg-white/20 rounded-full p-1 mr-3 mt-0.5">
                      <Check size={16} className="text-white" />
                    </div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center">
              <motion.div
                className="relative w-full max-w-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    loading="lazy"
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                    alt="Recomendações personalizadas"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Overlay information card */}
                <motion.div
                  className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 max-w-[80%]"
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <Shield size={20} className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">
                        Manejo Integrado
                      </h4>
                      <p className="text-xs text-gray-600">
                        Recomendações baseadas nos princípios do MIP (Manejo
                        Integrado de Pragas) da Embrapa
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                  <motion.div
                    className="absolute top-0 left-0 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-300 to-green-200 blur-2xl opacity-40"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 180, 270, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                  <motion.div
                    className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-teal-300 blur-2xl opacity-30"
                    animate={{
                      scale: [1.2, 1, 1.2],
                      rotate: [360, 270, 180, 90, 0],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
