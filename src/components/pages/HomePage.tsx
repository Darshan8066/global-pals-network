
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
  GraduationCap,
  Heart,
  Shield,
  Zap,
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const quickStats = [
    { 
      label: 'Active Members', 
      value: '12.5K', 
      icon: Users, 
      color: 'from-blue-600 to-blue-800',
      page: '/search' 
    },
    { 
      label: 'Countries', 
      value: '85', 
      icon: Globe, 
      color: 'from-green-600 to-green-800',
      page: '/search' 
    },
    { 
      label: 'Messages Today', 
      value: '3.2K', 
      icon: MessageCircle, 
      color: 'from-purple-600 to-purple-800',
      page: '/chat' 
    },
    { 
      label: 'New Connections', 
      value: '156', 
      icon: TrendingUp, 
      color: 'from-emerald-600 to-emerald-800',
      page: '/search' 
    }
  ];

  const features = [
    {
      icon: Search,
      title: 'Smart Discovery',
      description: 'Find people from your homeland with our advanced search and filtering system.',
      color: 'from-blue-500 to-cyan-500',
      page: '/search'
    },
    {
      icon: Shield,
      title: 'Verified Profiles',
      description: 'Connect with confidence through our secure verification process.',
      color: 'from-green-500 to-emerald-500',
      page: '/profile'
    },
    {
      icon: MessageCircle,
      title: 'Real-time Chat',
      description: 'Instant messaging with translation support for seamless communication.',
      color: 'from-purple-500 to-pink-500',
      page: '/chat'
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Join communities across 85+ countries and expand your global network.',
      color: 'from-orange-500 to-red-500',
      page: '/search'
    }
  ];

  const benefits = [
    'Connect with people from your homeland living worldwide',
    'Share experiences and cultural traditions',
    'Build professional and personal networks',
    'Find mentors and career opportunities',
    'Get local insights from fellow expatriates',
    'Maintain cultural connections away from home'
  ];

  const featuredCommunities = [
    { name: 'Toronto Indian Students', members: 2400, flag: '🇮🇳', location: 'Toronto, Canada', type: 'student' },
    { name: 'Berlin Tech Professionals', members: 1800, flag: '🇩🇪', location: 'Berlin, Germany', type: 'professional' },
    { name: 'London Creative Hub', members: 950, flag: '🇬🇧', location: 'London, UK', type: 'artist' },
    { name: 'Sydney Business Network', members: 1200, flag: '🇦🇺', location: 'Sydney, Australia', type: 'business' }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'student': return <GraduationCap className="h-4 w-4" />;
      case 'professional': return <Building className="h-4 w-4" />;
      case 'artist': return <Plane className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden pb-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full float-animation blur-xl"></div>
        <div className="absolute top-60 right-32 w-32 h-32 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full drift-animation blur-xl" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-32 w-36 h-36 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full float-animation blur-xl" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-60 right-20 w-44 h-44 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full drift-animation blur-xl" style={{animationDelay: '0.5s'}}></div>
        
        {/* Floating passport icons */}
        <div className="absolute top-32 right-64 text-6xl opacity-10 bounce-gentle">🛂</div>
        <div className="absolute bottom-32 left-64 text-5xl opacity-10 float-animation" style={{animationDelay: '1.5s'}}>✈️</div>
        <div className="absolute top-96 left-32 text-4xl opacity-10 drift-animation" style={{animationDelay: '3s'}}>🌍</div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-7xl relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative pulse-glow">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-full p-4 shadow-2xl">
                <Globe className="h-12 w-12 text-white" />
              </div>
              <MapPin className="h-5 w-5 text-yellow-400 absolute -top-1 -right-1 bounce-gentle" />
            </div>
            <div className="text-center">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-2xl mb-2">
                Passport Pals
              </h1>
              <p className="text-lg text-blue-200 font-medium">Your Global Community Connection</p>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto mb-8">
            <p className="text-xl text-gray-200 mb-4 leading-relaxed">
              Connect with your homeland community living around the world
            </p>
            <p className="text-base text-gray-300 mb-6 leading-relaxed">
              Passport Pals is the premier platform for expatriates, students, and professionals to find their community abroad. 
              Whether you're seeking professional networking, cultural connections, or simply want to meet people who share your background, 
              we bridge the gap between home and your new destination.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button 
              onClick={() => navigate('/search')}
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 text-lg shadow-2xl btn-animated border-0"
            >
              <Search className="h-5 w-5 mr-2" />
              Find Your Community
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button 
              onClick={() => navigate('/chat')}
              className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white px-6 py-3 text-lg shadow-2xl btn-animated border-0"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Start Connecting
              <Heart className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickStats.map((stat, index) => (
            <Card 
              key={index} 
              className="animated-card hover:scale-105 transition-all duration-300 hover:shadow-2xl border-0 shimmer-effect cursor-pointer"
              onClick={() => navigate(stat.page)}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <stat.icon className="h-12 w-12 mx-auto text-blue-300" />
                </div>
                <p className="text-2xl font-bold mb-1 text-white">{stat.value}</p>
                <p className="text-sm text-gray-300">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* What is Passport Pals */}
        <Card className="glass-card mb-12 hover:shadow-2xl transition-all duration-300 border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-white flex items-center justify-center gap-3 mb-3">
              <Zap className="h-6 w-6 text-yellow-400" />
              What is Passport Pals?
              <Star className="h-5 w-5 text-yellow-400" />
            </CardTitle>
            <CardDescription className="text-base text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Passport Pals is more than just a social network - it's your bridge to belonging anywhere in the world. 
              We understand the unique challenges of living away from home and have created a platform that brings your community to you.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  Why Choose Us?
                </h3>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="animated-card p-4 hover:scale-105 transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(feature.page)}
                  >
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-3`}>
                      <feature.icon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-base font-semibold text-white mb-2">{feature.title}</h4>
                    <p className="text-gray-300 text-xs">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Welcome Message for Logged In Users */}
        {user && (
          <Card className="glass-card mb-12 hover:shadow-2xl transition-all duration-300 border-0">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-3">
                <Users className="h-6 w-6 text-blue-400" />
                Welcome back, {user.name}!
                <MapPin className="h-5 w-5 text-green-400" />
              </CardTitle>
              <CardDescription className="text-base text-gray-300">
                Your global community is waiting to connect with you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => navigate('/profile')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white btn-animated border-0"
                >
                  View Profile
                </Button>
                <Button 
                  onClick={() => navigate('/search')}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white btn-animated border-0"
                >
                  Find Connections
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Featured Communities */}
        <Card className="glass-card hover:shadow-2xl transition-all duration-300 border-0">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center gap-3 mb-3">
              <Globe className="h-6 w-6 text-blue-400" />
              Featured Communities
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-xs">Active</Badge>
            </CardTitle>
            <CardDescription className="text-base text-gray-300">
              Popular communities from around the world
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredCommunities.map((community, index) => (
                <div
                  key={index}
                  className="animated-card p-6 hover:scale-105 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{community.flag}</div>
                      <div>
                        <h3 className="font-semibold text-white text-base mb-1">{community.name}</h3>
                        <div className="flex items-center space-x-1 text-gray-300 mb-2">
                          <MapPin className="h-3 w-3" />
                          <span className="text-xs">{community.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 text-xs">
                            {community.members.toLocaleString()} members
                          </Badge>
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-xs">
                            {getTypeIcon(community.type)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={() => navigate('/search')}
                      size="sm"
                      className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white btn-animated border-0"
                    >
                      Join Community
                    </Button>
                  </div>
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
