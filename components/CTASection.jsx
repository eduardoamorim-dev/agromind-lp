// components/CTASection.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Check, AlertTriangle } from 'lucide-react';

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validação simples de email
    if (!email || !email.includes('@')) {
      setError('Por favor, insira um email válido');
      return;
    }

    setIsLoading(true);

    // Simulação de envio
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      setEmail('');
      setName('');
      setPhone('');
      setFarmSize('');
    }, 1500);
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 to-green-600 opacity-90"></div>
        <Image
          loading="lazy"
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
          alt="Campo agrícola"
          fill
          className="object-cover mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] opacity-10"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12">
            {/* Left Content */}
            <div className="md:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Pronto para revolucionar sua consultoria agrícola?
                </h2>

                <p className="text-green-50 text-xl mb-8">
                  Junte-se a milhares de consultores que estão utilizando
                  inteligência artificial para oferecer recomendações mais
                  precisas e aumentar o valor de seu serviço.
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    'Acesso à tecnologia de ponta com interface amigável',
                    'Diagnósticos respaldados por pesquisas ciêntificas',
                    'Atualizações contínuas com novos recursos',
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="bg-green-400/20 rounded-full p-1 mr-3 mt-0.5">
                        <Check size={16} className="text-green-300" />
                      </div>
                      <span className="text-white">{item}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                  <div className="flex items-start">
                    <div className="bg-yellow-500/20 p-2 rounded-full mr-4">
                      <AlertTriangle className="w-6 h-6 text-yellow-300" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">
                        Eleve o nível das suas recomendações técnicas
                      </h3>
                      <p className="text-green-50 text-sm">
                        Consultores que utilizam nossa plataforma reportam
                        aumento de 45% na precisão de diagnósticos e redução
                        média de 32% nas perdas de seus clientes. Destaque-se no
                        mercado oferecendo recomendações baseadas em dados
                        científicos atualizados.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Form */}
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                {!submitted ? (
                  <>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Comece seu período de teste gratuito
                    </h3>
                    <p className="text-gray-600 mb-6">
                      3 dias grátis. Sem necessidade de cartão de crédito.
                    </p>

                    <form onSubmit={handleSubmit}>
                      <div className="space-y-4 mb-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Seu nome
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="João Silva"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-4 py-3 rounded-lg border ${
                              error
                                ? 'border-red-300 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-green-500'
                            } focus:ring-2 focus:border-transparent`}
                            placeholder="joao@exemplo.com"
                            required
                          />
                          {error && (
                            <p className="mt-1 text-sm text-red-600">{error}</p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Telefone
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="(00) 00000-0000"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="farm_size"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Tamanho da propriedade
                          </label>
                          <select
                            id="farm_size"
                            value={farmSize}
                            onChange={(e) => setFarmSize(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            defaultValue=""
                            required
                          >
                            <option value="" disabled>
                              Selecione uma opção
                            </option>
                            <option value="small">Até 50 hectares</option>
                            <option value="medium">50 a 500 hectares</option>
                            <option value="large">500 a 2000 hectares</option>
                            <option value="xlarge">
                              Mais de 2000 hectares
                            </option>
                          </select>
                        </div>
                      </div>

                      <motion.button
                        type="submit"
                        className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center ${
                          isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700'
                        } text-white shadow-lg`}
                        whileHover={!isLoading ? { scale: 1.02 } : {}}
                        whileTap={!isLoading ? { scale: 0.98 } : {}}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processando...
                          </>
                        ) : (
                          <>
                            Começar teste grátis{' '}
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </>
                        )}
                      </motion.button>
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Inscrição realizada com sucesso!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Enviamos um email com instruções para acessar sua conta de
                      teste. Verifique sua caixa de entrada.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-green-600 font-medium hover:text-green-700"
                    >
                      Voltar ao formulário
                    </button>
                  </motion.div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                  <p className="text-xs text-gray-500">
                    Ao se cadastrar, você concorda com nossos{' '}
                    <a href="#" className="text-green-600 hover:underline">
                      Termos de Serviço
                    </a>{' '}
                    e{' '}
                    <a href="#" className="text-green-600 hover:underline">
                      Política de Privacidade
                    </a>
                    .
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
