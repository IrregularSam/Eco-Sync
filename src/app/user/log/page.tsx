'use client';
import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { api } from '@/lib/api';

export default function LogWaste() {
  const { user, refreshProfile } = useUser();
  const [selectedCat, setSelectedCat] = useState('');
  const [weight, setWeight] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCat || !weight || !user?.id) return;
    
    setIsLoading(true);
    try {
      const result = await api.logWaste(user.id, selectedCat, parseFloat(weight));
      setEarnedPoints(result.pointsEarned);
      await refreshProfile(); // updates global context
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Failed to log waste");
    } finally {
      setIsLoading(false);
    }
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
        <p className="text-slate-600 dark:text-slate-400 mb-8">You've successfully logged {weight}kg of {selectedCat}. You earned {earnedPoints} Eco-points!</p>
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
             <button type="submit" disabled={!selectedCat || !weight || isLoading} className="btn-primary w-full flex items-center justify-center h-11">
               {isLoading ? (
                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
               ) : 'Submit Log'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
