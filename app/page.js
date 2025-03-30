'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import AISimulator from '@/components/AISimulator';
import Marquee from '@/components/Marquee';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [cookieConsent, setCookieConsent] = useState(false);

  useEffect(() => {
    // Check if user already accepted cookies
    const hasConsent = localStorage.getItem('cookie-consent');
    if (hasConsent) {
      setCookieConsent(true);
    }

    // Simulate page loading
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setCookieConsent(true);
  };

  return (
    <main className="relative" id="inicio">
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-green-900/95 backdrop-blur-sm"
          >
            <div className="text-center relative">
              {/* Logo principal */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-24 h-24 mx-auto"
              >
                <Image
                  loading="lazy"
                  src="/images/logo.png"
                  alt="AgroMind Logo"
                  fill
                  className="object-contain"
                />
              </motion.div>

              {/* Nome da empresa com aparecimento gradual das letras */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <motion.h1 className="text-white text-2xl font-bold tracking-wide">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    A
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    g
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                  >
                    r
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                  >
                    o
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.3 }}
                    className="text-green-300 font-extrabold"
                  >
                    M
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.3 }}
                    className="text-green-300 font-extrabold"
                  >
                    i
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.3 }}
                    className="text-green-300 font-extrabold"
                  >
                    n
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.3 }}
                    className="text-green-300 font-extrabold"
                  >
                    d
                  </motion.span>
                </motion.h1>
              </motion.div>

              {/* Linha de progresso na parte inferior */}
              <div className="mt-6 w-48 h-1 mx-auto bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-green-400"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            <HeroSection />

            {/* Features Section com ID para navegação */}
            <section id="tecnologia">
              <FeaturesSection />
            </section>

            {/* AI Demo Section com ID para navegação */}
            <section id="demo" className="py-20 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="inline-flex items-center px-4 py-1 bg-green-50 rounded-full mb-4 text-green-600 font-medium text-sm">
                      <span>Tecnologia em Ação</span>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">
                      Veja como a nossa IA{' '}
                      <span className="text-green-600">
                        funciona na prática
                      </span>
                    </h2>
                    <p className="text-xl text-gray-600 mb-6">
                      Experimente interagir com nossa inteligência artificial
                      treinada com dados da Embrapa. Faça perguntas sobre pragas
                      comuns e receba diagnósticos precisos e recomendações
                      práticas.
                    </p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <div className="bg-green-100 rounded-full p-1 mt-1 mr-3">
                          <svg
                            className="w-4 h-4 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </div>
                        <span className="text-gray-700">
                          Upload de fotos para identificação visual
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-green-100 rounded-full p-1 mt-1 mr-3">
                          <svg
                            className="w-4 h-4 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </div>
                        <span className="text-gray-700">
                          Identificação de pragas por descrição de sintomas
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-green-100 rounded-full p-1 mt-1 mr-3">
                          <svg
                            className="w-4 h-4 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </div>
                        <span className="text-gray-700">
                          Recomendações científicas baseadas na Embrapa
                        </span>
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <AISimulator />
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Testimonials Section com ID para navegação */}
            <section id="depoimentos">
              <TestimonialsSection />
            </section>

            {/* Partners Marquee com ID para navegação */}
            <section id="parceiros">
              <Marquee />
            </section>

            {/* CTA Section com ID para navegação */}
            <section id="contato">
              <CTASection />
            </section>

            <Footer />

            {/* WhatsApp Float Button */}
            <motion.a
              href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20AgroMind."
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-3 rounded-full shadow-xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              <Phone className="w-6 h-6" />
            </motion.a>

            {/* Cookie Consent Banner */}
            <AnimatePresence>
              {!cookieConsent && (
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-40 border-t border-gray-200"
                >
                  <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
                    <div className="mb-4 sm:mb-0">
                      <p className="text-gray-700">
                        Este site utiliza cookies para melhorar sua experiência.
                        Ao continuar navegando, você concorda com nossa{' '}
                        <a
                          href="/privacidade"
                          className="text-green-600 underline"
                        >
                          Política de Privacidade
                        </a>
                        .
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setCookieConsent(true)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        Recusar
                      </button>
                      <button
                        onClick={acceptCookies}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Aceitar
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
