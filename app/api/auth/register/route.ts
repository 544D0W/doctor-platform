import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Doctor from '@/models/Doctor';

export async function POST(req: Request) {
    try {
        await connectDB();
        const { fullName, phoneNumber, email, emiratesId, password } = await req.json();
        
        const existingDoctor = await Doctor.findOne({ $or: [{ email }, { emiratesId }] });
        if (existingDoctor) {
            return NextResponse.json({ error: 'Email or Emirates ID already registered' }, { status: 400 });
        }

        const doctor = new Doctor({ fullName, phoneNumber, email, emiratesId, password });
        await doctor.save();
        
        return NextResponse.json({ message: 'Registration successful' }, { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
    }
}