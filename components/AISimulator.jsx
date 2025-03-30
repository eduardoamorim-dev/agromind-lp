// components/AISimulator.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Lock, Send } from 'lucide-react';

export default function AISimulator() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [conversation, setConversation] = useState([]);
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Demo conversation para consultoria agrícola (apenas texto)
  const demoConversation = [
    {
      type: 'user',
      content:
        'Bom dia! Sou consultor agrícola e estou acompanhando uma lavoura de soja no oeste do Paraná. Encontrei algumas plantas com manchas amareladas nas folhas, pequenas lesões que estão se espalhando rapidamente. Qual pode ser o problema?',
    },
    {
      type: 'bot',
      content:
        'Bom dia, consultor! Com base na sua descrição de manchas amareladas que se espalham rapidamente em soja no oeste do Paraná, os sintomas sugerem fortemente Ferrugem Asiática (Phakopsora pachyrhizi). Esta doença fúngica é caracterizada por lesões inicialmente amareladas que evoluem para pústulas marrom-avermelhadas na parte inferior das folhas, causando desfolha prematura e redução significativa da produtividade.',
    },
    {
      type: 'bot',
      content:
        'Para seu cliente, recomendo um plano de ação: 1) Aplicação imediata de fungicidas com diferentes modos de ação (triazóis + estrobilurinas); 2) Monitoramento semanal da lavoura, especialmente se ocorrerem chuvas; 3) Programação de aplicações preventivas considerando o estágio fenológico da cultura e condições climáticas locais.',
    },
    {
      type: 'user',
      content:
        'Obrigado pela análise. O produtor está no estágio R3 da cultura. Qual seria o intervalo ideal entre aplicações considerando o histórico de alta pressão da doença na região?',
    },
    {
      type: 'bot',
      content:
        'No estágio R3 (início da formação de vagens) com histórico de alta pressão na região oeste do Paraná, recomendo intervalos de 14 dias entre aplicações. Como estamos em período crítico de desenvolvimento da cultura, sugiro utilizar fungicidas de amplo espectro que incluam carboxamidas na formulação, pois oferecem proteção mais duradoura. Se as condições continuarem favoráveis à doença (alta umidade relativa >80% e temperaturas entre 15-28°C), pode ser necessário reduzir o intervalo para 10-12 dias. Importante monitorar previsões climáticas para otimizar o momento das aplicações.',
    },
    {
      type: 'user',
      content:
        'Excelente! E quanto à dose, devo recomendar a dose máxima registrada?',
    },
    {
      type: 'bot',
      content:
        'Considerando o estágio R3, o histórico de alta pressão da doença na região e que a ferrugem já está presente na lavoura, sim, recomendo utilizar a dose máxima registrada do produto. Isto garantirá maior período de proteção e eficácia no controle. Lembre ao produtor a importância da tecnologia de aplicação: volume de calda adequado (mínimo de 150 L/ha), uso de adjuvantes recomendados pelo fabricante e aplicação em condições meteorológicas favoráveis para maximizar a cobertura e penetração do fungicida no dossel da cultura.',
    },
  ];

  useEffect(() => {
    // Iniciar a animação após montagem do componente
    startAnimation();
  }, []);

  // Função para iniciar a animação da conversa
  const startAnimation = () => {
    setIsAnimating(true);
    setConversation([]);
    setCurrentStep(0);

    // Timer para adicionar cada mensagem com delay
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        const nextStep = prev + 1;

        if (nextStep <= demoConversation.length) {
          setConversation(demoConversation.slice(0, nextStep));

          // Simular digitação para respostas do bot
          if (
            nextStep < demoConversation.length &&
            demoConversation[nextStep].type === 'bot'
          ) {
            setIsTyping(true);
          } else {
            setIsTyping(false);
          }

          return nextStep;
        } else {
          clearInterval(timer);
          setIsAnimating(false);
          setIsTyping(false);
          return prev;
        }
      });
    }, 2500);

    return () => clearInterval(timer);
  };

  // Função para rolar para o final da conversa apenas dentro do container
  const scrollToBottom = () => {
    if (chatEndRef.current && chatContainerRef.current) {
      const container = chatContainerRef.current;
      const element = chatEndRef.current;

      // Rolando o container em vez da página
      container.scrollTop = element.offsetTop;
    }
  };

  // Rolar para o final da conversa quando novas mensagens são adicionadas
  useEffect(() => {
    scrollToBottom();
  }, [conversation, isTyping]);

  // Função para rolar até a seção de contato
  const scrollToContact = () => {
    const contactSection = document.getElementById('contato');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Variantes para animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="relative bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
      {/* Header da conversa */}
      <div className="bg-green-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
            <span className="text-sm font-medium">AI</span>
          </div>
          <div>
            <h3 className="font-medium">AgroMind Assistant</h3>
            <p className="text-xs text-green-100">
              Alimentado com dados ciêntificos
            </p>
          </div>
        </div>

        <button
          onClick={startAnimation}
          disabled={isAnimating}
          className={`text-xs py-1 px-3 rounded-full ${
            isAnimating
              ? 'bg-green-700 text-green-200 cursor-not-allowed'
              : 'bg-white/20 hover:bg-white/30 text-white'
          }`}
        >
          {isAnimating ? 'Demonstrando...' : 'Reiniciar Demo'}
        </button>
      </div>

      {/* Área da conversa */}
      <div
        ref={chatContainerRef}
        className="h-96 overflow-y-auto p-4 bg-gray-50 scroll-smooth"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {conversation.map((message, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-sm rounded-2xl p-3 ${
                  message.type === 'user'
                    ? 'bg-green-600 text-white rounded-tr-none'
                    : 'bg-white border border-gray-200 shadow-sm text-gray-700 rounded-tl-none'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                {message.sources && (
                  <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-500">
                    <p className="font-medium">Fontes:</p>
                    <ul className="list-disc list-inside">
                      {message.sources.map((source, idx) => (
                        <li key={idx}>{source}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Indicador de digitação */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex justify-start mb-4"
              >
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-3 shadow-sm">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={chatEndRef} />
        </motion.div>
      </div>

      {/* Input area - com efeito de bloqueio */}
      <div className="p-3 border-t border-gray-200 bg-white relative">
        <div
          className="flex items-center"
          onMouseEnter={() => setIsTooltipVisible(true)}
          onMouseLeave={() => setIsTooltipVisible(false)}
        >
          <div className="relative flex-grow">
            <div className="flex items-center w-full py-2 px-4 rounded-full border border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed">
              <Lock className="w-4 h-4 text-gray-500 mr-2" />
              <span>Digite sua consulta agrícola...</span>
            </div>

            {/* Tooltip */}
            <AnimatePresence>
              {isTooltipVisible && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 bottom-full mb-2 bg-gray-800 text-white text-sm rounded-lg py-2 px-3 shadow-lg z-10"
                >
                  <div className="flex flex-col items-start">
                    <p className="mb-1">
                      Entre em contato para testar gratuitamente
                    </p>
                    <button
                      onClick={scrollToContact}
                      className="text-green-400 flex items-center hover:text-green-300 transition-colors"
                    >
                      Fale conosco <ArrowDown className="ml-1 w-3 h-3" />
                    </button>
                  </div>
                  <div className="absolute top-full left-4 h-0 w-0 border-x-8 border-x-transparent border-t-8 border-t-gray-800"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={scrollToContact}
            className="ml-2 w-10 h-10 rounded-full flex items-center justify-center bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
