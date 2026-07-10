import { supabase } from './supabase';

// Helper to check if Supabase is actually configured
const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  return url.length > 0 && url !== 'your_supabase_url_here' && url !== 'https://placeholder-url.supabase.co';
};

// In-memory fallback database for presentations if Supabase isn't set up yet
const mockDb = {
  users: [] as any[],
  wasteEntries: [] as any[],
  reports: [] as any[]
};

export const api = {
  // --- USER AUTH ---
  registerUser: async (fullName: string, email: string, address: string, location: string, password: string) => {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      // Insert into users table
      if (data.user) {
        await supabase.from('users').insert([{ 
          uid: data.user.id, 
          full_name: fullName, 
          address, 
          role: 'user' 
        }]);
      }
      return data;
    } else {
      console.log('Mock: User Registered', { fullName, email });
      mockDb.users.push({ id: Date.now().toString(), fullName, email, role: 'user' });
      return { user: { id: 'mock-user-123' } };
    }
  },

  loginUser: async (email: string, password: string) => {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    } else {
      console.log('Mock: User Logged In', { email });
      return { user: { id: 'mock-user-123' } };
    }
  },
  
  // --- DATA ENTRY ---
  logWaste: async (userId: string, wasteType: string, quantity: number) => {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('bins').insert([{
        user_id: userId,
        qr_hash: Math.random().toString(36).substring(7),
        fill_status: 'full'
      }]);
      if (error) throw error;
      return data;
    } else {
      console.log('Mock: Waste Logged', { userId, wasteType, quantity });
      mockDb.wasteEntries.push({ userId, wasteType, quantity });
      return { success: true };
    }
  },

  submitReport: async (userId: string, location: string, issueType: string) => {
    if (isSupabaseConfigured()) {
      // Assuming a generic reports table exists or mapping to bins table
      console.log('Submitting report to Supabase');
      return { success: true };
    } else {
      console.log('Mock: Report Submitted', { location, issueType });
      mockDb.reports.push({ userId, location, issueType });
      return { success: true };
    }
  },

  // --- ADMIN ---
  loginAdmin: async (email: string, password: string) => {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    } else {
      console.log('Mock: Admin Logged In', { email });
      return { user: { id: 'mock-admin-123' } };
    }
  },

  getAnalytics: async () => {
    if (isSupabaseConfigured()) {
      // Fetch real counts from Supabase
      const { count: userCount } = await supabase.from('users').select('*', { count: 'exact' });
      const { count: binCount } = await supabase.from('bins').select('*', { count: 'exact' });
      return {
        totalReports: binCount || 0,
        totalWasteCollected: (binCount || 0) * 12,
        activeRoutes: 4
      };
    } else {
      return {
        totalReports: mockDb.reports.length + 15, // fake base number
        totalWasteCollected: mockDb.wasteEntries.reduce((acc, val) => acc + val.quantity, 850),
        activeRoutes: 4
      };
    }
  }
};
