// MessageBubble.tsx
import { motion } from 'framer-motion';
import { Brain, AlertCircle } from 'lucide-react';

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
      className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`max-w-[80%] ${isAI ? 'bg-white' : 'bg-blue-500 text-white'} rounded-lg p-3 shadow-sm`}>
        {typeof message.content === 'string' ? (
          <p>{message.content}</p>
        ) : (
          message.content
        )}
        <div className={`text-xs mt-1 ${isAI ? 'text-gray-500' : 'text-blue-200'}`}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </motion.div>
  );
}