'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Globe,
  Check,
  ArrowUp,
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');

      // Reset após 5 segundos
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const footerLinks = [
    {
      title: 'Produto',
      links: [
        { name: 'Funcionalidades', href: '#funcionalidades' },
        { name: 'Preços', href: '#precos' },
        { name: 'Teste grátis', href: '#teste' },
        { name: 'Sucesso de clientes', href: '#casos' },
        { name: 'Atualizações', href: '#atualizacoes' },
      ],
    },
    {
      title: 'Recursos',
      links: [
        { name: 'Base de conhecimento', href: '#base' },
        { name: 'Biblioteca de pragas', href: '#biblioteca' },
        { name: 'Blog', href: '/blog' },
        { name: 'Webinars', href: '/webinars' },
        { name: 'Guias e eBooks', href: '/recursos' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { name: 'Sobre nós', href: '/sobre' },
        { name: 'Parceiros', href: '/parceiros' },
        { name: 'Carreiras', href: '/carreiras' },
        { name: 'Imprensa', href: '/imprensa' },
        { name: 'Contato', href: '/contato' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Termos de uso', href: '/termos' },
        { name: 'Política de privacidade', href: '/privacidade' },
        { name: 'Política de cookies', href: '/cookies' },
        { name: 'Segurança', href: '/seguranca' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Company Info Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-5">
              <Image
                src="/images/logo.png"
                alt="AgroMind Logo"
                width={40}
                height={40}
              />
              <span className="ml-2 text-xl font-bold">
                Agro<span className="text-green-400">Mind</span>
              </span>
            </Link>

            <p className="text-gray-400 mb-6">
              Utilizamos inteligência artificial para revolucionar o controle de
              pragas no campo, combinando a tecnologia mais avançada com o
              conhecimento científico da Embrapa.
            </p>

            <div className="space-y-3 text-gray-400">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-green-400 shrink-0 mt-0.5" />
                <span>
                  Av. Tecnologia Verde, 1500
                  <br />
                  Agropólis, São Paulo - SP
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-green-400 shrink-0" />
                <span>(11) 3456-7890</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-green-400 shrink-0" />
                <span>contato@AgroMind.com.br</span>
              </div>
            </div>

            <div className="flex space-x-3 mt-8">
              {[
                {
                  icon: <Twitter className="w-4 h-4" />,
                  href: 'https://twitter.com',
                },
                {
                  icon: <Facebook className="w-4 h-4" />,
                  href: 'https://facebook.com',
                },
                {
                  icon: <Instagram className="w-4 h-4" />,
                  href: 'https://instagram.com',
                },
                {
                  icon: <Linkedin className="w-4 h-4" />,
                  href: 'https://linkedin.com',
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-green-600 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column, index) => (
            <div key={index} className="lg:col-span-1">
              <h3 className="text-lg font-bold mb-5">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
                    >
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-10 border-t border-gray-800">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">
                Assine nossa newsletter
              </h3>
              <p className="text-gray-400">
                Receba as novidades sobre controle de pragas e atualizações da
                plataforma
              </p>
            </div>

            <div>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-2"
              >
                <div className="relative flex-grow">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu melhor e-mail"
                    className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled={subscribed}
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`shrink-0 px-6 py-3 rounded-lg font-medium flex items-center justify-center ${
                    subscribed
                      ? 'bg-green-600 text-white cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                  disabled={subscribed}
                >
                  {subscribed ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Inscrito!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Inscrever
                    </>
                  )}
                </motion.button>
              </form>
              <p className="mt-2 text-xs text-gray-500">
                Enviamos apenas conteúdo relevante. Você pode cancelar a
                inscrição a qualquer momento.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright & Language */}
        <div className="mt-16 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} AgroMind. Todos os direitos
            reservados.
          </p>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Globe className="w-4 h-4 text-gray-500 mr-2" />
              <select className="bg-transparent text-gray-400 text-sm border-none focus:outline-none">
                <option value="pt-br">Português (Brasil)</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>

            <button
              onClick={scrollToTop}
              className="bg-gray-800 hover:bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
