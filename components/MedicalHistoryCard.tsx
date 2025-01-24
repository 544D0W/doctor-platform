// MedicalHistoryCard.tsx
import { motion } from 'framer-motion';
import { FileText, AlertTriangle, Pill } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function MedicalHistoryCard({ patient }) {
  const historyItems = [
    {
      label: "Allergies",
      value: patient.allergies || 'None reported',
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />
    },
    {
      label: "Previous Conditions",
      value: patient.previousConditions || 'None reported',
      icon: <FileText className="w-5 h-5 text-blue-500" />
    },
    {
      label: "Current Medications",
      value: patient.medications || 'None reported',
      icon: <Pill className="w-5 h-5 text-green-500" />
    }
  ];

  return (
    <Card className="bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl">Medical History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {historyItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl border bg-white"
            >
              <div className="flex items-center gap-2 mb-2">
                {item.icon}
                <h4 className="font-medium">{item.label}</h4>
              </div>
              <p className="text-gray-600">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}