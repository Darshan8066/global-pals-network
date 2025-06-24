
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
  MapPin,
  TrendingUp,
  Plane,
  Building,
  GraduationCap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const quickStats = [
    { label: 'Active Members', value: '12.5K', icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'Countries', value: '85', icon: Globe, color: 'from-green-500 to-green-600' },
    { label: 'Messages Today', value: '3.2K', icon: MessageCircle, color: 'from-blue-600 to-green-500' },
    { label: 'New Connections', value: '156', icon: TrendingUp, color: 'from-green-600 to-blue-500' }
  ];

  const featuredCommunities = [
    { name: 'Toronto Indian Students', members: 2400, flag: '🇮🇳', location: 'Toronto, Canada', type: 'student' },
    { name: 'Berlin Tech Professionals', members: 1800, flag: '🇩🇪', location: 'Berlin, Germany', type: 'professional' },
    { name: 'London Creative Hub', members: 950, flag: '🇬🇧', location: 'London, UK', type: 'artist' },
    { name: 'Sydney Business Network', members: 1200, flag: '🇦🇺', location: 'Sydney, Australia', type: 'business' }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'student': return <GraduationCap className="h-5 w-5" />;
      case 'professional': return <Building className="h-5 w-5" />;
      case 'artist': return <Plane className="h-5 w-5" />;
      default: return <Users className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 relative overflow-hidden pb-20">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full opacity-20 float-animation"></div>
        <div className="absolute top-40 right-40 w-24 h-24 bg-green-200 rounded-full opacity-20 float-animation" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-40 w-28 h-28 bg-blue-300 rounded-full opacity-20 float-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 right-20 w-36 h-36 bg-green-300 rounded-full opacity-20 float-animation" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12 slide-in">
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="relative stamp-animation">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-full p-4 shadow-xl">
                <Globe className="h-16 w-16 text-white" />
              </div>
              <MapPin className="h-6 w-6 text-yellow-500 absolute -top-2 -right-2 animate-pulse" />
            </div>
            <div className="text-center">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
                Passport Pals
              </h1>
              <p className="text-lg text-gray-600 mt-2">Your Global Community Connection</p>
            </div>
          </div>
          <p className="text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Connect with your homeland community living around the world. Share experiences, build networks, and find your people.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => navigate('/search')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Search className="h-5 w-5 mr-2" />
              Find Your Community
            </Button>
            <Button 
              onClick={() => navigate('/chat')}
              variant="outline"
              className="border-2 border-green-600 text-green-700 hover:bg-green-50 px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Start Connecting
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickStats.map((stat, index) => (
            <Card key={index} className={`bg-gradient-to-br ${stat.color} text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0`}>
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <stat.icon className="h-12 w-12 mx-auto opacity-90" />
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm opacity-90">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Welcome Message for Logged In Users */}
        {user && (
          <Card className="bg-white/80 backdrop-blur-sm shadow-2xl mb-12 border border-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
                <Users className="h-6 w-6 text-blue-600" />
                Welcome back, {user.name}!
                <MapPin className="h-5 w-5 text-green-600" />
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Your global community is waiting to connect with you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => navigate('/profile')}
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                >
                  View Profile
                </Button>
                <Button 
                  onClick={() => navigate('/search')}
                  variant="outline"
                  className="border-blue-600 text-blue-700 hover:bg-blue-50"
                >
                  Find Connections
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Featured Communities */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border border-blue-200">
          <CardHeader>
            <CardTitle className="text-gray-800 text-2xl flex items-center gap-3">
              <Globe className="h-6 w-6 text-blue-600" />
              Featured Communities
              <Badge className="bg-green-100 text-green-700 border-green-300">Active</Badge>
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              Popular communities from around the world
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredCommunities.map((community, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-102"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{community.flag}</div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{community.name}</h3>
                      <div className="flex items-center space-x-2 text-gray-600 mb-1">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{community.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-300">
                          {community.members.toLocaleString()} members
                        </Badge>
                        <Badge variant="outline" className="border-green-300 text-green-700">
                          {getTypeIcon(community.type)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                  >
                    Join Community
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
