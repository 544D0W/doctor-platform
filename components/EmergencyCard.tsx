import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Thermometer, Clock, UserRound, MapPin } from 'lucide-react';

const EmergencyCard = ({ request, index, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, x: 5 }}
      className="bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-lg p-6 border-l-4 border-red-500"
    >
      {/* Header with Priority Badge */}
      <div className="flex justify-between items-start">
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ x: 5 }}
        >
          <UserRound className="w-10 h-10 text-gray-600" />
          <div>
            <h3 className="text-xl font-bold">{request.patient.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>Location : Abudhabi alzahya 57st golden building</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-medium text-sm"
        >
          {request.priority}
        </motion.div>
      </div>

      {/* Condition & Symptoms */}
      <div className="mt-4 space-y-2">
        <div className="p-3 rounded-lg bg-gray-50">
          <h4 className="font-medium text-gray-700">Condition</h4>
          <p className="text-red-600 font-semibold">{request.patient.condition}</p>
        </div>
        <div className="p-3 rounded-lg bg-gray-50">
          <h4 className="font-medium text-gray-700">Symptoms</h4>
          <p className="text-gray-600">{request.patient.symptoms}</p>
        </div>
      </div>

      {/* Vitals Grid */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="p-3 rounded-lg bg-blue-50 border border-blue-100"
        >
          <div className="flex items-center gap-2 text-blue-600">
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">Heart Rate</span>
          </div>
          <p className="mt-1 text-xl font-bold text-blue-700">
            {request.patient?.vitals?.heartRate || 'N/A'} 
            <span className="text-sm font-normal">bpm</span>
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="p-3 rounded-lg bg-green-50 border border-green-100"
        >
          <div className="flex items-center gap-2 text-green-600">
            <Activity className="w-4 h-4" />
            <span className="text-sm font-medium">Blood Pressure</span>
          </div>
          <p className="mt-1 text-xl font-bold text-green-700">
            {request.patient?.vitals?.bloodPressure || 'N/A'}
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-between items-center pt-3 border-t">
        <div className="flex items-center gap-2 text-gray-500">
          <Clock className="w-4 h-4" />
          <span className="text-sm">
            {new Date(request.timestamp).toLocaleTimeString()}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => onSelect(request)}
          className="px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition-colors"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EmergencyCard;