
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
  MapPin,
  Users,
  UserPlus,
  Zap
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

  const handleActiveMembersClick = () => {
    navigate('/active-members');
  };

  const handleCountriesClick = () => {
    navigate('/countries');
  };

  const handleNewConnectionsClick = () => {
    navigate('/new-connections');
  };

  const handleSmartDiscoveryClick = () => {
    navigate('/smart-discovery');
  };

  const handleGlobalNetworkClick = () => {
    navigate('/global-network');
  };

  const handleContactClick = () => {
    alert('Contact form will open here. You can reach us at support@passportpals.com');
  };

  const handleSupportClick = () => {
    alert('Support center opening... Visit our help section for assistance.');
  };

  const handleHelpClick = () => {
    alert('Help documentation opening... Find answers to common questions.');
  };

  const getButtonClasses = (path: string) => {
    return location.pathname === path 
      ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-400 text-white shadow-xl'
      : 'bg-slate-800/70 border-slate-600 text-gray-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 hover:border-blue-400 backdrop-blur-sm';
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
      <nav className="bg-gradient-to-r from-slate-900/95 via-blue-950/95 to-emerald-950/95 shadow-2xl border-b border-blue-500/30 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Left - Profile Section */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleProfileClick}
                className="relative hover:scale-110 transition-all duration-300 group"
              >
                <Avatar className="h-10 w-10 border-2 border-blue-400/50 shadow-2xl">
                  <AvatarImage src={user?.profileImage} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-sm">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                {user?.isVerified && (
                  <Shield className="h-3 w-3 text-green-400 absolute -bottom-0.5 -right-0.5 bg-slate-800 rounded-full p-0.5" />
                )}
              </button>

              <div className="hidden md:block">
                <p className="text-white font-bold text-sm">{getUserDisplayName()}</p>
                <div className="flex items-center space-x-1 mt-0.5">
                  <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 text-xs">
                    {user?.role === 'student' ? '🎓' : user?.role === 'artist' ? '🎨' : '💼'}
                    {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                  </Badge>
                  {user?.isVerified && (
                    <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/30 text-xs">
                      <Shield className="h-2 w-2 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Center - Navigation */}
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleHomeClick}
                variant="outline"
                size="sm"
                className={getButtonClasses('/')}
              >
                <Home className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Home</span>
              </Button>

              <Button
                onClick={handleActiveMembersClick}
                variant="outline"
                size="sm"
                className={getButtonClasses('/active-members')}
              >
                <Users className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Members</span>
              </Button>

              <Button
                onClick={handleNewConnectionsClick}
                variant="outline"
                size="sm"
                className={getButtonClasses('/new-connections')}
              >
                <UserPlus className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Connect</span>
              </Button>

              <Button
                onClick={handleSmartDiscoveryClick}
                variant="outline"
                size="sm"
                className={getButtonClasses('/smart-discovery')}
              >
                <Zap className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Discovery</span>
              </Button>

              <Button
                onClick={handleSearchClick}
                variant="outline"
                size="sm"
                className={getButtonClasses('/search')}
              >
                <Search className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Search</span>
              </Button>

              <Button
                onClick={handleChatClick}
                variant="outline"
                size="sm"
                className={getButtonClasses('/chat')}
              >
                <MessageCircle className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Chat</span>
              </Button>
            </div>

            {/* Right - Logo */}
            <button 
              onClick={handleHomeClick}
              className="flex items-center space-x-2 hover:scale-105 transition-all duration-300 group"
            >
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full p-2 border border-blue-400/50 shadow-2xl">
                  <Globe className="h-4 w-4 text-white transform group-hover:rotate-12 transition-transform duration-500" />
                </div>
                <MapPin className="h-2 w-2 text-yellow-400 absolute -top-0.5 -right-0.5 animate-bounce" />
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-white drop-shadow-2xl block">Passport</span>
                <span className="text-sm font-semibold text-yellow-300 drop-shadow-lg block -mt-1">Pals</span>
              </div>
            </button>
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
