// socket.ts
import { Server } from 'socket.io';

const SocketHandler = (req, res) => {
 if (!res.socket.server.io) {
   const io = new Server(res.socket.server, {
     path: '/api/socket',
     addTrailingSlash: false,
   });

   io.on('connection', (socket) => {
     console.log('Client connected');
     
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
       io.emit('emergency', emergencyData);
     });
   });

   res.socket.server.io = io;
 }
 res.end();
};

export default SocketHandler;