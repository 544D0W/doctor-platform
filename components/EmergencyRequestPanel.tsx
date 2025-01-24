import React from 'react';
import { AlertCircle, ArrowUpDown, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import AnimatedTitle from './AnimatedTitle';
import EmergencyCard from './EmergencyCard';

const EmergencyRequestPanel = ({ requests, onSelect }) => {
  const getSeverityColor = (priority) => {
    const colors = {
      critical: "bg-gradient-to-r from-red-100 to-red-50 border-red-500 text-red-700",
      urgent: "bg-gradient-to-r from-orange-100 to-orange-50 border-orange-500 text-orange-700",
      standard: "bg-gradient-to-r from-blue-100 to-blue-50 border-blue-500 text-blue-700"
    };
    return colors[priority.toLowerCase()] || colors.standard;
  };

  const getVitalAlert = (vitals) => {
    if(vitals) {
      if (parseInt(vitals.heartRate) > 100) {
        return (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <AlertCircle className="text-red-500" />
          </motion.div>
        );
      }
    }
    return null;
  };

  return (
    <Card className="h-screen bg-gradient-to-b from-white to-gray-50 shadow-xl">
      <CardHeader className="border-b backdrop-blur-sm bg-white/30">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle>
  <AnimatedTitle />
</CardTitle>
          </motion.div>
          <div className="flex gap-2">
            <motion.button 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="p-2 hover:bg-gray-200 rounded-full"
            >
              <ArrowUpDown className="w-5 h-5" />
            </motion.button>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Badge variant="destructive" className="bg-red-500">
                LIVE
              </Badge>
            </motion.div>
          </div>
        </div>
      </CardHeader>

      <ScrollArea className="h-[calc(100vh-5rem)]">
      <div className="p-4 space-y-4">
    {requests.map((request, index) => (
      <EmergencyCard 
        key={request.id}
        request={request}
        index={index}
        onSelect={onSelect}
      />
    ))}
  </div>
      </ScrollArea>
    </Card>
  );
};

export default EmergencyRequestPanel;