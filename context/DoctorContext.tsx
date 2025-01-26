'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { Doctor } from '@/types';

interface DoctorContextType {
  doctors: Doctor[];
  updateDoctorStatus: (doctorId: string, newStatus: Doctor['availability']) => void;
}

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export function DoctorProvider({ children }: { children: React.ReactNode }) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    // Fetch initial doctors data
    fetch('/api/doctors')
      .then(res => res.json())
      .then(data => setDoctors(data.doctors))
      .catch(error => console.error('Error fetching doctors:', error));
  }, []);

  const updateDoctorStatus = (doctorId: string, newStatus: Doctor['availability']) => {
    setDoctors(prevDoctors => 
      prevDoctors.map(doctor => 
        doctor.id === doctorId 
          ? { ...doctor, availability: newStatus }
          : doctor
      )
    );
  };

  return (
    <DoctorContext.Provider value={{ doctors, updateDoctorStatus }}>
      {children}
    </DoctorContext.Provider>
  );
}

export function useDoctors() {
  const context = useContext(DoctorContext);
  if (context === undefined) {
    throw new Error('useDoctors must be used within a DoctorProvider');
  }
  return context;
} 