'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Verificar se o usuário já aceitou os cookies
    const hasConsent = localStorage.getItem('cookie-consent');
    if (!hasConsent) {
      // Mostrar banner após um pequeno delay
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex-grow mb-4 sm:mb-0 pr-4">
              <p className="text-gray-700">
                Utilizamos cookies para melhorar sua experiência em nosso site.
                Ao continuar navegando, você concorda com nossa{' '}
                <a href="#" className="text-green-600 underline">
                  Política de Privacidade
                </a>
                .
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowConsent(false)}
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
            <button
              onClick={() => setShowConsent(false)}
              className="absolute top-4 right-4 sm:hidden"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
