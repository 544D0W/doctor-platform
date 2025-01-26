export interface SocketMessage {
  type: string;
  data: any;
  timestamp: number;
}

export interface SocketAuth {
  doctorId: string;
}

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
    assignedDoctor?: {
        id: string;
        name: string;
        specialization: string;
    } | null;
  }
  
  export interface EmergencyRequest {
    id: string;
    patient: {
      id: string;
      name: string;
      age?: string;
      bpm?: string;
      condition: string;
      symptoms: string;
      paramedics_tips: string;
      medications: {
        injections?: string;
        medicines?: string;
        painkillers?: string;
      };
      conversation?: string[];
      vitals?: {
        heartRate: string;
        bloodPressure: string;
        oxygenSaturation: string;
        temperature: string;
      };
    };
    diagnosis: {
      patient: {
        medical_diagnosis: string;
        symptoms: string;
      };
      paramedics_tips: string;
      medications: {
        injections?: string;
        medicines?: string;
        painkillers?: string;
      };
      conversation_status: string;
      diagnosed_by: string;
      timestamp: string;
      status: string;
    };
    priority: 'high' | 'medium' | 'low';
    timestamp: string;
    status: string;
  }
  
  export interface Message {
    id: string;
    content: string;
    sender: 'doctor' | 'ambulance';
    timestamp: string;
    requestId: string;
  }

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  type: string;
  experience: string;
  availability: 'Available' | 'Busy' | 'Off-duty';
  rating: number;
  patientsHandled: number;
  contact: string;
  email: string;
  imageUrl?: string;
}