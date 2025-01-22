'use client';

import { useState, useEffect } from 'react';
import { Heart, Lock, Mail, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Handle mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const decorativeSection = document.querySelector('.decorative-section');
      
      // Safeguard against null/undefined
      if (!decorativeSection) return;
  
      // Type-safe check for HTMLElement
      if (decorativeSection instanceof HTMLElement) {
        const rect = decorativeSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Safe style property access
        decorativeSection.style.setProperty('--mouse-x', `${x}px`);
        decorativeSection.style.setProperty('--mouse-y', `${y}px`);
      }
    };
  
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Add simple validation
    if (!email || !password) {
      alert('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      // For demo, we're using hardcoded credentials
      // In a real app, this would be an API call
      if (email === 'doctor@gmail.com' && password === '123') {
        // Store auth state (In a real app, store a token)
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', email);

        // Navigate to dashboard after successful login
        router.push('/dashboard');
      } else {
        alert('Invalid credentials');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative flex">
      {/* Background decoration */}
      <div className="fixed inset-0 bg-slate-50 bg-grid bg-grid-pattern opacity-50" />

      {/* Login container */}
      <div className="relative flex w-full flex-col md:flex-row">
        {/* Form section */}
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="w-full max-w-sm">
            {/* Enhanced Animated Logo/Header */}
            <div className="relative mb-12 group">
              {/* Multi-layered glow effect */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 pointer-events-none">
                <div className="h-16 w-16 bg-red-500/30 animate-glow blur-2xl rounded-full" />
                <div className="absolute inset-0 h-16 w-16 bg-blue-500/20 animate-glow blur-2xl rounded-full" style={{ animationDelay: '1s' }} />
              </div>
              
              {/* Floating heart container */}
              <div className="relative flex justify-center animate-float">
                <div className="rounded-full bg-gradient-to-r from-red-50 to-pink-50 p-4 group-hover:from-red-100 group-hover:to-pink-100 transition-colors duration-300 shine">
                  <Heart className="h-8 w-8 text-red-500 animate-heartbeat relative z-10" />
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Welcome Back
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Access the emergency response system
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                {/* Email input */}
                <div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
                    </div>
                    <input
                       type="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       required
                      className="block w-full rounded-lg border border-gray-200 pl-10 px-3 py-3 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                </div>

                {/* Password input */}
                <div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
                    </div>
                    <input
                       type="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required
                      className="block w-full rounded-lg border border-gray-200 pl-10 px-3 py-3 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-red-500 focus:ring-red-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-red-500 hover:text-red-400 transition-colors duration-200">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full rounded-lg bg-red-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                >
                  <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
                    Sign in
                  </span>
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                  )}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-red-600 to-red-500 opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Enhanced decorative section */}
        <div className="relative hidden flex-1 md:flex decorative-section overflow-hidden">
          <div className="absolute inset-0">
            {/* Enhanced gradient background */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-500/30 via-blue-500/30 to-purple-500/30 animate-gradient" />
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div className="absolute inset-0 mouse-trail transition-opacity duration-300" />
            
            {/* Interactive particles */}
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

          {/* Content with enhanced animations */}
          <div className="relative p-12 flex flex-col justify-center text-white">
            <h2 className="text-4xl font-bold mb-4 hover:scale-105 transition-transform duration-300 shine">
              Emergency Response Platform
            </h2>
            <p className="text-lg mb-8 opacity-90 hover:opacity-100 transition-opacity">
              Rapid response system connecting healthcare professionals for immediate emergency care
            </p>
            
            {/* Enhanced stat cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg shine">
                <div className="text-3xl font-bold animate-float" style={{ animationDelay: '0.5s' }}>24/7</div>
                <div className="text-sm opacity-80">Emergency Response</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg shine">
                <div className="text-3xl font-bold animate-float" style={{ animationDelay: '1s' }}>100+</div>
                <div className="text-sm opacity-80">Medical Teams</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}