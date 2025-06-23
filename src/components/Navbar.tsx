
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  LogOut, 
  User, 
  Shield, 
  Sparkles,
  Trash2,
  Search,
  MessageCircle,
  Home,
  Phone,
  Mail,
  HelpCircle
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import DeleteProfileDialog from './profile/DeleteProfileDialog';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
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
      ? 'bg-white/30 border-white/50 text-white'
      : 'bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm';
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
    return null; // Don't show navbar on auth page
  }

  return (
    <>
      <nav className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 shadow-lg backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left - Profile Section */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleProfileClick}
                className="relative hover:scale-110 transition-transform duration-300"
              >
                <Avatar className="h-10 w-10 border-2 border-white shadow-lg">
                  <AvatarImage src={user?.profileImage} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                {user?.isVerified && (
                  <Shield className="h-4 w-4 text-green-400 absolute -bottom-1 -right-1 bg-white rounded-full p-0.5" />
                )}
              </button>

              <div className="hidden md:block">
                <p className="text-white font-semibold">{getUserDisplayName()}</p>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                    {user?.role === 'student' ? '🎓' : user?.role === 'artist' ? '🎨' : '💼'}
                    {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                  </Badge>
                  {user?.isVerified && (
                    <Badge variant="secondary" className="bg-green-500/80 text-white text-xs">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Center - Logo */}
            <button 
              onClick={handleHomeClick}
              className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300"
            >
              <div className="relative">
                <Globe className="h-8 w-8 text-white transform rotate-12 hover:rotate-0 transition-transform duration-500" />
                <Sparkles className="h-3 w-3 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-2xl font-bold text-white">Passport Pals</span>
            </button>

            {/* Right - Navigation and Actions */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <Button
                  onClick={handleHomeClick}
                  variant="outline"
                  size="sm"
                  className={getButtonClasses('/')}
                >
                  <Home className="h-4 w-4 mr-1" />
                  Home
                </Button>

                <Button
                  onClick={handleSearchClick}
                  variant="outline"
                  size="sm"
                  className={getButtonClasses('/search')}
                >
                  <Search className="h-4 w-4 mr-1" />
                  Search
                </Button>

                <Button
                  onClick={handleChatClick}
                  variant="outline"
                  size="sm"
                  className={getButtonClasses('/chat')}
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Chat
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => setShowDeleteDialog(true)}
                  variant="outline"
                  size="sm"
                  className="bg-red-500/20 border-red-300/50 text-red-100 hover:bg-red-500/40 backdrop-blur-sm"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>

                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Contact/Support Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-blue-600/90 backdrop-blur-md border-t border-white/20 py-2 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-6">
            <button className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
              <Phone className="h-4 w-4" />
              <span className="text-sm">Contact</span>
            </button>
            <button className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
              <Mail className="h-4 w-4" />
              <span className="text-sm">Support</span>
            </button>
            <button className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
              <HelpCircle className="h-4 w-4" />
              <span className="text-sm">Help</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add bottom padding to main content to account for fixed bottom bar */}
      <style jsx>{`
        body {
          padding-bottom: 60px;
        }
      `}</style>

      <DeleteProfileDialog 
        isOpen={showDeleteDialog} 
        onClose={() => setShowDeleteDialog(false)} 
      />
    </>
  );
};

export default Navbar;
