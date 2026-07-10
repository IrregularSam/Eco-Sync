'use client';
import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { api } from '@/lib/api';

export default function ReportIssue() {
  const { user } = useUser();
  const [issueType, setIssueType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id || !issueType || !location || !description) return;

    setIsLoading(true);
    try {
      await api.submitReport(user.id, issueType, location, description);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert('Failed to submit report');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="card p-10 flex flex-col items-center text-center max-w-lg mx-auto mt-10">
        <div className="w-16 h-16 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-medium text-slate-900 dark:text-white mb-2">Report Submitted</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">Thank you for keeping the community clean. The maintenance team has been notified.</p>
        <button onClick={() => setIsSubmitted(false)} className="btn-secondary w-full">
          Report Another Issue
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-medium text-slate-900 dark:text-white mb-1">Report an Issue</h1>
        <p className="text-slate-600 dark:text-slate-400">Alert the board to overflowing or damaged bins.</p>
      </header>

      <div className="card p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">Issue Type</label>
            <select required value={issueType} onChange={e => setIssueType(e.target.value)} className="input-field appearance-none">
              <option value="" disabled>Select an issue...</option>
              <option value="overflow">Bin is overflowing</option>
              <option value="damaged">Bin is damaged</option>
              <option value="missed">Missed pickup</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">Location</label>
            <input required type="text" value={location} onChange={e => setLocation(e.target.value)} className="input-field" placeholder="e.g. Block A, 2nd Floor" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">Description</label>
            <textarea required rows={4} value={description} onChange={e => setDescription(e.target.value)} className="input-field resize-none" placeholder="Provide any additional details..."></textarea>
          </div>
          
          <div>
             <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">Photo Evidence (Optional)</label>
             <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-[#5f6368] rounded-md p-8 text-center hover:bg-slate-50 dark:hover:bg-[#303134] transition-colors cursor-pointer relative overflow-hidden">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 mx-auto mb-2 ${fileName ? 'text-brand-500' : 'text-slate-400 dark:text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium text-brand-600 dark:text-brand-400">{fileName || 'Click to upload'}</span>
                {!fileName && <span className="text-sm text-slate-500 dark:text-slate-400"> or drag and drop</span>}
             </label>
          </div>

          <div className="pt-4">
             <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center h-11">
               {isLoading ? (
                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
               ) : 'Submit Report'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
