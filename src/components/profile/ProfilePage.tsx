
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isEditingRole, setIsEditingRole] = useState(false);

  const roles = [
    { value: 'student', label: '🎓 Student' },
    { value: 'artist', label: '🎨 Artist' },
    { value: 'businessperson', label: '💼 Business Person' },
    { value: 'professional', label: '👨‍💻 Professional' },
    { value: 'entrepreneur', label: '🚀 Entrepreneur' },
    { value: 'designer', label: '🎯 Designer' },
    { value: 'developer', label: '💻 Developer' },
    { value: 'teacher', label: '👨‍🏫 Teacher' },
    { value: 'doctor', label: '👨‍⚕️ Doctor' },
    { value: 'engineer', label: '⚙️ Engineer' },
    { value: 'chef', label: '👨‍🍳 Chef' },
    { value: 'writer', label: '✍️ Writer' }
  ];

  if (!user) return null;

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  const handleRoleChange = (newRole: string) => {
    updateProfile({ role: newRole as any });
    setIsEditingRole(false);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student': return '🎓';
      case 'artist': return '🎨';
      case 'businessperson': return '💼';
      case 'professional': return '👨‍💻';
      case 'entrepreneur': return '🚀';
      case 'designer': return '🎯';
      case 'developer': return '💻';
      case 'teacher': return '👨‍🏫';
      case 'doctor': return '👨‍⚕️';
      case 'engineer': return '⚙️';
      case 'chef': return '👨‍🍳';
      case 'writer': return '✍️';
      default: return '👤';
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 relative overflow-hidden pb-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-300 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-20 right-20 w-32 h-32 bg-green-300 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-red-300 rounded-full opacity-20 animate-bounce delay-1000"></div>
          <div className="absolute bottom-40 right-40 w-28 h-28 bg-blue-300 rounded-full opacity-20 animate-pulse delay-500"></div>
          
          {/* Floating emojis */}
          <div className="absolute top-32 right-64 text-4xl opacity-10 animate-bounce">👋</div>
          <div className="absolute bottom-32 left-64 text-3xl opacity-10 animate-pulse">✨</div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="relative">
                <User className="h-12 w-12 text-white drop-shadow-lg transform hover:rotate-12 transition-transform duration-500" />
                <Sparkles className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg animate-fade-in">
                My Profile
              </h1>
              <Heart className="h-8 w-8 text-red-300 animate-pulse" />
            </div>
          </div>

          <Card className="bg-slate-900/90 backdrop-blur-md border border-slate-700 shadow-2xl hover:scale-105 transition-transform duration-300">
            <CardHeader className="text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-blue-400 shadow-lg hover:scale-110 transition-transform duration-300">
                    <AvatarImage src={user.profileImage} />
                    <AvatarFallback className="text-4xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {user.isVerified && (
                    <Shield className="h-8 w-8 text-green-400 absolute -bottom-2 -right-2 bg-slate-900 rounded-full p-1 animate-pulse" />
                  )}
                </div>
                
                <div className="space-y-2">
                  <CardTitle className="text-3xl text-white animate-fade-in">{user.name}</CardTitle>
                  <div className="flex items-center justify-center space-x-2">
                    {isEditingRole ? (
                      <Select value={user.role} onValueChange={handleRoleChange}>
                        <SelectTrigger className="w-48 bg-slate-800 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          {roles.map((role) => (
                            <SelectItem key={role.value} value={role.value} className="text-white hover:bg-slate-700">
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge 
                        onClick={() => setIsEditingRole(true)}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg px-4 py-2 cursor-pointer hover:scale-110 transition-transform duration-200"
                      >
                        {getRoleIcon(user.role)} 
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    )}
                    {user.isVerified && (
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
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover:scale-110 transition-transform duration-200"
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
                  <div className="flex items-center space-x-3 text-white hover:scale-105 transition-transform duration-200">
                    <Mail className="h-5 w-5 text-blue-300" />
                    <span className="text-lg">{user.email}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-white hover:scale-105 transition-transform duration-200">
                    <MapPin className="h-5 w-5 text-pink-300" />
                    <span className="text-lg">{user.city}, {user.country}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-white hover:scale-105 transition-transform duration-200">
                    <Briefcase className="h-5 w-5 text-green-300" />
                    <span className="text-lg">{user.occupation}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-white hover:scale-105 transition-transform duration-200">
                    <Calendar className="h-5 w-5 text-yellow-300" />
                    <span className="text-lg">Joined {user.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {user.bio && (
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-600 hover:scale-105 transition-transform duration-200">
                      <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        About Me
                      </h3>
                      <p className="text-white/90">{user.bio}</p>
                    </div>
                  )}
                  
                  {user.interests && user.interests.length > 0 && (
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-600 hover:scale-105 transition-transform duration-200">
                      <h3 className="text-white font-semibold mb-2">Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {user.interests.map((interest, index) => (
                          <Badge key={index} variant="outline" className="bg-slate-700/50 text-white border-slate-500 hover:scale-110 transition-transform duration-200">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Account Actions */}
              <div className="border-t border-slate-600 pt-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => setShowDeleteDialog(true)}
                    variant="outline"
                    className="bg-red-500/20 border-red-400/50 text-red-300 hover:bg-red-500/40 backdrop-blur-sm hover:scale-110 transition-transform duration-200"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>

                  <Button
                    onClick={logout}
                    variant="outline"
                    className="bg-slate-700/50 border-slate-500 text-white hover:bg-slate-600/50 backdrop-blur-sm hover:scale-110 transition-transform duration-200"
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
