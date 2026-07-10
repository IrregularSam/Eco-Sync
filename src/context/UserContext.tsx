'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { supabase } from '@/lib/supabase';

type UserContextType = {
  user: any | null;
  profile: any | null;
  isLoading: boolean;
  refreshProfile: () => Promise<void>;
  logout: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  profile: null,
  isLoading: true,
  refreshProfile: async () => {},
  logout: async () => {}
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshProfile = async () => {
    if (!user) return;
    try {
      const data = await api.getUserProfile(user.id);
      setProfile(data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  const logout = async () => {
    await api.logoutUser();
    setUser(null);
    setProfile(null);
    // Usually redirect to login happens in the component
  };

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch profile whenever user changes
  useEffect(() => {
    if (user) {
      refreshProfile();
    } else {
      setProfile(null);
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, profile, isLoading, refreshProfile, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
