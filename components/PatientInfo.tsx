import { motion } from "framer-motion";
import { Patient } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import VitalsCard from '@/components/VitalsCard';
import MedicalHistoryCard from '@/components/MedicalHistoryCard';
import { UserRound, UserCircle, Calendar, Users, Activity } from 'lucide-react';

interface PatientInfoProps {
 patient: Patient;
}

export default function PatientInfo({ patient }: PatientInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="border-b bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <UserRound className="w-8 h-8 text-primary" />
            <CardTitle className="font-bold text-2xl">Patient Information</CardTitle>
          </div>
        </CardHeader>
  
        <CardContent className="space-y-6 p-6">
          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {[
              { label: "Name", value: patient.name, icon: <UserCircle className="w-5 h-5" /> },
              { label: "Age", value: `${patient.age} years`, icon: <Calendar className="w-5 h-5" /> },
              { label: "Gender", value: patient.gender, icon: <Users className="w-5 h-5" /> },
              { label: "Condition", value: patient.condition, icon: <Activity className="w-5 h-5" />, alert: true }
            ].map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl border bg-white shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-1 text-gray-500">
                  {item.icon}
                  <p className="text-sm">{item.label}</p>
                </div>
                <p className={`font-medium text-lg ${item.alert ? 'text-red-500' : ''}`}>
                  {item.value}
                </p>
              </motion.div>
            ))}
          </motion.div>
  
          <VitalsCard vitals={patient.vitals} />
          <MedicalHistoryCard patient={patient} />
        </CardContent>
      </Card>
    </motion.div>
  );
}