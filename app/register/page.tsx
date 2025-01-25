'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Stethoscope, User, Phone, Mail, IdCard, Lock, Loader2, Award, Clock, UserCheck } from 'lucide-react';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        emiratesId: '',
        password: '',
        confirmPassword: '',
        specialization: '',
        experience: ''
    });
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error(await response.text());
            router.push('/login');
        } catch (error) {
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const renderStepIndicator = () => (
        <div className="flex justify-center space-x-4 mb-8">
            {[1, 2].map((num) => (
                <div 
                    key={num}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        step >= num ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                >
                    {num}
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-white relative flex">
            <div className="fixed inset-0 bg-slate-50 bg-grid bg-grid-pattern opacity-50" />
            
            <div className="relative flex w-full flex-col md:flex-row">
                <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="w-full max-w-sm">
                        <div className="relative mb-8 group">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 pointer-events-none">
                                <div className="h-16 w-16 bg-red-500/30 animate-glow blur-2xl rounded-full" />
                                <div className="absolute inset-0 h-16 w-16 bg-blue-500/20 animate-glow blur-2xl rounded-full" style={{ animationDelay: '1s' }} />
                            </div>
                            
                            <div className="relative flex justify-center animate-float">
                                <div className="rounded-full bg-gradient-to-r from-red-50 to-pink-50 p-4 group-hover:from-red-100 group-hover:to-pink-100 transition-colors duration-300 shine">
                                    {step === 1 ? (
                                        <Heart className="h-8 w-8 text-red-500 animate-heartbeat relative z-10" />
                                    ) : (
                                        <Stethoscope className="h-8 w-8 text-red-500 animate-heartbeat relative z-10" />
                                    )}
                                </div>
                            </div>
                        </div>

                        {renderStepIndicator()}

                        <div className="mb-8">
                            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                                {step === 1 ? 'Join Our Medical Team' : 'Professional Details'}
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600">
                                {step === 1 ? 'Create your account' : 'Tell us about your expertise'}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {step === 1 ? (
                                <div className="space-y-4 transition-all duration-500 transform-gpu" style={{
                                    opacity: step === 1 ? 1 : 0,
                                    transform: `translateX(${step === 1 ? '0' : '-100%'})`
                                }}>
                                    <InputWithIcon
                                        icon={<User />}
                                        type="text"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                        placeholder="Full Name"
                                        required
                                    />
                                    <InputWithIcon
                                        icon={<Mail />}
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        placeholder="Email Address"
                                        required
                                    />
                                    <InputWithIcon
                                        icon={<Lock />}
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                        placeholder="Password"
                                        required
                                    />
                                    <InputWithIcon
                                        icon={<Lock />}
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                        placeholder="Confirm Password"
                                        required
                                    />
                                </div>
                            ) : (
                                <div className="space-y-4 transition-all duration-500 transform-gpu" style={{
                                    opacity: step === 2 ? 1 : 0,
                                    transform: `translateX(${step === 2 ? '0' : '100%'})`
                                }}>
                                    <InputWithIcon
                                        icon={<Phone />}
                                        type="tel"
                                        value={formData.phoneNumber}
                                        onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                                        placeholder="Phone Number"
                                        required
                                    />
                                    <InputWithIcon
                                        icon={<IdCard />}
                                        type="text"
                                        value={formData.emiratesId}
                                        onChange={(e) => setFormData({...formData, emiratesId: e.target.value})}
                                        placeholder="Emirates ID"
                                        required
                                    />
                                    <InputWithIcon
                                        icon={<Award />}
                                        type="text"
                                        value={formData.specialization}
                                        onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                                        placeholder="Medical Specialization"
                                        required
                                    />
                                    <InputWithIcon
                                        icon={<Clock />}
                                        type="text"
                                        value={formData.experience}
                                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                                        placeholder="Years of Experience"
                                        required
                                    />
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="relative w-full rounded-lg bg-red-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                            >
                                <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
                                    {step === 1 ? 'Next' : 'Complete Registration'}
                                </span>
                                {isLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    </div>
                                )}
                                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-red-600 to-red-500 opacity-0 transition-opacity group-hover:opacity-100" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="relative hidden flex-1 md:flex decorative-section overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-red-500/30 via-blue-500/30 to-purple-500/30 animate-gradient" />
                        <div className="absolute inset-0 bg-grid opacity-10" />
                        <div className="absolute inset-0 mouse-trail transition-opacity duration-300" />
                        
                        <div className="absolute inset-0 pointer-events-none">
                            {Array.from({ length: 20 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute h-1 w-1 bg-white rounded-full animate-float"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                        animationDelay: `${Math.random() * 5}s`,
                                        opacity: 0.2
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="relative p-12 flex flex-col justify-center text-white">
                        <h2 className="text-4xl font-bold mb-4 hover:scale-105 transition-transform duration-300 shine">
                            Join Our Elite Medical Network
                        </h2>
                        <p className="text-lg mb-8 opacity-90 hover:opacity-100 transition-opacity">
                            Be part of UAE's premier emergency response system
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <StatsCard
                                icon={<Clock className="h-6 w-6" />}
                                value="24/7"
                                label="Emergency Response"
                            />
                            <StatsCard
                                icon={<UserCheck className="h-6 w-6" />}
                                value="100+"
                                label="Medical Teams"
                            />
                            <StatsCard
                                icon={<Award className="h-6 w-6" />}
                                value="95%"
                                label="Success Rate"
                            />
                            <StatsCard
                                icon={<Heart className="h-6 w-6" />}
                                value="1000+"
                                label="Lives Saved"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const InputWithIcon = ({ icon, ...props }) => (
    <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {React.cloneElement(icon, { 
                className: "h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors duration-200" 
            })}
        </div>
        <input
            {...props}
            className="block w-full rounded-lg border border-gray-200 pl-10 px-3 py-3 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 sm:text-sm"
        />
    </div>
);

const StatsCard = ({ icon, value, label }) => (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg shine">
        <div className="flex items-center space-x-2">
            {icon}
            <div className="text-2xl font-bold animate-float">{value}</div>
        </div>
        <div className="text-sm opacity-80 mt-1">{label}</div>
    </div>
);