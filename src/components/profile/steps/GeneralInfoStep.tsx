
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GeneralInfoStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

const GeneralInfoStep = ({ formData, updateFormData }: GeneralInfoStepProps) => {
  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white font-semibold">Full Name *</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
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
            onChange={(e) => handleChange('email', e.target.value)}
            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="role" className="text-white font-semibold">Role</Label>
        <Select value={formData.role} onValueChange={(value) => handleChange('role', value)}>
          <SelectTrigger className="bg-white/20 border-white/30 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-300">
            <SelectItem value="student">🎓 Student</SelectItem>
            <SelectItem value="artist">🎨 Artist</SelectItem>
            <SelectItem value="businessperson">💼 Businessperson</SelectItem>
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
            onChange={(e) => handleChange('country', e.target.value)}
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
            onChange={(e) => handleChange('city', e.target.value)}
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
          onChange={(e) => handleChange('occupation', e.target.value)}
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
          onChange={(e) => handleChange('interests', e.target.value)}
          className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio" className="text-white font-semibold">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell us about yourself..."
          value={formData.bio}
          onChange={(e) => handleChange('bio', e.target.value)}
          className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default GeneralInfoStep;
