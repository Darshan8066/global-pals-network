
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import { Sparkles, Heart } from 'lucide-react';

const AuthPage = () => {
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-20 h-20 md:w-40 md:h-40 bg-yellow-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-20 right-20 w-16 h-16 md:w-32 md:h-32 bg-green-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 md:w-24 md:h-24 bg-red-300 rounded-full opacity-20 animate-bounce delay-1000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-8 w-8 md:h-10 md:w-10 text-yellow-300 animate-pulse" />
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
              Passport Pals
            </h1>
            <Heart className="h-6 w-6 md:h-8 md:w-8 text-red-300 animate-pulse" />
          </div>
          <p className="text-base md:text-lg text-white/90 mb-2">
            Connect with your global community
          </p>
          <p className="text-sm md:text-base text-white/80">
            Find verified members from your home country abroad
          </p>
        </div>

        {/* Auth Forms */}
        {authMode === 'login' && (
          <LoginForm 
            onSwitchToRegister={() => setAuthMode('register')}
            onSwitchToForgot={() => setAuthMode('forgot')}
          />
        )}
        {authMode === 'register' && (
          <RegisterForm onSwitchToLogin={() => setAuthMode('login')} />
        )}
        {authMode === 'forgot' && (
          <ForgotPasswordForm onBackToLogin={() => setAuthMode('login')} />
        )}

        {/* Quick Info */}
        <div className="mt-6 text-center">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
            <p className="text-white/90 text-sm font-medium mb-2">Why Join Us?</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-white/80">
              <span>🌍 Global Network</span>
              <span>🔒 Verified Profiles</span>
              <span>💬 Instant Chat</span>
              <span>❤️ Safe Community</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
