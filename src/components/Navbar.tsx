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
  Phone,
  Mail,
  HelpCircle,
  MapPin
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import DeleteProfileDialog from './profile/DeleteProfileDialog';

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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

  const getButtonClasses = (path: string) => {
    return location.pathname === path 
      ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-400 text-white shadow-xl btn-animated'
      : 'bg-slate-800/70 border-slate-600 text-gray-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 hover:border-blue-400 backdrop-blur-sm btn-animated';
  };

  // Helper function to get user initials safely
  const getUserInitials = () => {
    if (!user || !user.name) return 'U';
    return user.name.charAt(0).toUpperCase();
  };

  // Helper function to get user display name safely
  const getUserDisplayName = () => {
    if (!user || !user.name) return 'User';
    return user.name;
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <nav className="gradient-bg shadow-2xl border-b border-blue-500/30 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Left - Profile Section */}
            <div className="flex items-center space-x-6">
              <button 
                onClick={handleProfileClick}
                className="relative hover:scale-110 transition-all duration-300 group pulse-glow"
              >
                <Avatar className="h-16 w-16 border-4 border-blue-400/50 shadow-2xl">
                  <AvatarImage src={user?.profileImage} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-xl">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                {user?.isVerified && (
                  <Shield className="h-5 w-5 text-green-400 absolute -bottom-1 -right-1 bg-slate-800 rounded-full p-1" />
                )}
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
                  Profile
                </div>
              </button>

              <div className="hidden md:block">
                <p className="text-white font-bold text-xl">{getUserDisplayName()}</p>
                <div className="flex items-center space-x-3 mt-1">
                  <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30">
                    {user?.role === 'student' ? '🎓' : user?.role === 'artist' ? '🎨' : '💼'}
                    {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                  </Badge>
                  {user?.isVerified && (
                    <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/30">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Center - Navigation */}
            <div className="flex items-center space-x-6">
              <Button
                onClick={handleHomeClick}
                variant="outline"
                className={getButtonClasses('/')}
              >
                <Home className="h-5 w-5 mr-2" />
                Home
              </Button>

              <Button
                onClick={handleSearchClick}
                variant="outline"
                className={getButtonClasses('/search')}
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>

              <Button
                onClick={handleChatClick}
                variant="outline"
                className={getButtonClasses('/chat')}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat
              </Button>
            </div>

            {/* Right - Logo */}
            <button 
              onClick={handleHomeClick}
              className="flex items-center space-x-4 hover:scale-105 transition-all duration-300 group"
            >
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full p-3 border-2 border-blue-400/50 shadow-2xl pulse-glow">
                  <Globe className="h-10 w-10 text-white transform group-hover:rotate-12 transition-transform duration-500" />
                </div>
                <MapPin className="h-5 w-5 text-yellow-400 absolute -top-1 -right-1 bounce-gentle" />
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-white drop-shadow-2xl block">Passport</span>
                <span className="text-2xl font-semibold text-yellow-300 drop-shadow-lg block -mt-1">Pals</span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Bottom Contact/Support Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-900/95 via-blue-950/95 to-emerald-950/95 backdrop-blur-lg border-t border-blue-500/30 py-4 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-10">
            <button 
              onClick={() => alert('Contact form opening...')}
              className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-200 btn-animated"
            >
              <Phone className="h-5 w-5" />
              <span className="font-medium">Contact Us</span>
            </button>
            <button 
              onClick={() => alert('Support center opening...')}
              className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-200 btn-animated"
            >
              <Mail className="h-5 w-5" />
              <span className="font-medium">Support</span>
            </button>
            <button 
              onClick={() => alert('Help documentation opening...')}
              className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-200 btn-animated"
            >
              <HelpCircle className="h-5 w-5" />
              <span className="font-medium">Help Center</span>
            </button>
          </div>
        </div>
      </div>

      <DeleteProfileDialog 
        isOpen={showDeleteDialog} 
        onClose={() => setShowDeleteDialog(false)} 
      />
    </>
  );
};

export default Navbar;
