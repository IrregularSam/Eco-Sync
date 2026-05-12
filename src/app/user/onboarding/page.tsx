'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function UserOnboarding() {
  const [step, setStep] = useState(1);

  return (
    <main className="page-wrapper animate-fade-in container">
      <header style={{ padding: '2rem 0' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--brand-primary)' }}>Eco-Sync Setup</h1>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <div style={{ height: '4px', flex: 1, backgroundColor: step >= 1 ? 'var(--brand-primary)' : 'var(--border-color)', borderRadius: '2px' }}></div>
          <div style={{ height: '4px', flex: 1, backgroundColor: step >= 2 ? 'var(--brand-primary)' : 'var(--border-color)', borderRadius: '2px' }}></div>
          <div style={{ height: '4px', flex: 1, backgroundColor: step >= 3 ? 'var(--brand-primary)' : 'var(--border-color)', borderRadius: '2px' }}></div>
        </div>
      </header>

      <div style={{ maxWidth: '600px', margin: '2rem auto', width: '100%' }}>
        {step === 1 && (
          <section className="glass-panel animate-fade-in" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Address Verification</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Enter your full address to determine your collection route.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Street Address</label>
                <input type="text" placeholder="123 Eco Way" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>House/Apt Number</label>
                <input type="text" placeholder="Apt 4B" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
              </div>
            </div>

            <button onClick={() => setStep(2)} className="btn-primary" style={{ width: '100%' }}>Continue</button>
          </section>
        )}

        {step === 2 && (
          <section className="glass-panel animate-fade-in" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Bin Provisioning</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Your address is on <strong style={{ color: 'var(--brand-primary)' }}>Route Alpha</strong>. A physical bin with a unique QR code will be delivered to your address within 48 hours.</p>
            
            <div style={{ padding: '1.5rem', background: 'var(--bg-primary)', borderRadius: '12px', borderLeft: '4px solid var(--brand-secondary)', marginBottom: '2rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>Setup Fee: $25.00</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Includes your physical smart bin and first month subscription.</p>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setStep(1)} style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', border: '1px solid var(--border-color)', background: 'transparent', cursor: 'pointer', fontWeight: 600, color: 'var(--text-primary)' }}>Back</button>
              <button onClick={() => setStep(3)} className="btn-primary" style={{ flex: 1 }}>Proceed to Payment</button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="glass-panel animate-fade-in" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Wallet Gateway</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Securely add funds to your wallet for the setup fee and future monthly renewals.</p>
            
            <div style={{ padding: '2rem', border: '2px dashed var(--border-color)', borderRadius: '12px', textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>$25.00</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Due Today</p>
            </div>

            <Link href="/user" className="btn-primary" style={{ display: 'block', width: '100%', textAlign: 'center', background: 'var(--success)' }}>
              Pay & Complete Setup
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
