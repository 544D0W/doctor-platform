// VitalsCard.tsx
import { motion } from 'framer-motion';
import { Activity, Heart, Thermometer, Wind } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function VitalsCard({ vitals }) {
  const vitalSigns = [
    { 
      label: "Heart Rate", 
      value: vitals.heartRate,
      icon: <Heart className="w-5 h-5" />,
      color: "text-red-500",
      bgColor: "bg-red-50"
    },
    { 
      label: "Blood Pressure", 
      value: vitals.bloodPressure,
      icon: <Activity className="w-5 h-5" />,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    { 
      label: "Temperature", 
      value: vitals.temperature,
      icon: <Thermometer className="w-5 h-5" />,
      color: "text-orange-500",
      bgColor: "bg-orange-50"
    },
    { 
        label: "Oxygen Saturation", 
        value: vitals.oxygenSaturation,
        icon: <Wind className="w-5 h-5" />,
        color: "text-green-500",
        bgColor: "bg-green-50"
      }
  ];

  return (
    <Card className="bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl">Vital Signs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {vitalSigns.map((vital, index) => (
            <motion.div
              key={vital.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-xl ${vital.bgColor} border`}
            >
              <div className={`flex items-center gap-2 ${vital.color}`}>
                {vital.icon}
                <p className="text-sm font-medium">{vital.label}</p>
              </div>
              <p className="text-2xl font-bold mt-2">{vital.value}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}