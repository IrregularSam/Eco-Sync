'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import Link from 'next/link';

function VerifyOTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !email) return;

    setIsLoading(true);
    setErrorMsg('');
    try {
      await api.verifySignupOtp(email, token);
      router.push('/user');
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || 'Invalid code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#1a1a1b] flex items-center justify-center p-6">
      <div className="card w-full max-w-md p-10 flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-medium text-slate-900 dark:text-white mb-2">Check your email</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6 text-center text-sm">
          We sent a 6-digit code to <span className="font-medium text-slate-900 dark:text-white">{email}</span>.
        </p>

        {errorMsg && (
          <div className="w-full mb-6 p-3 rounded bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleVerify} className="w-full space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 text-center">Enter 6-digit code</label>
            <input 
              required 
              type="text" 
              maxLength={6}
              placeholder="000000" 
              className="input-field text-center text-2xl tracking-[0.5em] font-medium placeholder:font-normal" 
              value={token} 
              onChange={(e) => setToken(e.target.value.replace(/[^0-9]/g, ''))} 
            />
          </div>
          
          <button type="submit" className="btn-primary w-full flex items-center justify-center h-11" disabled={isLoading || token.length < 6}>
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Verify & Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500">
          Didn't receive it? <Link href="/signup" className="text-brand-600 hover:underline">Try signing up again</Link>
        </div>
      </div>
    </main>
  );
}

export default function VerifyOTP() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>}>
      <VerifyOTPContent />
    </Suspense>
  );
}
