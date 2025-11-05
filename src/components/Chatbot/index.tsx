import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  categoria?: string;
  sentimento?: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('auramed_userId') || 
                        `user_${Math.random().toString(36).substr(2, 9)}`;
    setUserId(storedUserId);
    localStorage.setItem('auramed_userId', storedUserId);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuarioId: userId,
          mensagem: inputMessage
        })
      });

      if (!response.ok) throw new Error('Erro na resposta do servidor');

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.resposta,
        isUser: false,
        timestamp: new Date(),
        categoria: data.categoria,
        sentimento: data.sentimento
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Desculpe, estou com problemas técnicos. Por favor, tente novamente em alguns instantes.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: 'Olá! Sou a Clara, assistente virtual do IMREA. Posso ajudar com agendamentos, informações sobre telemedicina, horários de funcionamento e orientações. Como posso ajudar?',
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const quickSuggestions = [
    'Como agendar consulta?',
    'Horário de funcionamento',
    'Teleconsulta',
    'Documentos necessários',
    'Contato IMREA'
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="flex items-center justify-center w-14 h-14 bg-primary-600 hover:bg-primary-700 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Abrir chat com Clara"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-2xl shadow-xl w-80 h-[500px] flex flex-col border border-gray-200 animate-fade-in">
          <div className="bg-primary-600 text-white p-3 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Clara - IMREA</h3>
                <p className="text-white/80 text-xs">Online</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Fechar chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 bg-gray-50 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 ${
                    message.isUser
                      ? 'bg-primary-600 text-white rounded-br-md'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {!message.isUser && (
                      <Bot className="w-3 h-3 mt-1 text-primary-600 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs leading-relaxed whitespace-pre-wrap break-words">
                        {message.text}
                      </p>
                      <div className="flex items-center justify-between mt-1 gap-2">
                        <span className={`text-xs ${message.isUser ? 'text-white/70' : 'text-gray-500'}`}>
                          {formatTime(message.timestamp)}
                        </span>
                        {!message.isUser && message.categoria && (
                          <span className="text-xs bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded-full capitalize flex-shrink-0">
                            {message.categoria.toLowerCase().replace(/_/g, ' ')}
                          </span>
                        )}
                      </div>
                    </div>
                    {message.isUser && (
                      <User className="w-3 h-3 mt-1 text-white/80 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md p-3 max-w-[85%] shadow-sm">
                  <div className="flex items-center gap-2">
                    <Bot className="w-3 h-3 text-primary-600" />
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 1 && (
            <div className="px-3 pt-2 border-t border-gray-200 bg-white">
              <p className="text-xs text-gray-600 mb-1 font-medium">Sugestões rápidas:</p>
              <div className="flex flex-wrap gap-1">
                {quickSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition-colors border border-gray-300 whitespace-nowrap"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  rows={1}
                  disabled={isLoading}
                  style={{ 
                    minHeight: '40px', 
                    maxHeight: '80px',
                    overflowY: 'auto'
                  }}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="flex items-center justify-center w-10 h-10 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-xl transition-colors flex-shrink-0"
                aria-label="Enviar mensagem"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}