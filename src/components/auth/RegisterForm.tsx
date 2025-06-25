
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, MapPin, Briefcase, Heart, Globe, Users, Shield } from 'lucide-react';
import { toast } from 'sonner';

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
}

const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '' as 'student' | 'artist' | 'businessperson' | 'professional' | 'freelancer' | 'entrepreneur' | 'researcher' | 'teacher' | 'engineer' | 'designer' | '',
    country: '',
    city: '',
    occupation: '',
    bio: '',
    interests: ''
  });

  const roleOptions = [
    { value: 'student', label: '🎓 Student', color: 'text-blue-600' },
    { value: 'artist', label: '🎨 Artist', color: 'text-purple-600' },
    { value: 'businessperson', label: '💼 Business Person', color: 'text-green-600' },
    { value: 'professional', label: '👔 Professional', color: 'text-gray-600' },
    { value: 'freelancer', label: '💻 Freelancer', color: 'text-orange-600' },
    { value: 'entrepreneur', label: '🚀 Entrepreneur', color: 'text-red-600' },
    { value: 'researcher', label: '🔬 Researcher', color: 'text-indigo-600' },
    { value: 'teacher', label: '📚 Teacher', color: 'text-yellow-600' },
    { value: 'engineer', label: '⚙️ Engineer', color: 'text-teal-600' },
    { value: 'designer', label: '🎯 Designer', color: 'text-pink-600' },
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
      role: formData.role,
      country: formData.country,
      city: formData.city,
      occupation: formData.occupation,
      interests: formData.interests ? formData.interests.split(',').map(i => i.trim()) : [],
      bio: formData.bio,
    };

    const { error } = await register(userData);
    if (error) {
      toast.error(error.message || 'Registration failed');
    } else {
      toast.success('Account created successfully! Please check your email for verification.');
      if (onSwitchToLogin) {
        onSwitchToLogin();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 flex items-center justify-center p-4 overflow-y-auto">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-green-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-red-300 rounded-full opacity-20 animate-bounce delay-1000"></div>
      </div>

      <div className="w-full max-w-4xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Globe className="h-12 w-12 text-white animate-pulse" />
            <h1 className="text-5xl font-bold text-white drop-shadow-lg">Passport Pals</h1>
            <Heart className="h-10 w-10 text-red-300 animate-pulse" />
          </div>
          <p className="text-xl text-white/90 mb-4">Connect with your global community</p>
          <p className="text-lg text-white/80">Join thousands of verified members worldwide</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/30 text-center">
            <Users className="h-8 w-8 text-blue-300 mx-auto mb-2" />
            <h3 className="text-white font-semibold text-sm">Global Network</h3>
            <p className="text-white/80 text-xs">50,000+ Members</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/30 text-center">
            <Shield className="h-8 w-8 text-green-300 mx-auto mb-2" />
            <h3 className="text-white font-semibold text-sm">Verified Profiles</h3>
            <p className="text-white/80 text-xs">100% Secure</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/30 text-center">
            <MapPin className="h-8 w-8 text-pink-300 mx-auto mb-2" />
            <h3 className="text-white font-semibold text-sm">200+ Countries</h3>
            <p className="text-white/80 text-xs">Worldwide Reach</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/30 text-center">
            <Briefcase className="h-8 w-8 text-yellow-300 mx-auto mb-2" />
            <h3 className="text-white font-semibold text-sm">All Professions</h3>
            <p className="text-white/80 text-xs">Find Your Peers</p>
          </div>
        </div>

        <Card className="w-full bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <User className="h-8 w-8 text-white" />
              <CardTitle className="text-3xl text-white">Join Passport Pals</CardTitle>
              <Heart className="h-6 w-6 text-red-300" />
            </div>
            <CardDescription className="text-white/90 text-lg">
              Create your account and connect with your community abroad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white font-semibold">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-white/50"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-semibold">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-white/50"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-semibold">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-white/50"
                  placeholder="Create a strong password"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-white font-semibold">I am a *</Label>
                <Select value={formData.role} onValueChange={(value: any) => setFormData({...formData, role: value})}>
                  <SelectTrigger className="bg-white/20 border-white/30 text-white focus:border-white/50">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300">
                    {roleOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className={`${option.color} font-medium`}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-white font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Home Country *
                  </Label>
                  <Input
                    id="country"
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-white/50"
                    placeholder="e.g., India, China, Nigeria"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-white font-semibold">Current City *</Label>
                  <Input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-white/50"
                    placeholder="e.g., Toronto, London, Dubai"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupation" className="text-white font-semibold flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Occupation
                </Label>
                <Input
                  id="occupation"
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-white/50"
                  placeholder="e.g., Software Engineer, Medical Student"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-white font-semibold">About You</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-white/50"
                  placeholder="Tell us about yourself, your goals, and what you're looking for..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests" className="text-white font-semibold">Interests & Hobbies</Label>
                <Input
                  id="interests"
                  type="text"
                  value={formData.interests}
                  onChange={(e) => setFormData({...formData, interests: e.target.value})}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-white/50"
                  placeholder="e.g., Travel, Food, Technology, Sports (comma separated)"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 text-lg"
              >
                Create My Account
              </Button>

              {onSwitchToLogin && (
                <div className="text-center mt-6">
                  <Button
                    type="button"
                    variant="link"
                    onClick={onSwitchToLogin}
                    className="text-white/90 hover:text-white text-lg"
                  >
                    Already have an account? Sign in here
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Additional Info Section */}
        <div className="mt-8 text-center">
          <p className="text-white/80 text-sm mb-4">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
          <div className="flex justify-center space-x-6 text-white/70 text-sm">
            <span>✓ Email Verification Required</span>
            <span>✓ Profile Verification Available</span>
            <span>✓ 100% Secure & Private</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
