// MessageBubble.tsx
import { motion } from 'framer-motion';
import { Brain, AlertCircle } from 'lucide-react';

export default function MessageBubble({ message }) {
  const isAI = message.sender === 'ai';
  const isSystem = message.sender === 'system';
  const isDoctor = message.sender === 'doctor';

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`
        max-w-[80%] rounded-2xl p-4 shadow-sm
        ${isAI ? 'bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200' : 
          isSystem ? 'bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200' : 
          'bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200'}
      `}
    >
      {isAI && (
        <div className="flex items-center gap-2 mb-2">
          <Brain className="h-4 w-4 text-violet-500" />
          <span className="text-sm font-medium text-violet-500">AI Assistant</span>
        </div>
      )}
      
      <p className={`text-sm ${isAI ? 'text-gray-800' : isDoctor ? 'text-gray-900' : 'text-gray-600'}`}>
        {message.content}
      </p>
      
      <div className="flex items-center justify-between mt-2 text-xs">
        <span className={isAI ? 'text-violet-400' : isDoctor ? 'text-rose-400' : 'text-gray-400'}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
        
        {message.status === 'error' && (
          <span className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3 text-red-500" />
          </span>
        )}
      </div>
    </motion.div>
  );
}