
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResendButton, setShowResendButton] = useState(false);
  const { login, resendConfirmation } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    setShowResendButton(false);
    
    const result = await login(email, password);
    
    if (!result.success) {
      if (result.error?.includes('Email not confirmed')) {
        setShowResendButton(true);
        toast.error(result.error);
      } else {
        toast.error(result.error || 'Login failed');
      }
    }
    
    setIsLoading(false);
  };

  const handleResendConfirmation = async () => {
    if (!email.trim()) {
      toast.error('Please enter your email address first');
      return;
    }

    setIsLoading(true);
    
    const result = await resendConfirmation(email);
    
    if (result.success) {
      toast.success('Confirmation email sent! Please check your inbox.');
      setShowResendButton(false);
    } else {
      toast.error(result.error || 'Failed to resend confirmation email');
    }
    
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-card shadow-2xl border-0">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-gray-300">
          Sign in to your Passport Pals account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-200">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-slate-800/50 border-blue-500/30 focus:border-blue-400 focus:ring-blue-400 text-white placeholder-gray-400"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-200">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 bg-slate-800/50 border-blue-500/30 focus:border-blue-400 focus:ring-blue-400 text-white placeholder-gray-400"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-200 transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>

          {showResendButton && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mt-4">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Email Not Confirmed</span>
              </div>
              <p className="text-sm text-amber-300 mb-3">
                Please check your email and click the confirmation link. If you didn't receive it, click below to resend.
              </p>
              <Button
                type="button"
                onClick={handleResendConfirmation}
                variant="outline"
                size="sm"
                className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Resend Confirmation Email'}
              </Button>
            </div>
          )}
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-300">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors hover:underline"
              disabled={isLoading}
            >
              Sign up here
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
