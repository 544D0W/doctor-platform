'use client';

import { useState } from 'react'
import PatientInfo from '@/components/PatientInfo'
import EmergencyChat from '@/components/chat'
import type { Message } from '@/types'
import { useDoctors } from '@/context/DoctorContext'

export default function Dashboard() {
  const [currentPatient, setCurrentPatient] = useState(patient)
  const [messages, setMessages] = useState<Message[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const { updateDoctorStatus } = useDoctors()

  const handleDoctorAssignment = (doctor: any) => {
    updateDoctorStatus(doctor.id, 'Busy')
    
    setCurrentPatient(prev => ({
      ...prev,
      assignedDoctor: doctor
    }))
  }

  const handleMessage = async (message: string) => {
    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'doctor',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const data = await response.json();

      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);

      // Handle doctor assignment if present
      if (data.action?.type === 'ASSIGN_DOCTOR') {
        handleDoctorAssignment(data.action.doctor);
      }
    } catch (error) {
      console.error('Error:', error);
      // Optionally add error message to chat
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: 'Failed to get response. Please try again.',
        sender: 'system',
        timestamp: new Date()
      }]);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <PatientInfo patient={currentPatient} />
      <EmergencyChat
        messages={messages}
        onSendMessage={handleMessage}
        isProcessing={isProcessing}
        patientCondition={currentPatient.condition}
        onDoctorAssignment={handleDoctorAssignment}
      />
    </div>
  )
}