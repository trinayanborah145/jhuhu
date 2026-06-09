import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2, User, Bot } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { KNOWLEDGE_BASE } from '@/lib/knowledge-base';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface LeadData {
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [leadData, setLeadData] = useState<LeadData>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [conversationHistory, setConversationHistory] = useState<{role: string, parts: string}[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Gemini AI
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const questions = [
    { key: 'name', text: "Hi! I'm Rahul, your Sukrit Infrastructure AI assistant. How may I help you today?" },
    { key: 'phone', text: "Could you please share your phone number so we can follow up?" },
    { key: 'city', text: "Which city are you located in?" },
    { key: 'projectType', text: "What type of project are you looking for? (Residential, Commercial, Renovation, etc.)" },
    { key: 'budget', text: "What's your approximate budget range?" },
    { key: 'timeline', text: "When are you planning to start the project?" },
  ];

  useEffect(() => {
    // Load conversation from localStorage
    const savedMessages = localStorage.getItem('chatbotMessages');
    const savedLeadData = localStorage.getItem('chatbotLeadData');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    if (savedLeadData) {
      setLeadData(JSON.parse(savedLeadData));
    }
  }, []);

  useEffect(() => {
    // Save conversation to localStorage
    localStorage.setItem('chatbotMessages', JSON.stringify(messages));
    localStorage.setItem('chatbotLeadData', JSON.stringify(leadData));
  }, [messages, leadData]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await generateResponse(userMessage.text);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble connecting right now. Please try again or contact our team directly.",
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const generateResponse = async (userText: string): Promise<string> => {
    // Lead capture flow
    if (currentQuestion === 0) {
      setCurrentQuestion(1);
      setLeadData((prev) => ({ ...prev, name: userText }));
      return "Thanks for sharing that! Could you please share your phone number so we can follow up?";
    }
    
    if (currentQuestion === 1) {
      setCurrentQuestion(2);
      setLeadData((prev) => ({ ...prev, phone: userText }));
      return "Which city are you located in?";
    }
    
    if (currentQuestion === 2) {
      setCurrentQuestion(3);
      setLeadData((prev) => ({ ...prev, city: userText }));
      return "What type of project are you looking for? (Residential, Commercial, Renovation, etc.)";
    }
    
    if (currentQuestion === 3) {
      setCurrentQuestion(4);
      setLeadData((prev) => ({ ...prev, projectType: userText }));
      return "What's your approximate budget range?";
    }
    
    if (currentQuestion === 4) {
      setCurrentQuestion(5);
      setLeadData((prev) => ({ ...prev, budget: userText }));
      return "When are you planning to start the project?";
    }
    
    if (currentQuestion === 5) {
      setCurrentQuestion(6);
      setLeadData((prev) => ({ ...prev, timeline: userText }));
      return "Thank you for providing all the details! Our team will review your requirements and get back to you shortly. Is there anything else I can help you with?";
    }

    // Use Gemini AI for general queries
    try {
      const prompt = `
You are Rahul, a friendly and professional customer assistant for Sukrit Infrastructure Pvt Ltd.

COMPANY CONTEXT:
${KNOWLEDGE_BASE}

RESPONSE GUIDELINES:
- Be friendly, professional, helpful, short, and natural
- Never sound robotic
- Use phrases like: "Certainly", "I'd be happy to help", "Thanks for sharing that", "Great choice", "Let me help you with that"
- If uncertain about specific details: "Our team will confirm the exact details after reviewing your requirements"
- Never generate fake pricing or guarantees
- Keep responses concise and conversational
- Focus on quality, trust, and expertise

USER QUESTION: ${userText}

Provide a helpful, human-like response based on the company information above.
`;

      const chat = model.startChat({
        history: conversationHistory,
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7,
        },
      });

      const result = await chat.sendMessage(prompt);
      const response = result.response.text();

      // Update conversation history
      setConversationHistory(prev => [
        ...prev,
        { role: 'user', parts: userText },
        { role: 'model', parts: response }
      ]);

      return response;
    } catch (error) {
      console.error('Gemini API error:', error);
      
      // Fallback to rule-based responses if API fails
      const lowerText = userText.toLowerCase();
      
      if (lowerText.includes('residential') || lowerText.includes('home') || lowerText.includes('house')) {
        return "We specialize in premium residential construction including G+1, G+2, and G+4 buildings. Our team delivers quality homes with modern amenities across Assam.";
      }
      
      if (lowerText.includes('commercial') || lowerText.includes('office') || lowerText.includes('shop')) {
        return "Our commercial construction services include office buildings, retail spaces, and commercial complexes. We ensure functional and aesthetically pleasing designs.";
      }
      
      if (lowerText.includes('renovation') || lowerText.includes('remodel')) {
        return "We offer comprehensive renovation services to transform your existing spaces. Our team handles everything from planning to execution.";
      }
      
      if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('budget')) {
        return "Pricing varies based on project requirements, location, and specifications. Our team will provide a detailed quote after reviewing your specific needs.";
      }
      
      if (lowerText.includes('location') || lowerText.includes('area') || lowerText.includes('where')) {
        return "We primarily serve across Assam including Jorhat, Golaghat, and surrounding areas. Our team can discuss site visits based on your location.";
      }
      
      if (lowerText.includes('contact') || lowerText.includes('reach') || lowerText.includes('call')) {
        return "You can reach us through our contact form on the website, or call our office directly. We're also available on WhatsApp for quick inquiries.";
      }
      
      if (lowerText.includes('thank')) {
        return "You're welcome! I'm here to help. Feel free to ask any other questions you might have.";
      }
      
      if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
        return "Hello! I'm Rahul, your Sukrit Infrastructure AI assistant. How can I help you today?";
      }

      return "I'd be happy to help you with that. Our team will confirm the exact details after reviewing your requirements. Could you please share more specifics about what you're looking for?";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-[#B8963E] text-white p-4 rounded-full shadow-2xl hover:bg-[#9a7d2f] transition-all duration-300 hover:scale-110 group"
          style={{
            boxShadow: '0 8px 32px rgba(184, 150, 62, 0.3)',
          }}
        >
          <MessageCircle size={28} className="group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-[#1a1a1a] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-[#B8963E] rounded-full flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1a1a1a]"></span>
              </div>
              <div>
                <h3 className="font-semibold text-white">Rahul</h3>
                <p className="text-xs text-gray-400">Sukrit Infrastructure AI Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                title="Minimize"
              >
                <Minimize2 size={18} />
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setMessages([]);
                  setLeadData({});
                  setCurrentQuestion(0);
                  localStorage.removeItem('chatbotMessages');
                  localStorage.removeItem('chatbotLeadData');
                }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p className="text-sm">Start a conversation with Rahul</p>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-[#B8963E] text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md shadow-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p
                    className={`text-[10px] mt-1 ${
                      message.sender === 'user' ? 'text-white/70' : 'text-gray-400'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-white p-3 rounded-2xl rounded-bl-md shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#B8963E] transition-all"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="p-3 bg-[#B8963E] text-white rounded-full hover:bg-[#9a7d2f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 text-center">
              Powered by AI • Your conversation is private
            </p>
          </div>
        </div>
      )}

      {/* Mobile Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .chat-window {
            width: calc(100vw - 32px) !important;
            height: calc(100vh - 200px) !important;
            bottom: 16px !important;
            right: 16px !important;
          }
        }
      `}</style>
    </>
  );
}
