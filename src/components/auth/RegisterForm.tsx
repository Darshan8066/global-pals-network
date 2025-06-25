
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, MapPin, Briefcase, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
}

const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '' as 'student' | 'artist' | 'businessperson' | 'professional' | 'freelancer' | 'entrepreneur' | 'researcher' | 'teacher' | 'engineer' | 'designer' | '',
    country: '',
    city: '',
    occupation: '',
  });

  const roleOptions = [
    { value: 'student', label: '🎓 Student' },
    { value: 'artist', label: '🎨 Artist' },
    { value: 'businessperson', label: '💼 Business Person' },
    { value: 'professional', label: '👔 Professional' },
    { value: 'freelancer', label: '💻 Freelancer' },
    { value: 'entrepreneur', label: '🚀 Entrepreneur' },
    { value: 'researcher', label: '🔬 Researcher' },
    { value: 'teacher', label: '📚 Teacher' },
    { value: 'engineer', label: '⚙️ Engineer' },
    { value: 'designer', label: '🎯 Designer' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.role || !formData.country || !formData.city) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    
    console.log('Attempting registration with:', { 
      email: formData.email, 
      name: formData.name,
      role: formData.role 
    });

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      country: formData.country,
      city: formData.city,
      occupation: formData.occupation,
      interests: [],
      bio: '',
    };

    const { error } = await register(userData);
    
    if (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed');
    } else {
      toast.success('Account created! Please check your email to verify your account.');
      if (onSwitchToLogin) {
        setTimeout(() => onSwitchToLogin(), 2000);
      }
    }
    
    setIsLoading(false);
  };

  return (
    <Card className="w-full bg-white/95 backdrop-blur-md border border-white/30 shadow-2xl">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <User className="h-6 w-6 text-blue-600" />
          <CardTitle className="text-2xl md:text-3xl text-gray-800">Join Passport Pals</CardTitle>
        </div>
        <CardDescription className="text-gray-600 text-sm md:text-base">
          Create your account to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name *</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="pl-10 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password *</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="pr-10 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Create a password (min 6 characters)"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium text-gray-700">I am a *</Label>
            <Select value={formData.role} onValueChange={(value: any) => setFormData({...formData, role: value})}>
              <SelectTrigger className="bg-white border-gray-300 text-gray-900 focus:border-blue-500">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300">
                {roleOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-gray-900 hover:bg-blue-50">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Home Country *
              </Label>
              <Input
                id="country"
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                className="bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="e.g., India, Nigeria"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-medium text-gray-700">Current City *</Label>
              <Input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="e.g., Toronto, London"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="occupation" className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <Briefcase className="h-3 w-3" />
              Occupation
            </Label>
            <Input
              id="occupation"
              type="text"
              value={formData.occupation}
              onChange={(e) => setFormData({...formData, occupation: e.target.value})}
              className="bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="e.g., Software Engineer, Student"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2.5 text-sm md:text-base transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>

          {onSwitchToLogin && (
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition-colors"
                >
                  Sign in here
                </button>
              </p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
