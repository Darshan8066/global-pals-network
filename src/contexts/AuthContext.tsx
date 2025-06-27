
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  role: 'student' | 'artist' | 'businessperson';
  country: string;
  city: string;
  occupation?: string;
  bio?: string;
  interests: string[];
  profile_image_url?: string;
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
  created_at: string;
  updated_at: string;
}

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ error: any }>;
  register: (userData: {
    email: string;
    password: string;
    name: string;
    role: 'student' | 'artist' | 'businessperson';
    country: string;
    city: string;
    occupation?: string;
    bio?: string;
    interests?: string[];
  }) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>;
  logActivity: (activityType: string, description: string, metadata?: any) => Promise<void>;
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

  // Fetch user profile from Supabase
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data as UserProfile;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  // Log user activity
  const logActivity = async (activityType: string, description: string, metadata: any = {}) => {
    if (!authState.user) return;

    try {
      await supabase
        .from('user_activities')
        .insert({
          user_id: authState.user.id,
          activity_type: activityType,
          activity_description: description,
          metadata
        });
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  // Set up auth state listener
  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        
        if (session?.user) {
          // Fetch user profile
          const profile = await fetchUserProfile(session.user.id);
          
          setAuthState({
            user: session.user,
            profile,
            session,
            isAuthenticated: true,
            isLoading: false,
          });

          // Log login activity
          if (event === 'SIGNED_IN') {
            setTimeout(() => {
              logActivity('login', 'User signed in');
            }, 0);
          }
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
        fetchUserProfile(session.user.id).then((profile) => {
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
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        toast.error(error.message);
        return { error };
      }

      toast.success('Successfully signed in!');
      return { error: null };
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      toast.error('An unexpected error occurred');
      return { error };
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    name: string;
    role: 'student' | 'artist' | 'businessperson';
    country: string;
    city: string;
    occupation?: string;
    bio?: string;
    interests?: string[];
  }) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name: userData.name,
            role: userData.role,
            country: userData.country,
            city: userData.city,
            occupation: userData.occupation || '',
            bio: userData.bio || '',
            interests: userData.interests || [],
          },
        },
      });

      if (error) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        toast.error(error.message);
        return { error };
      }

      if (data.user && !data.session) {
        toast.success('Registration successful! Please check your email to confirm your account.');
      } else {
        toast.success('Account created successfully!');
      }

      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { error: null };
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      toast.error('An unexpected error occurred during registration');
      return { error };
    }
  };

  const logout = async () => {
    try {
      await logActivity('logout', 'User signed out');
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error('Error signing out');
        return;
      }

      toast.success('Successfully signed out');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Error signing out');
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!authState.user) {
      return { error: new Error('No user logged in') };
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', authState.user.id)
        .select()
        .single();

      if (error) {
        toast.error('Failed to update profile');
        return { error };
      }

      // Update local state
      setAuthState(prev => ({
        ...prev,
        profile: data as UserProfile,
      }));

      // Log activity
      await logActivity('profile_update', 'User updated profile', updates);
      
      toast.success('Profile updated successfully!');
      return { error: null };
    } catch (error) {
      toast.error('Failed to update profile');
      return { error };
    }
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      updateProfile,
      logActivity,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
