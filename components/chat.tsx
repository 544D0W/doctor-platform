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
  onDoctorAssignment?: (doctor: any) => void;
}

export default function EmergencyChat({ 
  messages, 
  onSendMessage, 
  isProcessing,
  patientCondition,
  onDoctorAssignment 
}: EmergencyChatProps) {
  const [newMessage, setNewMessage] = useState('');
  const [justSent, setJustSent] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const messageText = newMessage.trim();
    
    if (messageText && !isProcessing) {
      setNewMessage('');
      setJustSent(true);
      setTimeout(() => setJustSent(false), 2000);
      inputRef.current?.focus();
      onSendMessage(messageText);
    }
  };

  return (
    <Card className="h-[600px] flex flex-col overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 border-0 shadow-lg">
      <CardHeader className="border-b bg-white/50 backdrop-blur-sm p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-2 bg-primary/10 rounded-xl flex-shrink-0"
            >
              <Bot className="h-6 w-6 text-primary" />
            </motion.div>
            <div className="min-w-0">
              <CardTitle className="text-xl font-bold truncate">AI Medical Assistant</CardTitle>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>Available 24/7</span>
              </div>
            </div>
          </div>
          
          {patientCondition && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full sm:w-auto"
            >
              <Badge 
                variant="destructive" 
                className="w-full sm:w-auto px-3 py-1.5 uppercase bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs sm:text-sm whitespace-normal sm:whitespace-nowrap text-center sm:text-left flex items-center justify-center sm:justify-start gap-1"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="break-words">{patientCondition}</span>
              </Badge>
            </motion.div>
          )}
        </div>
      </CardHeader>
  
      <CardContent className="flex-1 flex flex-col p-4 min-h-0">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={{
                  content: message.content,
                  sender: message.sender,
                  timestamp: message.timestamp
                }}
              />
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
          <div className="flex-1">
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ask about patient condition, symptoms, or treatment..."
              disabled={isProcessing}
              className="bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isProcessing || !newMessage.trim()}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            {isProcessing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : justSent ? (
              <Check className="h-4 w-4" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </motion.form>
      </CardContent>
    </Card>
  );
}