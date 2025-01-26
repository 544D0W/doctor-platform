// VitalsCard.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Heart, Thermometer, Wind, AlertCircle, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface VitalsCardProps {
  vitals: {
    heartRate: string;
    bloodPressure: string;
    temperature: string;
    oxygenSaturation: string;
  }
}

export default function VitalsCard({ vitals }: VitalsCardProps) {
  const vitalSigns = [
    {
      label: "Heart Rate",
      value: `${vitals.heartRate} bpm`,
      icon: Heart,
      normalRange: "60-100 bpm",
      status: parseInt(vitals.heartRate) < 60 || parseInt(vitals.heartRate) > 100 ? 'warning' : 'normal',
      color: "text-rose-600",
      bgColor: "bg-white",
      borderColor: "border-rose-200",
    },
    {
      label: "Blood Pressure",
      value: vitals.bloodPressure,
      icon: Activity,
      normalRange: "≤ 140/90 mmHg",
      status: parseInt(vitals.bloodPressure.split('/')[0]) > 140 ? 'warning' : 'normal',
      color: "text-blue-600",
      bgColor: "bg-white",
      borderColor: "border-blue-200",
    },
    {
      label: "Temperature",
      value: `${vitals.temperature}`,
      icon: Thermometer,
      normalRange: "36.5-37.5°C",
      status: parseFloat(vitals.temperature) > 38 ? 'warning' : 'normal',
      color: "text-amber-600",
      bgColor: "bg-white",
      borderColor: "border-amber-200",
    },
    {
      label: "O₂ Saturation",
      value: `${vitals.oxygenSaturation}`,
      icon: Wind,
      normalRange: "≥ 95%",
      status: parseInt(vitals.oxygenSaturation) < 95 ? 'warning' : 'normal',
      color: "text-emerald-600",
      bgColor: "bg-white",
      borderColor: "border-emerald-200",
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
            Vital Signs Monitor
          </CardTitle>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center gap-2 text-xs font-medium text-emerald-600 bg-white px-3 py-1 rounded-full border border-emerald-200"
          >
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            LIVE
          </motion.div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {vitalSigns.map((vital, index) => (
              <motion.div
                key={vital.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100 
                }}
                className={`relative bg-white p-4 rounded-xl border ${vital.borderColor} shadow-sm`}
              >
                <div className={`flex items-center gap-2 ${vital.color}`}>
                  <motion.div
                    animate={vital.status === 'warning' ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <vital.icon className="w-5 h-5" />
                  </motion.div>
                  <span className="font-medium">{vital.label}</span>
                </div>

                <div className="mt-3">
                  <div className="flex items-end gap-2">
                    <p className="text-2xl font-bold tracking-tight">
                      {vital.value}
                    </p>
                    <motion.div
                      animate={vital.status === 'warning' 
                        ? { y: [0, -4, 0], scale: [1, 1.1, 1] }
                        : { y: 0 }
                      }
                      transition={{ 
                        duration: 0.5,
                        repeat: vital.status === 'warning' ? Infinity : 0
                      }}
                    >
                      <TrendingUp className={
                        vital.status === 'warning' 
                          ? 'text-red-500 w-5 h-5'
                          : 'text-emerald-500 w-5 h-5'
                      } />
                    </motion.div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Normal range: {vital.normalRange}
                  </p>
                </div>

                {/* Status Indicator */}
                <motion.div
                  animate={{
                    scale: vital.status === 'warning' ? [1, 1.2, 1] : [1, 1.1, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: vital.status === 'warning' ? 1 : 2,
                    repeat: Infinity,
                  }}
                  className={`absolute bottom-2 right-2 w-2 h-2 rounded-full ${
                    vital.status === 'warning' ? 'bg-red-400' : 'bg-emerald-400'
                  }`}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}