// components/PricingSelectorFixed.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PricingSelector() {
  const [isAnnual, setIsAnnual] = useState(true);

  // Planos adaptados para o contexto de consultores
  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'Para consultores que desejam experimentar nossa plataforma',
      priceMonthly: 0,
      priceAnnually: 0,
      features: [
        { included: true, text: 'Acesso à base de conhecimento.' },
        { included: true, text: 'Consultas demonstrativas' },
        { included: true, text: 'Diagnósticos de pragas comuns' },
        { included: false, text: 'Recomendações tecnicas' },
        { included: false, text: 'Facil acesso a informacao' },
        { included: false, text: 'Acesso a protocolos técnicos detalhados' },
      ],
      cta: 'Começar Grátis',
      color: 'from-blue-500 to-blue-600',
      popular: false,
    },
    {
      id: 'consultor',
      name: 'Consultor',
      description: 'Ideal para consultores agrícolas independentes',
      priceMonthly: 197,
      priceAnnually: 167,
      features: [
        { included: true, text: 'Acesso à base de conhecimento.' },
        { included: true, text: 'Consultas ilimitadas' },
        { included: true, text: 'Diagnósticos de preciso de pragas' },
        { included: true, text: 'Recomendações tecnicas e medidas' },
        { included: true, text: 'Facil acesso a informacao' },
        { included: true, text: 'Acesso a protocolos técnicos detalhados' },
        { included: false, text: 'Adicionar documentos para especificaao' },
      ],
      cta: 'Selecionar Plano',
      color: 'from-green-500 to-green-600',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Para empresas de consultoria e cooperativas',
      priceMonthly: 497,
      priceAnnually: 427,
      features: [
        { included: true, text: 'Acesso à base de conhecimento.' },
        { included: true, text: 'Consultas ilimitadas em multiplos aparelhos' },
        { included: true, text: 'Diagnósticos de preciso de pragas' },
        { included: true, text: 'Recomendações tecnicas e medidas' },
        { included: true, text: 'Integracao ao WhatsApp' },
        {
          included: true,
          text: 'Acesso a protocolos técnicos detalhados e exportaveis',
        },
        {
          included: true,
          text: 'Adicionar documentos para especificaao pessoal',
        },
      ],
      cta: 'Falar com Consultor',
      color: 'from-purple-500 to-purple-600',
      popular: false,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Toggle Annual/Monthly - Corrigido para evitar sobreposição */}
      <div className="flex flex-col items-center justify-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Planos para Consultores
        </h2>

        <div className="bg-gray-100 p-1 rounded-full inline-flex items-center">
          <button
            onClick={() => setIsAnnual(false)}
            className={`py-2 px-6 rounded-full text-sm font-medium transition-all ${
              !isAnnual
                ? 'bg-white shadow-sm text-gray-800'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Mensal
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`py-2 px-6 rounded-full text-sm font-medium transition-all ${
              isAnnual
                ? 'bg-white shadow-sm text-gray-800'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Anual
            <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
              -15%
            </span>
          </button>
        </div>
      </div>

      {/* Plans Grid - Layout melhorado */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`relative rounded-2xl overflow-hidden ${
              plan.popular
                ? 'ring-2 ring-green-500 shadow-xl'
                : 'border border-gray-200 shadow-lg'
            }`}
          >
            {/* Popular badge */}
            {plan.popular && (
              <div className="absolute top-0 right-0">
                <div className="bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                  MAIS POPULAR
                </div>
              </div>
            )}

            {/* Plan header */}
            <div className={`p-6 bg-gradient-to-r ${plan.color} text-white`}>
              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <p className="text-white/80 text-sm mb-4">{plan.description}</p>

              <div className="flex items-baseline">
                {plan.id === 'free' ? (
                  <span className="text-3xl font-bold">Grátis</span>
                ) : (
                  <>
                    <span className="text-sm mt-1">R$</span>
                    <span className="text-4xl font-bold">
                      {isAnnual ? plan.priceAnnually : plan.priceMonthly}
                    </span>
                    <span className="ml-1 text-white/80">/mês</span>
                  </>
                )}
              </div>

              {isAnnual && plan.id !== 'free' && (
                <p className="mt-1 text-white/80 text-sm">
                  Faturado anualmente
                </p>
              )}
            </div>

            {/* Features list */}
            <div className="p-6 bg-white h-full flex flex-col">
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    {feature.included ? (
                      <svg
                        className="w-5 h-5 text-green-500 shrink-0 mr-3 mt-0.5"
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
                    ) : (
                      <svg
                        className="w-5 h-5 text-gray-300 shrink-0 mr-3 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    )}
                    <span
                      className={
                        feature.included ? 'text-gray-700' : 'text-gray-400'
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center ${
                  plan.popular
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : plan.id === 'free'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                {plan.cta}
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enterprise callout */}
      <motion.div
        className="mt-20 mb-12 bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto border border-gray-200"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row gap-6 items-center text-center md:text-left">
          <div className="flex-shrink-0 bg-purple-100 p-4 rounded-full">
            <svg
              className="w-8 h-8 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Precisa de um plano personalizado?
            </h3>
            <p className="text-gray-600 mb-0">
              Se você representa uma cooperativa, empresa de consultoria ou tem
              necessidades específicas, estamos prontos para criar uma solução
              sob medida para sua realidade.
            </p>
          </div>
          <div className="flex-shrink-0">
            <motion.button
              onClick={() => {
                // Scroll até a seção de contato
                const contactSection = document.getElementById('contato');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="whitespace-nowrap py-3 px-6 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium"
            >
              Fale conosco
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
