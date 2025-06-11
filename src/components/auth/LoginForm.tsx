
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Mail, Lock, Globe, Sparkles } from 'lucide-react';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const success = await login(email, password);
      if (success) {
        toast.success('Welcome back to Passport Pals!');
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-2 border-gradient-to-r from-blue-400 to-purple-400 shadow-2xl transform hover:scale-105 transition-all duration-300">
      <CardHeader className="space-y-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-t-lg">
        <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-500">
            <Globe className="h-8 w-8 text-blue-600" />
            <Sparkles className="h-4 w-4 text-yellow-400 absolute animate-pulse" />
          </div>
          Welcome Back
        </CardTitle>
        <CardDescription className="text-center text-blue-100 text-lg">
          Sign in to connect with your community abroad
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-blue-700 font-semibold">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-blue-400" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 border-2 border-blue-200 focus:border-blue-500 bg-white/80 backdrop-blur-sm"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-blue-700 font-semibold">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-blue-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 border-2 border-blue-200 focus:border-blue-500 bg-white/80 backdrop-blur-sm"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <Globe className="mr-2 h-5 w-5" />
                Sign In
              </>
            )}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-blue-600 hover:text-blue-500 font-medium underline"
            >
              Join Passport Pals
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
