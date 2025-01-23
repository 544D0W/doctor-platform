'use client';

import { useState, useEffect } from 'react';
import { Bell, Brain, ArrowRight, AlertCircle } from 'lucide-react';
import { getAIDiagnosis } from '@/services/aiService';
import type { EmergencyRequest, Message } from '@/types';
import io from 'socket.io-client';

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

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isProcessing || !selectedRequest) return;

    setIsProcessing(true);
    try {
      // Add doctor's message
      const doctorMessage: Message = {
        id: `doc-${Date.now()}`,
        content: newMessage,
        sender: 'doctor',
        timestamp: new Date(),
        requestId: selectedRequest.id
      };
      setMessages(prev => [...prev, doctorMessage]);
      setNewMessage('');

      // Get AI response
      const aiResponse = await getAIDiagnosis(selectedRequest.patient, newMessage);

      const responseMessage: Message = {
        id: `ai-${Date.now()}`,
        content: aiResponse,
        sender: 'ambulance',
        timestamp: new Date(),
        requestId: selectedRequest.id
      };
      setMessages(prev => [...prev, responseMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      // Add error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: "Communication error. Using standard protocols.",
        sender: 'ambulance',
        timestamp: new Date(),
        requestId: selectedRequest.id
      };
      setMessages(prev => [...prev, errorMessage]);
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
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <h1 className="text-2xl font-bold">Emergency Dashboard</h1>
            <button
              className="relative p-2 rounded-full hover:bg-gray-100"
              onClick={toggleNotification}
            >
              <Bell className="h-6 w-6" />
              {hasNewAlert && (
                <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-400" />
              )}
            </button>
            {showNotification && (
 <div className="absolute top-16 right-4 bg-white rounded-lg shadow-lg p-4 w-96">
   <h3 className="text-lg font-semibold mb-2">Notifications</h3>
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
 </div>
)}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
  <div className="flex gap-8">
    {/* Left Panel - Emergency Requests */}
    <div className="w-1/2">
      <h2 className="text-xl font-semibold mb-4">Emergency Requests</h2>
      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            onClick={() => setSelectedRequest(request)}
            className={`bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-all cursor-pointer ${
              selectedRequest?.id === request.id ? 'border-blue-500' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{request.patient.name}</h3>
                <p className="text-sm text-gray-500">
                  {request.patient.symptoms}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                request.priority === 'high' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {request.priority.toUpperCase()}
              </span>
            </div>
            <p className={`mt-2 font-medium ${
              request.priority === 'high' ? 'text-red-600' : 'text-orange-600'
            }`}>
              {request.patient.condition}
            </p>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">
                  {request.status.toUpperCase()}
                </span>
                {request.diagnosis && (
                  <span className="text-xs text-gray-500">
                    Dr. {request.diagnosis.diagnosed_by}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500">
                {new Date(request.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

          {/* Right Panel - Patient Details and Communication */}
          <div className="w-1/2">
            {selectedRequest ? (
              <div className="space-y-6">
                {/* Patient Information */}
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Patient Information</h3>
                   <div className="grid grid-cols-2 gap-4">
    <div>
      <p className="text-sm text-gray-500">Name</p>
      <p className="font-medium">{selectedRequest.patient.name}</p>
    </div>
    <div>
      <p className="text-sm text-gray-500">Condition</p>
      <p className="font-medium text-red-600">
        {selectedRequest.patient.condition}
      </p>
    </div>
    <div>
      <p className="text-sm text-gray-500">Symptoms</p>
      <p className="font-medium">{selectedRequest.patient.symptoms}</p>
    </div>
    <div>
      <p className="text-sm text-gray-500">Status</p>
      <p className="font-medium">{selectedRequest.status}</p>
    </div>
  </div>

                  {/* Vital Signs */}
                  <div className="mt-6">
  <h4 className="font-semibold mb-3">Vital Signs</h4>
  <div className="grid grid-cols-2 gap-4">
    <div className="bg-gray-50 p-3 rounded-lg">
      <p className="text-sm text-gray-500">Heart Rate</p>
      <p className="font-medium">{selectedRequest.patient.vitals?.heartRate || `${Math.floor(Math.random() * (120 - 60) + 60)} bpm`}</p>
    </div>
    <div className="bg-gray-50 p-3 rounded-lg">
      <p className="text-sm text-gray-500">Blood Pressure</p>
      <p className="font-medium">{selectedRequest.patient.vitals?.bloodPressure || `${Math.floor(Math.random() * (160 - 100) + 100)}/${Math.floor(Math.random() * (100 - 60) + 60)}`}</p>
    </div>
    <div className="bg-gray-50 p-3 rounded-lg">
      <p className="text-sm text-gray-500">Oxygen Saturation</p>
      <p className="font-medium">{selectedRequest.patient.vitals?.oxygenSaturation || `${Math.floor(Math.random() * (100 - 90) + 90)}%`}</p>
    </div>
    <div className="bg-gray-50 p-3 rounded-lg">
      <p className="text-sm text-gray-500">Temperature</p>
      <p className="font-medium">{selectedRequest.patient.vitals?.temperature || `${(Math.random() * (39 - 36) + 36).toFixed(1)}°C`}</p>
    </div>
  </div>
</div>
                </div>

                {/* AI Analysis */}
                <div className="bg-white p-6 rounded-lg border shadow-sm">
  <div className="flex items-center gap-2 mb-4">
    <Brain className="h-6 w-6 text-blue-500" />
    <h3 className="text-lg font-semibold">AI Analysis</h3>
  </div>
  <div className="space-y-4">
    <div className="bg-orange-50 rounded-lg p-4">
      <div className="flex items-start gap-2">
        <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
        <div>
          <h4 className="font-medium text-orange-800">Risk Assessment</h4>
          <p className="text-orange-700 mt-1">
            Based on vital signs, immediate medical attention recommended.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

                {/* Communication */}
                <div className="bg-white rounded-lg border shadow-sm">
    <div className="p-4 border-b">
      <h3 className="font-semibold">Emergency Communication</h3>
    </div>
    <div className="h-64 overflow-y-auto p-4 space-y-4">
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
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100'
            }`}
          >
            <p>{message.content}</p>
            <p className={`text-xs mt-1 ${
              message.sender === 'doctor' ? 'text-blue-100' : 'text-gray-500'
            }`}>
              {message.timestamp.toLocaleTimeString()}
            </p>
          </div>
        </div>
      ))}
    </div>
    <form onSubmit={sendMessage} className="p-4 border-t">
      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isProcessing}
        />
        <button
          type="submit"
          disabled={isProcessing}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 
                   transition-colors disabled:opacity-50"
        >
          {isProcessing ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <ArrowRight className="h-5 w-5" />
          )}
        </button>
      </div>
    </form>
  </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <p>Select an emergency request to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}