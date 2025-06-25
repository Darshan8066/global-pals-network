
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, ArrowLeft } from 'lucide-react';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

const ForgotPasswordForm = ({ onBackToLogin }: ForgotPasswordFormProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) {
      console.error('Password reset error:', error);
      toast.error(error.message || 'Failed to send reset email');
    } else {
      setEmailSent(true);
      toast.success('Password reset email sent! Check your inbox.');
    }
    
    setIsLoading(false);
  };

  if (emailSent) {
    return (
      <Card className="w-full bg-white/95 backdrop-blur-md border border-white/30 shadow-2xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800">
            Check Your Email
          </CardTitle>
          <CardDescription className="text-gray-600 text-sm md:text-base">
            We've sent you a password reset link
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <Mail className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <p className="text-green-800 font-medium mb-2">Email sent successfully!</p>
            <p className="text-green-700 text-sm">
              Please check your email inbox and click the link to reset your password.
            </p>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={() => setEmailSent(false)}
                variant="outline"
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Try Again
              </Button>
              <Button
                onClick={onBackToLogin}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Back to Login
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white/95 backdrop-blur-md border border-white/30 shadow-2xl">
      <CardHeader className="space-y-1 text-center pb-4">
        <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800">
          Forgot Password?
        </CardTitle>
        <CardDescription className="text-gray-600 text-sm md:text-base">
          Enter your email to receive a password reset link
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2.5 text-sm md:text-base transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>

        <div className="text-center pt-4 border-t border-gray-200">
          <button
            onClick={onBackToLogin}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
