
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types/user';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: Partial<User> & { password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => void;
  resendConfirmation: (email: string) => Promise<{ success: boolean; error?: string }>;
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
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
          setAuthState({ user: null, isAuthenticated: false, isLoading: false });
          return;
        }

        if (session?.user) {
          const user: User = {
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '',
            role: (session.user.user_metadata?.role as 'student' | 'artist' | 'businessperson') || 'student',
            country: session.user.user_metadata?.country || '',
            city: session.user.user_metadata?.city || '',
            occupation: session.user.user_metadata?.occupation || '',
            interests: session.user.user_metadata?.interests || [],
            isVerified: session.user.email_confirmed_at ? true : false,
            bio: session.user.user_metadata?.bio,
            createdAt: new Date(session.user.created_at),
          };

          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setAuthState({ user: null, isAuthenticated: false, isLoading: false });
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event, session);

      if (event === 'SIGNED_IN' && session?.user) {
        const user: User = {
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '',
          role: (session.user.user_metadata?.role as 'student' | 'artist' | 'businessperson') || 'student',
          country: session.user.user_metadata?.country || '',
          city: session.user.user_metadata?.city || '',
          occupation: session.user.user_metadata?.occupation || '',
          interests: session.user.user_metadata?.interests || [],
          isVerified: session.user.email_confirmed_at ? true : false,
          bio: session.user.user_metadata?.bio,
          createdAt: new Date(session.user.created_at),
        };

        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
        
        toast.success('Successfully logged in!');
      } else if (event === 'SIGNED_OUT') {
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
        toast.success('Successfully logged out!');
      } else if (event === 'TOKEN_REFRESHED') {
        // Session refreshed, update user data if needed
        if (session?.user) {
          const user: User = {
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '',
            role: (session.user.user_metadata?.role as 'student' | 'artist' | 'businessperson') || 'student',
            country: session.user.user_metadata?.country || '',
            city: session.user.user_metadata?.city || '',
            occupation: session.user.user_metadata?.occupation || '',
            interests: session.user.user_metadata?.interests || [],
            isVerified: session.user.email_confirmed_at ? true : false,
            bio: session.user.user_metadata?.bio,
            createdAt: new Date(session.user.created_at),
          };

          setAuthState(prev => ({
            ...prev,
            user,
            isAuthenticated: true,
          }));
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        
        if (error.message.includes('Email not confirmed')) {
          return { 
            success: false, 
            error: 'Please check your email and click the confirmation link before logging in.' 
          };
        } else if (error.message.includes('Invalid login credentials')) {
          return { 
            success: false, 
            error: 'Invalid email or password. Please check your credentials and try again.' 
          };
        } else {
          return { 
            success: false, 
            error: error.message 
          };
        }
      }

      if (!data.user) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return { success: false, error: 'Login failed. Please try again.' };
      }

      // Success case is handled by onAuthStateChange
      return { success: true };
    } catch (error: any) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<{ success: boolean; error?: string }> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      // Validate required fields
      if (!userData.email || !userData.password || !userData.name || !userData.role || !userData.country || !userData.city) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return { success: false, error: 'Please fill in all required fields.' };
      }

      const { data, error } = await supabase.auth.signUp({
        email: userData.email.trim(),
        password: userData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            name: userData.name,
            role: userData.role,
            country: userData.country,
            city: userData.city,
            occupation: userData.occupation || '',
            interests: userData.interests || [],
            bio: userData.bio || '',
          }
        }
      });

      setAuthState(prev => ({ ...prev, isLoading: false }));

      if (error) {
        console.error('Registration error:', error);
        
        if (error.message.includes('User already registered')) {
          return { 
            success: false, 
            error: 'An account with this email already exists. Please try logging in instead.' 
          };
        } else if (error.message.includes('Password should be at least')) {
          return { 
            success: false, 
            error: 'Password should be at least 6 characters long.' 
          };
        } else {
          return { 
            success: false, 
            error: error.message 
          };
        }
      }

      if (!data.user) {
        return { success: false, error: 'Registration failed. Please try again.' };
      }

      // Check if user needs to confirm email
      if (!data.session) {
        return { 
          success: true, 
          error: 'Registration successful! Please check your email and click the confirmation link to complete your account setup.' 
        };
      }

      return { success: true };
    } catch (error: any) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      console.error('Registration error:', error);
      return { success: false, error: 'An unexpected error occurred during registration. Please try again.' };
    }
  };

  const resendConfirmation = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error: any) {
      console.error('Resend confirmation error:', error);
      return { success: false, error: 'Failed to resend confirmation email. Please try again.' };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error);
        toast.error('Error logging out');
      }
      
      // State will be updated by onAuthStateChange
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out');
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const updateProfile = (updates: Partial<User>) => {
    if (authState.user) {
      setAuthState(prev => ({
        ...prev,
        user: { ...prev.user!, ...updates },
      }));
    }
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      updateProfile,
      resendConfirmation,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
