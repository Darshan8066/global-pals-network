import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, MapPin, Briefcase, Heart } from 'lucide-react';
import { toast } from 'sonner';

const RegisterForm = () => {
  const { login } = useAuth();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.role || !formData.country || !formData.city) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.role === '') {
      toast.error('Please select a role');
      return;
    }
    
    const newUser = {
      id: '1',
      email: formData.email,
      name: formData.name,
      role: formData.role as 'student' | 'artist' | 'businessperson',
      country: formData.country,
      city: formData.city,
      occupation: formData.occupation,
      interests: formData.interests ? formData.interests.split(',').map(i => i.trim()) : [],
      isVerified: false,
      bio: formData.bio,
      createdAt: new Date()
    };

    login(newUser);
    toast.success('Account created successfully!');
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
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
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
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                placeholder="Create a password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-white">I am a *</Label>
              <Select value={formData.role} onValueChange={(value: 'student' | 'artist' | 'businessperson') => setFormData({...formData, role: value})}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">🎓 Student</SelectItem>
                  <SelectItem value="artist">🎨 Artist</SelectItem>
                  <SelectItem value="businessperson">💼 Business Person</SelectItem>
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
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3"
            >
              Create Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
