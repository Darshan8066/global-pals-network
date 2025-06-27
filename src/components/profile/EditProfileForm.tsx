
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Save, X, User, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';

interface EditProfileFormProps {
  onCancel: () => void;
}

const EditProfileForm = ({ onCancel }: EditProfileFormProps) => {
  const { user, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'student' as 'student' | 'artist' | 'businessperson',
    country: user?.country || '',
    city: user?.city || '',
    occupation: user?.occupation || '',
    bio: user?.bio || '',
    interests: user?.interests?.join(', ') || '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.email.includes('@')) errors.email = 'Please enter a valid email';
    if (!formData.country.trim()) errors.country = 'Country is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateProfile({
        ...formData,
        interests: formData.interests.split(',').map(i => i.trim()).filter(i => i),
      });
      
      toast.success('Profile updated successfully!', {
        description: 'Your changes have been saved.',
      });
      onCancel();
    } catch (error) {
      toast.error('Failed to update profile', {
        description: 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const inputClassName = (fieldName: string) => 
    `form-input ${formErrors[fieldName] ? 'border-red-400 focus:ring-red-400' : ''}`;

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full float-animation blur-xl"></div>
        <div className="absolute top-40 right-40 w-24 h-24 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full drift-animation blur-xl"></div>
        <div className="absolute bottom-20 left-40 w-28 h-28 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full float-animation blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        {/* Professional Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative pulse-glow">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-4 shadow-2xl">
                <User className="h-10 w-10 text-white" />
              </div>
              <Sparkles className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1 bounce-gentle" />
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent text-shadow mb-2">
                Edit Profile
              </h1>
              <p className="text-lg text-blue-200 font-medium">Update your information</p>
            </div>
          </div>
        </div>

        <Card className="glass-card shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-white text-2xl font-bold">Profile Information</CardTitle>
            <CardDescription className="text-white/80 text-base">
              Keep your profile up to date to connect better with your community
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information Section */}
              <div className="form-section">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-400" />
                  Basic Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-field">
                    <Label htmlFor="name" className="form-label flex items-center gap-2">
                      Full Name *
                      {formErrors.name && <AlertCircle className="h-4 w-4 text-red-400" />}
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClassName('name')}
                      placeholder="Enter your full name"
                      required
                    />
                    {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
                  </div>

                  <div className="form-field">
                    <Label htmlFor="email" className="form-label flex items-center gap-2">
                      Email Address *
                      {formErrors.email && <AlertCircle className="h-4 w-4 text-red-400" />}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClassName('email')}
                      placeholder="Enter your email"
                      required
                    />
                    {formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                </div>

                <div className="form-field">
                  <Label htmlFor="role" className="form-label">
                    Role / Status
                  </Label>
                  <Select value={formData.role} onValueChange={(value: 'student' | 'artist' | 'businessperson') => setFormData({ ...formData, role: value })}>
                    <SelectTrigger className="form-select">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="student" className="text-white hover:bg-slate-700">🎓 Student</SelectItem>
                      <SelectItem value="artist" className="text-white hover:bg-slate-700">🎨 Artist</SelectItem>
                      <SelectItem value="businessperson" className="text-white hover:bg-slate-700">💼 Businessperson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Location Section */}
              <div className="form-section">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-green-400" />
                  Location
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-field">
                    <Label htmlFor="country" className="form-label flex items-center gap-2">
                      Country *
                      {formErrors.country && <AlertCircle className="h-4 w-4 text-red-400" />}
                    </Label>
                    <Input
                      id="country"
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className={inputClassName('country')}
                      placeholder="e.g., United States"
                      required
                    />
                    {formErrors.country && <p className="text-red-400 text-xs mt-1">{formErrors.country}</p>}
                  </div>

                  <div className="form-field">
                    <Label htmlFor="city" className="form-label flex items-center gap-2">
                      City *
                      {formErrors.city && <AlertCircle className="h-4 w-4 text-red-400" />}
                    </Label>
                    <Input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className={inputClassName('city')}
                      placeholder="e.g., New York"
                      required
                    />
                    {formErrors.city && <p className="text-red-400 text-xs mt-1">{formErrors.city}</p>}
                  </div>
                </div>
              </div>

              {/* Professional & Personal Section */}
              <div className="form-section">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-400" />
                  Professional & Personal
                </h3>
                
                <div className="space-y-6">
                  <div className="form-field">
                    <Label htmlFor="occupation" className="form-label">
                      Occupation / Field of Study
                    </Label>
                    <Input
                      id="occupation"
                      type="text"
                      value={formData.occupation}
                      onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                      className="form-input"
                      placeholder="e.g., Software Engineer, Medical Student"
                    />
                  </div>

                  <div className="form-field">
                    <Label htmlFor="interests" className="form-label">
                      Interests & Hobbies
                    </Label>
                    <Input
                      id="interests"
                      type="text"
                      placeholder="e.g., Technology, Travel, Photography, Music (separate with commas)"
                      value={formData.interests}
                      onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                      className="form-input"
                    />
                    <p className="text-white/60 text-xs mt-1">Separate multiple interests with commas</p>
                  </div>

                  <div className="form-field">
                    <Label htmlFor="bio" className="form-label">
                      About You
                    </Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself, your background, and what you're looking for in this community..."
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="form-textarea min-h-[120px]"
                      rows={5}
                    />
                    <p className="text-white/60 text-xs mt-1">This helps others connect with you</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="flex-1 btn-success relative"
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner mr-2"></div>
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
                
                <Button 
                  type="button"
                  onClick={onCancel}
                  disabled={isLoading}
                  className="flex-1 btn-outline"
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
