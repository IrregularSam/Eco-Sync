'use client';
import { useUser } from '@/context/UserContext';
import { api } from '@/lib/api';
import { useState } from 'react';

export default function Rewards() {
  const { user, profile, refreshProfile } = useUser();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState('');

  const rewardsList = [
    { id: 'R1', title: 'Transit Pass ($10)', cost: 500, icon: '🚌', desc: 'Valid for all city buses and subways.' },
    { id: 'R2', title: 'Community Meal Voucher', cost: 1200, icon: '🍽️', desc: 'Redeemable at participating local restaurants.' },
    { id: 'R3', title: 'Recycled Tote Bag', cost: 800, icon: '🛍️', desc: 'Durable eco-friendly shopping bag.' },
    { id: 'R4', title: 'Utility Bill Credit ($5)', cost: 1500, icon: '💡', desc: 'Direct credit applied to your next bill.' }
  ];

  const handleRedeem = async (id: string, cost: number, title: string) => {
    if (!user?.id) return;
    setIsLoading(id);
    setSuccessMsg('');
    try {
      await api.redeemReward(user.id, cost);
      await refreshProfile();
      setSuccessMsg(`Successfully redeemed: ${title}!`);
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Failed to redeem reward.');
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-medium text-slate-900 dark:text-white mb-1">Rewards Marketplace</h1>
        <p className="text-slate-600 dark:text-slate-400">Redeem your hard-earned Eco Points for real-world perks.</p>
      </header>

      <div className="card p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-l-4 border-l-brand-500">
        <div>
          <h2 className="text-lg font-medium text-slate-900 dark:text-white">Current Balance</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Keep logging waste to earn more!</p>
        </div>
        <div className="text-3xl font-medium text-brand-600 dark:text-brand-400">
          {profile?.eco_points?.toLocaleString() || 0} <span className="text-lg text-slate-500">pts</span>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-md bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 font-medium text-sm flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {successMsg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
        {rewardsList.map((reward) => (
          <div key={reward.id} className="card p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-[#303134] flex items-center justify-center text-2xl">
                {reward.icon}
              </div>
              <span className="font-medium text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30 px-3 py-1 rounded-full text-sm">
                {reward.cost} pts
              </span>
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">{reward.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-1">{reward.desc}</p>
            <button 
              onClick={() => handleRedeem(reward.id, reward.cost, reward.title)}
              disabled={isLoading === reward.id || (profile?.eco_points || 0) < reward.cost}
              className={`w-full py-2.5 rounded-md font-medium text-sm transition-colors flex justify-center items-center h-10 ${
                (profile?.eco_points || 0) >= reward.cost 
                  ? 'bg-brand-600 hover:bg-brand-700 text-white dark:bg-brand-500 dark:hover:bg-brand-600' 
                  : 'bg-slate-100 dark:bg-[#303134] text-slate-400 dark:text-slate-500 cursor-not-allowed'
              }`}
            >
              {isLoading === reward.id ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (profile?.eco_points || 0) >= reward.cost ? 'Redeem Reward' : 'Not enough points'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
