
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
  Home
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

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const getButtonVariant = (path: string) => {
    return location.pathname === path ? 'default' : 'outline';
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

  return (
    <>
      <nav className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 shadow-lg backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
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

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                onClick={handleHomeClick}
                variant={getButtonVariant('/')}
                size="sm"
                className={getButtonClasses('/')}
              >
                <Home className="h-4 w-4 mr-1" />
                Home
              </Button>

              {isAuthenticated && (
                <>
                  <Button
                    onClick={handleSearchClick}
                    variant={getButtonVariant('/search')}
                    size="sm"
                    className={getButtonClasses('/search')}
                  >
                    <Search className="h-4 w-4 mr-1" />
                    Search
                  </Button>

                  <Button
                    onClick={handleChatClick}
                    variant={getButtonVariant('/chat')}
                    size="sm"
                    className={getButtonClasses('/chat')}
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Chat
                  </Button>
                </>
              )}
            </div>

            {/* User Menu */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-white font-semibold">{getUserDisplayName()}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                        {user.role === 'student' ? '🎓' : user.role === 'artist' ? '🎨' : '💼'}
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                      {user.isVerified && (
                        <Badge variant="secondary" className="bg-green-500/80 text-white text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleProfileClick}
                  className="relative hover:scale-110 transition-transform duration-300"
                >
                  <Avatar className="h-10 w-10 border-2 border-white shadow-lg">
                    <AvatarImage src={user.profileImage} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  {user.isVerified && (
                    <Shield className="h-4 w-4 text-green-400 absolute -bottom-1 -right-1 bg-white rounded-full p-0.5" />
                  )}
                </button>

                <div className="flex items-center space-x-2">
                  <Button
                    onClick={handleProfileClick}
                    variant="outline"
                    size="sm"
                    className={getButtonClasses('/profile')}
                  >
                    <User className="h-4 w-4 mr-1" />
                    Profile
                  </Button>

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
            ) : (
              <Button
                onClick={handleAuthClick}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>

      <DeleteProfileDialog 
        isOpen={showDeleteDialog} 
        onClose={() => setShowDeleteDialog(false)} 
      />
    </>
  );
};

export default Navbar;
