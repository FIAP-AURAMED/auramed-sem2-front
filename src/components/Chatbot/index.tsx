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
}
