import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from '@/components/MessageBubble';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Send, AlertCircle, Clock, Loader2, 
  MessageSquare, Bot, Sparkles, User, Check 
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'doctor' | 'ai' | 'system';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
}

interface EmergencyChatProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
  patientCondition?: string;
}

export default function EmergencyChat({ 
  messages, 
  onSendMessage, 
  isProcessing,
  patientCondition 
}: EmergencyChatProps) {
  const [newMessage, setNewMessage] = useState('');
  const [justSent, setJustSent] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && !isProcessing) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
      setJustSent(true);
      setTimeout(() => setJustSent(false), 2000); // Reset after 2 seconds
      inputRef.current?.focus();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 border-0 shadow-lg hover:shadow-xl transition-all duration-500">
      <CardHeader className="border-b bg-white/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-2 bg-primary/10 rounded-xl"
            >
              <Bot className="h-6 w-6 text-primary" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-bold">AI Medical Assistant</CardTitle>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Available 24/7</span>
              </div>
            </div>
          </div>
          
          {patientCondition && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Badge 
                variant="destructive" 
                className="px-3 py-1.5 uppercase bg-gradient-to-r from-red-500 to-rose-500 text-white border-0"
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                {patientCondition}
              </Badge>
            </motion.div>
          )}
        </div>
      </CardHeader>
  
      <CardContent className="flex-1 flex flex-col p-4 min-h-0">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={`${message.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`flex items-start gap-3 ${
                  message.sender === 'doctor' ? 'justify-end' : 'justify-start'
                }`}>
                  {message.sender === 'ai' && (
                    <div className="p-2 bg-violet-100 rounded-full">
                      <Brain className="w-4 h-4 text-violet-500" />
                    </div>
                  )}
                  {message.sender === 'doctor' && (
                    <div className="p-2 bg-rose-100 rounded-full order-last">
                      <User className="w-4 h-4 text-rose-500" />
                    </div>
                  )}
                  <MessageBubble message={message} />
                </div>
              </motion.div>
            ))}
          </div>
          <div ref={scrollRef} />
        </ScrollArea>
  
        <motion.form 
          onSubmit={handleSubmit}
          className="mt-4 flex gap-2 items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ask about patient condition, symptoms, or treatment..."
              disabled={isProcessing}
              className="pr-10 bg-white/70 backdrop-blur-sm border-0 shadow-sm focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              type="submit" 
              disabled={isProcessing || !newMessage.trim()}
              className="bg-primary hover:bg-primary/90 text-white border-0 shadow-sm"
            >
              {justSent ? (
                <Check className="h-4 w-4" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </motion.div>
        </motion.form>
      </CardContent>
    </Card>
  );
}