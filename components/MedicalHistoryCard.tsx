// MedicalHistoryCard.tsx
import { motion } from 'framer-motion';
import { FileText, AlertTriangle, Pill, Activity, Heart, Stethoscope } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function MedicalHistoryCard({ patient }) {
  const historyItems = [
    {
      label: "Allergies & Alerts",
      value: patient.allergies || 'None reported',
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-100"
    },
    {
      label: "Medical History",
      value: patient.previousConditions || 'None reported',
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100"
    },
    {
      label: "Current Medications",
      value: patient.medications || 'None reported',
      icon: Pill,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100"
    },
    {
      label: "Recent Procedures",
      value: patient.procedures || 'None reported',
      icon: Stethoscope,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100"
    }
  ];

  return (
    <Card className="bg-white hover:shadow-xl transition-all duration-500">
      <CardHeader className="border-b bg-white">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Activity className="w-5 h-5 text-primary" />
            </motion.div>
            Medical History
          </CardTitle>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center gap-2 text-xs font-medium text-blue-600 bg-white px-3 py-1 rounded-full border border-blue-200"
          >
            <Heart className="w-3 h-3" />
            MEDICAL RECORD
          </motion.div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {historyItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`bg-white p-4 rounded-xl border ${item.borderColor} shadow-sm hover:shadow-md transition-all duration-300`}
            >
              <div className={`flex items-center gap-3 mb-3 ${item.color}`}>
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className={`p-2 bg-white rounded-full border ${item.borderColor}`}
                >
                  <item.icon className="w-5 h-5" />
                </motion.div>
                <h4 className="font-medium">{item.label}</h4>
              </div>
              <div className="pl-[52px]">
                <p className="text-gray-600 leading-relaxed text-sm">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}