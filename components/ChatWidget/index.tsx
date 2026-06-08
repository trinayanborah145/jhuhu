'use client';

import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { Message } from '@/types/chat';

interface ChatWidgetProps {
  companyName: string;
  companyPhone: string;
  ownerName: string;
  embedMode?: boolean;
}

export default function ChatWidget({
  companyName,
  companyPhone,
  ownerName,
  embedMode = false,
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLeadCaptured, setIsLeadCaptured] = useState(false);
  const [conversationId, setConversationId] = useState('');
  const [hasGreeted, setHasGreeted] = useState(false);
  const [showBadge, setShowBadge] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize conversation ID on mount to prevent SSR hydration mismatches
  useEffect(() => {
    setConversationId(crypto.randomUUID());
  }, []);

  // Listen for custom window event to trigger chat opening externally
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      setShowBadge(false);
    };
    window.addEventListener('open-chat-widget', handleOpenChat);
    return () => {
      window.removeEventListener('open-chat-widget', handleOpenChat);
    };
  }, []);

  // Scroll to bottom when messages or typing state changes
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Auto-focus input when chat opens
      inputRef.current?.focus();
    }
  }, [messages, isTyping, isOpen]);

  // Handle auto-greeting
  useEffect(() => {
    const triggerGreeting = async () => {
      if (hasGreeted || !conversationId) return;
      setHasGreeted(true);
      setIsTyping(true);

      // Wait 1.5 seconds before showing message to feel natural
      await new Promise((resolve) => setTimeout(resolve, 1500));

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [],
            conversationId,
            isInitial: true,
          }),
        });

        if (!res.ok) throw new Error('Greeting failed');
        const data = await res.json();

        const botMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.reply,
          timestamp: new Date(),
        };

        setMessages([botMessage]);
      } catch (error) {
        console.error('Failed to trigger greeting:', error);
        // Fallback greeting if API fails
        const fallbackMsg: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: `Hi there! I'm Rahul from ${companyName}. What kind of construction or renovation project are you planning?`,
          timestamp: new Date(),
        };
        setMessages([fallbackMsg]);
      } finally {
        setIsTyping(false);
      }
    };

    if (isOpen && !hasGreeted && conversationId) {
      triggerGreeting();
    }
  }, [isOpen, hasGreeted, conversationId, companyName]);

  const handleOpenToggle = () => {
    console.log('Chat button clicked');
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);
    setShowBadge(false);
    // In embed mode, notify parent page to resize the iframe
    if (embedMode && typeof window !== 'undefined' && window.parent !== window) {
      window.parent.postMessage(
        { type: nextOpen ? 'chat-open' : 'chat-closed' },
        '*'
      );
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const text = inputValue.trim();
    if (!text || isTyping || isLeadCaptured) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          conversationId,
        }),
      });

      if (!res.ok) throw new Error('Message dispatch failed');
      const data = await res.json();

      const botMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      if (data.leadCaptured) {
        setIsLeadCaptured(true);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Something went wrong — please try again',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="font-sans">
      {/* Debug: Show current state */}
      <div style={{ position: 'fixed', top: '10px', right: '10px', background: 'red', color: 'white', padding: '5px', zIndex: 100000, fontSize: '12px' }}>
        isOpen: {isOpen.toString()}
      </div>

      {/* Floating Chat Bubble Button - TEMPORARILY MOVED TO CENTER FOR TESTING */}
      <button
        onClick={() => {
          console.log('Button clicked, current isOpen:', isOpen);
          const newState = !isOpen;
          console.log('Setting isOpen to:', newState);
          setIsOpen(newState);
          setShowBadge(false);
        }}
        onMouseDown={() => console.log('Mouse down')}
        onMouseUp={() => console.log('Mouse up')}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl z-[100000] cursor-pointer"
        aria-label={isOpen ? 'Close assistant chat' : 'Open assistant chat'}
        type="button"
      >
        {isOpen ? (
          // Close Icon
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          // Chat Icon
          <div className="relative">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            {showBadge && (
              <span className="absolute -top-2.5 -right-2.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow">
                1
              </span>
            )}
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-0 right-0 w-full h-[100dvh] md:bottom-24 md:right-6 md:w-[340px] md:h-[520px] md:max-h-[520px] bg-white md:rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col z-50 overflow-hidden animate-slide-up-fade"
          role="dialog"
          aria-modal="true"
          aria-label={`${companyName} Assistant Chat`}
        >
          {/* Header */}
          <div className="bg-[#1a1a2e] text-white p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="relative w-9 h-9 rounded-full bg-amber-600 flex items-center justify-center font-bold text-white text-sm shadow">
                R
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#1a1a2e] rounded-full"></span>
              </div>
              <div>
                <h3 className="font-semibold text-sm tracking-wide leading-tight">Rahul</h3>
                <p className="text-[11px] text-slate-300 opacity-85">{companyName} Assistant</p>
              </div>
            </div>
            {/* Mobile close button */}
            <button
              onClick={() => {
                setIsOpen(false);
                if (embedMode && typeof window !== 'undefined' && window.parent !== window) {
                  window.parent.postMessage({ type: 'chat-closed' }, '*');
                }
              }}
              className="md:hidden text-slate-300 hover:text-white p-1"
              aria-label="Minimize chat"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* Success Banner */}
          {isLeadCaptured && (
            <div className="bg-emerald-550 bg-emerald-600 text-white text-xs px-4 py-2.5 font-medium flex items-center justify-between animate-fade-in shadow-inner">
              <span>✓ We've got your details — {ownerName} will be in touch shortly!</span>
            </div>
          )}

          {/* Message Area */}
          <div
            className="flex-1 overflow-y-auto p-4 bg-white"
            role="log"
            aria-live="polite"
          >
            {messages.length === 0 && !isTyping ? (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                Connecting with Rahul...
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input & Call Area */}
          <div className="border-t border-slate-100 bg-slate-50 p-3">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value.slice(0, 500))}
                onKeyDown={handleKeyDown}
                disabled={isLeadCaptured || isTyping}
                placeholder={isLeadCaptured ? 'Chat complete' : 'Type your message...'}
                maxLength={500}
                className="flex-1 bg-white border border-slate-200 text-slate-800 placeholder-slate-400 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-slate-100 disabled:text-slate-400"
                aria-label="Chat input message"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping || isLeadCaptured}
                className="w-9 h-9 rounded-full bg-[#1a1a2e] text-white flex items-center justify-center hover:bg-amber-600 disabled:bg-slate-200 disabled:text-slate-400 transition-colors duration-200 shadow-sm"
                aria-label="Send message"
              >
                <svg
                  className="w-4.5 h-4.5 transform rotate-45 -translate-x-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>

            {/* Call Us Button */}
            {isLeadCaptured && (
              <div className="mt-2.5 animate-fade-in">
                <a
                  href={`tel:${companyPhone}`}
                  className="w-full flex items-center justify-center space-x-2 bg-amber-650 bg-amber-600 text-white font-semibold text-xs py-2.5 px-4 rounded-full shadow hover:bg-amber-700 transition-all duration-200"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>Call us now on {companyPhone}</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
