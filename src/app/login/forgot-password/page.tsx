'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a full Supabase implementation, you would call:
    // await supabase.auth.resetPasswordForEmail(email)
    
    // For now, simulate network request
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-[#1a1a1b] flex items-center justify-center p-6">
        <div className="card w-full max-w-md p-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-medium text-slate-900 dark:text-white mb-2">Check your email</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            We've sent a password reset link to <span className="font-medium text-slate-900 dark:text-white">{email}</span>.
          </p>
          <Link href="/login" className="btn-primary w-full text-center">
            Return to Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#1a1a1b] flex items-center justify-center p-6">
      <div className="card w-full max-w-md p-10 flex flex-col items-center">
        <div className="w-12 h-12 rounded bg-brand-600 flex items-center justify-center text-white mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-medium text-slate-900 dark:text-white mb-2">Reset Password</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8 text-center text-sm">Enter your email and we'll send you instructions.</p>

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email address</label>
            <input required type="email" placeholder="name@example.com" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          
          <div className="pt-2">
            <button type="submit" className="btn-primary w-full flex items-center justify-center h-10" disabled={isLoading}>
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Send Reset Link'}
            </button>
          </div>
          
          <div className="text-center mt-6">
            <Link href="/login" className="text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-colors">
              &larr; Back to login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
