import React from 'react';
import { motion } from 'framer-motion';
import { Brain, User } from 'lucide-react';

interface MessageBubbleProps {
  message: {
    content: string | React.ReactNode;
    sender: string;
    timestamp: Date;
  };
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isAI = message.sender === 'ai';
  const isSystem = message.sender === 'system';
  const isDoctor = message.sender === 'doctor';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-3 ${isDoctor ? 'justify-end' : 'justify-start'}`}
    >
      {isAI && (
        <div className="p-2 bg-violet-100 rounded-full flex-shrink-0">
          <Brain className="w-4 h-4 text-violet-500" />
        </div>
      )}
      
      <div className={`
        max-w-[80%] rounded-lg p-3 shadow-sm
        ${isAI ? 'bg-gradient-to-r from-violet-50 to-violet-100 text-gray-800' : ''}
        ${isDoctor ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' : ''}
        ${isSystem ? 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600' : ''}
      `}>
        <div className="space-y-1">
          {typeof message.content === 'string' ? (
            <p className="leading-relaxed">{message.content}</p>
          ) : (
            message.content
          )}
          <div className={`text-xs ${isDoctor ? 'text-blue-100' : 'text-gray-500'}`}>
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>

      {isDoctor && (
        <div className="p-2 bg-blue-100 rounded-full flex-shrink-0">
          <User className="w-4 h-4 text-blue-500" />
        </div>
      )}
    </motion.div>
  );
}