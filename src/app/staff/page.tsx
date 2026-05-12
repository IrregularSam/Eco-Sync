'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function StaffDashboard() {
  const [stops] = useState([
    { id: 1, address: '142 Emerald Ave', status: 'pending' },
    { id: 2, address: '144 Emerald Ave', status: 'pending' },
    { id: 3, address: '150 Emerald Ave', status: 'pending' },
    { id: 4, address: '202 Carbon St', status: 'pending' },
  ]);

  return (
    <main className="min-h-screen bg-neo-bg font-sans pb-24">
      {/* Mobile-centric Header */}
      <header className="bg-white border-b-3 border-neo-border p-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div>
          <h1 className="text-xl font-black uppercase">Ground Ops</h1>
          <span className="text-sm font-bold text-neo-text/70">Route Beta - Critical Dispatch</span>
        </div>
        <div className="w-12 h-12 bg-neo-secondary border-3 border-neo-border rounded-full flex items-center justify-center font-black text-white shadow-neo">
          TL
        </div>
      </header>

      <section className="p-4 space-y-6 mt-4 max-w-lg mx-auto">
        {/* Status Warning */}
        <div className="bg-[#FFD166] border-3 border-neo-border rounded-neo p-4 shadow-neo flex items-center gap-4">
           <div className="text-4xl">🚨</div>
           <div>
             <h3 className="font-black uppercase text-sm">Emergency Dispatch</h3>
             <p className="font-semibold text-sm">Route Beta is at 85% capacity. Proceed to first stop immediately.</p>
           </div>
        </div>

        {/* Next Stop Card */}
        <div className="neo-card bg-white text-center border-neo-primary border-4 shadow-[4px_4px_0px_0px_#00E676]">
          <h2 className="text-sm font-bold uppercase mb-2 text-neo-text/70">Immediate Priority Stop</h2>
          <div className="text-3xl font-black uppercase mb-6 leading-none">142 Emerald Ave</div>
          <button className="neo-btn w-full py-4 text-xl" onClick={() => alert('Opening GPS Navigation...')}>
            Start Navigation 🧭
          </button>
        </div>

        {/* Actions Grid */}
        <div className="grid gap-4">
          <Link href="/staff/scanner" className="neo-card flex flex-row items-center justify-between gap-4 bg-neo-primary text-white hover:-translate-y-1 transition-transform cursor-pointer group">
            <span className="font-black uppercase text-xl pl-2 group-hover:pl-4 transition-all">Scan Bin QR <br/><span className="text-sm font-bold opacity-80">(Proof of Service)</span></span>
            <div className="w-16 h-16 bg-white border-3 border-neo-border rounded-full flex items-center justify-center text-3xl shadow-neo text-black">
              📱
            </div>
          </Link>
        </div>

        {/* Route Manifest */}
        <div>
           <h3 className="font-black uppercase mb-4 text-lg border-b-3 border-neo-border pb-2">Route Manifest</h3>
           <div className="space-y-3">
             {stops.map(stop => (
               <div key={stop.id} className="bg-white border-3 border-neo-border p-4 rounded-neo flex justify-between items-center shadow-sm opacity-80">
                 <div className="font-bold text-lg">{stop.address}</div>
                 <div className="text-xs font-black uppercase px-2 py-1 bg-gray-200 border-2 border-neo-border rounded-sm">Pending</div>
               </div>
             ))}
           </div>
        </div>
      </section>
    </main>
  );
}
