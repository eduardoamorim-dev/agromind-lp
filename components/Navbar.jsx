'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  {name: 'Inicio', href: '#inicio'},
  { name: 'Tecnologia', href: '#tecnologia' },
  { name: 'Demo', href: '#demo' },
  { name: 'Depoimentos', href: '#depoimentos' },
  { name: 'Parceiros', href: '#parceiros' },
  { name: 'Contato', href: '#contato' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detecta scroll para mudar a aparência da navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Função para scroll suave ao clicar em links
  const handleScrollToSection = (e, href) => {
    e.preventDefault();

    // Se for um link interno com hashtag
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);

      if (element) {
        // Scroll suave para o elemento
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        // Fecha o menu mobile após clicar
        setIsOpen(false);
      }
    } else {
      // Para links externos ou outras páginas
      window.location.href = href;
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-10 mr-2">
              <Image
                src="/images/logo.png"
                alt="AgroMind Logo"
                fill
                className="object-contain"
              />
            </div>
            <span
              className={`font-bold text-xl ${scrolled ? 'text-green-600' : 'text-white'}`}
            >
              AgroMind
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollToSection(e, link.href)}
                className={`transition-colors ${
                  scrolled
                    ? 'text-gray-700 hover:text-green-600'
                    : 'text-white hover:text-green-300'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contato"
              onClick={(e) => handleScrollToSection(e, '#contato')}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition-colors"
            >
              Fale Conosco
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-md p-2 inline-flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
          >
            <svg
              className={`h-6 w-6 ${scrolled ? 'text-gray-700' : 'text-white'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`${isOpen ? 'block' : 'hidden'} md:hidden mt-4`}
          animate={
            isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }
          }
          initial={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col space-y-3 pb-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollToSection(e, link.href)}
                className={`px-3 py-2 rounded-md ${
                  scrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white hover:bg-green-600/20'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contato"
              onClick={(e) => handleScrollToSection(e, '#contato')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-center"
            >
              Fale Conosco
            </a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
