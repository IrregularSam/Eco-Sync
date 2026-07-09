export default function UserSchedule() {
  const schedules = [
    { day: 'Monday', time: '08:00 AM - 10:00 AM', type: 'General & Plastic' },
    { day: 'Wednesday', time: '08:00 AM - 10:00 AM', type: 'Paper & Cardboard' },
    { day: 'Friday', time: '14:00 PM - 16:00 PM', type: 'Food & Organic' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-medium text-slate-900 dark:text-white mb-1">Pickup Schedule</h1>
        <p className="text-slate-600 dark:text-slate-400">Your designated block: <span className="font-semibold text-slate-900 dark:text-slate-200">Hostel A</span></p>
      </header>

      <div className="card overflow-hidden">
         <div className="px-6 py-4 border-b border-slate-200 dark:border-[#3c4043] bg-slate-50/50 dark:bg-[#202124]">
           <h2 className="text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Weekly Schedule</h2>
         </div>
         <div className="divide-y divide-slate-100 dark:divide-[#3c4043]">
           {schedules.map((sched, idx) => (
             <div key={idx} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-[#303134] transition-colors">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-lg">
                   {sched.day.substring(0, 3)}
                 </div>
                 <div>
                   <h3 className="text-lg font-medium text-slate-900 dark:text-white">{sched.day}</h3>
                   <p className="text-sm text-slate-500 dark:text-slate-400">{sched.time}</p>
                 </div>
               </div>
               <div className="px-4 py-2 bg-slate-100 dark:bg-[#303134] text-slate-700 dark:text-slate-300 rounded-md text-sm font-medium inline-block w-fit border border-slate-200 dark:border-[#5f6368]">
                 {sched.type}
               </div>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
}
