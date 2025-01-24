

'use client';

import React, { useState, useEffect } from 'react'; // Import hooks here
import { Bell, Brain, ArrowRight, AlertCircle } from 'lucide-react';
import { getAIResponse } from '@/services/aiService';
import type { EmergencyRequest, Message } from '@/types';
import io from 'socket.io-client';
import Header from '@/components/ui/Header';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import PatientInfo from '@/components/PatientInfo';
import  Chat  from '@/components/chat';
import EmergencyRequestPanel from '@/components/EmergencyRequestPanel';


// Mock data with full patient details

export default function DashboardPage() {
  const [requests, setRequests] = useState<EmergencyRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<EmergencyRequest | null>(null);
  const [hasNewAlert, setHasNewAlert] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [notificationAudio, setNotificationAudio] = useState<HTMLAudioElement | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [socket, setSocket] = useState<any>(null);

  const playNotificationSound = () => {
    if (notificationAudio) {
      notificationAudio.currentTime = 0;
      notificationAudio.play().catch(console.error);
    }
  };
  
  useEffect(() => {
    const newSocket = io('http://localhost:3000', {
      path: '/api/socket'
    });
  
    newSocket.on('emergency', (data: EmergencyRequest) => {
      console.log('Received:', data);
  
      setNotifications(prev => [{
        id: data.id,
        title: `New Emergency: ${data.patient.condition}`,
        message: data.patient.symptoms,
        paramedics_tips: data.patient.paramedics_tips,
        medications: data.patient.medications,
        timestamp: data.timestamp,
        doctor: data.diagnosis?.diagnosed_by || 'Unknown'
      }, ...prev]);
  
      setRequests(prev => [data, ...prev]);
  
      setHasNewAlert(true);
      playNotificationSound();
  
    });
  
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);
  // Simulate receiving new emergency requests
  useEffect(() => {
    const audio = new Audio('/notification.wav');
    audio.preload = 'auto';
    setNotificationAudio(audio);
  }, []);


  // Simulate new requests

  const sendMessage = async (message: string) => {
    if (!message.trim() || isProcessing) return;

    setIsProcessing(true);
    try {
      // Add message to chat
      setMessages(prev => [...prev, {
        id: `msg-${Date.now()}`,
        content: message,
        sender: 'doctor',
        timestamp: new Date(),
        status: 'sending'
      }]);

      const response = await getAIResponse(selectedRequest?.id, message);
      
      setMessages(prev => [...prev, {
        id: `ai-${Date.now()}`,
        content: response,
        sender: 'ai',
        timestamp: new Date(),
        status: 'sent'
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        content: "Error processing request",
        sender: 'system',
        timestamp: new Date(),
        status: 'error'
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleNotification = () => {
    setShowNotification(prev => !prev);
  };

  return (
    <main className={`min-h-screen ${hasNewAlert ? 'bg-red-50' : 'bg-gray-50'} transition-colors duration-500`}>
      {/* Header */}
      <Header 
  notifications={
    <div className="max-h-96 overflow-y-auto">
      {notifications.map(note => (
        <div key={note.id} className="p-3 border-b hover:bg-gray-50">
          <div className="font-medium">{note.title}</div>
          <p className="text-sm text-gray-600">{note.message}</p>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>Dr. {note.doctor}</span>
            <span>{new Date(note.timestamp).toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  }
  hasNewAlert={hasNewAlert}
  toggleNotification={toggleNotification}
/>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
  <div className="flex gap-8">
  {/* Left Panel - Emergency Requests */}
<div className="w-1/2">
  <EmergencyRequestPanel 
    requests={requests} 
    onSelect={setSelectedRequest}
  />
</div>

          {/* Right Panel - Patient Details and Communication */}
{/* Right Panel - Patient Details and Communication */}
<div className="w-1/2">
  {selectedRequest ? (
    <div className="space-y-6">
      {/* Patient Info */}
      <PatientInfo patient={{
        name: selectedRequest.patient.name,
        condition: selectedRequest.patient.condition,
        symptoms: selectedRequest.patient.symptoms,
        status: selectedRequest.status,
        vitals: {
          heartRate: selectedRequest.patient.vitals?.heartRate || `${Math.floor(Math.random() * (120 - 60) + 60)} bpm`,
          bloodPressure: selectedRequest.patient.vitals?.bloodPressure || `${Math.floor(Math.random() * (160 - 100) + 100)}/${Math.floor(Math.random() * (100 - 60) + 60)}`,
          oxygenSaturation: selectedRequest.patient.vitals?.oxygenSaturation || `${Math.floor(Math.random() * (100 - 90) + 90)}%`,
          temperature: selectedRequest.patient.vitals?.temperature || `${(Math.random() * (39 - 36) + 36).toFixed(1)}°C`
        }
      }} />

      {/* Chat Component */}
      <Chat
       messages={messages}
       onSendMessage={sendMessage}
       isProcessing={isProcessing}
       patientCondition={selectedRequest?.patient.condition}
      />
    </div>
  ) : (
    <div className="h-full flex items-center justify-center text-muted-foreground">
      <p>Select an emergency request to view details</p>
    </div>
  )}
</div>

        </div>
      </div>
    </main>
  );
}