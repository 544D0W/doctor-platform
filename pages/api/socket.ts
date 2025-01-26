import { Server } from 'socket.io';
import fs from 'fs';
import path from 'path';
import aiService from '@/services/aiService';

const saveEmergencyData = (emergencyData: any) => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const filename = `emergency_${emergencyData.id}_${timestamp}.json`;
  const filePath = path.join(dataDir, filename);

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

      socket.on('message', (data) => {
        console.log(data);
        
        const emergencyData = {
          patient_id: data.patient_id,
          id: data.conversation_id,
          patient: {
            id: data.loggedData._id,
            condition: data.diagnosis.patient.medical_diagnosis,
            symptoms: data.diagnosis.patient.symptoms,
            paramedics_tips: data.diagnosis.paramedics_tips,
            medications: data.diagnosis.medications,
            name: data.loggedData.patient_name || 'Unknown Patient',
            age: data.loggedData.patient_age,
            competence: data.loggedData.patient_competence,
            bpm: data.loggedData.patient_bpm
          },
          diagnosis: {
            ...data.diagnosis,
            diagnosed_by: data.diagnosed_by,
            timestamp: data.timestamp,
            _date: data.loggedData._date,
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