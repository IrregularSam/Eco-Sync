'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [routes] = useState([
    { id: 'Alpha', capacity: 32, status: 'optimal', bins: 120 },
    { id: 'Beta', capacity: 85, status: 'critical', bins: 98 },
    { id: 'Gamma', capacity: 65, status: 'warning', bins: 145 },
    { id: 'Delta', capacity: 12, status: 'optimal', bins: 88 },
  ]);

  const [fleet] = useState([
    { id: 'TRK-01', team: 'Bravo Team', status: 'En Route', route: 'Beta' },
    { id: 'TRK-02', team: 'Charlie Team', status: 'Idle', route: 'None' },
    { id: 'TRK-03', team: 'Alpha Team', status: 'Returning', route: 'Gamma' },
  ]);

  return (
    <main className="min-h-screen bg-neo-bg flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r-3 border-neo-border bg-white p-6 flex flex-col gap-4 relative z-10 shadow-neo mr-8 h-screen sticky top-0">
        <div className="text-xl font-black mb-8 text-neo-primary uppercase tracking-tighter">
          <div className="w-8 h-8 bg-neo-primary border-3 border-neo-border flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black mb-2">♻</div>
          Command Center
        </div>
        <Link href="/admin" className="font-bold text-neo-accent hover:translate-x-1 transition-transform">Overview</Link>
        <Link href="/admin/dispatch" className="font-bold hover:translate-x-1 transition-transform">Dispatch & Fleet</Link>
        <Link href="/admin/crm" className="font-bold hover:translate-x-1 transition-transform">CRM & Signups</Link>
        <div className="mt-auto">
          <Link href="/" className="font-bold border-2 border-neo-border px-4 py-2 rounded-pill hover:bg-neo-secondary hover:text-white transition-colors block text-center">Log Out</Link>
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 border-b-3 border-neo-border pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black uppercase mb-2">Fleet Telemetry</h1>
            <p className="text-lg font-semibold text-neo-text/70">
              Live capacity monitoring and dynamic route auto-scaling.
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="font-bold text-sm bg-white px-3 py-1 border-3 border-neo-border rounded-pill">04 Active Routes</div>
            <div className="bg-neo-primary text-white border-3 border-neo-border px-4 py-2 font-bold shadow-neo animate-pulse">
              SYSTEM: ONLINE
            </div>
          </div>
        </header>
        
        {/* Top Level Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
           <div className="neo-card bg-white p-4">
              <div className="text-sm font-bold text-neo-text/70 uppercase">Total Bins Tracked</div>
              <div className="text-4xl font-black mt-2">451</div>
           </div>
           <div className="neo-card bg-white p-4">
              <div className="text-sm font-bold text-neo-text/70 uppercase">Fleet Status</div>
              <div className="text-4xl font-black mt-2 text-neo-primary">2/3 Active</div>
           </div>
           <div className="neo-card bg-[#FFD166] p-4">
              <div className="text-sm font-bold text-neo-text/70 uppercase">Critical Routes</div>
              <div className="text-4xl font-black mt-2 text-neo-secondary">1</div>
           </div>
        </div>

        <h3 className="text-2xl font-black uppercase mb-4">Route Capacities</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {routes.map((route) => (
            <div key={route.id} className={`neo-card transition-transform ${route.status === 'critical' ? 'bg-[#FFD166] border-neo-secondary border-4 translate-y-[-4px] shadow-[6px_6px_0px_0px_rgba(255,79,0,1)]' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-black uppercase">Route {route.id}</div>
                <div className={`w-4 h-4 rounded-full border-2 border-neo-border ${route.status === 'critical' ? 'bg-neo-secondary animate-ping' : route.status === 'warning' ? 'bg-yellow-400' : 'bg-neo-primary'}`}></div>
              </div>
              <div className="text-5xl font-black mb-1">{route.capacity}%</div>
              <div className="font-bold uppercase text-xs mb-6 text-neo-text/70">{route.bins} Bins Assigned</div>
              
              {route.status === 'critical' ? (
                <button className="neo-btn-danger w-full text-sm py-2" onClick={() => alert('Dispatching Fleet to Route ' + route.id)}>DISPATCH FLEET</button>
              ) : (
                <button className="neo-btn-secondary w-full text-sm py-2" disabled>Monitoring...</button>
              )}
            </div>
          ))}
        </div>

        {/* Live Fleet Activity */}
        <h3 className="text-2xl font-black uppercase mb-4">Live Fleet Activity</h3>
        <div className="neo-card bg-white p-0 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-3 border-neo-border bg-neo-bg uppercase text-sm font-bold text-neo-text/70">
                <th className="p-4 border-r-3 border-neo-border">Truck ID</th>
                <th className="p-4 border-r-3 border-neo-border">Assigned Team</th>
                <th className="p-4 border-r-3 border-neo-border">Status</th>
                <th className="p-4">Current Route</th>
              </tr>
            </thead>
            <tbody className="font-semibold">
              {fleet.map((truck) => (
                <tr key={truck.id} className="border-b-3 border-neo-border hover:bg-neo-bg transition-colors">
                  <td className="p-4 border-r-3 border-neo-border font-black">{truck.id}</td>
                  <td className="p-4 border-r-3 border-neo-border">{truck.team}</td>
                  <td className="p-4 border-r-3 border-neo-border">
                    <span className={`px-2 py-1 text-xs border-2 border-neo-border rounded-sm ${truck.status === 'En Route' ? 'bg-neo-primary text-white' : truck.status === 'Returning' ? 'bg-[#FFD166]' : 'bg-gray-200'}`}>
                      {truck.status}
                    </span>
                  </td>
                  <td className="p-4 uppercase">{truck.route}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
