
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'artist' | 'businessperson';
  country: string;
  city: string;
  occupation: string;
  interests: string[];
  isVerified: boolean;
  profileImage?: string;
  bio?: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
