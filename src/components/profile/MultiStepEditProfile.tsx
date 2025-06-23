
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, User, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GeneralInfoStep from './steps/GeneralInfoStep';
import PersonalDetailsStep from './steps/PersonalDetailsStep';
import DocumentsStep from './steps/DocumentsStep';
import ReviewStep from './steps/ReviewStep';

const MultiStepEditProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // General Info
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'student' as 'student' | 'artist' | 'businessperson',
    country: user?.country || '',
    city: user?.city || '',
    occupation: user?.occupation || '',
    bio: user?.bio || '',
    interests: user?.interests?.join(', ') || '',
    
    // Personal Details
    dateOfBirth: '',
    phoneNumber: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    
    // Bank Details
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    
    // Documents
    passportFile: null as File | null,
    passportNumber: '',
    passportExpiry: '',
    visaStatus: '',
  });

  const totalSteps = 4;
  const stepTitles = [
    'General Information',
    'Personal Details',
    'Documents & Verification',
    'Review & Submit'
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  const updateFormData = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <GeneralInfoStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <PersonalDetailsStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <DocumentsStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <ReviewStep formData={formData} onSubmit={handleCancel} />;
      default:
        return <GeneralInfoStep formData={formData} updateFormData={updateFormData} />;
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
          <p className="text-white/80 text-lg">Step {currentStep} of {totalSteps}: {stepTitles[currentStep - 1]}</p>
        </div>

        <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl">
          <CardHeader>
            <div className="space-y-4">
              <Progress value={(currentStep / totalSteps) * 100} className="w-full" />
              <CardTitle className="text-white text-2xl text-center">
                {stepTitles[currentStep - 1]}
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            {renderStep()}

            <div className="flex justify-between mt-8">
              <div className="space-x-4">
                <Button 
                  onClick={handleCancel}
                  variant="outline"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  Cancel
                </Button>
                {currentStep > 1 && (
                  <Button 
                    onClick={handlePrevious}
                    variant="outline"
                    className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                )}
              </div>

              {currentStep < totalSteps && (
                <Button 
                  onClick={handleNext}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MultiStepEditProfile;
