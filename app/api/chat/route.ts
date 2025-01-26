// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import path from 'path';

const client = new OpenAI({
  apiKey: process.env.SAMBANOVA_API_KEY!,
  baseURL: 'https://api.sambanova.ai/v1'
});

async function makeCall(doctorPhone: string, doctorName: string, patientName: string, patientId: string) {
  console.log('Initiating call with params:', { doctorPhone, doctorName, patientName, patientId });
  
  try {
    const response = await fetch('https://rain.ngrok.app/make-call/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        dr_name: doctorName,
        patient_name: patientName,
        patient_id: patientId,
        number: doctorPhone
      })
    });

    console.log('Call API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Call API error:', errorText);
      throw new Error(`Failed to initiate call: ${errorText}`);
    }

    const result = await response.json();
    console.log('Call API success:', result);
    return result;
  } catch (error) {
    console.error('Error making call:', error);
    throw error;
  }
}

function getLatestTrainingData() {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    const files = readdirSync(dataDir)
      .filter(file => file.startsWith('emergency_'))
      .map(file => ({
        name: file,
        time: statSync(path.join(dataDir, file)).mtime.getTime()
      }))
      .sort((a, b) => b.time - a.time);

    if (!files.length) {
      console.warn('No training files found');
      return null;
    }

    const latestFile = path.join(dataDir, files[0].name);
    return JSON.parse(readFileSync(latestFile, 'utf8'));
  } catch (err) {
    console.error('Error reading training data:', err);
    return null;
  }
}

function getDoctors() {
  const doctorsFile = path.join(process.cwd(), 'data', 'doctors.json');
  return JSON.parse(readFileSync(doctorsFile, 'utf8'));
}

function updateDoctorStatus(doctorId: string, status: string) {
  const doctorsFile = path.join(process.cwd(), 'data', 'doctors.json');
  const doctorsData = getDoctors();
  
  doctorsData.doctors = doctorsData.doctors.map((doctor: any) => 
    doctor.id === doctorId ? { ...doctor, availability: status } : doctor
  );
  
  writeFileSync(doctorsFile, JSON.stringify(doctorsData, null, 2));
  return doctorsData.doctors.find((doctor: any) => doctor.id === doctorId);
}

function findAvailableDoctor(specialization: string) {
  const doctorsData = getDoctors();
  
  // First try to find a doctor with the exact specialization
  const exactMatch = doctorsData.doctors.find((doctor: any) => 
    doctor.specialization === specialization && 
    doctor.availability === "Available"
  );

  if (exactMatch) {
    return exactMatch;
  }

  // If no exact match, find any available doctor
  console.log('No exact specialty match, looking for any available doctor');
  const anyAvailable = doctorsData.doctors.find((doctor: any) => 
    doctor.availability === "Available"
  );

  if (anyAvailable) {
    console.log('Found available doctor:', anyAvailable.name);
    return anyAvailable;
  }

  console.log('No available doctors found at all');
  return null;
}

function handleDoctorAssignment(aiResponse: string | null, patientId: string) {
  if (!aiResponse) return null;
  
  if (aiResponse.toLowerCase().includes("doctor assigned to patient") || 
      aiResponse.toLowerCase().includes("assign available doctor")) {
    console.log('Doctor assignment triggered for patient:', patientId);
    
    // Find an available doctor (preferably Dr. Smith for this case)
    const doctor = findAvailableDoctor("Cardiologist");
    
    if (!doctor) {
      console.log('No available doctor found');
      return null;
    }

    // Update the doctor's status to Busy
    const updatedDoctor = updateDoctorStatus(doctor.id, "Busy");

    // Extract patient name from AI response or use a default
    const patientNameMatch = aiResponse.match(/patient\s+([^.]+)/i);
    const patientName = patientNameMatch ? patientNameMatch[1].trim() : "New Patient";

    console.log('Making call for:', { doctor: updatedDoctor.name, patient: patientName });

    // Make the call to the assigned doctor with proper parameters
    // Change from .catch to await to ensure the call is made
    try {
      makeCall(updatedDoctor.contact, updatedDoctor.name, patientName, patientId)
        .then(result => {
          console.log('Call successfully initiated:', result);
        })
        .catch(error => {
          console.error('Failed to make call:', error);
        });
    } catch (error) {
      console.error('Error in makeCall:', error);
    }
    
    return {
      type: "ASSIGN_DOCTOR",
      doctor: updatedDoctor,
      message: `Doctor ${updatedDoctor.name} has been assigned and notified.`
    };
  }
  return null;
}

export async function POST(req: Request) {
  const { message, patientId } = await req.json();
  const trainingData = getLatestTrainingData();

  try {
    const response = await client.chat.completions.create({
      model: 'Meta-Llama-3.3-70B-Instruct',
      messages: [
        {
          role: 'system',
          content: `You are a medical AI assistant. Use the provided training data to format responses. 
                   Only respond with "Doctor assigned to patient [patient_name]" when explicitly asked to assign a doctor.
                   If you detect the doctor saying they are busy or need a call, respond with: 
                   "CALL_REQUIRED: [patient context]"`
        },
        {
          role: 'system',
          content: JSON.stringify(trainingData)
        },
        { role: 'user', content: message }
      ],
      temperature: 0.1,
      top_p: 0.1
    });

    const aiResponse = response.choices[0].message.content;

    // Check for doctor assignment
    const assignmentAction = handleDoctorAssignment(aiResponse, patientId);
    if (assignmentAction) {
      const contactInfo = `
Contact Information:
Doctor: ${assignmentAction.doctor.name}
Specialization: ${assignmentAction.doctor.specialization}
Phone: ${assignmentAction.doctor.contact}
Email: ${assignmentAction.doctor.email}`;

      return NextResponse.json({ 
        response: `${aiResponse}\n\n${contactInfo}`,
        action: assignmentAction
      });
    }

    // Check if call is required
    if (aiResponse?.startsWith('CALL_REQUIRED:')) {
      if (assignmentAction) {
        return NextResponse.json({ 
          response: "Call initiated to doctor. " + aiResponse.replace('CALL_REQUIRED:', ''),
          action: { type: "MAKE_CALL" }
        });
      }
    }

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to get AI response' }, { status: 500 });
  }
}