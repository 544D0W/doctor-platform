'use client';

import { useState, forwardRef, useImperativeHandle } from 'react';
import { Button } from "@/components/ui/button";
import { UserPlus, User } from "lucide-react";
import { motion } from "framer-motion";
import type { Patient, Doctor } from "@/types";
import { findAvailableDoctor, assignDoctorToPatient } from '@/lib/doctor-service';

interface AssignDoctorSectionProps {
  patient: Patient;
  onAssignDoctor: (doctor: Doctor) => void;
  autoAssign?: boolean;
  doctorToAssign?: string;
  suggestedDoctor?: string;
}

export type AssignDoctorRef = {
  assignDoctor: () => void;
};

const AssignDoctorSection = forwardRef<AssignDoctorRef, AssignDoctorSectionProps>(({
  patient,
  onAssignDoctor,
  autoAssign = false,
  doctorToAssign,
  suggestedDoctor
}, ref) => {
  const [isAssigning, setIsAssigning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAssignDoctor = async () => {
    setIsAssigning(true);
    setError(null);
    
    try {
      const matchedDoctor = await findAvailableDoctor(
        patient.condition, 
        'Not specified', 
        suggestedDoctor || doctorToAssign
      );

      const result = await assignDoctorToPatient(patient.id, matchedDoctor.id);
      
      if (result.success) {
        onAssignDoctor(result.assignedDoctor);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to assign doctor');
      console.error('Failed to assign doctor:', error);
    } finally {
      setIsAssigning(false);
    }
  };

  useImperativeHandle(ref, () => ({
    assignDoctor: handleAssignDoctor
  }));

  return (
    <div className="mt-6 p-4 border rounded-lg bg-white">
      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
        <User className="w-5 h-5 text-blue-500" />
        Assigned Doctor
      </h3>

      {patient.assignedDoctor ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"
        >
          <div className="p-2 bg-blue-100 rounded-full">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-blue-900">{patient.assignedDoctor.name}</p>
            <p className="text-sm text-blue-600">{patient.assignedDoctor.specialization}</p>
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center gap-3 p-6 border-2 border-dashed rounded-lg">
          <p className="text-gray-500">No doctor assigned yet</p>
          <Button
            onClick={handleAssignDoctor}
            disabled={isAssigning}
            className="flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            {isAssigning ? 'Assigning...' : 'Assign Doctor'}
          </Button>
        </div>
      )}
      
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
});

AssignDoctorSection.displayName = 'AssignDoctorSection';

export default AssignDoctorSection;