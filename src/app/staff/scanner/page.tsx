'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function QRScanner() {
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success'>('idle');

  const simulateScan = () => {
    setScanStatus('scanning');
    setTimeout(() => {
      setScanStatus('success');
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-black text-white relative font-sans">
      <header className="p-6 flex justify-between items-center z-10 relative">
        <Link href="/staff" className="font-bold text-lg hover:underline">
          ← Back
        </Link>
        <h1 className="text-xl font-black uppercase tracking-widest">Scanner</h1>
        <div className="w-12"></div>
      </header>

      {/* Viewfinder Mock */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-neo-primary rounded-[2rem] flex items-center justify-center relative overflow-hidden">
        {scanStatus === 'scanning' && (
          <div className="absolute top-0 left-0 w-full h-1 bg-neo-primary shadow-[0_0_20px_#00E676] animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
        )}
        {scanStatus === 'success' && (
          <div className="text-center animate-bounce">
            <div className="text-6xl mb-2">✅</div>
            <p className="font-black uppercase text-neo-primary text-xl">Verified!</p>
          </div>
        )}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white"></div>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent pt-20">
        <div className="text-center mb-8">
          <p className="font-bold text-gray-300">
            {scanStatus === 'idle' ? 'Align QR code in frame' : scanStatus === 'scanning' ? 'Verifying hardware signature...' : 'Service logged. Timestamp securely recorded.'}
          </p>
        </div>
        
        {scanStatus !== 'success' ? (
          <button onClick={simulateScan} className="w-full py-5 bg-white text-black font-black uppercase text-xl rounded-pill border-3 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] active:translate-y-1 active:shadow-none transition-all" disabled={scanStatus === 'scanning'}>
            {scanStatus === 'idle' ? 'Simulate Hardware Scan' : 'Scanning...'}
          </button>
        ) : (
          <Link href="/staff" className="block w-full py-5 bg-neo-primary text-black font-black uppercase text-xl rounded-pill border-3 border-black shadow-[4px_4px_0px_0px_#00E676] text-center hover:-translate-y-1 transition-transform">
            Route to Next Stop
          </Link>
        )}
      </div>
    </main>
  );
}
