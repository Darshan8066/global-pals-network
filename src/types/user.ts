
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

// Supabase profile type that matches the database schema
export interface SupabaseProfile {
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

export interface UserActivity {
  id: string;
  user_id: string;
  activity_type: string;
  activity_description: string;
  metadata: any;
  created_at: string;
}
