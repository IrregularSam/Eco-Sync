'use client';
import { useState } from 'react';

export default function BoardReports() {
  const [reports, setReports] = useState([
    { id: 'REP-001', location: 'District 4, Main Street', type: 'Overflowing', reporter: 'Dahunsi S.', status: 'Pending', date: '2026-06-06' },
    { id: 'REP-002', location: 'Science Block B', type: 'Damaged Bin', reporter: 'Alice W.', status: 'Pending', date: '2026-06-06' },
    { id: 'REP-003', location: 'Cafeteria', type: 'Missed Pickup', reporter: 'John M.', status: 'Resolved', date: '2026-06-05' },
    { id: 'REP-004', location: 'Library Area', type: 'Overflowing', reporter: 'Sarah T.', status: 'Pending', date: '2026-06-05' },
    { id: 'REP-005', location: 'Admin Building', type: 'Damaged Bin', reporter: 'Mark L.', status: 'Resolved', date: '2026-06-04' },
  ]);

  const [filter, setFilter] = useState('All');

  const handleResolve = (id: string) => {
    setReports(reports.map(r => r.id === id ? { ...r, status: 'Resolved' } : r));
  };

  const filteredReports = filter === 'All' ? reports : reports.filter(r => r.status === filter);

  return (
    <div className="space-y-6">
      <header className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-medium text-slate-900 dark:text-white mb-1">Issue Reports</h1>
          <p className="text-slate-600 dark:text-slate-400">Monitor and resolve user-reported issues.</p>
        </div>
        <div className="flex gap-2 bg-slate-100 dark:bg-[#303134] p-1 rounded-md border border-slate-200 dark:border-[#5f6368]">
          {['All', 'Pending', 'Resolved'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${filter === f ? 'bg-white dark:bg-[#424448] text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
            <thead className="text-xs uppercase bg-slate-50 dark:bg-[#303134] text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-[#3c4043]">
              <tr>
                <th className="px-6 py-4 font-medium">Report ID</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Issue Type</th>
                <th className="px-6 py-4 font-medium">Reporter</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-[#3c4043]">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50 dark:hover:bg-[#2a2b2e] transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{report.id}</td>
                  <td className="px-6 py-4">{report.location}</td>
                  <td className="px-6 py-4">{report.type}</td>
                  <td className="px-6 py-4">{report.reporter}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      report.status === 'Resolved' 
                      ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' 
                      : 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {report.status === 'Pending' ? (
                      <button onClick={() => handleResolve(report.id)} className="text-brand-600 dark:text-brand-400 hover:text-brand-800 dark:hover:text-brand-300 font-medium">
                        Resolve
                      </button>
                    ) : (
                      <span className="text-slate-400 dark:text-slate-500">Done</span>
                    )}
                  </td>
                </tr>
              ))}
              
              {filteredReports.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                    No reports found for the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
