
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
      ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
      : 'bg-white/90 border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400 backdrop-blur-sm';
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
      <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 shadow-lg border-b border-blue-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left - Profile Section */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleProfileClick}
                className="relative hover:scale-105 transition-all duration-300 group"
              >
                <Avatar className="h-12 w-12 border-3 border-white shadow-lg">
                  <AvatarImage src={user?.profileImage} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                {user?.isVerified && (
                  <Shield className="h-4 w-4 text-green-400 absolute -bottom-1 -right-1 bg-white rounded-full p-0.5" />
                )}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Profile
                </div>
              </button>

              <div className="hidden md:block">
                <p className="text-white font-semibold text-lg">{getUserDisplayName()}</p>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-white/20 text-white text-xs border-white/30">
                    {user?.role === 'student' ? '🎓' : user?.role === 'artist' ? '🎨' : '💼'}
                    {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                  </Badge>
                  {user?.isVerified && (
                    <Badge variant="secondary" className="bg-green-500/80 text-white text-xs border-green-400">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Center - Navigation */}
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleHomeClick}
                variant="outline"
                size="sm"
                className={getButtonClasses('/')}
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>

              <Button
                onClick={handleSearchClick}
                variant="outline"
                size="sm"
                className={getButtonClasses('/search')}
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>

              <Button
                onClick={handleChatClick}
                variant="outline"
                size="sm"
                className={getButtonClasses('/chat')}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat
              </Button>
            </div>

            {/* Right - Logo */}
            <button 
              onClick={handleHomeClick}
              className="flex items-center space-x-3 hover:scale-105 transition-all duration-300 group"
            >
              <div className="relative">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 border border-white/30">
                  <Globe className="h-8 w-8 text-white transform group-hover:rotate-12 transition-transform duration-500" />
                </div>
                <MapPin className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-white drop-shadow-lg block">Passport</span>
                <span className="text-xl font-semibold text-yellow-200 drop-shadow block -mt-1">Pals</span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Bottom Contact/Support Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-700/95 via-blue-800/95 to-green-700/95 backdrop-blur-md border-t border-blue-200 py-3 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8">
            <button className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors hover:scale-105 transform duration-200">
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">Contact Us</span>
            </button>
            <button className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors hover:scale-105 transform duration-200">
              <Mail className="h-4 w-4" />
              <span className="text-sm font-medium">Support</span>
            </button>
            <button className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors hover:scale-105 transform duration-200">
              <HelpCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Help Center</span>
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
