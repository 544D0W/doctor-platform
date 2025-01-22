export interface Patient {
    id: string;
    name: string;
    age: number;
    gender: string;
    condition: string;
    vitals: {
      heartRate: string;
      bloodPressure: string;
      oxygenSaturation: string;
      temperature: string;
    };
  }
  
  export interface EmergencyRequest {
    id: string;
    patient: Patient;
    timestamp: string;
    status: 'pending' | 'active' | 'resolved';
    priority: 'high' | 'medium' | 'low';
    location: string;
  }
  
  export interface Message {
    id: string;
    content: string;
    sender: 'doctor' | 'ambulance';
    timestamp: string;
    requestId: string;
  }