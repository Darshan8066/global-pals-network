
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2, User, Mail, Lock, Globe, MapPin, Briefcase } from 'lucide-react';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '' as 'student' | 'artist' | 'businessperson' | '',
    country: '',
    city: '',
    occupation: '',
    bio: '',
  });
  
  const { register, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.role || !formData.country) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const success = await register(formData);
      if (success) {
        toast.success('Welcome to Passport Pals! Your profile is being reviewed for verification.');
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-2 border-gradient-to-r from-purple-400 to-pink-400 shadow-2xl transform hover:scale-105 transition-all duration-300">
      <CardHeader className="space-y-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white rounded-t-lg">
        <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-500">
            <Globe className="h-8 w-8 text-purple-600" />
          </div>
          Join Passport Pals
        </CardTitle>
        <CardDescription className="text-center text-purple-100 text-lg">
          Connect with your community worldwide
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-purple-700 font-semibold">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className="pl-12 border-2 border-purple-200 focus:border-purple-500 bg-white/80 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-700 font-semibold">Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="pl-12 border-2 border-purple-200 focus:border-purple-500 bg-white/80 backdrop-blur-sm"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-purple-700 font-semibold">Password *</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                className="pl-12 border-2 border-purple-200 focus:border-purple-500 bg-white/80 backdrop-blur-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-purple-700 font-semibold">I am a *</Label>
            <Select value={formData.role} onValueChange={(value: 'student' | 'artist' | 'businessperson') => updateFormData('role', value)}>
              <SelectTrigger className="border-2 border-purple-200 focus:border-purple-500 bg-white/80 backdrop-blur-sm">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">🎓 Student</SelectItem>
                <SelectItem value="artist">🎨 Artist</SelectItem>
                <SelectItem value="businessperson">💼 Businessperson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="country" className="text-purple-700 font-semibold">Home Country *</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                <Input
                  id="country"
                  placeholder="India"
                  value={formData.country}
                  onChange={(e) => updateFormData('country', e.target.value)}
                  className="pl-12 border-2 border-purple-200 focus:border-purple-500 bg-white/80 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-purple-700 font-semibold">City</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                <Input
                  id="city"
                  placeholder="Mumbai"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                  className="pl-12 border-2 border-purple-200 focus:border-purple-500 bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="occupation" className="text-purple-700 font-semibold">Occupation/Field of Study</Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
              <Input
                id="occupation"
                placeholder="Computer Science Student"
                value={formData.occupation}
                onChange={(e) => updateFormData('occupation', e.target.value)}
                className="pl-12 border-2 border-purple-200 focus:border-purple-500 bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-purple-700 font-semibold">Tell us about yourself</Label>
            <Textarea
              id="bio"
              placeholder="Share a bit about yourself and what you're looking for in the community..."
              value={formData.bio}
              onChange={(e) => updateFormData('bio', e.target.value)}
              rows={3}
              className="border-2 border-purple-200 focus:border-purple-500 bg-white/80 backdrop-blur-sm"
            />
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                <User className="mr-2 h-5 w-5" />
                Create Account
              </>
            )}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-purple-600 hover:text-purple-500 font-medium underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
