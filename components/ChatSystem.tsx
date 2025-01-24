'use client';

import { useState, useEffect, useRef } from 'react';
import { Message } from '@/types';
import { formatDate } from '@/lib/utils';
import { SendIcon, AlertCircle, Check } from 'lucide-react';
import { getAIDiagnosis } from '../services/aiService';

interface ChatSystemProps {
  requestId: string;
  patient: any;
}

// Common medical queries for quick access
const QUICK_QUERIES = [
  "Check patient's medical history and allergies",
  "Analyze current vital signs",
  "Recommend immediate treatment steps",
  "Assess risk factors based on history",
  "Check for medication conflicts"
];

export default function ChatSystem({ requestId, patient }: ChatSystemProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [justSent, setJustSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with assessment request
  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: `initial-1-${requestId}`,
        content: `Emergency case: ${patient.condition}. Initial vitals recorded.`,
        sender: 'ambulance',
        timestamp: new Date().toISOString(),
        requestId
      }
    ];
    setMessages(initialMessages);
    
    // Auto-trigger initial AI analysis
    handleAIQuery("Provide initial assessment based on current vitals and condition");
  }, [requestId, patient]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleAIQuery = async (query: string) => {
    if (isProcessing) return;
    
    try {
      setIsProcessing(true);
      const aiResponse = await getAIDiagnosis(patient, query);
      
      const aiMessage: Message = {
        id: `msg-${Date.now()}-ai`,
        content: aiResponse,
        sender: 'ambulance',
        timestamp: new Date().toISOString(),
        requestId
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Query Error:', error);
      // Error handling message
      const errorMessage: Message = {
        id: `msg-${Date.now()}-error`,
        content: "Unable to process medical query. Please rely on standard protocols.",
        sender: 'ambulance',
        timestamp: new Date().toISOString(),
        requestId
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isProcessing) return;

    const doctorMessage: Message = {
      id: `msg-${Date.now()}-doctor`,
      content: newMessage,
      sender: 'doctor',
      timestamp: new Date().toISOString(),
      requestId
    };

    setMessages(prev => [...prev, doctorMessage]);
    setNewMessage('');
    setJustSent(true);
    setTimeout(() => setJustSent(false), 2000);

    // Process with AI
    await handleAIQuery(newMessage);
  };

  return (
    <div className="bg-white rounded-lg border h-[500px] flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Emergency Communication</h3>
        <p className="text-sm text-gray-500">AI-Enhanced Medical Response System</p>
      </div>

      {/* Quick Medical Queries */}
      <div className="p-2 border-b bg-gray-50 flex gap-2 overflow-x-auto">
        {QUICK_QUERIES.map((query, index) => (
          <button
            key={index}
            onClick={() => handleAIQuery(query)}
            disabled={isProcessing}
            className="px-3 py-1 text-sm bg-white border rounded-full hover:bg-blue-50 
                     whitespace-nowrap transition-colors disabled:opacity-50"
          >
            {query}
          </button>
        ))}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'doctor' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === 'doctor'
                  ? 'bg-blue-100 text-gray-900'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className={`text-xs mb-1 flex items-center gap-1 ${
                message.sender === 'doctor' 
                  ? 'text-blue-500'
                  : 'text-gray-500'
              }`}>
                {message.sender === 'doctor' ? 'Doctor' : 'AI Medical Assistant'}
                {message.sender === 'ambulance' && (
                  <AlertCircle className="h-3 w-3" />
                )}
              </div>
              <p className="whitespace-pre-wrap">{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'doctor'
                  ? 'text-blue-400'
                  : 'text-gray-500'
              }`}>
                {formatDate(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask about patient condition or request analysis..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={isProcessing || !newMessage.trim()}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 
                     hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {justSent ? (
              <Check className="h-5 w-5" />
            ) : (
              <SendIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}