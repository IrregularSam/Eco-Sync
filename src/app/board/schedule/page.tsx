'use client';
import { useState } from 'react';

export default function BoardSchedule() {
  const [schedules, setSchedules] = useState([
    { id: 1, route: 'Alpha', area: 'Hostels (A, B, C)', day: 'Monday, Thursday', time: '08:00 AM', status: 'Active', driver: 'Team Alpha' },
    { id: 2, route: 'Beta', area: 'Academic Blocks', day: 'Tuesday, Friday', time: '14:00 PM', status: 'Active', driver: 'Team Bravo' },
    { id: 3, route: 'Gamma', area: 'Cafeteria & Shops', day: 'Daily', time: '06:00 AM', status: 'Active', driver: 'Team Charlie' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  
  // Form State
  const [newRoute, setNewRoute] = useState({ route: '', area: '', day: '', time: '', driver: '' });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSchedules([...schedules, { id: Date.now(), ...newRoute, status: 'Active' }]);
    setIsModalOpen(false);
    showToast(`Route ${newRoute.route} successfully created!`);
    setNewRoute({ route: '', area: '', day: '', time: '', driver: '' });
  };

  return (
    <div className="space-y-6">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-medium text-slate-900 dark:text-white mb-1">Fleet Schedule</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage pickup routes and collection timing.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
          + Create Route
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedules.map((sched) => (
          <div key={sched.id} className="card p-6 flex flex-col h-full hover:border-slate-300 dark:hover:border-slate-500">
             <div className="flex justify-between items-start mb-4">
               <div>
                 <div className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-1">Route {sched.route}</div>
                 <h3 className="text-lg font-medium text-slate-900 dark:text-white">{sched.area}</h3>
               </div>
             </div>
             
             <div className="space-y-2 mb-6 flex-1">
                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {sched.day}
                </div>
                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {sched.time}
                </div>
                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Team: <span className="font-medium ml-1 text-slate-900 dark:text-slate-200">{sched.driver}</span>
                </div>
             </div>

             <div className="flex gap-2 pt-4 border-t border-slate-100 dark:border-[#3c4043]">
               <button onClick={() => showToast('Editing disabled')} className="flex-1 py-1.5 text-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#303134] rounded transition-colors border border-transparent hover:border-slate-200 dark:hover:border-[#5f6368]">Edit</button>
               <button onClick={() => showToast(`Alert sent to ${sched.driver}!`)} className="flex-1 py-1.5 text-center text-sm font-medium text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/30 rounded transition-colors border border-brand-100 dark:border-brand-900/50">Send Alert</button>
             </div>
          </div>
        ))}
      </div>

      {/* Toast Notification (Google Snackbar Style) */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-[#323232] dark:bg-[#e8eaed] text-white dark:text-[#202124] px-6 py-3 rounded shadow-lg flex items-center gap-4 text-sm">
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg('')} className="text-brand-400 dark:text-brand-600 font-medium uppercase text-xs tracking-wider">Close</button>
        </div>
      )}

      {/* Create Route Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#202124] w-full max-w-md rounded-lg shadow-2xl overflow-hidden border border-slate-200 dark:border-[#3c4043]">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-[#3c4043] flex justify-between items-center">
              <h2 className="text-lg font-medium text-slate-900 dark:text-white">Create New Route</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 rounded hover:bg-slate-100 dark:hover:bg-[#303134]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Route Name</label>
                <input required type="text" className="input-field" value={newRoute.route} onChange={e => setNewRoute({...newRoute, route: e.target.value})} placeholder="e.g. Delta" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Area</label>
                <input required type="text" className="input-field" value={newRoute.area} onChange={e => setNewRoute({...newRoute, area: e.target.value})} placeholder="e.g. Science Complex" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Days</label>
                  <input required type="text" className="input-field" value={newRoute.day} onChange={e => setNewRoute({...newRoute, day: e.target.value})} placeholder="e.g. Wed, Sat" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Time</label>
                  <input required type="text" className="input-field" value={newRoute.time} onChange={e => setNewRoute({...newRoute, time: e.target.value})} placeholder="10:00 AM" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Team</label>
                <select required className="input-field appearance-none bg-white dark:bg-[#202124]" value={newRoute.driver} onChange={e => setNewRoute({...newRoute, driver: e.target.value})}>
                  <option value="" disabled>Select Team...</option>
                  <option value="Team Alpha">Team Alpha</option>
                  <option value="Team Bravo">Team Bravo</option>
                  <option value="Team Charlie">Team Charlie</option>
                  <option value="Team Delta">Team Delta</option>
                </select>
              </div>

              <div className="pt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-text">Cancel</button>
                <button type="submit" className="btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
