
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  MessageCircle, 
  Globe, 
  Shield, 
  Calendar, 
  MapPin,
  Upload,
  Clock,
  Sparkles,
  Heart,
  Zap,
  Star
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  const mockConnections = [
    {
      id: '1',
      name: 'Priya Sharma',
      role: 'student',
      country: 'India',
      currentLocation: 'Toronto, Canada',
      isVerified: true,
    },
    {
      id: '2',
      name: 'Raj Patel',
      role: 'businessperson',
      country: 'India',
      currentLocation: 'London, UK',
      isVerified: true,
    },
    {
      id: '3',
      name: 'Ananya Kumar',
      role: 'artist',
      country: 'India',
      currentLocation: 'Berlin, Germany',
      isVerified: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute top-40 right-40 w-24 h-24 bg-green-300 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-40 w-28 h-28 bg-red-300 rounded-full opacity-10 animate-bounce delay-1000"></div>
        <div className="absolute bottom-40 right-20 w-36 h-36 bg-blue-300 rounded-full opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="relative">
              <Globe className="h-12 w-12 text-white drop-shadow-lg transform hover:rotate-12 transition-transform duration-500" />
              <Sparkles className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              Welcome back, {user.name}!
            </h1>
            <Heart className="h-8 w-8 text-red-300 animate-pulse" />
          </div>
          <p className="text-white/90 text-xl drop-shadow">
            Stay connected with your community abroad
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Profile Card */}
          <Card className="lg:col-span-1 bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                    <AvatarImage src={user.profileImage} />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Star className="h-6 w-6 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl text-white">{user.name}</CardTitle>
                  <CardDescription className="flex items-center space-x-2">
                    <Badge variant={user.role === 'student' ? 'default' : user.role === 'artist' ? 'secondary' : 'outline'} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                    {user.isVerified && (
                      <Badge variant="secondary" className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-white">
                <MapPin className="h-4 w-4 text-pink-300" />
                <span>{user.city}, {user.country}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-white">
                <Calendar className="h-4 w-4 text-blue-300" />
                <span>Joined {user.createdAt.toLocaleDateString()}</span>
              </div>
              {user.bio && (
                <p className="text-sm text-white/90">{user.bio}</p>
              )}
              {!user.isVerified && (
                <div className="bg-amber-500/20 border border-amber-300/50 rounded-lg p-3 backdrop-blur-sm">
                  <div className="flex items-center space-x-2 text-amber-100 mb-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">Verification Pending</span>
                  </div>
                  <p className="text-xs text-amber-100/80 mb-2">
                    Upload your visa documents to get verified and access all features.
                  </p>
                  <Button size="sm" variant="outline" className="text-amber-100 border-amber-300 hover:bg-amber-500/30">
                    <Upload className="h-3 w-3 mr-1" />
                    Upload Documents
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur-md border border-white/30 shadow-xl hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6 text-center">
                <div className="relative">
                  <Users className="h-12 w-12 text-white mx-auto mb-2 drop-shadow-lg" />
                  <Zap className="h-4 w-4 text-yellow-300 absolute top-0 right-8 animate-ping" />
                </div>
                <p className="text-3xl font-bold text-white drop-shadow">3</p>
                <p className="text-sm text-white/80">Connections</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/30 to-teal-500/30 backdrop-blur-md border border-white/30 shadow-xl hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6 text-center">
                <div className="relative">
                  <MessageCircle className="h-12 w-12 text-white mx-auto mb-2 drop-shadow-lg" />
                  <Heart className="h-4 w-4 text-red-300 absolute top-0 right-8 animate-pulse" />
                </div>
                <p className="text-3xl font-bold text-white drop-shadow">12</p>
                <p className="text-sm text-white/80">Messages</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-500/30 to-red-500/30 backdrop-blur-md border border-white/30 shadow-xl hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6 text-center">
                <div className="relative">
                  <Globe className="h-12 w-12 text-white mx-auto mb-2 drop-shadow-lg" />
                  <Sparkles className="h-4 w-4 text-yellow-300 absolute top-0 right-8 animate-pulse" />
                </div>
                <p className="text-3xl font-bold text-white drop-shadow">5</p>
                <p className="text-sm text-white/80">Countries</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Connections */}
        <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center gap-3">
              <Users className="h-6 w-6" />
              Your Connections
              <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
            </CardTitle>
            <CardDescription className="text-white/80 text-lg">
              People from your community living abroad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockConnections.map((connection) => (
                <div
                  key={connection.id}
                  className="flex items-center justify-between p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-102"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="border-2 border-white shadow-lg">
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                          {connection.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {connection.isVerified && (
                        <Shield className="h-4 w-4 text-green-400 absolute -bottom-1 -right-1 bg-white rounded-full p-0.5" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-white text-lg">{connection.name}</p>
                        {connection.isVerified && (
                          <Badge variant="secondary" className="text-xs px-2 py-1 bg-green-500/30 text-green-100 border-green-400/50">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-white/80 capitalize">
                        {connection.role === 'student' ? '🎓' : connection.role === 'artist' ? '🎨' : '💼'} {connection.role}
                      </p>
                      <p className="text-xs text-white/70">
                        From {connection.country} • Now in {connection.currentLocation}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm">
                <Users className="h-4 w-4 mr-2" />
                Find More Connections
                <Sparkles className="h-4 w-4 ml-2 animate-pulse" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
