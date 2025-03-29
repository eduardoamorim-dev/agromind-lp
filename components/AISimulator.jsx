// components/AISimulator.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Mic,
  Send,
  X,
  Image as ImageIcon,
  UploadCloud,
  Loader2,
} from 'lucide-react';

export default function AISimulator() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null); // Referência para o container de chat

  // Demo conversation
  const demoConversation = [
    {
      type: 'user',
      content:
        'Identifiquei manchas amareladas nas folhas da minha plantação de soja. O que pode ser?',
      image: '/images/soybean-rust.jpg',
    },
    {
      type: 'bot',
      content:
        'Com base na imagem, identifiquei que se trata de Ferrugem Asiática (Phakopsora pachyrhizi), uma doença fúngica comum em plantações de soja. Os sintomas incluem pequenas lesões amareladas que evoluem para pústulas marrom-avermelhadas na parte inferior das folhas.',
    },
    {
      type: 'bot',
      content:
        'Recomendações: 1) Aplicação de fungicidas à base de triazóis e estrobilurinas; 2) Monitoramento constante da lavoura; 3) Programação de aplicações preventivas em períodos críticos.',
    },
    {
      type: 'user',
      content: 'Qual o melhor momento para aplicar o fungicida?',
    },
    {
      type: 'bot',
      content:
        'O momento ideal para aplicação é no início da infestação, antes que a doença ultrapasse 5% de severidade. Em condições favoráveis (alta umidade e temperaturas entre 15-28°C), recomenda-se aplicações preventivas a cada 14-21 dias. Para sua região, o monitoramento deve ser intensificado durante os estádios reprodutivos da cultura, período de maior susceptibilidade.',
      sources: ['Embrapa Soja (2023)', 'Circular Técnica 125'],
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
      // Usando scrollIntoView com containerId para controlar o contexto do scroll
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Adicionar mensagem do usuário
    setConversation([
      ...conversation,
      {
        type: 'user',
        content: input,
      },
    ]);

    setInput('');
    setIsTyping(true);

    // Simular resposta após delay
    setTimeout(() => {
      setIsTyping(false);
      setConversation((prev) => [
        ...prev,
        {
          type: 'bot',
          content:
            'Entendo sua preocupação. Para fornecer um diagnóstico mais preciso, recomendo anexar uma foto da plantação ou descrever mais detalhes sobre as condições ambientais recentes e o estágio de desenvolvimento da cultura.',
        },
      ]);
    }, 2000);
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
              Alimentado com dados da Embrapa
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

      {/* Área da conversa - agora com ref para controlar o scroll */}
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
                {message.image && (
                  <div className="mb-2 rounded-lg overflow-hidden">
                    <img
                      src={message.image}
                      alt="Imagem enviada pelo usuário"
                      className="w-full h-32 object-cover"
                    />
                  </div>
                )}
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

          {/* Elemento de referência para o fim da conversa */}
          <div ref={chatEndRef} />
        </motion.div>
      </div>

      {/* Input area */}
      <div className="p-3 border-t border-gray-200 bg-white">
        <form onSubmit={handleSubmit} className="flex items-center">
          <div className="flex space-x-2 mr-2">
            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
            >
              <Camera size={20} />
            </button>
            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
            >
              <ImageIcon size={20} />
            </button>
            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
            >
              <Mic size={20} />
            </button>
          </div>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua pergunta sobre pragas..."
            className="flex-grow py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />

          <button
            type="submit"
            disabled={!input.trim()}
            className={`ml-2 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              input.trim()
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
