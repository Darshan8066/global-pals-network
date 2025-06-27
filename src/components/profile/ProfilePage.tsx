
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Edit, 
  MapPin, 
  Calendar, 
  Shield, 
  Globe,
  User,
  Mail,
  Briefcase,
  Heart,
  Sparkles,
  Trash2,
  LogOut,
  Phone,
  IdCard,
  UserCheck,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DeleteProfileDialog from './DeleteProfileDialog';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-white/80">Loading profile...</p>
        </div>
      </div>
    );
  }

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  const profileCompleteness = () => {
    const fields = [user.name, user.email, user.country, user.city, user.occupation, user.bio];
    const completed = fields.filter(field => field && field.trim() !== '').length;
    return Math.round((completed / fields.length) * 100);
  };

  return (
    <>
      <div className="min-h-screen gradient-bg relative overflow-hidden pb-20">
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full float-animation blur-xl"></div>
          <div className="absolute top-40 right-40 w-24 h-24 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full drift-animation blur-xl" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-40 w-28 h-28 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full float-animation blur-xl" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-60 right-20 w-44 h-44 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full drift-animation blur-xl" style={{animationDelay: '0.5s'}}></div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
          {/* Professional Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative pulse-glow">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-4 shadow-2xl">
                  <User className="h-10 w-10 text-white" />
                </div>
                <Sparkles className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1 bounce-gentle" />
              </div>
              <div className="text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent text-shadow mb-2">
                  Profile Dashboard
                </h1>
                <p className="text-lg text-blue-200 font-medium">Manage your Passport Pals profile</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Profile Card */}
            <div className="lg:col-span-2">
              <Card className="glass-card hover:shadow-2xl transition-all duration-300 border-0">
                <CardHeader className="text-center pb-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <Avatar className="h-32 w-32 border-4 border-white/30 shadow-2xl ring-4 ring-blue-500/20">
                        <AvatarImage src={user.profileImage} alt={user.name} />
                        <AvatarFallback className="text-4xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {user.isVerified && (
                        <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 shadow-lg">
                          <Shield className="h-5 w-5 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-3 text-center">
                      <CardTitle className="text-3xl text-white font-bold">{user.name}</CardTitle>
                      <div className="flex items-center justify-center space-x-3 flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm px-4 py-2 font-medium">
                          {user.role === 'student' ? '🎓' : user.role === 'artist' ? '🎨' : '💼'} 
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                        {user.isVerified && (
                          <Badge variant="secondary" className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
                            <UserCheck className="h-4 w-4 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 pt-4">
                      <Button 
                        onClick={handleEditProfile}
                        className="btn-primary"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                      <Button 
                        onClick={() => navigate('/settings')}
                        className="btn-outline"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 px-6 pb-6">
                  {/* Contact Information */}
                  <div className="form-section">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Mail className="h-5 w-5 text-blue-400" />
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 text-white/90 p-3 bg-white/5 rounded-lg">
                        <Mail className="h-4 w-4 text-blue-300 flex-shrink-0" />
                        <span className="text-sm break-all">{user.email}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-white/90 p-3 bg-white/5 rounded-lg">
                        <MapPin className="h-4 w-4 text-pink-300 flex-shrink-0" />
                        <span className="text-sm">{user.city}, {user.country}</span>
                      </div>
                      
                      {user.occupation && (
                        <div className="flex items-center space-x-3 text-white/90 p-3 bg-white/5 rounded-lg">
                          <Briefcase className="h-4 w-4 text-green-300 flex-shrink-0" />
                          <span className="text-sm">{user.occupation}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-3 text-white/90 p-3 bg-white/5 rounded-lg">
                        <Calendar className="h-4 w-4 text-yellow-300 flex-shrink-0" />
                        <span className="text-sm">Joined {user.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* About & Interests */}
                  {(user.bio || (user.interests && user.interests.length > 0)) && (
                    <div className="form-section">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Globe className="h-5 w-5 text-purple-400" />
                        About & Interests
                      </h3>
                      
                      {user.bio && (
                        <div className="mb-4">
                          <h4 className="text-white/80 font-medium mb-2">About Me</h4>
                          <p className="text-white/70 text-sm leading-relaxed p-3 bg-white/5 rounded-lg">{user.bio}</p>
                        </div>
                      )}
                      
                      {user.interests && user.interests.length > 0 && (
                        <div>
                          <h4 className="text-white/80 font-medium mb-2">Interests</h4>
                          <div className="flex flex-wrap gap-2">
                            {user.interests.map((interest, index) => (
                              <Badge key={index} variant="outline" className="bg-white/10 text-white/90 border-white/20 hover:bg-white/20 transition-colors">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Completeness */}
              <Card className="glass-card border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <IdCard className="h-5 w-5 text-blue-400" />
                    Profile Completeness
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-sm">Progress</span>
                      <span className="text-white font-semibold">{profileCompleteness()}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${profileCompleteness()}%` }}
                      ></div>
                    </div>
                    <p className="text-white/60 text-xs">
                      {profileCompleteness() === 100 ? 'Your profile is complete!' : 'Complete your profile to connect better with others.'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass-card border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={() => navigate('/search')}
                    className="w-full btn-primary justify-start"
                    size="sm"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Find Connections
                  </Button>
                  
                  <Button
                    onClick={() => navigate('/chat')}
                    className="w-full btn-secondary justify-start"
                    size="sm"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Start Chatting
                  </Button>
                  
                  <Button
                    onClick={() => navigate('/stats')}
                    className="w-full btn-outline justify-start"
                    size="sm"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    View Statistics
                  </Button>
                </CardContent>
              </Card>

              {/* Account Actions */}
              <Card className="glass-card border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white text-lg">Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={() => setShowDeleteDialog(true)}
                    variant="outline"
                    className="w-full bg-red-500/20 border-red-300/50 text-red-100 hover:bg-red-500/40 justify-start"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>

                  <Button
                    onClick={logout}
                    variant="outline"
                    className="w-full btn-outline justify-start"
                    size="sm"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>
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

export default ProfilePage;
