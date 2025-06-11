
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Globe, Users, Shield, MessageCircle } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Branding and features */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
                <Globe className="h-12 w-12 text-blue-600" />
                <h1 className="text-4xl font-bold text-gray-900">Passport Pals</h1>
              </div>
              <p className="text-xl text-gray-600 mb-8">
                Connect with your community abroad. Make your international journey easier with trusted connections.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Users className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Find Your Community</h3>
                <p className="text-sm text-gray-600">
                  Connect with students, artists, and professionals from your home country living abroad.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Shield className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Verified Profiles</h3>
                <p className="text-sm text-gray-600">
                  All members are verified through document submission for your safety and trust.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <MessageCircle className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Real-time Chat</h3>
                <p className="text-sm text-gray-600">
                  Message verified members instantly and get real-time support and guidance.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Globe className="h-8 w-8 text-indigo-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Global Network</h3>
                <p className="text-sm text-gray-600">
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
