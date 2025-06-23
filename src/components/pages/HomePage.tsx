import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Users, 
  MessageCircle, 
  Search,
  Sparkles,
  Heart,
  Star,
  MapPin,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const quickStats = [
    { label: 'Active Members', value: '12.5K', icon: Users, color: 'from-blue-500 to-purple-500' },
    { label: 'Countries', value: '85', icon: Globe, color: 'from-green-500 to-teal-500' },
    { label: 'Messages Today', value: '3.2K', icon: MessageCircle, color: 'from-pink-500 to-red-500' },
    { label: 'New Connections', value: '156', icon: TrendingUp, color: 'from-yellow-500 to-orange-500' }
  ];

  const featuredCommunities = [
    { name: 'Toronto Indian Students', members: 2400, flag: '🇮🇳', location: 'Toronto, Canada' },
    { name: 'Berlin Tech Professionals', members: 1800, flag: '🇩🇪', location: 'Berlin, Germany' },
    { name: 'London Artists Hub', members: 950, flag: '🇬🇧', location: 'London, UK' },
    { name: 'Sydney Business Network', members: 1200, flag: '🇦🇺', location: 'Sydney, Australia' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 relative overflow-hidden pb-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute top-40 right-40 w-24 h-24 bg-green-300 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-40 w-28 h-28 bg-red-300 rounded-full opacity-10 animate-bounce delay-1000"></div>
        <div className="absolute bottom-40 right-20 w-36 h-36 bg-blue-300 rounded-full opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <Globe className="h-16 w-16 text-white drop-shadow-lg transform hover:rotate-12 transition-transform duration-500" />
              <Sparkles className="h-6 w-6 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
            </div>
            <h1 className="text-6xl font-bold text-white drop-shadow-lg">
              Passport Pals
            </h1>
            <Heart className="h-12 w-12 text-red-300 animate-pulse" />
          </div>
          <p className="text-2xl text-white/90 drop-shadow mb-8">
            Connect with your community around the world
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => navigate('/search')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg"
            >
              <Search className="h-5 w-5 mr-2" />
              Find People
            </Button>
            <Button 
              onClick={() => navigate('/chat')}
              variant="outline"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm px-8 py-3 text-lg"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Start Chatting
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickStats.map((stat, index) => (
            <Card key={index} className={`bg-gradient-to-br ${stat.color}/30 backdrop-blur-md border border-white/30 shadow-xl hover:scale-105 transition-transform duration-300`}>
              <CardContent className="p-6 text-center">
                <div className="relative mb-3">
                  <stat.icon className="h-10 w-10 text-white mx-auto drop-shadow-lg" />
                  <Star className="h-4 w-4 text-yellow-300 absolute -top-1 -right-4 animate-pulse" />
                </div>
                <p className="text-3xl font-bold text-white drop-shadow">{stat.value}</p>
                <p className="text-sm text-white/80">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Welcome Message for Logged In Users */}
        {user && (
          <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                <Users className="h-6 w-6" />
                Welcome, {user.name}!
                <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
              </CardTitle>
              <CardDescription className="text-white/80 text-lg">
                Your community is waiting for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => navigate('/profile')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  View Profile
                </Button>
                <Button 
                  onClick={() => navigate('/search')}
                  variant="outline"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  Find Connections
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Featured Communities */}
        <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center gap-3">
              <Globe className="h-6 w-6" />
              Featured Communities
              <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
            </CardTitle>
            <CardDescription className="text-white/80 text-lg">
              Popular communities around the world
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredCommunities.map((community, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-102"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{community.flag}</div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">{community.name}</h3>
                      <div className="flex items-center space-x-2 text-white/80">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{community.location}</span>
                      </div>
                      <Badge variant="secondary" className="mt-1 bg-white/20 text-white">
                        {community.members.toLocaleString()} members
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                  >
                    Join
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
