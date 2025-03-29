'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Por favor, insira um e-mail válido.');
      return;
    }

    setStatus('loading');

    // Simular envio para uma API
    setTimeout(() => {
      setStatus('success');
      setMessage('Obrigado! Você receberá nossas atualizações em breve.');
      setEmail('');

      // Reset após alguns segundos
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }, 1500);
  };

  return (
    <div className="bg-green-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Receba Atualizações e Dicas sobre Controle de Pragas
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Assine nossa newsletter e receba dicas exclusivas para manter sua
            plantação protegida.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-grow">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail"
                  className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                    status === 'error'
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-green-500'
                  }`}
                  disabled={status === 'loading' || status === 'success'}
                />
              </div>
              <motion.button
                type="submit"
                className={`px-6 py-3 rounded-lg font-medium ${
                  status === 'success'
                    ? 'bg-green-600 text-white'
                    : status === 'loading'
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
                whileHover={
                  status !== 'loading' && status !== 'success'
                    ? { scale: 1.03 }
                    : {}
                }
                whileTap={
                  status !== 'loading' && status !== 'success'
                    ? { scale: 0.97 }
                    : {}
                }
                disabled={status === 'loading' || status === 'success'}
              >
                {status === 'loading' ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>Enviando...</span>
                  </div>
                ) : status === 'success' ? (
                  <div className="flex items-center">
                    <Check className="w-5 h-5 mr-2" />
                    <span>Inscrito!</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Send className="w-5 h-5 mr-2" />
                    <span>Inscrever-se</span>
                  </div>
                )}
              </motion.button>
            </div>

            {message && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className={`mt-2 text-sm ${
                  status === 'error' ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {message}
              </motion.p>
            )}
          </form>

          <p className="text-xs text-gray-500 mt-4">
            Ao se inscrever, você concorda com nossa Política de Privacidade.
            Prometemos não enviar spam!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
