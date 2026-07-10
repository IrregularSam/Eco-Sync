import { supabase } from './supabase';

export const api = {
  // --- AUTH & USERS ---
  registerUser: async (fullName: string, email: string, address: string, location: string, password: string) => {
    // Only sign up, do NOT insert to the database yet since the user isn't verified.
    // Store the extra info in raw_user_meta_data so we can retrieve it after OTP verification.
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          full_name: fullName,
          address,
          location
        }
      }
    });
    if (error) throw error;
    return data;
  },

  verifySignupOtp: async (email: string, token: string) => {
    // 1. Verify the 6-digit code
    const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'signup' });
    if (error) throw error;

    // 2. The user is now logged in. We can safely insert their profile using the stored metadata.
    if (data.session?.user) {
      const user = data.session.user;
      const meta = user.user_metadata;
      
      const { error: insertError } = await supabase.from('users').insert([{ 
        uid: user.id, 
        full_name: meta.full_name || email, 
        address: meta.address || '', 
        role: 'user',
        eco_points: 0
      }]);
      // If it already exists (e.g. they verified twice), that's fine, ignore insert error
      if (insertError && insertError.code !== '23505') throw insertError;
    }
    return data;
  },

  sendPasswordReset: async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  },

  verifyPasswordReset: async (email: string, token: string) => {
    const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'recovery' });
    if (error) throw error;
    return data;
  },

  updatePassword: async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
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
