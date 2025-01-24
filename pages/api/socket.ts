// socket.ts
import { Server } from 'socket.io';
import fs from 'fs';
import path from 'path';
import  aiService  from '@/services/aiService';
const saveEmergencyData = (emergencyData: any) => {
  // Ensure data directory exists
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const filename = `emergency_${emergencyData.id}_${timestamp}.json`;
  const filePath = path.join(dataDir, filename);

  // Write JSON file
  try {
    fs.writeFileSync(filePath, JSON.stringify(emergencyData, null, 2));
    console.log(`Emergency data saved: ${filePath}`);
  } catch (error) {
    console.error('Error saving emergency data:', error);
  }
};
const SocketHandler = (req, res) => {
 if (!res.socket.server.io) {
   const io = new Server(res.socket.server, {
     path: '/api/socket',
     addTrailingSlash: false,
   });

   io.on('connection', (socket) => {
     console.log('Client connected');
    //  socket.on('chat', async (data) => {
    //   const response = await aiService.generateResponse(
    //     data.conversationId,
    //     data.message
    //   );
    //   socket.emit('ai-response', {
    //     id: `ai-${Date.now()}`,
    //     content: response,
    //     sender: 'ai',
    //     timestamp: new Date()
    //   });
    // });
     socket.on('message', (data) => {
        console.log(data);
       const emergencyData = {
         id: data.conversation_id,
         patient: {
           id: data.fullDiagnosis._id,
           condition: data.diagnosis.patient.medical_diagnosis,
           symptoms: data.diagnosis.patient.symptoms,
           paramedics_tips: data.diagnosis.paramedics_tips,
           medications: data.diagnosis.medications,
           name: data.fullDiagnosis.patient_name || 'Unknown Patient',
           conversation: data.fullDiagnosis.conversation
         },
         diagnosis: {
           ...data.diagnosis,
           diagnosed_by: data.diagnosed_by,
           timestamp: data.timestamp,
           _date: data.fullDiagnosis._date,
           status: data.diagnosis.conversation_status
         },
         priority: data.diagnosis.patient.symptoms.toLowerCase().includes('severe') ? 'high' : 'medium',
         timestamp: data.timestamp,
         status: data.diagnosis.conversation_status.toLowerCase()
       };
     saveEmergencyData(emergencyData);
       io.emit('emergency', emergencyData);
     });
   });

   res.socket.server.io = io;
 }
 res.end();
};

export default SocketHandler;