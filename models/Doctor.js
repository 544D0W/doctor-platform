import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const doctorSchema = new mongoose.Schema({
    fullName: String,
    phoneNumber: String,
    email: { type: String, unique: true },
    emiratesId: { type: String, unique: true },
    password: String
});

doctorSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export default mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);