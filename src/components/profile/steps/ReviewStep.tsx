
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../../../contexts/AuthContext';
import { toast } from 'sonner';
import { CheckCircle, FileText, User, Phone, CreditCard } from 'lucide-react';

interface ReviewStepProps {
  formData: any;
  onSubmit: () => void;
}

const ReviewStep = ({ formData, onSubmit }: ReviewStepProps) => {
  const { updateProfile } = useAuth();

  const handleSubmit = async () => {
    try {
      // Process the form data
      const processedData = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        country: formData.country,
        city: formData.city,
        occupation: formData.occupation,
        bio: formData.bio,
        interests: formData.interests.split(',').map((i: string) => i.trim()).filter((i: string) => i),
      };

      updateProfile(processedData);
      toast.success('Profile updated successfully!');
      onSubmit();
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Review Your Information</h3>
        <p className="text-white/80">Please review all the information before submitting</p>
      </div>

      {/* General Information */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="h-5 w-5" />
            General Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-white">
            <div><strong>Name:</strong> {formData.name}</div>
            <div><strong>Email:</strong> {formData.email}</div>
            <div><strong>Role:</strong> {formData.role}</div>
            <div><strong>Location:</strong> {formData.city}, {formData.country}</div>
            <div><strong>Occupation:</strong> {formData.occupation}</div>
          </div>
          {formData.bio && (
            <div className="text-white">
              <strong>Bio:</strong> {formData.bio}
            </div>
          )}
          {formData.interests && (
            <div>
              <strong className="text-white">Interests:</strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.interests.split(',').map((interest: string, index: number) => (
                  <Badge key={index} variant="outline" className="bg-white/20 text-white border-white/30">
                    {interest.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Personal Details */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Personal Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-white">
            {formData.dateOfBirth && <div><strong>Date of Birth:</strong> {formData.dateOfBirth}</div>}
            {formData.phoneNumber && <div><strong>Phone:</strong> {formData.phoneNumber}</div>}
            {formData.emergencyContact && <div><strong>Emergency Contact:</strong> {formData.emergencyContact}</div>}
            {formData.emergencyPhone && <div><strong>Emergency Phone:</strong> {formData.emergencyPhone}</div>}
          </div>
          {formData.address && (
            <div className="text-white">
              <strong>Address:</strong> {formData.address}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Banking Information */}
      {(formData.bankName || formData.accountNumber) && (
        <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Banking Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-white">
              {formData.bankName && <div><strong>Bank:</strong> {formData.bankName}</div>}
              {formData.accountNumber && <div><strong>Account:</strong> ••••{formData.accountNumber.slice(-4)}</div>}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Documents */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documents & Verification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-white">
            {formData.passportFile && <div><strong>Passport:</strong> {formData.passportFile.name}</div>}
            {formData.passportNumber && <div><strong>Passport Number:</strong> {formData.passportNumber}</div>}
            {formData.passportExpiry && <div><strong>Expiry Date:</strong> {formData.passportExpiry}</div>}
            {formData.visaStatus && <div><strong>Visa Status:</strong> {formData.visaStatus}</div>}
          </div>
        </CardContent>
      </Card>

      <div className="text-center pt-6">
        <Button 
          onClick={handleSubmit}
          className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white text-lg px-8 py-3"
        >
          <CheckCircle className="h-5 w-5 mr-2" />
          Submit Profile Changes
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;
