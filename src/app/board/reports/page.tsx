'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function IssueReports() {
  const [reports, setReports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');

  const fetchReports = async () => {
    try {
      const data = await api.getReports();
      setReports(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleResolve = async (id: string) => {
    setResolvingId(id);
    try {
      await api.resolveReport(id);
      await fetchReports();
    } catch (error) {
      console.error(error);
      alert('Failed to resolve report');
    } finally {
      setResolvingId(null);
    }
  };

  const filteredReports = filter === 'All' ? reports : reports.filter(r => r.status === filter);

  if (isLoading) {
    return <div className="animate-pulse space-y-6">
      <div className="h-10 bg-slate-200 dark:bg-[#303134] rounded w-1/3"></div>
      <div className="h-64 bg-slate-200 dark:bg-[#303134] rounded"></div>
    </div>;
  }

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
                <th className="px-6 py-4 font-medium">Reporter</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Issue Type</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-[#3c4043]">
              {filteredReports.length > 0 ? filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50 dark:hover:bg-[#303134] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                    {report.id.slice(0, 8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                    {report.users?.full_name || 'Unknown User'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                    {report.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400 capitalize">
                    {report.issue_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                    {new Date(report.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      report.status === 'Resolved' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' 
                        : 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {report.status === 'Pending' ? (
                      <button 
                        onClick={() => handleResolve(report.id)}
                        disabled={resolvingId === report.id}
                        className="text-brand-600 dark:text-brand-400 hover:text-brand-900 dark:hover:text-brand-300 disabled:opacity-50"
                      >
                        {resolvingId === report.id ? 'Resolving...' : 'Resolve'}
                      </button>
                    ) : (
                      <span className="text-slate-400">Done</span>
                    )}
                  </td>
                </tr>
              )) : (
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
