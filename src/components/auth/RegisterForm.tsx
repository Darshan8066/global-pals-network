import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, UserPlus, Globe, Sparkles } from 'lucide-react';

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
    
    if (!formData.name || !formData.email || !formData.password || !formData.role || !formData.country || !formData.city) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.role === '') {
      toast.error('Please select a role');
      return;
    }

    try {
      const success = await register({
        ...formData,
        role: formData.role as 'student' | 'artist' | 'businessperson',
        interests: [],
      });
      if (success) {
        toast.success('Welcome to Passport Pals! Your adventure begins now!');
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-2 border-gradient-to-r from-purple-400 to-blue-400 shadow-2xl transform hover:scale-105 transition-all duration-300">
      <CardHeader className="space-y-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white rounded-t-lg">
        <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-500">
            <UserPlus className="h-8 w-8 text-purple-600" />
            <Sparkles className="h-4 w-4 text-yellow-400 absolute animate-pulse" />
          </div>
          Join Passport Pals
        </CardTitle>
        <CardDescription className="text-center text-purple-100 text-lg">
          Connect with your community abroad and make your journey smoother
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-purple-700 font-semibold">Full Name *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-2 border-purple-200 focus:border-purple-500 bg-white/80 backdrop-blur-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-700 font-semibold">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border-2 border-purple-200 focus:border-purple-500 bg-white/80 backdrop-blur-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-purple-700 font-semibold">Password *</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="border-2 border-purple-200 focus:border-purple-500 bg-white/80 backdrop-blur-sm"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-purple-700 font-semibold">Role *</Label>
            <Select value={formData.role} onValueChange={(value: 'student' | 'artist' | 'businessperson') => setFormData({ ...formData, role: value })}>
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
              <Label htmlFor="country" className="text-purple-700 font-semibold">Country *</Label>
              <Input
                id="country"
                type="text"
                placeholder="Your home country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="border-2 border-purple-200 focus:border-purple-500 bg-white/80 backdrop-blur-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-purple-700 font-semibold">City *</Label>
              <Input
                id="city"
                type="text"
                placeholder="Your home city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="border-2 border-purple-200 focus:border-purple-500 bg-white/80 backdrop-blur-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="occupation" className="text-purple-700 font-semibold">Occupation</Label>
            <Input
              id="occupation"
              type="text"
              placeholder="Your current occupation or field of study"
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              className="border-2 border-purple-200 focus:border-purple-500 bg-white/80 backdrop-blur-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-purple-700 font-semibold">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself and your goals abroad..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="border-2 border-purple-200 focus:border-purple-500 bg-white/80 backdrop-blur-sm min-h-[100px]"
            />
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                <Globe className="mr-2 h-5 w-5" />
                Join the Community
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
              Sign In
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
