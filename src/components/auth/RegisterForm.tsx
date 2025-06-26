
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
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '' as 'student' | 'artist' | 'businessperson' | 'professional' | 'entrepreneur' | 'designer' | 'developer' | 'teacher' | 'doctor' | 'engineer' | 'chef' | 'writer' | '',
    country: '',
    city: '',
    occupation: '',
    bio: '',
    interests: ''
  });

  const roles = [
    { value: 'student', label: '🎓 Student', color: 'text-blue-600' },
    { value: 'artist', label: '🎨 Artist', color: 'text-purple-600' },
    { value: 'businessperson', label: '💼 Business Person', color: 'text-green-600' },
    { value: 'professional', label: '👨‍💻 Professional', color: 'text-indigo-600' },
    { value: 'entrepreneur', label: '🚀 Entrepreneur', color: 'text-orange-600' },
    { value: 'designer', label: '🎯 Designer', color: 'text-pink-600' },
    { value: 'developer', label: '💻 Developer', color: 'text-cyan-600' },
    { value: 'teacher', label: '👨‍🏫 Teacher', color: 'text-yellow-600' },
    { value: 'doctor', label: '👨‍⚕️ Doctor', color: 'text-red-600' },
    { value: 'engineer', label: '⚙️ Engineer', color: 'text-gray-600' },
    { value: 'chef', label: '👨‍🍳 Chef', color: 'text-amber-600' },
    { value: 'writer', label: '✍️ Writer', color: 'text-teal-600' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.role || !formData.country || !formData.city) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!formData.role) {
      toast.error('Please select a role');
      return;
    }
    
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role as 'student' | 'artist' | 'businessperson' | 'professional' | 'entrepreneur' | 'designer' | 'developer' | 'teacher' | 'doctor' | 'engineer' | 'chef' | 'writer',
      country: formData.country,
      city: formData.city,
      occupation: formData.occupation,
      interests: formData.interests ? formData.interests.split(',').map(i => i.trim()) : [],
      bio: formData.bio,
    };

    try {
      const success = await register(userData);
      if (success) {
        toast.success('Account created successfully! Please use these credentials to login.');
        if (onSwitchToLogin) {
          setTimeout(() => {
            onSwitchToLogin();
          }, 2000);
        }
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <User className="h-8 w-8 text-white" />
            <CardTitle className="text-3xl text-white">Join Passport Pals</CardTitle>
            <Heart className="h-6 w-6 text-red-300" />
          </div>
          <CardDescription className="text-gray-300">
            Connect with your community abroad
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
                  className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400 pr-10"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-white">I am a *</Label>
              <Select value={formData.role} onValueChange={(value: any) => setFormData({...formData, role: value})}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white focus:border-blue-400">
                  <SelectValue placeholder="Select your role" className="text-white" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value} className={`text-white hover:bg-slate-700 ${role.color}`}>
                      <span className="font-medium">{role.label}</span>
                    </SelectItem>
                  ))}
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
                  className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
                  placeholder="e.g., India"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city" className="text-white">Current City *</Label>
                <Input
                  id="city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
                  placeholder="e.g., Toronto"
                  required
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
                className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
                placeholder="e.g., Software Engineer"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-white">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
                placeholder="Tell us about yourself..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interests" className="text-white">Interests</Label>
              <Input
                id="interests"
                type="text"
                value={formData.interests}
                onChange={(e) => setFormData({...formData, interests: e.target.value})}
                className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
                placeholder="e.g., Travel, Food, Technology (comma separated)"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3"
            >
              Create Account
            </Button>

            {onSwitchToLogin && (
              <div className="text-center mt-4">
                <Button
                  type="button"
                  variant="link"
                  onClick={onSwitchToLogin}
                  className="text-gray-300 hover:text-white"
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
