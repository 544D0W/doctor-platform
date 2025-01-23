import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Users, AlertCircle } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'doctor' | 'ambulance' | 'system';
  timestamp: Date;
  attachments?: string[];
  status?: 'sent' | 'delivered' | 'error';
}

interface ChatProps {
  messages: Message[];
  onSendMessage: (message: string, attachments?: string[]) => void;
  isProcessing: boolean;
}

export function Chat({ messages, onSendMessage, isProcessing }: ChatProps) {
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((newMessage.trim() || attachments.length > 0) && !isProcessing) {
      onSendMessage(newMessage, attachments);
      setNewMessage('');
      setAttachments([]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setAttachments(prev => [...prev, ...fileUrls]);
    }
  };

  const getMessageStyle = (message: Message) => {
    switch (message.sender) {
      case 'doctor':
        return {
          container: 'justify-end',
          background: 'bg-primary text-primary-foreground',
          status: 'text-primary-foreground/70'
        };
      case 'system':
        return {
          container: 'justify-center',
          background: 'bg-accent border border-border',
          status: 'text-muted-foreground'
        };
      default:
        return {
          container: 'justify-start',
          background: 'bg-muted text-foreground',
          status: 'text-muted-foreground'
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-[500px] flex flex-col"
    >
      <Card className="flex-1 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Emergency Communication
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Total Messages: {messages.length}
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 py-4">
            {messages.map((message) => {
              const style = getMessageStyle(message);
              return (
                <div
                  key={message.id}
                  className={`flex ${style.container}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 relative 
                      ${style.background} ${
                      message.status === 'error' 
                        ? 'border-2 border-destructive' 
                        : ''
                    }`}
                  >
                    {message.status === 'error' && (
                      <AlertCircle className="absolute -top-2 -right-2 text-destructive bg-background rounded-full" />
                    )}
                    <p>{message.content}</p>
                    {message.attachments && (
                      <div className="mt-2 flex gap-2">
                        {message.attachments.map((attachment, index) => (
                          <img 
                            key={index} 
                            src={attachment} 
                            alt={`Attachment ${index + 1}`} 
                            className="h-16 w-16 object-cover rounded-md"
                          />
                        ))}
                      </div>
                    )}
                    <p className={`text-xs mt-1 ${style.status}`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {attachments.length > 0 && (
            <div className="flex gap-2 mb-2">
              {attachments.map((attachment, index) => (
                <img 
                  key={index} 
                  src={attachment} 
                  alt={`Preview ${index + 1}`} 
                  className="h-12 w-12 object-cover rounded-md"
                />
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex gap-2 items-center">
            <label htmlFor="file-upload" className="cursor-pointer">
              <Paperclip className="text-muted-foreground hover:text-primary" />
              <input 
                id="file-upload"
                type="file" 
                multiple 
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={isProcessing}
              className="flex-1"
            />
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}