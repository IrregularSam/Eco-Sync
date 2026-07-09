'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/user');
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#1a1a1b] flex items-center justify-center p-6">
      <div className="card w-full max-w-md p-10 flex flex-col items-center">
        <div className="w-12 h-12 rounded bg-brand-600 flex items-center justify-center text-white mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-medium text-slate-900 dark:text-white mb-2">Create a User Account</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8 text-center text-sm">Join the Eco-Sync initiative</p>

        <form onSubmit={handleSignup} className="w-full space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input required type="text" placeholder="First name" className="input-field" />
            </div>
            <div>
              <input required type="text" placeholder="Last name" className="input-field" />
            </div>
          </div>
          <div>
            <input required type="email" placeholder="University Email" className="input-field" />
          </div>
          <div>
            <input required type="password" placeholder="Password" className="input-field" />
          </div>
          
          <div className="flex items-center justify-between mt-8">
            <Link href="/login" className="text-brand-600 dark:text-brand-400 font-medium text-sm hover:underline">
              Sign in instead
            </Link>
            <button type="submit" className="btn-primary">
              Next
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
