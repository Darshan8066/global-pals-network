
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthState } from '../types/user';

interface AuthContextType extends AuthState {
  login: (user: User, token: string) => void;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
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
    isLoading: false,
  });

  const login = (user: User, token: string) => {
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email!,
      name: userData.name!,
      role: userData.role!,
      country: userData.country!,
      city: userData.city!,
      occupation: userData.occupation || '',
      interests: userData.interests || [],
      isVerified: false,
      bio: userData.bio,
      createdAt: new Date(),
    };

    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
    });

    return true;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
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
    }}>
      {children}
    </AuthContext.Provider>
  );
};
