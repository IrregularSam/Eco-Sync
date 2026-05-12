'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Connect to Supabase Auth & Role-based redirect
    setTimeout(() => {
      setLoading(false);
      alert('Login integration coming soon!');
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-neo-primary flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>

      <div className="neo-card max-w-md w-full relative z-10 bg-neo-bg">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4 text-4xl hover:-translate-y-1 transition-transform">♻️</Link>
          <h1 className="text-3xl font-black uppercase">Welcome Back</h1>
          <p className="text-neo-text/70 font-semibold mt-2">Log in to your Eco-Sync portal.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block font-bold mb-2 uppercase text-sm">Email</label>
            <input type="email" className="neo-input" placeholder="jane@example.com" required />
          </div>
          <div>
            <label className="block font-bold mb-2 uppercase text-sm">Password</label>
            <input type="password" className="neo-input" placeholder="••••••••" required />
          </div>

          <button type="submit" className="neo-btn w-full mt-6 text-xl" disabled={loading}>
            {loading ? 'Authenticating...' : 'Log In'}
          </button>
        </form>

        <div className="mt-6 text-center font-bold border-t-3 border-neo-border pt-6 mt-8">
          New here? <Link href="/signup" className="text-neo-secondary hover:underline">Get a Smart Bin</Link>
        </div>
      </div>
    </main>
  );
}
