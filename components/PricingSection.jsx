// components/PricingSection.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, HelpCircle } from 'lucide-react';

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const pricingPlans = [
    {
      id: 'basic',
      name: 'Básico',
      description:
        'Para pequenos produtores iniciando no controle digital de pragas',
      priceMonthly: 97,
      priceAnnually: 79,
      features: [
        { included: true, text: 'Identificação de pragas por foto (50/mês)' },
        { included: true, text: 'Acesso à base de conhecimento da Embrapa' },
        { included: true, text: 'Recomendações básicas de tratamento' },
        { included: true, text: 'Histórico de diagnósticos (30 dias)' },
        { included: false, text: 'Monitoramento regional de pragas' },
        { included: false, text: 'Alertas preventivos personalizados' },
        { included: false, text: 'Suporte técnico prioritário' },
        { included: false, text: 'Integração com sistemas de manejo' },
      ],
      cta: 'Começar agora',
      popular: false,
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'pro',
      name: 'Profissional',
      description:
        'Solução completa para produtores que buscam eficiência no controle de pragas',
      priceMonthly: 197,
      priceAnnually: 167,
      features: [
        {
          included: true,
          text: 'Identificação de pragas por foto (ilimitado)',
        },
        { included: true, text: 'Acesso à base de conhecimento da Embrapa' },
        { included: true, text: 'Recomendações avançadas de tratamento' },
        { included: true, text: 'Histórico de diagnósticos (12 meses)' },
        { included: true, text: 'Monitoramento regional de pragas' },
        { included: true, text: 'Alertas preventivos personalizados' },
        { included: false, text: 'Suporte técnico prioritário' },
        { included: false, text: 'Integração com sistemas de manejo' },
      ],
      cta: 'Escolher Pro',
      popular: true,
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'enterprise',
      name: 'Empresarial',
      description:
        'Para grandes produtores e cooperativas com necessidades avançadas',
      priceMonthly: 397,
      priceAnnually: 337,
      features: [
        {
          included: true,
          text: 'Identificação de pragas por foto (ilimitado)',
        },
        { included: true, text: 'Acesso à base de conhecimento da Embrapa' },
        { included: true, text: 'Recomendações avançadas de tratamento' },
        { included: true, text: 'Histórico de diagnósticos (ilimitado)' },
        { included: true, text: 'Monitoramento regional de pragas' },
        { included: true, text: 'Alertas preventivos personalizados' },
        { included: true, text: 'Suporte técnico prioritário' },
        { included: true, text: 'Integração com sistemas de manejo' },
      ],
      cta: 'Falar com consultor',
      popular: false,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <section id="precos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-1 bg-green-50 rounded-full mb-4 text-green-600 font-medium text-sm">
            <span>Planos e Preços</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Invista na proteção da sua{' '}
            <span className="text-green-600">lavoura</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Escolha o plano ideal para as necessidades da sua produção e comece
            a proteger suas culturas agora mesmo.
          </p>

          {/* Toggle Annual/Monthly */}
          <div className="flex items-center justify-center mb-8">
            <span
              className={`mr-3 ${isAnnual ? 'text-gray-400' : 'text-gray-800 font-medium'}`}
            >
              Mensal
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-12 items-center rounded-full"
              aria-pressed={isAnnual}
            >
              <span className="sr-only">Toggle annual billing</span>
              <span
                className={`inline-block h-6 w-12 rounded-full transition ${
                  isAnnual ? 'bg-green-600' : 'bg-gray-200'
                }`}
              />
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  isAnnual ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
            <span
              className={`ml-3 flex items-center ${isAnnual ? 'text-gray-800 font-medium' : 'text-gray-400'}`}
            >
              Anual
              <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                Economia de 15%
              </span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl overflow-hidden ${
                plan.popular
                  ? 'ring-2 ring-green-500 shadow-xl'
                  : 'border border-gray-200 shadow-lg'
              }`}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
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

                <div className="flex items-start">
                  <span className="text-lg mt-1">R$</span>
                  <span className="text-4xl font-bold">
                    {isAnnual ? plan.priceAnnually : plan.priceMonthly}
                  </span>
                  <span className="ml-1 text-white/80">/mês</span>
                </div>

                {isAnnual && (
                  <p className="mt-1 text-white/80 text-sm">
                    Faturado anualmente
                  </p>
                )}
              </div>

              {/* Features list */}
              <div className="p-6 bg-white">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 shrink-0 mr-3 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 shrink-0 mr-3 mt-0.5" />
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
                      : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-800'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise callout */}
        <motion.div
          className="mt-16 bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto border border-gray-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row gap-6 items-center text-center md:text-left">
            <div className="flex-shrink-0 bg-green-100 p-4 rounded-full">
              <HelpCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Precisa de um plano personalizado?
              </h3>
              <p className="text-gray-600 mb-0">
                Temos soluções específicas para cooperativas e grandes
                propriedades. Entre em contato com nossa equipe e descubra como
                podemos atender às necessidades específicas da sua operação.
              </p>
            </div>
            <div className="flex-shrink-0">
              <motion.button
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
    </section>
  );
}
