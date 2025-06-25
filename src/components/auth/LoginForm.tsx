
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, Globe, Shield, Users, Heart } from 'lucide-react';
import { toast } from 'sonner';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { error } = await login(email, password);
    
    if (error) {
      toast.error(error.message || 'Login failed');
    } else {
      toast.success('Welcome back!');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 flex items-center justify-center p-4 overflow-y-auto">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-green-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-red-300 rounded-full opacity-20 animate-bounce delay-1000"></div>
      </div>

      <div className="w-full max-w-4xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Globe className="h-12 w-12 text-white animate-pulse" />
            <h1 className="text-5xl font-bold text-white drop-shadow-lg">Passport Pals</h1>
            <Heart className="h-10 w-10 text-red-300 animate-pulse" />
          </div>
          <p className="text-xl text-white/90 mb-4">Welcome back to your global community</p>
          <p className="text-lg text-white/80">Sign in to connect with verified members worldwide</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-xl border border-white/30 text-center">
            <Users className="h-10 w-10 text-blue-300 mx-auto mb-3" />
            <h3 className="text-white font-bold text-lg">50,000+</h3>
            <p className="text-white/80 text-sm">Active Members</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-xl border border-white/30 text-center">
            <Shield className="h-10 w-10 text-green-300 mx-auto mb-3" />
            <h3 className="text-white font-bold text-lg">100%</h3>
            <p className="text-white/80 text-sm">Verified Profiles</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-xl border border-white/30 text-center">
            <Globe className="h-10 w-10 text-pink-300 mx-auto mb-3" />
            <h3 className="text-white font-bold text-lg">200+</h3>
            <p className="text-white/80 text-sm">Countries</p>
          </div>
        </div>

        <Card className="w-full max-w-md mx-auto bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold text-white">
              Sign In
            </CardTitle>
            <CardDescription className="text-white/90 text-lg">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-white">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/20 border-white/30 focus:border-white/50 text-white placeholder-white/60"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-white">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-white/20 border-white/30 focus:border-white/50 text-white placeholder-white/60"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-white/60 hover:text-white/80 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="text-center space-y-4">
              <p className="text-sm text-white/80">
                Don't have an account?{' '}
                <button
                  onClick={onSwitchToRegister}
                  className="text-white font-medium hover:text-white/80 transition-colors hover:underline"
                >
                  Create account here
                </button>
              </p>
              
              <div className="border-t border-white/20 pt-4">
                <p className="text-xs text-white/70">
                  Secure login • Encrypted data • Privacy protected
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <div className="mt-8 text-center">
          <h3 className="text-white text-xl font-semibold mb-4">Why Passport Pals?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
              <h4 className="text-white font-medium mb-2">🌍 Global Network</h4>
              <p className="text-white/80 text-sm">Connect with people from your home country living abroad</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
              <h4 className="text-white font-medium mb-2">🔒 Safe & Secure</h4>
              <p className="text-white/80 text-sm">All profiles are verified for your safety and peace of mind</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
