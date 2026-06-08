export default function BoardDashboard() {
  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-medium text-slate-900 dark:text-white mb-1">System Overview</h1>
        <p className="text-slate-600 dark:text-slate-400">Real-time metrics for campus waste operations.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6 border-l-4 border-l-brand-600 dark:border-l-brand-500">
           <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Total Logs Today</div>
           <div className="text-3xl font-medium text-slate-900 dark:text-white">1,432</div>
        </div>
        
        <div className="card p-6 border-l-4 border-l-blue-600 dark:border-l-blue-500">
           <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Active Fleet</div>
           <div className="text-3xl font-medium text-slate-900 dark:text-white">8/10</div>
        </div>
        
        <div className="card p-6 border-l-4 border-l-orange-600 dark:border-l-orange-500">
           <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Open Reports</div>
           <div className="text-3xl font-medium text-slate-900 dark:text-white">24</div>
        </div>

        <div className="card p-6 border-l-4 border-l-red-600 dark:border-l-red-500">
           <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Avg Capacity</div>
           <div className="text-3xl font-medium text-slate-900 dark:text-white">78%</div>
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
               <button className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300">View All Reports</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
