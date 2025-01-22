'use client';

import { useState, useEffect } from 'react';
import { Brain, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getAIDiagnosis } from '@/lib/ai-service';
import type { Patient } from '@/types';

interface AIAssistantProps {
  patient: Patient;
}

export default function AIAssistant({ patient }: AIAssistantProps) {
    const [analysis, setAnalysis] = useState<string>('');
    const [recommendation, setRecommendation] = useState<string>('');
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchAIDiagnosis = async () => {
        try {
          setLoading(true);
          const aiResponse = await getAIDiagnosis(patient);
          
          // Basic parsing of the response (you might want to improve this)
          const sections = aiResponse.split('\n');
          setAnalysis(sections[0] || 'Analyzing patient condition');
          setRecommendation(sections[1] || 'Recommended actions pending');
        } catch (error) {
          console.error('Failed to fetch AI diagnosis:', error);
          setAnalysis('Unable to generate analysis');
          setRecommendation('Please consult a medical professional');
        } finally {
          setLoading(false);
        }
      };
  
      fetchAIDiagnosis();
    }, [patient]);

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="h-6 w-6 text-blue-500" />
        <h3 className="text-lg font-semibold">AI Assistant Analysis</h3>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Analysis Section */}
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-orange-800">Analysis</h4>
                <p className="text-orange-700 mt-1">{analysis}</p>
              </div>
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="bg-emerald-50 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-emerald-800">Recommendations</h4>
                <p className="text-emerald-700 mt-1">{recommendation}</p>
              </div>
            </div>
          </div>

          {/* Vital Signs Analysis */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-3">Vital Signs Analysis</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Heart Rate</p>
                <p className={`font-medium ${
                  parseInt(patient.vitals.heartRate) > 100 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {patient.vitals.heartRate}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Blood Pressure</p>
                <p className={`font-medium ${
                  parseInt(patient.vitals.bloodPressure.split('/')[0]) > 140 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {patient.vitals.bloodPressure}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Oxygen Saturation</p>
                <p className={`font-medium ${
                  parseInt(patient.vitals.oxygenSaturation) < 95 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {patient.vitals.oxygenSaturation}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Temperature</p>
                <p className={`font-medium ${
                  parseFloat(patient.vitals.temperature) > 38 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {patient.vitals.temperature}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}