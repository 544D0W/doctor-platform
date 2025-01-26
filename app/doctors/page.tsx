'use client';

import DoctorsTable from '@/components/DoctorsTable';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { UserRound } from 'lucide-react';
import Header from '@/components/ui/Header';

export default function DoctorsPage() {
  // Add any notification state management here if needed
  const hasNewAlert = false;
  const notifications = null;
  const toggleNotification = () => {};
  const doctorName = "Dr. John Doe"; // Replace with actual doctor name

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        notifications={notifications}
        hasNewAlert={hasNewAlert}
        toggleNotification={toggleNotification}
        doctorName={doctorName}
      />
      
      <div className="container mx-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white shadow-lg">
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="p-2 bg-primary/10 rounded-xl"
                >
                  <UserRound className="w-8 h-8 text-primary" />
                </motion.div>
                <CardTitle className="font-bold text-2xl">Doctors</CardTitle>
              </div>
            </CardHeader>
            <DoctorsTable />
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 