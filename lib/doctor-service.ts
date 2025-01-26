import type { Doctor, EmergencyRequest } from '@/types';

const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Soufiane Chami",
    specialization: "Cardiologist",
    type: "Senior Specialist",
    experience: "15 years",
    availability: "Available",
    rating: 4.8,
    patientsHandled: 1200,
    contact: "+971582863584",
    email: "sarah.johnson@hospital.com",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialization: "Neurologist",
    type: "Department Head",
    experience: "20 years",
    availability: "Available",
    rating: 4.9,
    patientsHandled: 1500,
    contact: "+1234567891",
    email: "michael.chen@hospital.com",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
  },
  {
    id: "3",
    name: "Dr. Smith",
    specialization: "Emergency Medicine",
    type: "Senior Specialist",
    experience: "12 years",
    availability: "Busy",
    rating: 4.7,
    patientsHandled: 1000,
    contact: "+1234567892",
    email: "smith@hospital.com",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Smith"
  }
];

export const findAvailableDoctor = async (
  condition: string, 
  symptoms: string, 
  suggestedDoctorId?: string
): Promise<Doctor> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (suggestedDoctorId) {
    const suggestedDoctor = doctors.find(d => d.id === suggestedDoctorId);
    if (suggestedDoctor?.availability === "Available") {
      return suggestedDoctor;
    }
  }

  const availableDoctor = doctors.find(d => d.availability === "Available");
  
  if (!availableDoctor) {
    throw new Error("No available doctors found");
  }

  return availableDoctor;
};

export const assignDoctorToPatient = async (
  patientId: string, 
  doctorId: string
): Promise<{ success: boolean; assignedDoctor: Doctor }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const assignedDoctor = doctors.find(d => d.id === doctorId);
  
  if (!assignedDoctor) {
    throw new Error("Doctor not found");
  }

  return {
    success: true,
    assignedDoctor
  };
};