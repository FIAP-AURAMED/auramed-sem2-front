import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, User, Bot } from "lucide-react";

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
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUserId =
      localStorage.getItem("auramed_userId") ||
      `user_${Math.random().toString(36).substr(2, 9)}`;
    setUserId(storedUserId);
    localStorage.setItem("auramed_userId", storedUserId);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuarioId: userId,
          mensagem: inputMessage,
        }),
      });

      if (!response.ok) throw new Error("Erro na resposta do servidor");

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.resposta,
        isUser: false,
        timestamp: new Date(),
        categoria: data.categoria,
        sentimento: data.sentimento,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Erro:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Desculpe, estou com problemas técnicos no momento. Por favor, tente novamente em alguns instantes.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);

    if (!isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        text: "Olá! Sou o AuraMed, seu assistente médico virtual. Como posso ajudar você hoje? Pode me perguntar sobre sintomas, medicamentos, agendamentos ou qualquer dúvida relacionada à saúde.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const quickSuggestions = [
    'Quais são os sintomas da gripe?',
    'Preciso marcar uma consulta',
    'Para que serve o paracetamol?',
    'Estou com dor de cabeça'
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botão de toggle */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="flex items-center justify-center w-14 h-14 bg-primary-600 hover:bg-primary-700 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Abrir chat com AuraMed"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Janela do Chat */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-xl w-96 h-[600px] flex flex-col border border-gray-200 animate-fade-in">
          
          {/* Header */}
          <div className="bg-primary-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">AuraMed Assistant</h3>
                <p className="text-white/80 text-sm">Online • Pronto para ajudar</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Fechar chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.isUser
                      ? 'bg-primary-600 text-white rounded-br-md'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {!message.isUser && (
                      <Bot className="w-4 h-4 mt-1 text-primary-600 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.text}
                      </p>
                      <div className="flex items-center justify-between mt-2 gap-4">
                        <span className={`text-xs ${message.isUser ? 'text-white/70' : 'text-gray-500'}`}>
                          {formatTime(message.timestamp)}
                        </span>
                        {!message.isUser && message.categoria && (
                          <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full capitalize">
                            {message.categoria.toLowerCase().replace(/_/g, ' ')}
                          </span>
                        )}
                      </div>
                    </div>
                    {message.isUser && (
                      <User className="w-4 h-4 mt-1 text-white/80 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md p-4 max-w-[80%] shadow-sm">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-primary-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          {messages.length <= 1 && (
            <div className="px-4 pt-2 border-t border-gray-200 bg-white">
              <p className="text-xs text-gray-600 mb-2 font-medium">Sugestões rápidas:</p>
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(suggestion)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors border border-gray-300"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
  

