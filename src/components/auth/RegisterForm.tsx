
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, MapPin, Briefcase, Heart, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
}

const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '' as 'student' | 'artist' | 'businessperson' | '',
    country: '',
    city: '',
    occupation: '',
    bio: '',
    interests: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.password || !formData.role || !formData.country.trim() || !formData.city.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    
    const userData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
      role: formData.role as 'student' | 'artist' | 'businessperson',
      country: formData.country.trim(),
      city: formData.city.trim(),
      occupation: formData.occupation.trim(),
      interests: formData.interests ? formData.interests.split(',').map(i => i.trim()).filter(i => i) : [],
      bio: formData.bio.trim(),
    };

    const result = await register(userData);
    
    if (result.success) {
      if (result.error) {
        // This means registration was successful but needs email confirmation
        toast.success(result.error);
        setTimeout(() => {
          if (onSwitchToLogin) {
            onSwitchToLogin();
          }
        }, 2000);
      } else {
        toast.success('Account created successfully!');
      }
    } else {
      toast.error(result.error || 'Registration failed');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <User className="h-8 w-8 text-white" />
            <CardTitle className="text-3xl text-white">Join Passport Pals</CardTitle>
            <Heart className="h-6 w-6 text-red-300" />
          </div>
          <CardDescription className="text-white/90">
            Create your account to connect with your community abroad
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  placeholder="Enter your full name"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password * (minimum 6 characters)</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 pr-10"
                  placeholder="Create a password"
                  required
                  disabled={isLoading}
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-white/70 hover:text-white transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-white">I am a *</Label>
              <Select 
                value={formData.role} 
                onValueChange={(value: 'student' | 'artist' | 'businessperson') => setFormData({...formData, role: value})}
                disabled={isLoading}
              >
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border border-gray-600">
                  <SelectItem value="student" className="text-white hover:bg-slate-700">🎓 Student</SelectItem>
                  <SelectItem value="artist" className="text-white hover:bg-slate-700">🎨 Artist</SelectItem>
                  <SelectItem value="businessperson" className="text-white hover:bg-slate-700">💼 Business Person</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country" className="text-white flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Home Country *
                </Label>
                <Input
                  id="country"
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  placeholder="e.g., India"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city" className="text-white">Current City *</Label>
                <Input
                  id="city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  placeholder="e.g., Toronto"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation" className="text-white flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Occupation
              </Label>
              <Input
                id="occupation"
                type="text"
                value={formData.occupation}
                onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                placeholder="e.g., Software Engineer"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-white">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                placeholder="Tell us about yourself..."
                rows={3}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interests" className="text-white">Interests</Label>
              <Input
                id="interests"
                type="text"
                value={formData.interests}
                onChange={(e) => setFormData({...formData, interests: e.target.value})}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                placeholder="e.g., Travel, Food, Technology (comma separated)"
                disabled={isLoading}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>

            {onSwitchToLogin && (
              <div className="text-center mt-4">
                <Button
                  type="button"
                  variant="link"
                  onClick={onSwitchToLogin}
                  className="text-white/90 hover:text-white"
                  disabled={isLoading}
                >
                  Already have an account? Login here
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
