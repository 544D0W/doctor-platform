// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { readFileSync, readdirSync, statSync } from 'fs';
import path from 'path';

const client = new OpenAI({
 apiKey: process.env.SAMBANOVA_API_KEY!,
 baseURL: 'https://api.sambanova.ai/v1'
});

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

export async function POST(req: Request) {
 const { message, patientId } = await req.json();
 const trainingData = getLatestTrainingData();
 
 try {
   const response = await client.chat.completions.create({
     model: 'Meta-Llama-3.1-405B-Instruct',
     messages: [
       { 
         role: 'system', 
         content: 'You are a medical AI assistant. Use the provided training data to format responses.'
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

   return NextResponse.json({ response: response.choices[0].message.content });
 } catch (error) {
   console.error('API Error:', error);
   return NextResponse.json({ error: 'Failed to get AI response' }, { status: 500 });
 }
}