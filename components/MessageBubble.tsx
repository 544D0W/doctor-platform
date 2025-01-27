import React from 'react';
import { motion } from 'framer-motion';
import { Brain, User } from 'lucide-react';

interface MessageBubbleProps {
  message: {
    content: string;
    sender: string;
    timestamp: Date;
  };
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isAI = message.sender === 'ai';
  const isSystem = message.sender === 'system';
  const isDoctor = message.sender === 'doctor';

  const formatMarkdownText = (text: string) => {
    // Replace markdown bold syntax with proper HTML
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  const formatContent = (content: string) => {
    // Split content by numbers followed by a dot and space
    const parts = content.split(/(\d+\.\s)/);
    
    if (parts.length > 1) {
      const items = [];
      let currentItem = '';
      
      for (let i = 0; i < parts.length; i++) {
        if (parts[i].match(/^\d+\.\s$/)) {
          if (currentItem) {
            items.push(currentItem.trim());
          }
          currentItem = parts[i];
        } else {
          currentItem += parts[i];
        }
      }
      if (currentItem) {
        items.push(currentItem.trim());
      }

      return (
        <div className="space-y-2">
          {items.map((item, index) => {
            if (item.match(/^\d+\.\s/)) {
              return (
                <div key={index} className="flex items-start gap-2 pl-2">
                  <span className="font-semibold min-w-[24px]">{item.match(/^\d+\./)[0]}</span>
                  <span 
                    dangerouslySetInnerHTML={{ 
                      __html: formatMarkdownText(item.replace(/^\d+\.\s/, ''))
                    }}
                    className="flex-1"
                  />
                </div>
              );
            } else {
              return (
                <p 
                  key={index} 
                  className="leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: formatMarkdownText(item)
                  }}
                />
              );
            }
          })}
        </div>
      );
    }

    // If no list formatting needed, return as regular text with markdown parsing
    return (
      <p 
        className="leading-relaxed"
        dangerouslySetInnerHTML={{ 
          __html: formatMarkdownText(content)
        }}
      />
    );
  };

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
          {formatContent(message.content)}
          <div className={`text-xs mt-1 ${isDoctor ? 'text-blue-100' : 'text-gray-500'}`}>
            {message.timestamp.toLocaleTimeString([], {
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