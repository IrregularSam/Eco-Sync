'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import Link from 'next/link';

function ResetOTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !email) return;

    setIsLoading(true);
    setErrorMsg('');
    try {
      await api.verifyPasswordReset(email, token);
      setIsVerified(true);
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || 'Invalid code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) return;

    setIsLoading(true);
    setErrorMsg('');
    try {
      await api.updatePassword(newPassword);
      router.push('/login');
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || 'Failed to update password.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerified) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-[#1a1a1b] flex items-center justify-center p-6">
        <div className="card w-full max-w-md p-10 flex flex-col items-center">
          <div className="w-12 h-12 rounded bg-brand-600 flex items-center justify-center text-white mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-medium text-slate-900 dark:text-white mb-2">Set New Password</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6 text-center text-sm">
            Enter your new password below.
          </p>

          {errorMsg && (
            <div className="w-full mb-6 p-3 rounded bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="w-full space-y-6">
            <div className="relative">
              <input required type={showPassword ? "text" : "password"} placeholder="New Password" className="input-field pr-10" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
            
            <button type="submit" className="btn-primary w-full flex items-center justify-center h-11" disabled={isLoading || newPassword.length < 6}>
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Update Password'}
            </button>
          </form>
        </div>
      </main>
    );
  }

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
          We sent a 6-digit recovery code to <span className="font-medium text-slate-900 dark:text-white">{email}</span>.
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
            ) : 'Verify Code'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500">
          Didn't receive it? <Link href="/login/forgot-password" className="text-brand-600 hover:underline">Try again</Link>
        </div>
      </div>
    </main>
  );
}

export default function ResetOTP() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>}>
      <ResetOTPContent />
    </Suspense>
  );
}
