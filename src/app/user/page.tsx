'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { api } from '@/lib/api';

export default function UserDashboard() {
  const { user, profile, isLoading } = useUser();
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [totalWaste, setTotalWaste] = useState(0);
  const [alerts, setAlerts] = useState<any[]>([]);

    if (user?.id) {
      api.getUserLogs(user.id).then(logs => {
        setRecentLogs(logs.slice(0, 3));
        const total = logs.reduce((sum, log) => sum + Number(log.weight_kg), 0);
        setTotalWaste(Math.round(total * 10) / 10);
      });
    }
    if (profile?.district) {
      api.getAlerts(profile.district).then(data => setAlerts(data));
    }
  }, [user?.id, profile?.district]);

  if (isLoading) {
    return <div className="animate-pulse space-y-6">
      <div className="h-10 bg-slate-200 dark:bg-[#303134] rounded w-1/3"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6"><div className="h-32 bg-slate-200 dark:bg-[#303134] rounded"></div></div>
    </div>;
  }
  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-medium text-slate-900 dark:text-white mb-1">Welcome back, {profile?.full_name?.split(' ')[0] || 'User'}</h1>
        <p className="text-slate-600 dark:text-slate-400">Here's your Eco-Sync summary for today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
           <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Eco Points</div>
           <div className="text-4xl font-medium text-brand-600 dark:text-brand-400 mb-2">{profile?.eco_points?.toLocaleString() || 0}</div>
           <div className="text-sm text-slate-600 dark:text-slate-400">Redeemable for rewards</div>
        </div>
        
        <div className="card p-6">
           <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Total Waste Logged</div>
           <div className="text-4xl font-medium text-blue-600 dark:text-blue-400 mb-2">{totalWaste}kg</div>
           <div className="text-sm text-slate-600 dark:text-slate-400">Impact on environment</div>
        </div>
        
        <div className="card p-6">
           <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Zone</div>
           <div className="text-4xl font-medium text-orange-600 dark:text-orange-400 mb-2 truncate" title={profile?.district || profile?.address}>{profile?.district || profile?.address || 'N/A'}</div>
           <div className="text-sm text-slate-600 dark:text-slate-400">Next pickup tomorrow</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
        <div className="card">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-[#3c4043]">
            <h2 className="text-lg font-medium text-slate-900 dark:text-white">Quick Actions</h2>
          </div>
          <div className="p-4 grid grid-cols-2 gap-4 border-b border-slate-200 dark:border-[#3c4043]">
            <Link href="/user/log" className="flex flex-col items-center justify-center p-4 rounded-lg border border-slate-200 dark:border-[#3c4043] hover:bg-slate-50 dark:hover:bg-[#303134] transition-colors gap-2">
              <div className="w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="font-medium text-slate-900 dark:text-white text-sm">Log Waste</span>
            </Link>
            <Link href="/user/report" className="flex flex-col items-center justify-center p-4 rounded-lg border border-slate-200 dark:border-[#3c4043] hover:bg-slate-50 dark:hover:bg-[#303134] transition-colors gap-2">
              <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <span className="font-medium text-slate-900 dark:text-white text-sm">Report Issue</span>
            </Link>
          </div>
          <div className="p-6">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wider">Live District Alerts</h3>
            {alerts.length > 0 ? (
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded flex gap-3 items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <div>
                      <p className="text-sm text-red-800 dark:text-red-200">{alert.message}</p>
                      <p className="text-xs text-red-600/70 dark:text-red-400/70 mt-1">{new Date(alert.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400 italic">No active alerts for {profile?.district || 'your zone'}.</p>
            )}
          </div>
        </div>

        <div className="card">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-[#3c4043]">
            <h2 className="text-lg font-medium text-slate-900 dark:text-white">Recent Activity</h2>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-[#3c4043]">
            {recentLogs.length > 0 ? recentLogs.map((log) => (
              <div key={log.id} className="px-6 py-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-[#303134] flex items-center justify-center text-brand-600 dark:text-brand-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Logged {log.weight_kg}kg of {log.category}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(log.created_at).toLocaleDateString()} &bull; +{log.points_earned} pts</p>
                </div>
              </div>
            )) : (
              <div className="px-6 py-8 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-[#303134] flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">No recent activity</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Start logging waste to see your history here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
