import { motion } from "framer-motion";
import { Patient } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PatientInfoProps {
 patient: Patient;
}

export default function PatientInfo({ patient }: PatientInfoProps) {
 return (
   <motion.div
     initial={{ opacity: 0, y: 10 }}
     animate={{ opacity: 1, y: 0 }}
     exit={{ opacity: 0, y: -10 }}
     transition={{ duration: 0.3 }}
   >
     <Card>
       <CardHeader>
         <CardTitle className="font-bold text-2xl">Patient Information</CardTitle>
       </CardHeader>
       <CardContent className="space-y-6">
         <div className="grid grid-cols-2 gap-4">
           <div className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
             <p className="text-sm text-muted-foreground">Name</p>
             <p className="font-medium">{patient.name}</p>
           </div>
           <div className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
             <p className="text-sm text-muted-foreground">Age</p>
             <p className="font-medium">{patient.age} years</p>
           </div>
           <div className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
             <p className="text-sm text-muted-foreground">Gender</p>
             <p className="font-medium">{patient.gender}</p>
           </div>
           <div className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
             <p className="text-sm text-muted-foreground">Condition</p>
             <p className="font-medium text-destructive">{patient.condition}</p>
           </div>
         </div>

         <Card>
           <CardHeader>
             <CardTitle className="text-xl">Vital Signs</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="grid grid-cols-2 gap-4">
               <motion.div 
                 className="bg-accent/50 p-4 rounded-lg"
                 whileHover={{ scale: 1.02 }}
                 transition={{ type: "spring", stiffness: 300 }}
               >
                 <p className="text-sm text-muted-foreground">Heart Rate</p>
                 <p className="font-medium text-lg">{patient.vitals.heartRate}</p>
               </motion.div>
               <motion.div 
                 className="bg-accent/50 p-4 rounded-lg"
                 whileHover={{ scale: 1.02 }}
                 transition={{ type: "spring", stiffness: 300 }}
               >
                 <p className="text-sm text-muted-foreground">Blood Pressure</p>
                 <p className="font-medium text-lg">{patient.vitals.bloodPressure}</p>
               </motion.div>
               <motion.div 
                 className="bg-accent/50 p-4 rounded-lg"
                 whileHover={{ scale: 1.02 }}
                 transition={{ type: "spring", stiffness: 300 }}
               >
                 <p className="text-sm text-muted-foreground">Oxygen Saturation</p>
                 <p className="font-medium text-lg">{patient.vitals.oxygenSaturation}</p>
               </motion.div>
               <motion.div 
                 className="bg-accent/50 p-4 rounded-lg"
                 whileHover={{ scale: 1.02 }}
                 transition={{ type: "spring", stiffness: 300 }}
               >
                 <p className="text-sm text-muted-foreground">Temperature</p>
                 <p className="font-medium text-lg">{patient.vitals.temperature}</p>
               </motion.div>
             </div>
           </CardContent>
         </Card>

         <Card>
           <CardHeader>
             <CardTitle className="text-xl">Medical History</CardTitle>
           </CardHeader>
           <CardContent>
             <motion.div 
               className="space-y-2"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.2 }}
             >
               <p className="text-sm text-muted-foreground">Allergies</p>
               <p className="font-medium">{patient.allergies || 'None reported'}</p>
               <p className="text-sm text-muted-foreground mt-4">Previous Conditions</p>
               <p className="font-medium">{patient.previousConditions || 'None reported'}</p>
               <p className="text-sm text-muted-foreground mt-4">Current Medications</p>
               <p className="font-medium">{patient.medications || 'None reported'}</p>
             </motion.div>
           </CardContent>
         </Card>
       </CardContent>
     </Card>
   </motion.div>
 );
}