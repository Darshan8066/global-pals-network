import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Globe, Users, Shield, MessageCircle, Sparkles, Heart, Zap } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-green-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-red-300 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <div className="absolute bottom-40 right-40 w-28 h-28 bg-blue-300 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Branding and features */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
                <div className="relative">
                  <Globe className="h-16 w-16 text-white drop-shadow-lg transform hover:rotate-12 transition-transform duration-500" />
                  <Sparkles className="h-6 w-6 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
                </div>
                <h1 className="text-5xl font-bold text-white drop-shadow-lg bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                  Passport Pals
                </h1>
              </div>
              <p className="text-xl text-white/90 mb-8 drop-shadow">
                Connect with your community abroad. Make your international journey easier with trusted connections.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 mx-auto sm:mx-0">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2 text-center sm:text-left">Find Your Community</h3>
                <p className="text-sm text-white/80 text-center sm:text-left">
                  Connect with students, artists, and professionals from your home country living abroad.
                </p>
              </div>

              <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full mb-4 mx-auto sm:mx-0">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2 text-center sm:text-left">Verified Profiles</h3>
                <p className="text-sm text-white/80 text-center sm:text-left">
                  All members are verified through document submission for your safety and trust.
                </p>
              </div>

              <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-500 to-red-600 rounded-full mb-4 mx-auto sm:mx-0">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2 text-center sm:text-left">Real-time Chat</h3>
                <p className="text-sm text-white/80 text-center sm:text-left">
                  Message verified members instantly and get real-time support and guidance.
                </p>
              </div>

              <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full mb-4 mx-auto sm:mx-0">
                  <Heart className="h-6 w-6 text-white" />
                  <Zap className="h-3 w-3 text-yellow-300 absolute animate-ping" />
                </div>
                <h3 className="font-bold text-white mb-2 text-center sm:text-left">Global Network</h3>
                <p className="text-sm text-white/80 text-center sm:text-left">
                  Access a worldwide network of professionals in your field across different countries.
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Auth forms */}
          <div className="flex justify-center">
            {isLogin ? (
              <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
            ) : (
              <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
