import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { ADMIN_EMAIL } from '../constants';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  syncAccount: (user: User, additionalData?: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  logout: async () => {},
  loginWithGoogle: async () => {},
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  syncAccount: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sync user data to Supabase profiles table
  const syncAccount = async (user: User, additionalData: any = {}) => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      const userToSync = currentUser || user;
      
      if (!userToSync) return;

      const { error } = await supabase.from('profiles').upsert({
        id: userToSync.id,
        name: userToSync.user_metadata?.full_name || additionalData.name || userToSync.user_metadata?.name || 'User',
        email: userToSync.email,
        avatar: userToSync.user_metadata?.avatar_url
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error syncing user to Supabase:", error);
    }
  };

  const checkAdminStatus = async (user: User) => {
    // 1. Hardcoded check
    if (user.email === ADMIN_EMAIL) {
      setIsAdmin(true);
      return;
    }

    // 2. Database check (profiles table should have a role column if we want RBAC)
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (data && data.role === 'admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (err) {
      console.error("Error checking admin status:", err);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const user = session?.user ?? null;
        if (mounted) {
          setUser(user);
          if (user) {
            await checkAdminStatus(user);
            syncAccount(user).catch(console.error);
          }
        }
      } catch (err) {
        console.error("Error during initial auth:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initAuth();
    
    // Fallback: forcefully remove loading state after 2 seconds if supabase hangs
    const timeout = setTimeout(() => {
        if (mounted && loading) setLoading(false);
    }, 2000);

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      if (!mounted) return;
      
      setUser(currentUser);
      
      if (currentUser) {
        await checkAdminStatus(currentUser);
        syncAccount(currentUser).catch(console.error);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) throw error;
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUpWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAdmin, 
      loading, 
      logout, 
      loginWithGoogle, 
      signInWithEmail,
      signUpWithEmail,
      syncAccount 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
