'use client';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const { user, profile, logout } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (!profile) return <div className="animate-pulse h-64 bg-slate-200 dark:bg-[#303134] rounded"></div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-medium text-slate-900 dark:text-white mb-1">My Profile</h1>
        <p className="text-slate-600 dark:text-slate-400">Manage your account and view your impact.</p>
      </header>

      <div className="card overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-[#3c4043] flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex items-center justify-center border-4 border-white dark:border-[#202124] shadow-sm">
             <img src={`https://api.dicebear.com/9.x/notionists/svg?seed=${profile.full_name}`} alt="avatar" />
          </div>
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl font-medium text-slate-900 dark:text-white mb-1">{profile.full_name}</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-4">{user?.email}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400">
                {profile.eco_points} Eco Points
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 dark:bg-[#303134] text-slate-700 dark:text-slate-300">
                Zone: {profile.district || profile.address}
              </span>
            </div>
          </div>
          <button onClick={handleLogout} className="btn-secondary whitespace-nowrap">
            Sign Out
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
           <div>
             <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Account Details</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div>
                 <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Full Name</p>
                 <p className="text-slate-900 dark:text-white">{profile.full_name}</p>
               </div>
               <div>
                 <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Email Address</p>
                 <p className="text-slate-900 dark:text-white">{user?.email}</p>
               </div>
               <div>
                 <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Street Address</p>
                 <p className="text-slate-900 dark:text-white">{profile.address}</p>
               </div>
               <div>
                 <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">District / Zone</p>
                 <p className="text-slate-900 dark:text-white">{profile.district || 'N/A'}</p>
               </div>
               <div>
                 <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Account Role</p>
                 <p className="text-slate-900 dark:text-white capitalize">{profile.role}</p>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
