'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { api } from '@/lib/api';

export default function TransactionHistory() {
  const { user, profile } = useUser();
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      api.getUserHistory(user.id).then(data => {
        setHistory(data);
        setIsLoading(false);
      }).catch(console.error);
    }
  }, [user?.id]);

  const handlePrint = (transactionId: string) => {
    // Hide everything except the receipt for printing
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body * { visibility: hidden; }
        #receipt-${transactionId}, #receipt-${transactionId} * { visibility: visible; }
        #receipt-${transactionId} { position: absolute; left: 0; top: 0; width: 100%; padding: 40px; margin: 0; border: none !important; box-shadow: none !important; }
        .no-print { display: none !important; }
      }
    `;
    document.head.appendChild(style);
    window.print();
    setTimeout(() => {
      document.head.removeChild(style);
    }, 100);
  };

  if (isLoading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-24 bg-slate-200 dark:bg-[#303134] rounded"></div>
      <div className="h-24 bg-slate-200 dark:bg-[#303134] rounded"></div>
    </div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-medium text-slate-900 dark:text-white mb-1">Transaction History</h1>
        <p className="text-slate-600 dark:text-slate-400">View and print receipts for your Eco-Reward redemptions.</p>
      </header>

      {history.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-slate-500 dark:text-slate-400">No transactions found. Start redeeming rewards to see them here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {history.map((tx) => (
            <div key={tx.id} id={`receipt-${tx.id}`} className="card overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-[#3c4043] flex justify-between items-center bg-slate-50 dark:bg-[#1a1a1b]">
                <div>
                  <h2 className="text-lg font-medium text-slate-900 dark:text-white flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-600 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Eco-Sync Official Receipt
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Transaction ID: {tx.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{new Date(tx.created_at).toLocaleDateString()}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(tx.created_at).toLocaleTimeString()}</p>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-end border-b border-slate-100 dark:border-[#303134] pb-4">
                  <div>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Billed To</p>
                    <p className="font-medium text-slate-900 dark:text-white">{profile?.full_name}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{profile?.district || profile?.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Amount Redeemed</p>
                    <p className="text-2xl font-bold text-brand-600 dark:text-brand-400">-{tx.cost} Pts</p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm text-slate-700 dark:text-slate-300"><span className="font-medium">Item:</span> {tx.reward_name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 italic">Thank you for contributing to a greener planet!</p>
                </div>
              </div>
              
              <div className="p-4 bg-slate-50 dark:bg-[#1a1a1b] border-t border-slate-200 dark:border-[#3c4043] flex justify-end no-print">
                <button 
                  onClick={() => handlePrint(tx.id)}
                  className="btn-secondary flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print PDF Receipt
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
