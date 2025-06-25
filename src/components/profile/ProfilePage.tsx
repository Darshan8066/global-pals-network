
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
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DeleteProfileDialog from './DeleteProfileDialog';

const ProfilePage = () => {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (!profile) return null;

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 relative overflow-hidden pb-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full opacity-10 animate-bounce"></div>
          <div className="absolute top-40 right-40 w-24 h-24 bg-green-300 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 left-40 w-28 h-28 bg-red-300 rounded-full opacity-10 animate-bounce delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="relative">
                <User className="h-12 w-12 text-white drop-shadow-lg transform hover:rotate-12 transition-transform duration-500" />
                <Sparkles className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                My Profile
              </h1>
              <Heart className="h-8 w-8 text-red-300 animate-pulse" />
            </div>
          </div>

          <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl">
            <CardHeader className="text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                    <AvatarImage src={profile.profile_image_url} />
                    <AvatarFallback className="text-4xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      {profile.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {profile.is_verified && (
                    <Shield className="h-8 w-8 text-green-400 absolute -bottom-2 -right-2 bg-white rounded-full p-1" />
                  )}
                </div>
                
                <div className="space-y-2">
                  <CardTitle className="text-3xl text-white">{profile.name}</CardTitle>
                  <div className="flex items-center justify-center space-x-2">
                    <Badge variant={profile.role === 'student' ? 'default' : profile.role === 'artist' ? 'secondary' : 'outline'} 
                           className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg px-4 py-2">
                      {profile.role === 'student' ? '🎓' : profile.role === 'artist' ? '🎨' : '💼'} 
                      {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                    </Badge>
                    {profile.is_verified && (
                      <Badge variant="secondary" className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
                        <Shield className="h-4 w-4 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button 
                    onClick={handleEditProfile}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-white">
                    <Mail className="h-5 w-5 text-blue-300" />
                    <span className="text-lg">{profile.email}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-white">
                    <MapPin className="h-5 w-5 text-pink-300" />
                    <span className="text-lg">{profile.city}, {profile.country}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-white">
                    <Briefcase className="h-5 w-5 text-green-300" />
                    <span className="text-lg">{profile.occupation}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-white">
                    <Calendar className="h-5 w-5 text-yellow-300" />
                    <span className="text-lg">Joined {new Date(profile.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {profile.bio && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        About Me
                      </h3>
                      <p className="text-white/90">{profile.bio}</p>
                    </div>
                  )}
                  
                  {profile.interests && profile.interests.length > 0 && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <h3 className="text-white font-semibold mb-2">Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.interests.map((interest, index) => (
                          <Badge key={index} variant="outline" className="bg-white/20 text-white border-white/30">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Account Actions */}
              <div className="border-t border-white/20 pt-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => setShowDeleteDialog(true)}
                    variant="outline"
                    className="bg-red-500/20 border-red-300/50 text-red-100 hover:bg-red-500/40 backdrop-blur-sm"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>

                  <Button
                    onClick={logout}
                    variant="outline"
                    className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
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
