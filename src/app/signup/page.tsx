'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', address: '', password: '' });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Dummy Signup Flow
    setTimeout(() => {
      setLoading(false);
      router.push('/user');
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#FFD166] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-32 h-32 bg-neo-accent rounded-full border-3 border-neo-border shadow-neo blur-sm opacity-50"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-neo-primary rounded-full border-3 border-neo-border shadow-neo blur-sm opacity-50"></div>

      <div className="neo-card max-w-md w-full relative z-10 bg-neo-bg">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4 text-4xl hover:-translate-y-1 transition-transform">♻️</Link>
          <h1 className="text-3xl font-black uppercase">Join Eco-Sync</h1>
          <p className="text-neo-text/70 font-semibold mt-2">Get your smart bin today.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block font-bold mb-2 uppercase text-sm">Full Name</label>
            <input type="text" className="neo-input" placeholder="Jane Doe" required value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
          </div>
          <div>
            <label className="block font-bold mb-2 uppercase text-sm">Email</label>
            <input type="email" className="neo-input" placeholder="jane@example.com" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <label className="block font-bold mb-2 uppercase text-sm">Street Address</label>
            <input type="text" className="neo-input" placeholder="123 Eco Way, Apt 4B" required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
          </div>
          <div>
            <label className="block font-bold mb-2 uppercase text-sm">Password</label>
            <input type="password" className="neo-input" placeholder="••••••••" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>

          <button type="submit" className="neo-btn w-full mt-6 text-xl" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center font-bold border-t-3 border-neo-border pt-6 mt-8">
          Already have an account? <Link href="/login" className="text-neo-accent hover:underline">Log In</Link>
        </div>
      </div>
    </main>
  );
}
