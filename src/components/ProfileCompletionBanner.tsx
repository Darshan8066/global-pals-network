
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, User, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileCompletionBannerProps {
  profileCompleted: boolean;
  isVerified: boolean;
}

const ProfileCompletionBanner = ({ profileCompleted, isVerified }: ProfileCompletionBannerProps) => {
  const navigate = useNavigate();

  if (profileCompleted && isVerified) return null;

  return (
    <Card className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <AlertCircle className="h-6 w-6 text-yellow-600 mt-1" />
          <div className="flex-1">
            <h3 className="font-bold text-yellow-800 text-lg mb-2">
              Complete Your Profile to Unlock All Features
            </h3>
            <div className="space-y-2 mb-4">
              {!profileCompleted && (
                <p className="text-yellow-700 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Complete your profile details to start connecting with other members
                </p>
              )}
              {!isVerified && (
                <p className="text-yellow-700 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Verify your identity to access chat and advanced features
                </p>
              )}
            </div>
            <div className="flex space-x-3">
              <Button 
                onClick={() => navigate('/profile/edit')}
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                Complete Profile
              </Button>
              {profileCompleted && !isVerified && (
                <Button 
                  variant="outline"
                  className="border-yellow-600 text-yellow-700 hover:bg-yellow-50"
                >
                  Verify Identity
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCompletionBanner;
