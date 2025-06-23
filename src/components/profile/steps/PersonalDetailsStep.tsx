
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PersonalDetailsStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

const PersonalDetailsStep = ({ formData, updateFormData }: PersonalDetailsStepProps) => {
  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Personal Information</CardTitle>
          <CardDescription className="text-white/80">
            Personal details for verification and emergency contact
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth" className="text-white font-semibold">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-white font-semibold">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-white font-semibold">Full Address</Label>
            <Textarea
              id="address"
              placeholder="Street address, city, state/province, postal code"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Emergency Contact</CardTitle>
          <CardDescription className="text-white/80">
            Person to contact in case of emergency
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emergencyContact" className="text-white font-semibold">Emergency Contact Name</Label>
              <Input
                id="emergencyContact"
                type="text"
                placeholder="Full name of emergency contact"
                value={formData.emergencyContact}
                onChange={(e) => handleChange('emergencyContact', e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyPhone" className="text-white font-semibold">Emergency Phone</Label>
              <Input
                id="emergencyPhone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.emergencyPhone}
                onChange={(e) => handleChange('emergencyPhone', e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Banking Information */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Banking Information</CardTitle>
          <CardDescription className="text-white/80">
            For payments and financial transactions (optional)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bankName" className="text-white font-semibold">Bank Name</Label>
            <Input
              id="bankName"
              type="text"
              placeholder="e.g., Chase Bank, Bank of America"
              value={formData.bankName}
              onChange={(e) => handleChange('bankName', e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="accountNumber" className="text-white font-semibold">Account Number</Label>
              <Input
                id="accountNumber"
                type="text"
                placeholder="••••••••••"
                value={formData.accountNumber}
                onChange={(e) => handleChange('accountNumber', e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="routingNumber" className="text-white font-semibold">Routing Number</Label>
              <Input
                id="routingNumber"
                type="text"
                placeholder="9 digit routing number"
                value={formData.routingNumber}
                onChange={(e) => handleChange('routingNumber', e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalDetailsStep;
