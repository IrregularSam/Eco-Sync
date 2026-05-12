'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function UserWallet() {
  const [balance, setBalance] = useState(0.00);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTopUp = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setBalance(b => b + 50.00);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-neo-bg flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r-3 border-neo-border bg-white p-6 flex flex-col gap-4 relative z-10 shadow-neo mr-8 h-screen sticky top-0">
        <div className="text-xl font-black mb-8 text-neo-primary uppercase tracking-tighter">
          <div className="w-8 h-8 bg-neo-primary border-3 border-neo-border flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black mb-2">♻</div>
          Eco-Sync Hub
        </div>
        <Link href="/user" className="font-bold hover:translate-x-1 transition-transform">Dashboard</Link>
        <Link href="/user/wallet" className="font-bold text-neo-accent hover:translate-x-1 transition-transform">Wallet & Billing</Link>
        <div className="mt-auto">
          <Link href="/" className="font-bold border-2 border-neo-border px-4 py-2 rounded-pill hover:bg-neo-secondary hover:text-white transition-colors block text-center">Log Out</Link>
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 border-b-3 border-neo-border pb-6">
          <h1 className="text-4xl font-black uppercase mb-2">Your Wallet</h1>
          <p className="text-lg font-semibold text-neo-text/70">
            Manage your subscription and top up funds.
          </p>
        </header>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl">
          {/* Balance Card */}
          <div className="neo-card bg-neo-primary text-neo-text">
            <h3 className="font-bold uppercase text-neo-text/70 mb-2">Current Balance</h3>
            <div className="text-6xl font-black mb-6">${balance.toFixed(2)}</div>
            <button 
              onClick={handleTopUp}
              disabled={isProcessing}
              className="neo-btn-secondary w-full"
            >
              {isProcessing ? 'Processing...' : '+ Add $50.00'}
            </button>
          </div>

          {/* Action Required Card */}
          <div className="neo-card bg-[#FFD166]">
            <h3 className="font-bold uppercase text-neo-text/70 mb-2">Pending Invoices</h3>
            <div className="text-3xl font-black mb-2 uppercase">Smart Bin Setup Fee</div>
            <div className="text-xl font-bold text-neo-secondary mb-6">$25.00</div>
            <button 
              onClick={() => {
                if (balance >= 25) {
                  setBalance(b => b - 25);
                  alert('Fee paid! Bin is now provisioned.');
                } else {
                  alert('Insufficient funds. Please add money to your wallet.');
                }
              }}
              className="neo-btn w-full"
            >
              Pay Now
            </button>
          </div>
        </div>

        {/* Transaction History */}
        <div className="max-w-4xl">
          <h3 className="text-2xl font-black uppercase mb-4">Transaction History</h3>
          <div className="neo-card bg-white p-0 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-3 border-neo-border bg-neo-bg uppercase text-sm font-bold text-neo-text/70">
                  <th className="p-4 border-r-3 border-neo-border">Date</th>
                  <th className="p-4 border-r-3 border-neo-border">Description</th>
                  <th className="p-4">Amount</th>
                </tr>
              </thead>
              <tbody className="font-semibold">
                <tr className="border-b-3 border-neo-border hover:bg-neo-bg transition-colors">
                  <td className="p-4 border-r-3 border-neo-border">Oct 12, 2026</td>
                  <td className="p-4 border-r-3 border-neo-border">Account Created</td>
                  <td className="p-4 text-neo-text/50">$0.00</td>
                </tr>
                {/* Empty State */}
                {balance === 0 && (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-neo-text/50 italic">No recent transactions.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
