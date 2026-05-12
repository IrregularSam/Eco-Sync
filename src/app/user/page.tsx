'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function UserDashboard() {
  // Use dummy state since backend is bypassed
  const [userStatus, setUserStatus] = useState<'pending' | 'active'>('pending');
  const [isBinFull, setIsBinFull] = useState(false);

  const triggerBinFull = () => {
    setIsBinFull(true);
    alert('Bin Full triggered! Admin dispatch alerted.');
  };

  const simulateApproval = () => {
    setUserStatus('active');
    alert('Simulated: Admin approved your application!');
  };

  return (
    <main className="min-h-screen bg-neo-bg flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r-3 border-neo-border bg-white p-6 flex flex-col gap-4 relative z-10 shadow-neo mr-8 h-screen sticky top-0">
        <div className="text-xl font-black mb-8 text-neo-primary uppercase tracking-tighter">
          <div className="w-8 h-8 bg-neo-primary border-3 border-neo-border flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black mb-2">♻</div>
          Eco-Sync Hub
        </div>
        <Link href="/user" className="font-bold text-neo-accent hover:translate-x-1 transition-transform">Dashboard</Link>
        <Link href="/user/wallet" className="font-bold hover:translate-x-1 transition-transform">Wallet & Billing</Link>
        <div className="mt-auto">
          <Link href="/" className="font-bold border-2 border-neo-border px-4 py-2 rounded-pill hover:bg-neo-secondary hover:text-white transition-colors block text-center">Log Out</Link>
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-8 overflow-y-auto flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>

        <div className="neo-card max-w-2xl w-full relative z-10 bg-white text-center">
          {userStatus === 'pending' ? (
            <>
              <div className="w-20 h-20 bg-[#FFD166] border-3 border-neo-border rounded-full flex items-center justify-center text-4xl shadow-neo mx-auto mb-6">
                ⏳
              </div>
              <h1 className="text-3xl font-black uppercase mb-4">Application Pending</h1>
              <p className="text-lg font-bold text-neo-text/70 mb-8 border-3 border-neo-border p-4 bg-neo-bg rounded-neo">
                Your application is under review by the Command Center. Once approved, you will be prompted to pay your setup fee and a Smart Bin will be provisioned.
              </p>
              
              <button onClick={simulateApproval} className="neo-btn-secondary w-full text-sm mt-4 border-dashed text-gray-500">
                [Dev Tool] Simulate Admin Approval
              </button>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-neo-primary border-3 border-neo-border rounded-full flex items-center justify-center text-4xl shadow-neo mx-auto mb-6 text-white">
                ♻️
              </div>
              <h1 className="text-3xl font-black uppercase mb-4">Your Smart Bin is Active</h1>
              <p className="text-lg font-bold text-neo-text/70 mb-8">
                Route Alpha • Subscribed
              </p>
              
              <div className="p-8 border-3 border-neo-border bg-[#FFD166] rounded-neo shadow-neo text-left relative overflow-hidden group">
                <div className="relative z-10 flex flex-col items-center">
                  <h2 className="text-2xl font-black mb-2 uppercase text-center">Request Pickup</h2>
                  <p className="font-bold text-center mb-6">Is your bin full? Tap below to alert the fleet.</p>
                  <button 
                    onClick={triggerBinFull} 
                    disabled={isBinFull}
                    className={`px-8 py-4 font-black text-2xl border-3 border-neo-border rounded-pill shadow-neo transition-all ${isBinFull ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none translate-y-1' : 'bg-neo-secondary text-white hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-2 active:shadow-none'}`}
                  >
                    {isBinFull ? 'FLEET DISPATCHED' : 'BIN FULL ALERT'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
