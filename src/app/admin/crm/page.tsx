'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminCRM() {
  const [users, setUsers] = useState([
    { uid: '1', full_name: 'Alice Johnson', address: '45 Green St', status: 'pending' },
    { uid: '2', full_name: 'Bob Smith', address: '12 React Ave', status: 'pending' },
  ]);

  const handleApprove = (uid: string) => {
    setUsers(users.filter(u => u.uid !== uid));
    alert('User approved and bin provisioned!');
  };

  return (
    <main className="min-h-screen bg-neo-bg flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r-3 border-neo-border bg-white p-6 flex flex-col gap-4 relative z-10 shadow-neo mr-8">
        <div className="text-xl font-black mb-8 text-neo-primary uppercase tracking-tighter">
          <div className="w-8 h-8 bg-neo-primary border-3 border-neo-border flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black mb-2">♻</div>
          Command Center
        </div>
        <Link href="/admin" className="font-bold hover:translate-x-1 transition-transform">Overview</Link>
        <Link href="/admin/dispatch" className="font-bold hover:translate-x-1 transition-transform">Dispatch & Fleet</Link>
        <Link href="/admin/crm" className="font-bold text-neo-accent hover:translate-x-1 transition-transform">CRM & Signups</Link>
        <div className="mt-auto">
          <Link href="/" className="font-bold border-2 border-neo-border px-4 py-2 rounded-pill hover:bg-neo-secondary hover:text-white transition-colors block text-center">Log Out</Link>
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-4xl font-black uppercase mb-2">Applications CRM</h1>
        <p className="text-lg font-semibold text-neo-text/70 mb-8 border-b-3 border-neo-border pb-6">
          Review new customer signups and provision smart bins.
        </p>

        {users.length === 0 ? (
          <div className="neo-card bg-[#FFD166]">
            <h3 className="text-xl font-black">All Caught Up!</h3>
            <p className="font-medium">There are no pending customer applications right now.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {users.map((user) => (
              <div key={user.uid} className="neo-card flex justify-between items-center bg-white hover:-translate-y-1 transition-transform">
                <div>
                  <h3 className="text-xl font-black uppercase">{user.full_name}</h3>
                  <p className="font-bold text-neo-text/70">{user.address}</p>
                  <p className="text-sm mt-2 font-medium bg-neo-secondary text-white inline-block px-2 py-1 rounded-sm">PENDING APPROVAL</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => handleApprove(user.uid)} className="neo-btn">
                    Approve & Provision Bin
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
