import { Patient } from '@/types';

// Track last response time to prevent spam
let lastResponseTime = 0;
const MIN_RESPONSE_INTERVAL = 3000; // 3 seconds minimum between responses

const responseTemplates = {
  'chest pain': [
    "Based on vitals (HR {heartRate}, BP {bloodPressure}): Recommend immediate ECG and cardiac workup. Alert cardiac team.",
    "Analysis of vitals suggests potential cardiac event. O2 sat at {oxygenSaturation}. Recommend immediate nitroglycerin assessment.",
    "Cardiac monitoring indicates attention needed. Preparing emergency response protocols.",
  ],
  'breathing difficulty': [
    "Respiratory assessment - O2 sat: {oxygenSaturation}. Recommend bronchodilator administration and continuous monitoring.",
    "Breathing difficulty protocol initiated. Current vitals: HR {heartRate}, BP {bloodPressure}. Preparing respiratory support.",
    "Assessing respiratory distress. Oxygen therapy recommended based on saturation of {oxygenSaturation}.",
  ],
  'default': [
    "Medical assessment: Vital signs require monitoring - HR: {heartRate}, BP: {bloodPressure}. Continuing observation.",
    "Current status: Vitals being monitored. O2 saturation: {oxygenSaturation}. Maintaining emergency protocols.",
    "Patient status: Monitoring vital signs and maintaining emergency care procedures.",
  ]
};

function formatResponse(template: string, patient: Patient): string {
  return template
    .replace('{heartRate}', patient.vitals.heartRate)
    .replace('{bloodPressure}', patient.vitals.bloodPressure)
    .replace('{oxygenSaturation}', patient.vitals.oxygenSaturation)
    .replace('{temperature}', patient.vitals.temperature);
}

export async function getAIDiagnosis(patient: Patient, query: string): Promise<string> {
  // Check if enough time has passed since last response
  const now = Date.now();
  if (now - lastResponseTime < MIN_RESPONSE_INTERVAL) {
    throw new Error('Please wait before sending another message');
  }
  
  lastResponseTime = now;

  try {
    // Try AI service first
    if (process.env.NEXT_PUBLIC_SAMBANOVA_API_KEY) {
      try {
        const response = await fetch('https://api.sambanova.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SAMBANOVA_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'Meta-Llama-3.1-405B-Instruct',
            messages: [
              {
                role: 'system',
                content: 'You are a medical AI assistant. Analyze the patient data and query to provide specific medical recommendations.'
              },
              {
                role: 'user',
                content: `Patient Data: ${JSON.stringify(patient)}
                         Query: ${query}
                         Provide specific medical analysis and recommendations.`
              }
            ],
            temperature: 0.1,
            max_tokens: 300,
          })
        });

        if (response.ok) {
          const data = await response.json();
          return data.choices[0].message.content;
        }
      } catch (error) {
        console.error('AI service error:', error);
      }
    }

    // Fallback system with proper parsing of query
    let responseSet = responseTemplates.default;
    const condition = patient.condition.toLowerCase();
    const queryLower = query.toLowerCase();

    // More specific response selection based on query content
    if (queryLower.includes('recommend') || queryLower.includes('what') || queryLower.includes('action')) {
      if (condition.includes('chest pain')) {
        responseSet = responseTemplates['chest pain'];
      } else if (condition.includes('breathing')) {
        responseSet = responseTemplates['breathing difficulty'];
      }
    }

    // Use a combination of time and query to select response
    const index = Math.floor(now / MIN_RESPONSE_INTERVAL) % responseSet.length;
    return formatResponse(responseSet[index], patient);

  } catch (error) {
    if (error.message === 'Please wait before sending another message') {
      throw error; // Re-throw rate limit error
    }
    console.error('Response generation error:', error);
    return 'Please wait a moment before sending another message. Emergency protocols are being followed.';
  }
}