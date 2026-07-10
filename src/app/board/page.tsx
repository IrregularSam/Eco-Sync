'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

export default function BoardDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, openReports: 0, totalWasteKg: 0 });
  const [isLoading, setIsLoading] = useState(true);
  
  const [alertDistrict, setAlertDistrict] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isSendingAlert, setIsSendingAlert] = useState(false);

  const handleSendAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertDistrict || !alertMessage) return;
    setIsSendingAlert(true);
    try {
      await api.sendAlert(alertDistrict, alertMessage);
      setAlertDistrict('');
      setAlertMessage('');
      alert('Alert broadcasted successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to broadcast alert.');
    } finally {
      setIsSendingAlert(false);
    }
  };

  useEffect(() => {
    api.getAnalytics().then(data => {
      setStats(data);
      setIsLoading(false);
    }).catch(console.error);
  }, []);

  if (isLoading) {
    return <div className="animate-pulse space-y-6">
      <div className="h-10 bg-slate-200 dark:bg-[#303134] rounded w-1/3"></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6"><div className="h-24 bg-slate-200 dark:bg-[#303134] rounded col-span-4"></div></div>
    </div>;
  }

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-medium text-slate-900 dark:text-white mb-1">System Overview</h1>
        <p className="text-slate-600 dark:text-slate-400">Real-time metrics for municipal waste operations.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6 border-l-4 border-l-brand-600 dark:border-l-brand-500">
           <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Registered Citizens</div>
           <div className="text-3xl font-medium text-slate-900 dark:text-white">{stats.totalUsers}</div>
        </div>
        
        <div className="card p-6 border-l-4 border-l-blue-600 dark:border-l-blue-500">
           <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Total Waste (kg)</div>
           <div className="text-3xl font-medium text-slate-900 dark:text-white">{stats.totalWasteKg.toLocaleString()}</div>
        </div>
        
        <div className="card p-6 border-l-4 border-l-orange-600 dark:border-l-orange-500">
           <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Open Reports</div>
           <div className="text-3xl font-medium text-slate-900 dark:text-white">{stats.openReports}</div>
        </div>

        <div className="card p-6 border-l-4 border-l-green-600 dark:border-l-green-500">
           <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">System Status</div>
           <div className="text-3xl font-medium text-green-600 dark:text-green-500">Online</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
        <div className="card lg:col-span-2">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-[#3c4043] flex justify-between items-center">
            <h2 className="text-lg font-medium text-slate-900 dark:text-white">Collection Volume (7 Days)</h2>
            <button className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300">Export CSV</button>
          </div>
          <div className="p-6 h-80 flex items-end justify-between gap-2">
             {/* Mock Bar Chart */}
             {[40, 60, 30, 80, 50, 90, 70].map((height, i) => (
               <div key={i} className="w-full flex flex-col items-center gap-2 group">
                  <div className="w-full bg-slate-100 dark:bg-[#303134] rounded-t-sm relative h-full flex items-end">
                     <div 
                       className="w-full bg-brand-500 dark:bg-brand-600 rounded-t-sm group-hover:bg-brand-400 transition-colors" 
                       style={{ height: `${height}%` }}
                     ></div>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Day {i+1}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="card">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-[#3c4043]">
            <h2 className="text-lg font-medium text-slate-900 dark:text-white">Urgent Alerts</h2>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-[#3c4043]">
             {[
               { loc: 'Block A, 2nd Fl', issue: 'Overflowing', time: '10m ago' },
               { loc: 'Cafeteria Main', issue: 'Damaged Bin', time: '1h ago' },
               { loc: 'Library Front', issue: 'Missed Pickup', time: '2h ago' },
             ].map((alert, i) => (
               <div key={i} className="p-4 flex gap-4 hover:bg-slate-50 dark:hover:bg-[#303134] transition-colors cursor-pointer">
                 <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                 <div>
                   <p className="text-sm font-medium text-slate-900 dark:text-white">{alert.issue}</p>
                   <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{alert.loc}</p>
                   <p className="text-xs font-medium text-slate-400 dark:text-slate-500">{alert.time}</p>
                 </div>
               </div>
             ))}
             <div className="p-4 text-center">
               <Link href="/board/reports" className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300">View All Reports</Link>
             </div>
          </div>
        </div>

        <div className="card lg:col-span-3">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-[#3c4043]">
            <h2 className="text-lg font-medium text-slate-900 dark:text-white">Broadcast Alert</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Send an urgent notification to all users in a specific district.</p>
          </div>
          <form onSubmit={handleSendAlert} className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Target District</label>
              <input required type="text" placeholder="e.g. District 4" className="input-field" value={alertDistrict} onChange={(e) => setAlertDistrict(e.target.value)} />
            </div>
            <div className="md:col-span-2 flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Alert Message</label>
                <input required type="text" placeholder="e.g. Pickup truck is arriving in 20 minutes." className="input-field" value={alertMessage} onChange={(e) => setAlertMessage(e.target.value)} />
              </div>
              <button type="submit" disabled={isSendingAlert} className="btn-primary whitespace-nowrap self-end h-[42px]">
                {isSendingAlert ? 'Sending...' : 'Send Alert'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
