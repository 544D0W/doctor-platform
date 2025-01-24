import React from 'react';
import { AlertCircle, ArrowUpDown, Clock, Filter } from 'lucide-react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedTitle from './AnimatedTitle';
import EmergencyCard from './EmergencyCard';

const EmergencyRequestPanel = ({ requests, onSelect }) => {
  const getSeverityColor = (priority) => {
    const colors = {
      high: "bg-gradient-to-r from-red-100/80 via-red-50/80 to-white border-red-500 text-red-700",
      medium: "bg-gradient-to-r from-orange-100/80 via-orange-50/80 to-white border-orange-500 text-orange-700",
      low: "bg-gradient-to-r from-green-100/80 via-green-50/80 to-white border-green-500 text-green-7 00"
    };
    return colors[priority.toLowerCase()] || colors.low;
  };

  const getVitalAlert = (vitals) => {
    if(vitals && parseInt(vitals.heartRate) > 100) {
      return (
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut"
          }}
        >
          <AlertCircle className="text-red-500 h-5 w-5" />
        </motion.div>
      );
    }
    return null;
  };

  return (
    <Card className="h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-xl border-0">
      <CardHeader className="border-b backdrop-blur-sm bg-white/30 sticky top-0 z-10 pb-6">
        <div className="flex justify-between items-center mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <CardTitle>
              <AnimatedTitle />
            </CardTitle>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Badge 
                variant="destructive" 
                className="bg-gradient-to-r from-red-500 to-rose-500 text-white px-3 py-1"
              >
                LIVE
              </Badge>
            </motion.div>
          </motion.div>

          <div className="flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "rgb(243 244 246)" }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <Filter className="w-5 h-5 text-gray-600" />
            </motion.button>
            <motion.button 
              whileHover={{ 
                rotate: 180,
                scale: 1.05,
                backgroundColor: "rgb(243 244 246)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <ArrowUpDown className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>
        </div>

        {/* Quick Stats with increased top margin */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4 mt-8"
        >
          {[
            { label: "High Priority", count: requests.filter(r => r.priority.toLowerCase() === 'high').length, color: 'text-red-600' },
            { label: "Medium Priority", count: requests.filter(r => r.priority.toLowerCase() === 'medium').length, color: 'text-orange-600' },
            { label: "Low Priority", count: requests.filter(r => r.priority.toLowerCase() === 'low').length, color: 'text-green-600' }
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.02 }}
              className="bg-white/50 backdrop-blur-sm rounded-lg px-4 py-2 border shadow-sm flex-1"
            >
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className={`text-xl font-bold ${stat.color}`}>{stat.count}</p>
            </motion.div>
          ))}
        </motion.div>
      </CardHeader>

      <ScrollArea className="h-[calc(100vh-14rem)]">
        <AnimatePresence mode="popLayout">
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
        </AnimatePresence>
      </ScrollArea>
    </Card>
  );
};

export default EmergencyRequestPanel;