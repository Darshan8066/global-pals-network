
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from '../integrations/supabase/client';

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'artist' | 'businessperson' | 'professional' | 'freelancer' | 'entrepreneur' | 'researcher' | 'teacher' | 'engineer' | 'designer';
  country: string;
  city: string;
  occupation: string;
  bio?: string;
  interests: string[];
  phone_number?: string;
  date_of_birth?: string;
  address?: string;
  emergency_contact?: string;
  emergency_phone?: string;
  passport_number?: string;
  passport_expiry?: string;
  visa_status?: string;
  is_verified: boolean;
  profile_completed: boolean;
  profile_image_url?: string;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  user: SupabaseUser | null;
  profile: Profile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ error: any }>;
  register: (userData: any) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    session: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        
        if (session?.user) {
          // Fetch user profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          setAuthState({
            user: session.user,
            profile,
            session,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setAuthState({
            user: null,
            profile: null,
            session: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data: profile }) => {
            setAuthState({
              user: session.user,
              profile,
              session,
              isAuthenticated: true,
              isLoading: false,
            });
          });
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const register = async (userData: any) => {
    const { error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          name: userData.name,
          role: userData.role,
        }
      }
    });

    if (!error) {
      // Update profile with additional data
      setTimeout(async () => {
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', userData.email)
          .single();

        if (profile) {
          await supabase
            .from('profiles')
            .update({
              name: userData.name,
              role: userData.role,
              country: userData.country,
              city: userData.city,
              occupation: userData.occupation,
              bio: userData.bio,
              interests: userData.interests || [],
            })
            .eq('id', profile.id);
        }
      }, 1000);
    }

    return { error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!authState.user) return { error: 'Not authenticated' };

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', authState.user.id);

    if (!error) {
      setAuthState(prev => ({
        ...prev,
        profile: prev.profile ? { ...prev.profile, ...updates } : null
      }));
    }

    return { error };
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
