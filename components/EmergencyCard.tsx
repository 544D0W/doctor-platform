import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Activity, Thermometer, Clock, UserRound, MapPin, 
  AlertCircle, ChevronRight, Stethoscope, ArrowUpRight 
} from 'lucide-react';
import { cn } from "@/lib/utils";

interface EmergencyCardProps {
  request: any;
  index: number;
  onSelect: (request: any) => void;
}

const EmergencyCard = ({ request, index, onSelect }: EmergencyCardProps) => {
  const getPriorityStyles = (priority: string) => ({
    high: "bg-gradient-to-r from-red-500/10 to-rose-500/10 border-l-red-500 text-red-700",
    medium: "bg-gradient-to-r from-orange-500/10 to-amber-500/10 border-l-orange-500 text-orange-700",
    low: "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-l-green-500 text-green-700"
  }[priority.toLowerCase()] || "");

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1
      }
    },
    hover: { 
      scale: 1.02,
      boxShadow: "0 10px 30px -15px rgba(0,0,0,0.2)"
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={cn(
        "relative overflow-hidden",
        "bg-white/80 backdrop-blur-sm rounded-xl",
        "border-l-4 shadow-lg transition-all duration-300",
        getPriorityStyles(request.priority)
      )}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full" />

      <div className="p-6 space-y-4">
        {/* Header with Patient Info */}
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="p-3 bg-primary/10 rounded-xl"
            >
              <UserRound className="w-8 h-8 text-primary" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{request.patient.name}</h3>
              <div className="flex items-center gap-2 mt-1 text-gray-500">
                <span className="text-sm">ID: {request.patient_id}</span>
              </div>
            </div>
          </div>

          <motion.span
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            className={cn(
              "px-3 py-1 text-xs font-semibold rounded-full",
              getPriorityStyles(request.priority)
            )}
          >
            {request.priority.toUpperCase()}
          </motion.span>
        </div>

        {/* Vitals Grid */}
        <div className="grid grid-cols-2 gap-3">
          <VitalCard
            icon={Heart}
            label="Heart Rate"
            value={`${request.patient.bpm || 'N/A'} bpm`}
            isWarning={parseInt(request.patient?.vitals?.heartRate) > 100}
          />
          <VitalCard
            icon={Activity}
            label="Age"
            value={`${request.patient.age || 'N/A'} years`}
            isWarning={parseInt(request.patient?.vitals?.bloodPressure?.split('/')[0]) > 140}
          />
        </div>

        {/* Condition Section */}
        <div className="bg-primary/5 backdrop-blur-sm rounded-xl p-4 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Stethoscope className="w-5 h-5 text-primary" />
            <h4 className="font-medium text-gray-900">Current Condition</h4>
          </div>
          <p className="text-gray-600 leading-relaxed">{request.patient.condition}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-gray-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              {new Date(request.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(request)}
            className={cn(
              "flex items-center gap-2 px-4 py-2",
              "bg-primary hover:bg-primary/90",
              "text-white rounded-full text-sm font-medium",
              "transition-colors duration-200"
            )}
          >
            View Details
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const VitalCard = ({ icon: Icon, label, value, isWarning }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={cn(
      "p-3 rounded-xl border backdrop-blur-sm",
      "transition-all duration-200",
      isWarning 
        ? "bg-red-50/50 border-red-200" 
        : "bg-primary/5 border-primary/20"
    )}
  >
    <div className={cn(
      "flex items-center gap-2",
      isWarning ? "text-red-600" : "text-primary"
    )}>
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
    </div>
    <div className="mt-2 flex items-end gap-2">
      <p className={cn(
        "text-lg font-bold tracking-tight",
        isWarning ? "text-red-700" : "text-gray-900"
      )}>
        {value}
      </p>
      {isWarning && (
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <AlertCircle className="w-4 h-4 text-red-500" />
        </motion.div>
      )}
    </div>
  </motion.div>
);

export default EmergencyCard;