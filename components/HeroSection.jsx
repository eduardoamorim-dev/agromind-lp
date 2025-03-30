'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Leaf, Shield } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

export default function HeroSection() {
  const [activeImage, setActiveImage] = useState(0);

  // Alternar entre as imagens
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const shimmer = {
    hidden: { opacity: 0.4, x: -100 },
    visible: {
      opacity: 0.8,
      x: 100,
      transition: {
        repeat: Infinity,
        repeatType: 'mirror',
        duration: 2,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-green-700">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <ParticleBackground />
      </div>

      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>

      {/* Content */}
      <div className="container mx-auto px-4 pt-24 pb-16 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-white"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20"
            >
              <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
              <span className="text-sm font-medium">
                Decisões mais inteligentes
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              AgroMind{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-300">
                Potencializando Consultores Agrícolas
              </span>{' '}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-white/80 mb-8 max-w-xl"
            >
              Nossa plataforma potencializa consultores independentes com IA
              avançada. Complementamos seu conhecimento técnico enquanto você
              mantém controle total sobre as recomendações finais, ganhando
              eficiência sem abrir mão da sua autoridade.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                className="bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 text-white font-medium py-3 px-8 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  const demoSection = document.getElementById('demo');
                  if (demoSection) {
                    demoSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Veja a Demo <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="mt-12 grid grid-cols-3 gap-4"
            >
              <motion.div
                variants={fadeInUp}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex flex-col items-center text-center"
              >
                <div className="bg-green-500/20 p-2 rounded-full mb-2">
                  <Leaf className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-lg font-medium">97%</h3>
                <p className="text-xs text-white/70">
                  Precisão na Identificação
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex flex-col items-center text-center"
              >
                <div className="bg-green-500/20 p-2 rounded-full mb-2">
                  <Shield className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-lg font-medium">+32%</h3>
                <p className="text-xs text-white/70">Redução de Perdas</p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex flex-col items-center text-center"
              >
                <div className="bg-green-500/20 p-2 rounded-full mb-2">
                  <Sparkles className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-lg font-medium">12K+</h3>
                <p className="text-xs text-white/70">Produtores Satisfeitos</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - App Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-md aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border-8 border-gray-800 ring-1 ring-green-500/30">
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 z-10"
                variants={shimmer}
                initial="hidden"
                animate="visible"
              />

              {/* Phone Screen Images */}
              <div className="relative w-full h-full">
                {[1, 2, 3].map((img, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                      activeImage === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Image
                      loading="lazy"
                      src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                      alt="Interface de aplicativo agrícola"
                      fill
                      className="object-cover mix-blend-overlay"
                    />
                  </div>
                ))}
              </div>

              {/* Notification */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute top-8 left-4 right-4 bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg"
              >
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">
                      Recomendação Gerada
                    </h4>
                    <p className="text-xs text-gray-600">
                      Protocolo #2158: Manejo integrado para controle de
                      Ferrugem Asiática em soja (estágio R2)
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
              className="absolute -left-16 top-1/3 w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-300 rounded-full filter blur-[60px] -z-10 opacity-50"
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.7 }}
              className="absolute -bottom-4 right-4 w-40 h-40 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full filter blur-[80px] -z-10 opacity-30"
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,224C672,235,768,245,864,240C960,235,1056,213,1152,192C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
