// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.SAMBANOVA_API_KEY!,
  baseURL: 'https://api.sambanova.ai/v1'
});

export async function POST(req: Request) {
  const { message, patientId } = await req.json();
  
  try {
    const response = await client.chat.completions.create({
      model: 'Meta-Llama-3.1-405B-Instruct',
      messages: [
        { role: 'system', content: 'You are a medical AI assistant' },
        { role: 'user', content: message }
      ],
      temperature: 0.1,
      top_p: 0.1
    });

    return NextResponse.json({ response: response.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get AI response' }, { status: 500 });
  }
}