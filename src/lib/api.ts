import { supabase } from './supabase';

export const api = {
  // --- AUTH & USERS ---
  registerUser: async (fullName: string, email: string, address: string, location: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    if (data.user) {
      const { error: insertError } = await supabase.from('users').insert([{ 
        uid: data.user.id, 
        full_name: fullName, 
        address, 
        role: 'user',
        eco_points: 0
      }]);
      if (insertError) throw insertError;
    }
    return data;
  },

  loginUser: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },
  
  logoutUser: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  getUserProfile: async (userId: string) => {
    const { data, error } = await supabase.from('users').select('*').eq('uid', userId).single();
    if (error) throw error;
    return data;
  },

  // --- WASTE LOGS & REWARDS ---
  logWaste: async (userId: string, category: string, weight: number) => {
    const pointsEarned = Math.floor(weight * 50);
    
    // 1. Insert into waste_logs
    const { error: logError } = await supabase.from('waste_logs').insert([{
      user_id: userId,
      category,
      weight_kg: weight,
      points_earned: pointsEarned
    }]);
    if (logError) throw logError;

    // 2. Update user's eco_points
    const { data: userData, error: userError } = await supabase.from('users').select('eco_points').eq('uid', userId).single();
    if (userError) throw userError;

    const newPoints = (userData.eco_points || 0) + pointsEarned;
    const { error: updateError } = await supabase.from('users').update({ eco_points: newPoints }).eq('uid', userId);
    if (updateError) throw updateError;

    return { pointsEarned, newTotal: newPoints };
  },

  getUserLogs: async (userId: string) => {
    const { data, error } = await supabase.from('waste_logs').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  redeemReward: async (userId: string, cost: number) => {
    const { data: userData, error: userError } = await supabase.from('users').select('eco_points').eq('uid', userId).single();
    if (userError) throw userError;

    if (userData.eco_points < cost) {
      throw new Error("Not enough Eco-points");
    }

    const newPoints = userData.eco_points - cost;
    const { error: updateError } = await supabase.from('users').update({ eco_points: newPoints }).eq('uid', userId);
    if (updateError) throw updateError;

    return newPoints;
  },

  // --- REPORTS ---
  submitReport: async (userId: string, issueType: string, location: string, description: string) => {
    const { error } = await supabase.from('reports').insert([{
      user_id: userId,
      issue_type: issueType,
      location,
      description,
      status: 'Pending'
    }]);
    if (error) throw error;
    return { success: true };
  },

  getReports: async () => {
    // Admins can see all reports
    const { data, error } = await supabase.from('reports').select(`*, users(full_name)`).order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
  
  resolveReport: async (reportId: string) => {
    const { error } = await supabase.from('reports').update({ status: 'Resolved' }).eq('id', reportId);
    if (error) throw error;
  },

  // --- ADMIN ---
  loginAdmin: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  getAnalytics: async () => {
    // Total users
    const { count: userCount } = await supabase.from('users').select('*', { count: 'exact' });
    
    // Total reports
    const { count: reportCount } = await supabase.from('reports').select('*', { count: 'exact' }).eq('status', 'Pending');
    
    // Total waste
    const { data: wasteData } = await supabase.from('waste_logs').select('weight_kg');
    const totalWasteKg = wasteData ? wasteData.reduce((acc, log) => acc + Number(log.weight_kg), 0) : 0;

    return {
      totalUsers: userCount || 0,
      openReports: reportCount || 0,
      totalWasteKg: Math.round(totalWasteKg * 10) / 10
    };
  }
};
