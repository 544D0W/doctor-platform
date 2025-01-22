import { Patient } from '@/types';

interface PatientInfoProps {
  patient: Patient;
}

export default function PatientInfo({ patient }: PatientInfoProps) {
  return (
    <div className="bg-white rounded-lg border p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{patient.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Age</p>
            <p className="font-medium">{patient.age} years</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Gender</p>
            <p className="font-medium">{patient.gender}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Condition</p>
            <p className="font-medium text-red-600">{patient.condition}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Vital Signs</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Heart Rate</p>
            <p className="font-medium text-lg">{patient.vitals.heartRate}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Blood Pressure</p>
            <p className="font-medium text-lg">{patient.vitals.bloodPressure}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Oxygen Saturation</p>
            <p className="font-medium text-lg">{patient.vitals.oxygenSaturation}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Temperature</p>
            <p className="font-medium text-lg">{patient.vitals.temperature}</p>
          </div>
        </div>
      </div>
    </div>
  );
}