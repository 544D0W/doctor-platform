import { motion } from "framer-motion";
import { Patient, Doctor } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import VitalsCard from '@/components/VitalsCard';
import MedicalHistoryCard from '@/components/MedicalHistoryCard';
import { 
  UserRound, UserCircle, Calendar, Users, Activity,
  Phone, MapPin, AlertCircle, Clock
} from 'lucide-react';
import AssignDoctorSection from './AssignDoctorSection';
import { useState, useEffect, useRef } from "react";
import { useDoctors } from '@/context/DoctorContext';

interface PatientInfoProps {
  patient: Patient;
}

export default function PatientInfo({ patient }: PatientInfoProps) {
  const [currentPatient, setCurrentPatient] = useState(patient);
  const assignDoctorRef = useRef<{ assignDoctor: () => void }>(null);
  const { updateDoctorStatus } = useDoctors();

  const patientDetails = [
    { 
      label: "Name", 
      value: currentPatient.name, 
      icon: UserCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    { 
      label: "Age", 
      value: `${currentPatient.age} years`, 
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    { 
      label: "Gender", 
      value: currentPatient.gender || "Male", 
      icon: Users,
      color: "text-teal-600",
      bgColor: "bg-teal-50"
    },
    { 
      label: "Contact", 
      value: currentPatient.contact || "052711889", 
      icon: Phone,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    }
  ];

  const handleAssignDoctor = async (doctor: Doctor) => {
    updateDoctorStatus(doctor.id, 'Busy');
    setCurrentPatient(prev => ({
      ...prev,
      assignedDoctor: {
        id: doctor.id,
        name: doctor.name,
        specialization: doctor.specialization
      }
    }));
  };

  const handleAIAssignment = (aiMessage: string) => {
    if (aiMessage.includes("Doctor assigned to patient")) {
      assignDoctorRef.current?.assignDoctor();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-500">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="p-2 bg-primary/10 rounded-xl"
              >
                <UserRound className="w-8 h-8 text-primary" />
              </motion.div>
              <div>
                <CardTitle className="font-bold text-2xl">Patient Information</CardTitle>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{currentPatient.location || "Location not available"}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{new Date().toLocaleString()}</span>
            </div>
          </div>
        </CardHeader>
  
        <CardContent className="space-y-8 p-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="font-semibold text-red-700">Current Condition</h3>
            </div>
            <p className="text-red-600">{currentPatient.condition}</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {patientDetails.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl border bg-white shadow-sm hover:shadow-md transition-all"
              >
                <div className={`flex items-center gap-3 mb-2 ${item.color}`}>
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className={`p-2.5 ${item.bgColor} rounded-full`}
                  >
                    <item.icon className="w-5 h-5" />
                  </motion.div>
                  <p className="text-sm font-medium text-gray-600">{item.label}</p>
                </div>
                <p className="text-lg font-semibold text-gray-900 pl-[52px]">{item.value}</p>
              </motion.div>
            ))}
          </motion.div>
          <VitalsCard vitals={currentPatient.vitals} />
          <MedicalHistoryCard patient={currentPatient} />
          <AssignDoctorSection 
            ref={assignDoctorRef}
            patient={currentPatient}
            onAssignDoctor={handleAssignDoctor}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}