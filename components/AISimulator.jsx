'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import axios from 'axios';

export default function AISimulator() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const chatEndRef = useRef(null);

  // Função para rolar para o fim da conversa quando nova mensagem for adicionada
  useEffect(() => {
    if (chatEndRef.current) {
      // Em vez de scrollIntoView, controlamos o scroll do contêiner diretamente
      const chatContainer = chatEndRef.current.parentElement;
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  }, [conversation, isTyping]);

  // Função para simular o envio e a recepção da mensagem
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Adiciona a mensagem do usuário na conversa
    setConversation((prev) => [...prev, { type: 'user', content: input }]);

    const userMessage = input; // Salva a mensagem digitada
    setInput(''); // Limpa o campo de input
    setIsTyping(true); // Ativa indicador de digitação

    try {
      // Faz a requisição para a API enviando a mensagem
      const response = await axios.post('http://10.20.30.208:8000/', {
        message: userMessage,
        session_id: 0, // Envia o conteúdo digitado no input
      });

      // Recupera a resposta da API
      const { answer, think } = response.data; // Desestrutura a resposta

      // Adiciona a resposta do bot à conversa
      setConversation((prev) => [
        ...prev,
        {
          type: 'bot',
          content: (
            <>
              <p className="text-[12px]">
                <strong>AgroMind Assistant</strong>
              </p>
              <p className="mt-2">{answer}</p>
            </>
          ),
        },
      ]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setConversation((prev) => [
        ...prev,
        { type: 'bot', content: 'Erro ao obter resposta da IA.' },
      ]);
    }

    setIsTyping(false);
  };

  return (
    <div
      className="relative flex flex-col h-[600px] bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100"
      style={{ contain: 'strict' }}
    >
      {/* Header fixo */}
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
          onClick={() => setConversation([])} // Reinicia a conversa
          className="text-xs py-1 px-3 rounded-full bg-white/20 hover:bg-white/30 text-white"
        >
          Reiniciar
        </button>
      </div>

      {/* Área de conversa rolável */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {conversation.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-sm rounded-2xl p-3 ${message.type === 'user' ? 'bg-green-600 text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-700 rounded-tl-none'}`}
            >
              {typeof message.content === 'string' ? (
                <p className="text-sm">{message.content}</p>
              ) : (
                message.content
              )}
            </div>
          </div>
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
              <div className="bg-white border border-gray-200 rounded-2xl p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Referência para rolar automaticamente */}
        <div ref={chatEndRef} />
      </div>

      {/* Input fixo */}
      <div className="p-3 border-t border-gray-200 bg-white">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua pergunta..."
            className="flex-grow py-2 px-4 rounded-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="ml-2 w-10 h-10 rounded-full flex items-center justify-center bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
