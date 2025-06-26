
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Save, X, User, Sparkles } from 'lucide-react';

interface EditProfileFormProps {
  onCancel: () => void;
}

const EditProfileForm = ({ onCancel }: EditProfileFormProps) => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'student' as 'student' | 'artist' | 'businessperson' | 'professional' | 'entrepreneur' | 'designer' | 'developer' | 'teacher' | 'doctor' | 'engineer' | 'chef' | 'writer',
    country: user?.country || '',
    city: user?.city || '',
    occupation: user?.occupation || '',
    bio: user?.bio || '',
    interests: user?.interests?.join(', ') || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.country || !formData.city) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      updateProfile({
        ...formData,
        interests: formData.interests.split(',').map(i => i.trim()).filter(i => i),
      });
      toast.success('Profile updated successfully!');
      onCancel();
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 relative overflow-hidden pb-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute top-40 right-40 w-24 h-24 bg-green-300 rounded-full opacity-10 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="relative">
              <User className="h-12 w-12 text-white drop-shadow-lg transform hover:rotate-12 transition-transform duration-500" />
              <Sparkles className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              Edit Profile
            </h1>
          </div>
        </div>

        <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white text-2xl text-center">Update Your Information</CardTitle>
            <CardDescription className="text-white/80 text-center">
              Keep your profile up to date to connect better with your community
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
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-semibold">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-white font-semibold">Role</Label>
                <Select value={formData.role} onValueChange={(value: any) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger className="bg-white/20 border-white/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="student" className="text-blue-300 hover:bg-slate-700">🎓 Student</SelectItem>
                    <SelectItem value="artist" className="text-pink-300 hover:bg-slate-700">🎨 Artist</SelectItem>
                    <SelectItem value="businessperson" className="text-green-300 hover:bg-slate-700">💼 Business Person</SelectItem>
                    <SelectItem value="professional" className="text-purple-300 hover:bg-slate-700">👨‍💻 Professional</SelectItem>
                    <SelectItem value="entrepreneur" className="text-orange-300 hover:bg-slate-700">🚀 Entrepreneur</SelectItem>
                    <SelectItem value="designer" className="text-cyan-300 hover:bg-slate-700">🎯 Designer</SelectItem>
                    <SelectItem value="developer" className="text-emerald-300 hover:bg-slate-700">💻 Developer</SelectItem>
                    <SelectItem value="teacher" className="text-yellow-300 hover:bg-slate-700">👨‍🏫 Teacher</SelectItem>
                    <SelectItem value="doctor" className="text-red-300 hover:bg-slate-700">👨‍⚕️ Doctor</SelectItem>
                    <SelectItem value="engineer" className="text-indigo-300 hover:bg-slate-700">⚙️ Engineer</SelectItem>
                    <SelectItem value="chef" className="text-amber-300 hover:bg-slate-700">👨‍🍳 Chef</SelectItem>
                    <SelectItem value="writer" className="text-violet-300 hover:bg-slate-700">✍️ Writer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-white font-semibold">Country *</Label>
                  <Input
                    id="country"
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="text-white font-semibold">City *</Label>
                  <Input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupation" className="text-white font-semibold">Occupation</Label>
                <Input
                  id="occupation"
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests" className="text-white font-semibold">Interests</Label>
                <Input
                  id="interests"
                  type="text"
                  placeholder="e.g., Technology, Travel, Photography (comma separated)"
                  value={formData.interests}
                  onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-white font-semibold">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 min-h-[100px]"
                />
              </div>

              <div className="flex space-x-4">
                <Button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button 
                  type="button"
                  onClick={onCancel}
                  variant="outline"
                  className="flex-1 bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditProfileForm;
