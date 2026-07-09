'use client';
import { useState } from 'react';

export default function LogWaste() {
  const [selectedCat, setSelectedCat] = useState('');
  const [weight, setWeight] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCat && weight) setIsSubmitted(true);
  };

  const categories = ['Plastic', 'Paper', 'Food/Organic', 'Glass', 'Metal', 'E-Waste', 'General Waste'];

  if (isSubmitted) {
    return (
      <div className="card p-10 flex flex-col items-center text-center max-w-lg mx-auto mt-10">
        <div className="w-16 h-16 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-medium text-slate-900 dark:text-white mb-2">Log Recorded</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">You've successfully logged {weight}kg of {selectedCat}. You earned 50 Eco-points!</p>
        <button onClick={() => { setIsSubmitted(false); setSelectedCat(''); setWeight(''); }} className="btn-primary w-full">
          Log More Waste
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-medium text-slate-900 dark:text-white mb-1">Log Waste</h1>
        <p className="text-slate-600 dark:text-slate-400">Record your recycling to earn Eco-points.</p>
      </header>

      <div className="card p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-3">Waste Category</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCat(cat)}
                  className={`py-3 px-4 rounded-md border text-sm font-medium transition-colors ${
                    selectedCat === cat 
                    ? 'border-brand-600 bg-brand-50 text-brand-700 dark:border-brand-500 dark:bg-brand-900/30 dark:text-brand-300' 
                    : 'border-slate-200 dark:border-[#5f6368] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#303134]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-3">Estimated Weight (kg)</label>
            <input 
              required
              type="number" 
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="input-field" 
              placeholder="e.g. 2.5"
            />
          </div>

          <div className="pt-4">
             <button type="submit" disabled={!selectedCat || !weight} className="btn-primary w-full">
               Submit Log
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
