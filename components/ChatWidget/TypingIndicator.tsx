import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="flex items-end space-x-2 my-2 transition-all duration-300">
      {/* Assistant Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-semibold text-slate-700 text-sm shadow-sm select-none">
        A
      </div>
      
      {/* Bubble with Bouncing Dots */}
      <div className="bg-slate-100 text-slate-800 py-3 px-4 rounded-2xl rounded-bl-none max-w-[75%] shadow-sm flex items-center space-x-1.5 min-h-[40px]">
        <div 
          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" 
          style={{ animationDelay: '0ms', animationDuration: '1s' }} 
        />
        <div 
          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" 
          style={{ animationDelay: '150ms', animationDuration: '1s' }} 
        />
        <div 
          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" 
          style={{ animationDelay: '300ms', animationDuration: '1s' }} 
        />
      </div>
    </div>
  );
}
