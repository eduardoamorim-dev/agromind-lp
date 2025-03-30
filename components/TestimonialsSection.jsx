'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [direction, setDirection] = useState(null);

  const testimonials = [
    {
      id: 1,
      name: 'João Silva',
      role: 'Produtor de Soja - MT',
      image:
        'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80',
      content:
        'A AgroMind transformou nosso manejo de pragas. Em uma safra onde a ferrugem asiática estava atacando toda a região, conseguimos identificar o problema no início e tomar medidas preventivas que pouparam mais de 30% da nossa produção.',
      rating: 5,
      tagline: 'Aumentou minha produtividade em 30%',
      farm: 'Fazenda Santa Maria',
    },
    {
      id: 2,
      name: 'Maria Oliveira',
      role: 'Produtora de Café - MG',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80',
      content:
        'Sou da terceira geração de cafeicultores e nunca tivemos acesso a tecnologia tão avançada para o pequeno produtor. A plataforma é intuitiva e as recomendações são precisas. Consegui controlar uma infestação de broca do café que teria comprometido toda minha safra.',
      rating: 5,
      tagline: 'Salvou minha produção de café',
      farm: 'Sítio Boa Vista',
    },
    {
      id: 3,
      name: 'Carlos Mendes',
      role: 'Engenheiro Agrônomo - PR',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80',
      content:
        'Como consultor agrícola, recomendo a AgroMind para todos os meus clientes. A ferramenta potencializa meu trabalho, oferecendo diagnósticos rápidos e fundamentados cientificamente. Os produtores que adotaram a plataforma reduziram significativamente o uso de defensivos.',
      rating: 5,
      tagline: 'Ferramenta essencial para consultoria técnica',
      farm: 'Consultoria Agro Futuro',
    },
  ];

  // Autoplay
  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setDirection('right');
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  // Pause autoplay quando hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  // Navegar entre depoimentos
  const goToPrev = () => {
    setDirection('left');
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setAutoplay(false);
  };

  const goToNext = () => {
    setDirection('right');
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setAutoplay(false);
  };

  const goToIndex = (index) => {
    setDirection(index > activeIndex ? 'right' : 'left');
    setActiveIndex(index);
    setAutoplay(false);
  };

  // Animations
  const slideVariants = {
    enter: (direction) => ({
      x: direction === 'right' ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (direction) => ({
      x: direction === 'right' ? '-100%' : '100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    }),
  };

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-1 bg-green-50 rounded-full mb-4 text-green-600 font-medium text-sm">
            <span>Depoimentos de Clientes</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            O que os <span className="text-green-600">produtores</span> estão
            dizendo
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mais de 12.000 produtores rurais já transformaram o manejo de pragas
            em suas lavouras com nossa plataforma.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Carousel */}
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-green-500 rounded-full"></div>
              <div className="absolute -left-10 -top-10 w-40 h-40 bg-yellow-500 rounded-full"></div>
            </div>

            {/* Content */}
            <div className="grid md:grid-cols-2 min-h-[450px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                {/* Image Section */}
                <motion.div
                  key={`image-${testimonials[activeIndex].id}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative w-full h-full"
                >
                  <div className="relative h-full overflow-hidden">
                    <Image
                      loading="lazy"
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                    {/* Farm name overlay */}
                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-full py-2 px-4 text-sm font-medium text-gray-800">
                      {testimonials[activeIndex].farm}
                    </div>
                  </div>
                </motion.div>

                {/* Content Section */}
                <motion.div
                  key={`content-${testimonials[activeIndex].id}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative p-10 flex flex-col justify-center"
                >
                  <div className="text-green-500 mb-6">
                    <Quote size={40} />
                  </div>

                  <h3 className="text-xl font-bold text-green-600 mb-2">
                    {testimonials[activeIndex].tagline}
                  </h3>

                  <p className="text-gray-700 mb-8 italic">
                    {testimonials[activeIndex].content}
                  </p>

                  <div className="flex items-center">
                    <div className="flex items-center space-x-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          fill={
                            i < testimonials[activeIndex].rating
                              ? '#FBBF24'
                              : 'none'
                          }
                          color={
                            i < testimonials[activeIndex].rating
                              ? '#FBBF24'
                              : '#D1D5DB'
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="mr-4 w-12 h-12 relative rounded-full overflow-hidden">
                      <Image
                        loading="lazy"
                        src={testimonials[activeIndex].image}
                        alt={testimonials[activeIndex].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">
                        {testimonials[activeIndex].name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {testimonials[activeIndex].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between mt-8">
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? 'bg-green-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={goToPrev}
                className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goToNext}
                className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
