// MessageBubble.tsx
import { motion } from 'framer-motion';
import { Brain, AlertCircle, Loader2 } from 'lucide-react';

export default function MessageBubble({ message }) {
  const isAI = message.sender === 'ai';
  const isSystem = message.sender === 'system';

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`
        max-w-[80%] rounded-2xl p-4 shadow-sm
        ${isAI ? 'bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200' : 
          isSystem ? 'bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200' : 
          'bg-gradient-to-r from-primary to-primary-dark text-white'}
      `}
    >
      {isAI && (
        <div className="flex items-center gap-2 mb-2">
          <Brain className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium text-blue-500">AI Assistant</span>
        </div>
      )}
      
      <p className={`text-sm ${isAI ? 'text-gray-800' : isSystem ? 'text-gray-600' : 'text-white'}`}>
        {message.content}
      </p>
      
      <div className="flex items-center justify-between mt-2 text-xs">
        <span className={isAI ? 'text-blue-400' : isSystem ? 'text-gray-400' : 'text-white/70'}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
        
        {message.status && (
          <span className="flex items-center gap-1">
            {message.status === 'sending' && <Loader2 className="h-3 w-3 animate-spin" />}
            {message.status === 'error' && <AlertCircle className="h-3 w-3 text-red-500" />}
          </span>
        )}
      </div>
    </motion.div>
  );
}