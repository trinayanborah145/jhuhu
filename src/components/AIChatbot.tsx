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
  const [conversationHistory, setConversationHistory] = useState<{role: string, parts: {text: string}[]}[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Gemini AI with better model for conversations
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  console.log('API Key loaded:', apiKey ? 'Yes' : 'No');
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

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
    // Build conversation context from message history
    const recentConversation = messages.slice(-6).map(msg => 
      `${msg.sender === 'user' ? 'User' : 'Rahul'}: ${msg.text}`
    ).join('\n');

    // Build lead data context
    const leadContext = Object.entries(leadData)
      .filter(([_, value]) => value)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');

    const systemPrompt = `You are Rahul, the official AI assistant of Sukrit Infrastructure Pvt Ltd.

YOUR IDENTITY:
- You represent Sukrit Infrastructure Pvt Ltd, a premium construction company in Assam, India
- Established in 2018 with 8+ years of experience
- You are NOT a generic AI assistant - you are a company representative
- Never mention being an AI language model or chatbot
- Always answer from the company's perspective

YOUR PURPOSE:
- Help website visitors with their construction needs
- Answer questions about Sukrit Infrastructure's services and projects
- Guide users through their construction requirements
- Be professional, friendly, and helpful
- Naturally collect lead information when appropriate

COMPANY KNOWLEDGE:
${KNOWLEDGE_BASE}

CONVERSATION CONTEXT:
Recent messages:
${recentConversation}

Lead information collected so far:
${leadContext || 'None yet'}

RESPONSE GUIDELINES:
1. ALWAYS answer the user's actual question FIRST before asking follow-up questions
2. Be context-aware - remember what the user has already told you
3. Keep responses concise (2-3 sentences maximum)
4. Sound natural and human-like, not robotic
5. Use phrases like: "Certainly", "I'd be happy to help", "Thanks for sharing that", "Great choice", "Let me help you with that"
6. If uncertain about specific details: "Our team will confirm the exact details after reviewing your requirements"
7. NEVER generate fake pricing or guarantees
8. Focus on quality, trust, and expertise
9. Answer directly and specifically - avoid generic responses

LEAD COLLECTION STRATEGY:
- After answering their question, naturally guide toward collecting: name, phone, city, project type, budget, timeline
- Do NOT ask for contact details immediately unless the user explicitly wants to connect
- Make it feel like a natural conversation, not an interrogation
- If they mention wanting to connect or discuss their project, that's the right time to ask for contact details

CURRENT USER MESSAGE: ${userText}

Provide a helpful, context-aware response as Rahul from Sukrit Infrastructure.`;

    try {
      const chat = model.startChat({
        history: conversationHistory,
        generationConfig: {
          maxOutputTokens: 300,
          temperature: 0.8,
          topP: 0.8,
          topK: 40,
        },
      });

      const result = await chat.sendMessage(systemPrompt);
      const response = result.response.text();

      // Update conversation history for context
      setConversationHistory(prev => [
        ...prev,
        { role: 'user', parts: [{ text: userText }] },
        { role: 'model', parts: [{ text: response }] }
      ]);

      // Extract and store lead information if mentioned naturally
      extractLeadInfo(userText, response);

      return response;
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  };

  const extractLeadInfo = (userText: string, response: string) => {
    const text = (userText + ' ' + response).toLowerCase();
    
    // Extract phone number
    const phoneMatch = text.match(/(\+?\d{10,15})/);
    if (phoneMatch && !leadData.phone) {
      setLeadData(prev => ({ ...prev, phone: phoneMatch[1] }));
    }
    
    // Extract email
    const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (emailMatch && !leadData.email) {
      setLeadData(prev => ({ ...prev, email: emailMatch[0] }));
    }
    
    // Extract city/location
    const cities = ['jorhat', 'guwahati', 'dibrugarh', 'tezpur', 'golaghat', 'gormur', 'dohabara', 'kenduguri', 'macharhat', 'lichubari'];
    cities.forEach(city => {
      if (text.includes(city) && !leadData.city) {
        setLeadData(prev => ({ ...prev, city: city.charAt(0).toUpperCase() + city.slice(1) }));
      }
    });
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
                  setConversationHistory([]);
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
