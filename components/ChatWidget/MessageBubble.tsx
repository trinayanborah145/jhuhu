import React, { useEffect, useState } from 'react';
import { Message } from '@/types/chat';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const [formattedTime, setFormattedTime] = useState<string>('');

  useEffect(() => {
    // Prevent Next.js hydration warning by formatting dates only on the client
    if (message.timestamp) {
      const date = new Date(message.timestamp);
      setFormattedTime(
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    }
  }, [message.timestamp]);

  return (
    <div
      className={`flex items-end space-x-2 my-3 animate-fade-in-up ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {/* Bot Avatar for assistant messages */}
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-bold text-slate-600 text-sm shadow-sm select-none">
          A
        </div>
      )}

      {/* Message Content Container */}
      <div className={`flex flex-col max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`py-2.5 px-4 rounded-2xl shadow-sm text-sm break-words whitespace-pre-wrap leading-relaxed ${
            isUser
              ? 'bg-[#1a1a2e] text-white rounded-br-none'
              : 'bg-slate-100 text-slate-800 rounded-bl-none'
          }`}
        >
          {message.content}
        </div>
        
        {/* Timestamp */}
        {formattedTime && (
          <span className="text-[10px] text-slate-400 mt-1 px-1">
            {formattedTime}
          </span>
        )}
      </div>
    </div>
  );
}
