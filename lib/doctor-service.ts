import type { Doctor, Patient } from '@/types';

// Define condition to specialization mapping
const conditionToSpecialization: Record<string, string[]> = {
  "Heart Attack": ["Cardiologist", "Emergency Medicine"],
  "Stroke": ["Neurologist", "Emergency Medicine"],
  "Fracture": ["Orthopedics", "Emergency Medicine"],
  "Severe Trauma": ["Emergency Medicine", "Trauma Surgeon"],
  "Subarachnoid Hemorrhage": ["Neurologist", "Emergency Medicine", "Neurosurgeon"],
  "Respiratory Failure": ["Pulmonologist", "Emergency Medicine"],
  "Cardiac Arrest": ["Cardiologist", "Emergency Medicine"],
  "Head Injury": ["Neurologist", "Emergency Medicine", "Neurosurgeon"],
  "Internal Bleeding": ["Emergency Medicine", "General Surgeon"],
};

// Mock doctors database (replace with actual database later)
const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialization: "Emergency Medicine",
    type: "Senior Specialist",
    experience: "15 years",
    availability: "Available",
    rating: 4.8,
    patientsHandled: 1200,
    contact: "+1234567890",
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
    availability: "Available",
    rating: 4.7,
    patientsHandled: 1000,
    contact: "+1234567892",
    email: "smith@hospital.com",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Smith"
  },
  // Add more mock doctors...
];

export async function findAvailableDoctor(
  condition: string, 
  symptoms: string,
  specificDoctorName?: string
) {
  try {
    if (specificDoctorName) {
      // Find the specific doctor
      const doctor = mockDoctors.find(
        d => d.name.toLowerCase() === specificDoctorName.toLowerCase() && 
        d.availability === "Available"
      );
      
      if (!doctor) {
        throw new Error(`${specificDoctorName} is not available`);
      }

      return {
        id: doctor.id,
        name: doctor.name,
        specialization: doctor.specialization,
        availability: doctor.availability,
        score: 5,
        matchReason: `Specifically requested doctor: ${doctor.name}`
      };
    }

    // 1. Find relevant specializations for the condition
    const relevantSpecializations = conditionToSpecialization[condition] || ["Emergency Medicine"];

    // 2. Filter available doctors by specialization
    const availableDoctors = mockDoctors.filter(doctor => 
      doctor.availability === "Available" && 
      relevantSpecializations.includes(doctor.specialization)
    );

    if (availableDoctors.length === 0) {
      throw new Error("No available doctors found for this condition");
    }

    // 3. Score doctors based on various factors
    const scoredDoctors = availableDoctors.map(doctor => {
      let score = 0;
      
      // Experience score (0-5 points)
      const yearsExperience = parseInt(doctor.experience);
      score += Math.min(yearsExperience / 4, 5);
      
      // Rating score (0-3 points)
      score += doctor.rating * 0.6;
      
      // Patients handled score (0-2 points)
      score += Math.min(doctor.patientsHandled / 1000, 2);
      
      // Specialization priority score (0-3 points)
      const specializationIndex = relevantSpecializations.indexOf(doctor.specialization);
      score += (relevantSpecializations.length - specializationIndex) * 1.5;

      return { ...doctor, score };
    });

    // 4. Sort doctors by score and get the best match
    const bestMatch = scoredDoctors.sort((a, b) => b.score - a.score)[0];

    // 5. Return the matched doctor
    return {
      id: bestMatch.id,
      name: bestMatch.name,
      specialization: bestMatch.specialization,
      availability: bestMatch.availability,
      score: bestMatch.score,
      matchReason: `Best matched doctor based on specialization in ${bestMatch.specialization} and ${bestMatch.experience} of experience`
    };

  } catch (error) {
    console.error('Error finding available doctor:', error);
    throw error;
  }
}

export async function assignDoctorToPatient(patientId: string, doctorId: string) {
  try {
    // Find the doctor
    const doctor = mockDoctors.find(d => d.id === doctorId);
    if (!doctor) {
      throw new Error('Doctor not found');
    }

    // In a real application, you would:
    // 1. Update the doctor's availability status
    // 2. Create an assignment record in the database
    // 3. Update the patient's record with the assigned doctor
    // 4. Notify the doctor about the new patient

    return {
      success: true,
      assignedDoctor: {
        id: doctor.id,
        name: doctor.name,
        specialization: doctor.specialization
      }
    };
  } catch (error) {
    console.error('Error assigning doctor:', error);
    throw error;
  }
} 