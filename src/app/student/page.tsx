'use client';
import Link from 'next/link';

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-medium text-slate-900 dark:text-white mb-1">Welcome back, Dahunsi</h1>
        <p className="text-slate-600 dark:text-slate-400">Here's your Eco-Sync summary for today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
           <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Eco Points</div>
           <div className="text-4xl font-medium text-brand-600 dark:text-brand-400 mb-2">1,250</div>
           <div className="text-sm text-slate-600 dark:text-slate-400">+50 this week</div>
        </div>
        
        <div className="card p-6">
           <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Waste Logged</div>
           <div className="text-4xl font-medium text-blue-600 dark:text-blue-400 mb-2">12kg</div>
           <div className="text-sm text-slate-600 dark:text-slate-400">Top 15% of campus</div>
        </div>
        
        <div className="card p-6">
           <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Next Pickup</div>
           <div className="text-4xl font-medium text-orange-600 dark:text-orange-400 mb-2">Tomorrow</div>
           <div className="text-sm text-slate-600 dark:text-slate-400">08:00 AM - 10:00 AM</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
        <div className="card">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-[#3c4043]">
            <h2 className="text-lg font-medium text-slate-900 dark:text-white">Quick Actions</h2>
          </div>
          <div className="p-4 grid grid-cols-2 gap-4">
            <Link href="/student/log" className="flex flex-col items-center justify-center p-6 rounded-lg border border-slate-200 dark:border-[#3c4043] hover:bg-slate-50 dark:hover:bg-[#303134] transition-colors gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="font-medium text-slate-900 dark:text-white">Log Waste</span>
            </Link>
            <Link href="/student/report" className="flex flex-col items-center justify-center p-6 rounded-lg border border-slate-200 dark:border-[#3c4043] hover:bg-slate-50 dark:hover:bg-[#303134] transition-colors gap-3">
              <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <span className="font-medium text-slate-900 dark:text-white">Report Issue</span>
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-[#3c4043]">
            <h2 className="text-lg font-medium text-slate-900 dark:text-white">Recent Activity</h2>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-[#3c4043]">
            {[1, 2, 3].map((i) => (
              <div key={i} className="px-6 py-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-[#303134] flex items-center justify-center text-slate-500 dark:text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Logged 2kg of Plastic</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">2 days ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
