
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';
import { Eye, EyeOff, UserPlus, Mail, Lock, User, MapPin, Briefcase, FileText, Heart } from 'lucide-react';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student' as const,
    country: '',
    city: '',
    occupation: '',
    bio: '',
    interests: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            role: formData.role,
            country: formData.country,
            city: formData.city,
            occupation: formData.occupation,
            bio: formData.bio,
            interests: formData.interests.split(',').map(i => i.trim()).filter(i => i)
          }
        }
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Registration successful! Please check your email for verification, then login.');
        // Switch to login form after successful registration
        onSwitchToLogin();
      }
    } catch (error) {
      toast.error('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  // Only include roles that match the database constraint
  const roles = [
    { value: 'student', label: '🎓 Student', color: 'text-blue-400' },
    { value: 'artist', label: '🎨 Artist', color: 'text-pink-400' },
    { value: 'businessperson', label: '💼 Business Person', color: 'text-green-400' },
    { value: 'professional', label: '👨‍💻 Professional', color: 'text-purple-400' },
    { value: 'entrepreneur', label: '🚀 Entrepreneur', color: 'text-orange-400' },
    { value: 'designer', label: '🎯 Designer', color: 'text-cyan-400' },
    { value: 'developer', label: '💻 Developer', color: 'text-emerald-400' },
    { value: 'teacher', label: '👨‍🏫 Teacher', color: 'text-yellow-400' },
    { value: 'doctor', label: '👨‍⚕️ Doctor', color: 'text-red-400' },
    { value: 'engineer', label: '⚙️ Engineer', color: 'text-indigo-400' },
    { value: 'chef', label: '👨‍🍳 Chef', color: 'text-amber-400' },
    { value: 'writer', label: '✍️ Writer', color: 'text-violet-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 relative overflow-hidden py-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-green-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-red-300 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <div className="absolute bottom-40 right-40 w-28 h-28 bg-blue-300 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <Card className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-md border-white/20 shadow-2xl relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-full p-3">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-white">Join Passport Pals</CardTitle>
          <CardDescription className="text-blue-200 text-lg">
            Connect with your homeland community worldwide
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-blue-400 focus:bg-white/30"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-blue-400 focus:bg-white/30"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password *
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-blue-400 focus:bg-white/30 pr-10"
                  placeholder="Create a secure password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <Label htmlFor="role" className="text-white flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Role
              </Label>
              <Select value={formData.role} onValueChange={(value: any) => setFormData({ ...formData, role: value })}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {roles.map((role) => (
                    <SelectItem 
                      key={role.value} 
                      value={role.value} 
                      className={`${role.color} hover:bg-slate-700`}
                    >
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country" className="text-white flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Country *
                </Label>
                <Input
                  id="country"
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-blue-400 focus:bg-white/30"
                  placeholder="Your home country"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-white flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Current City *
                </Label>
                <Input
                  id="city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-blue-400 focus:bg-white/30"
                  placeholder="Where you live now"
                  required
                />
              </div>
            </div>

            {/* Professional Info */}
            <div className="space-y-2">
              <Label htmlFor="occupation" className="text-white flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Occupation
              </Label>
              <Input
                id="occupation"
                type="text"
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-blue-400 focus:bg-white/30"
                placeholder="What do you do?"
              />
            </div>

            {/* Bio and Interests */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-white flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  About You
                </Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-blue-400 focus:bg-white/30"
                  placeholder="Tell us about yourself..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests" className="text-white">Interests (comma separated)</Label>
                <Input
                  id="interests"
                  type="text"
                  value={formData.interests}
                  onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-blue-400 focus:bg-white/30"
                  placeholder="Travel, Technology, Food, Music..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105 border-0"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="text-center">
            <span className="text-blue-200">Already have an account? </span>
            <button
              onClick={onSwitchToLogin}
              className="text-blue-400 hover:text-blue-300 font-semibold hover:underline transition-colors"
            >
              Sign In
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
