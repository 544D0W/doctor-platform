import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from '@/components/MessageBubble';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Send, AlertCircle, Clock, Loader2 } from "lucide-react";


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

// components/EmergencyChat.tsx
export default function EmergencyChat({ 
  messages, 
  onSendMessage, 
  isProcessing,
  patientCondition 
}: EmergencyChatProps) {
  const [newMessage, setNewMessage] = useState('');
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
      inputRef.current?.focus();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col overflow-hidden bg-gradient-to-br from-white to-blue-50">
      <CardHeader className="border-b backdrop-blur-sm bg-white/50">
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <Brain className="h-6 w-6 text-blue-500" />
            <CardTitle className="text-xl font-bold">AI Medical Assistant</CardTitle>
          </div>
          {patientCondition && (
            <motion.div whileHover={{ scale: 1.05 }}>
              <Badge variant="destructive" className="px-3 py-1 uppercase">
                {patientCondition}
              </Badge>
            </motion.div>
          )}
        </motion.div>
      </CardHeader>
  
      <CardContent className="flex-1 flex flex-col p-4 min-h-0">
        <ScrollArea className="flex-1 pr-4">
          <AnimatePresence>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={scrollRef} />
          </AnimatePresence>
        </ScrollArea>
  
        <motion.form 
          onSubmit={handleSubmit}
          className="mt-4 flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Input
            ref={inputRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask about patient condition, symptoms, or treatment..."
            disabled={isProcessing}
            className="flex-1 bg-white/70 backdrop-blur-sm"
          />
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button 
              type="submit" 
              disabled={isProcessing || !newMessage.trim()}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {isProcessing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
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