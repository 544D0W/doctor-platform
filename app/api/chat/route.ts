// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import path from 'path';
import twilio from 'twilio';

const client = new OpenAI({
  apiKey: process.env.SAMBANOVA_API_KEY!,
  baseURL: 'https://api.sambanova.ai/v1'
});

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

async function makeCall(doctorPhone: string, message: string) {
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say({ voice: 'alice' }, `Urgent message regarding patient: ${message}`);
  
  return twilioClient.calls.create({
    twiml: twiml.toString(),
    to: doctorPhone,
    from: process.env.TWILIO_PHONE_NUMBER!
  });
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
  return doctorsData.doctors.find((doctor: any) => 
    doctor.specialization === specialization && 
    doctor.availability === "Available"
  );
}

function handleDoctorAssignment(aiResponse: string | null) {
  if (!aiResponse) return null;
  
  if (aiResponse.toLowerCase().includes("doctor assigned to patient") || 
      aiResponse.toLowerCase().includes("assign available doctor")) {
    // Find an available doctor (preferably Dr. Smith for this case)
    const doctor = findAvailableDoctor("Emergency Medicine");
    
    if (!doctor) {
      return null;
    }

    // Update the doctor's status to Busy
    const updatedDoctor = updateDoctorStatus(doctor.id, "Busy");
    
    return {
      type: "ASSIGN_DOCTOR",
      doctor: updatedDoctor
    };
  }
  return null;
}

export async function POST(req: Request) {
  const { message, patientId, doctorPhone } = await req.json();
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

    // Check for doctor assignment only if explicitly requested
    const assignmentAction = handleDoctorAssignment(aiResponse);
    if (assignmentAction) {
      return NextResponse.json({ 
        response: aiResponse,
        action: assignmentAction
      });
    }

    // Check if call is required
    if (aiResponse?.startsWith('CALL_REQUIRED:')) {
      if (doctorPhone) {
        await makeCall(doctorPhone, message);
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