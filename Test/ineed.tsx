 {/* Medications */}
 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="bg-white border rounded-xl p-4 shadow-sm"
>
 <h3 className="font-semibold text-lg mb-4">Medications</h3>
 <div className="space-y-3">
   <p><span className="font-semibold">Injections: </span>{patient.medications.injections}</p>
   <p><span className="font-semibold">Medicines: </span>{patient.medications.medicines}</p>
   <p><span className="font-semibold">Painkillers: </span>{patient.medications.painkillers}</p>
 </div>
</motion.div>