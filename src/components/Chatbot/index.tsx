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