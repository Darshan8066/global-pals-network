
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Shield, 
  Search,
  MessageCircle,
  Home,
  MapPin,
  BarChart3
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { profile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleSearchClick = () => {
    navigate('/search');
  };

  const handleChatClick = () => {
    navigate('/chat');
  };

  const handleStatsClick = () => {
    navigate('/stats');
  };

  const getButtonClasses = (path: string) => {
    return location.pathname === path 
      ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-400 text-white shadow-xl'
      : 'bg-slate-800/70 border-slate-600 text-gray-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 hover:border-blue-400 backdrop-blur-sm';
  };

  const getUserInitials = () => {
    if (!profile || !profile.name) return 'U';
    return profile.name.charAt(0).toUpperCase();
  };

  const getUserDisplayName = () => {
    if (!profile || !profile.name) return 'User';
    return profile.name;
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-blue-950 to-emerald-950 shadow-2xl border-b border-blue-500/30 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left - Profile Section */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleProfileClick}
              className="relative hover:scale-110 transition-all duration-300 group"
            >
              <Avatar className="h-12 w-12 border-2 border-blue-400/50 shadow-2xl">
                <AvatarImage src={profile?.profile_image_url} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              {profile?.is_verified && (
                <Shield className="h-4 w-4 text-green-400 absolute -bottom-1 -right-1 bg-slate-800 rounded-full p-0.5" />
              )}
            </button>

            <div className="hidden md:block">
              <p className="text-white font-bold">{getUserDisplayName()}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 text-xs">
                  {profile?.role === 'student' ? '🎓' : profile?.role === 'artist' ? '🎨' : '💼'}
                  {profile?.role?.charAt(0).toUpperCase() + profile?.role?.slice(1)}
                </Badge>
                {profile?.is_verified && (
                  <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/30 text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Center - Navigation */}
          <div className="flex items-center space-x-3">
            <Button
              onClick={handleHomeClick}
              variant="outline"
              size="sm"
              className={`${getButtonClasses('/')} transition-all duration-300`}
            >
              <Home className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Home</span>
            </Button>

            <Button
              onClick={handleSearchClick}
              variant="outline"
              size="sm"
              className={`${getButtonClasses('/search')} transition-all duration-300`}
            >
              <Search className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Search</span>
            </Button>

            <Button
              onClick={handleChatClick}
              variant="outline"
              size="sm"
              className={`${getButtonClasses('/chat')} transition-all duration-300`}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Chat</span>
            </Button>

            <Button
              onClick={handleStatsClick}
              variant="outline"
              size="sm"
              className={`${getButtonClasses('/stats')} transition-all duration-300`}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Stats</span>
            </Button>
          </div>

          {/* Right - Logo */}
          <button 
            onClick={handleHomeClick}
            className="flex items-center space-x-3 hover:scale-105 transition-all duration-300 group"
          >
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full p-2 border border-blue-400/50 shadow-2xl">
                <Globe className="h-6 w-6 text-white transform group-hover:rotate-12 transition-transform duration-500" />
              </div>
              <MapPin className="h-3 w-3 text-yellow-400 absolute -top-1 -right-1 animate-bounce" />
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-white drop-shadow-2xl block">Passport</span>
              <span className="text-sm font-semibold text-yellow-300 drop-shadow-lg block -mt-1">Pals</span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
