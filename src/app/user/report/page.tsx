'use client';
import { useState } from 'react';

export default function ReportIssue() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
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
            <select required className="input-field appearance-none">
              <option value="" disabled selected>Select an issue...</option>
              <option value="overflow">Bin is overflowing</option>
              <option value="damaged">Bin is damaged</option>
              <option value="missed">Missed pickup</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">Location</label>
            <input required type="text" className="input-field" placeholder="e.g. Block A, 2nd Floor" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">Description</label>
            <textarea required rows={4} className="input-field resize-none" placeholder="Provide any additional details..."></textarea>
          </div>
          
          <div>
             <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">Photo Evidence (Optional)</label>
             <div className="w-full border-2 border-dashed border-slate-300 dark:border-[#5f6368] rounded-md p-8 text-center hover:bg-slate-50 dark:hover:bg-[#303134] transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-slate-400 dark:text-slate-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium text-brand-600 dark:text-brand-400">Click to upload</span>
                <span className="text-sm text-slate-500 dark:text-slate-400"> or drag and drop</span>
             </div>
          </div>

          <div className="pt-4">
             <button type="submit" className="btn-primary w-full">
               Submit Report
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
