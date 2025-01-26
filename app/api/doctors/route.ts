import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const doctorsFile = path.join(process.cwd(), 'data', 'doctors.json');
    const doctorsData = JSON.parse(readFileSync(doctorsFile, 'utf8'));
    return NextResponse.json(doctorsData);
  } catch (error) {
    console.error('Error reading doctors data:', error);
    return NextResponse.json({ error: 'Failed to get doctors' }, { status: 500 });
  }
} 