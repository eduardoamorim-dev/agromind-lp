// components/Navbar.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    {
      name: 'Soluções',
      href: '#solucoes',
      dropdown: [
        { name: 'Identificação de Pragas', href: '#identificacao' },
        { name: 'Monitoramento de Lavouras', href: '#monitoramento' },
        { name: 'Recomendações Personalizadas', href: '#recomendacoes' },
      ],
    },
    { name: 'Tecnologia', href: '#tecnologia' },
    {
      name: 'Recursos',
      href: '#recursos',
      dropdown: [
        { name: 'Biblioteca de Pragas', href: '#biblioteca' },
        { name: 'Base de Conhecimento', href: '#base-conhecimento' },
        { name: 'Estudos de Caso', href: '#casos' },
      ],
    },
    { name: 'Preços', href: '#precos' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-10">
              <Image
                src="/images/logo.svg"
                alt="Agro Mind Logo"
                fill
                className="object-contain"
              />
            </div>
            <motion.span
              className={`ml-2 text-xl font-bold ${scrolled ? 'text-green-700' : 'text-white'}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Agro<span className="text-green-500">IA</span>
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${
                    scrolled
                      ? 'text-gray-700 hover:text-green-600 hover:bg-gray-100'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                </Link>

                {link.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === index && (
                      <motion.div
                        className="absolute left-0 mt-1 w-56 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="py-2 px-2">
                          {link.dropdown.map((item, idx) => (
                            <Link
                              key={idx}
                              href={item.href}
                              className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}

            <div className="ml-6 flex items-center space-x-3">
              <Link
                href="/login"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  scrolled
                    ? 'text-gray-700 hover:text-green-600 hover:bg-gray-100'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                Login
              </Link>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/signup"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-md transition-all duration-200 flex items-center"
                >
                  Teste Grátis
                  <ChevronDown className="ml-1 h-4 w-4 rotate-90" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden z-50 p-2 rounded-full ${
              isOpen
                ? 'bg-white text-gray-800'
                : scrolled
                  ? 'text-gray-800 hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 top-0 z-40 bg-green-600 bg-gradient-to-br from-green-600 to-green-800"
            >
              <div className="flex flex-col items-center justify-center h-full overflow-y-auto">
                <div className="flex flex-col space-y-6 w-full max-w-sm px-6">
                  {navLinks.map((link, index) => (
                    <div key={index} className="w-full">
                      <button
                        onClick={() => {
                          if (link.dropdown) {
                            setActiveDropdown(
                              activeDropdown === index ? null : index
                            );
                          } else {
                            setIsOpen(false);
                          }
                        }}
                        className="w-full text-left py-2 text-xl font-medium text-white flex items-center justify-between"
                      >
                        {link.name}
                        {link.dropdown && (
                          <ChevronDown
                            className={`h-5 w-5 transition-transform duration-200 ${
                              activeDropdown === index ? 'rotate-180' : ''
                            }`}
                          />
                        )}
                      </button>

                      {link.dropdown && activeDropdown === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="ml-4 mt-2 space-y-2"
                        >
                          {link.dropdown.map((item, idx) => (
                            <Link
                              key={idx}
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="block py-2 text-white/80 hover:text-white transition-colors"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}

                  <div className="pt-6 flex flex-col space-y-4 w-full border-t border-white/20">
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="py-3 px-6 text-center text-white font-medium rounded-full border border-white/30 hover:bg-white/10 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsOpen(false)}
                      className="py-3 px-6 text-center text-green-700 font-medium bg-white rounded-full hover:bg-gray-100 transition-colors"
                    >
                      Teste Grátis
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
