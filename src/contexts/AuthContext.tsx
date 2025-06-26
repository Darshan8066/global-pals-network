
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../integrations/supabase/client';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { toast } from 'sonner';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'artist' | 'businessperson' | 'professional' | 'entrepreneur' | 'designer' | 'developer' | 'teacher' | 'doctor' | 'engineer' | 'chef' | 'writer' | 'researcher' | 'consultant' | 'manager' | 'scientist' | 'lawyer' | 'photographer' | 'musician' | 'dancer' | 'athlete' | 'therapist' | 'social_worker' | 'journalist' | 'marketing_specialist' | 'sales_representative' | 'accountant' | 'other';
  country: string;
  city: string;
  occupation: string;
  bio: string;
  interests: string[];
  profileImage?: string;
  isVerified: boolean;
  createdAt: Date;
}

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  session: Session | null;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  updateProfile: async () => {},
  session: null,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      setSession(session);

      if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        await fetchUser(session?.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
  }, []);

  useEffect(() => {
    if (session?.user) {
      fetchUser(session.user).then(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [session]);

  const fetchUser = async (supabaseUser: SupabaseUser | undefined) => {
    if (!supabaseUser) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', supabaseUser.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        setIsAuthenticated(false);
        return;
      }

      if (profile) {
        const userProfile: User = {
          id: supabaseUser.id,
          name: profile.name || '',
          email: supabaseUser.email || '',
          role: (profile.role as User['role']) || 'student',
          country: profile.country || '',
          city: profile.city || '',
          occupation: profile.occupation || '',
          bio: profile.bio || '',
          interests: profile.interests || [],
          profileImage: profile.profile_image_url || '',
          isVerified: profile.is_verified || false,
          createdAt: new Date(profile.created_at || new Date())
        };

        setUser(userProfile);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Unexpected error fetching user data:', error);
      setIsAuthenticated(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Login error:', error);
        
        // Handle specific error cases
        if (error.message.includes('Email not confirmed')) {
          toast.error('Please check your email and click the confirmation link before logging in.');
        } else if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password. Please check your credentials and try again.');
        } else if (error.message.includes('Too many requests')) {
          toast.error('Too many login attempts. Please wait a moment before trying again.');
        } else {
          toast.error(error.message || 'An error occurred during login.');
        }
        throw error;
      }
      
      if (data.user) {
        toast.success('Logged in successfully!');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Error already handled above
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        toast.success('Logged out successfully.');
      }
    } catch (error) {
      toast.error('An error occurred during logout.');
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) {
      toast.error('No user is currently logged in.');
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) {
        toast.error(error.message);
      } else {
        // Optimistically update the user's state
        setUser({ ...user, ...data });
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      toast.error('An error occurred while updating the profile.');
    }
  };

  const value: AuthContextProps = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateProfile,
    session,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
