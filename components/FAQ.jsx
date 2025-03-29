'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'Como a Agro Mind identifica pragas com base em uma foto?',
      answer:
        'Nossa tecnologia usa visão computacional e modelos de inteligência artificial treinados com milhares de exemplos reais. Ao receber uma imagem, nossa IA compara padrões visuais com seu banco de dados de pragas e doenças, identificando a espécie e fornecendo recomendações baseadas nas pesquisas da Embrapa.',
    },
    {
      question: 'Quais culturas são suportadas pela plataforma?',
      answer:
        'Atualmente, a Agro Mind suporta as principais culturas do agronegócio brasileiro, incluindo soja, milho, café, algodão, cana-de-açúcar, feijão, trigo, frutas cítricas e hortaliças. Estamos constantemente expandindo nossa base de conhecimento para incluir mais culturas.',
    },
    {
      question: 'Preciso de internet para usar o aplicativo no campo?',
      answer:
        'Para o diagnóstico completo com fotos, sim, é necessária uma conexão com a internet. No entanto, nosso aplicativo móvel possui um modo offline que permite acessar informações previamente baixadas sobre as pragas mais comuns e suas soluções, perfeito para áreas com cobertura limitada.',
    },
    {
      question: 'Os dados da Embrapa são atualizados regularmente?',
      answer:
        'Sim, nossa base de conhecimento é atualizada constantemente com as pesquisas mais recentes da Embrapa e outras instituições de pesquisa agrícola. Isso garante que as recomendações fornecidas estejam sempre alinhadas com as melhores práticas e descobertas científicas.',
    },
    {
      question: 'Como funciona o período de teste gratuito?',
      answer:
        'O teste gratuito de 30 dias dá acesso completo a todas as funcionalidades da plataforma, incluindo diagnóstico ilimitado de pragas, recomendações personalizadas e suporte ao cliente. Não exigimos cartão de crédito para iniciar o teste, e você receberá um lembrete antes do término do período para decidir se deseja continuar com uma assinatura.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tire suas dúvidas sobre a nossa plataforma e como ela pode ajudar na
            sua produção
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-4 border-b border-gray-200 pb-4 last:border-b-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left py-3 focus:outline-none"
              >
                <h3 className="text-lg font-medium text-gray-800">
                  {faq.question}
                </h3>
                <span>
                  {activeIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-green-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </span>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="py-3 text-gray-600">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
