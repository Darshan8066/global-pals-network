
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
    { label: 'Active Members', value: '12.5K', icon: Users, color: 'from-blue-600 to-blue-800' },
    { label: 'Countries', value: '85', icon: Globe, color: 'from-green-600 to-green-800' },
    { label: 'Messages Today', value: '3.2K', icon: MessageCircle, color: 'from-purple-600 to-purple-800' },
    { label: 'New Connections', value: '156', icon: TrendingUp, color: 'from-emerald-600 to-emerald-800' }
  ];

  const features = [
    {
      icon: Search,
      title: 'Smart Discovery',
      description: 'Find people from your homeland with our advanced search and filtering system.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Verified Profiles',
      description: 'Connect with confidence through our secure verification process.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MessageCircle,
      title: 'Real-time Chat',
      description: 'Instant messaging with translation support for seamless communication.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Join communities across 85+ countries and expand your global network.',
      color: 'from-orange-500 to-red-500'
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
      case 'student': return <GraduationCap className="h-5 w-5" />;
      case 'professional': return <Building className="h-5 w-5" />;
      case 'artist': return <Plane className="h-5 w-5" />;
      default: return <Users className="h-5 w-5" />;
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

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="relative pulse-glow">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-full p-6 shadow-2xl">
                <Globe className="h-20 w-20 text-white" />
              </div>
              <MapPin className="h-8 w-8 text-yellow-400 absolute -top-2 -right-2 bounce-gentle" />
            </div>
            <div className="text-center">
              <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-2xl mb-4">
                Passport Pals
              </h1>
              <p className="text-2xl text-blue-200 font-semibold">Your Global Community Connection</p>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-3xl text-gray-200 mb-6 leading-relaxed">
              Connect with your homeland community living around the world
            </p>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Passport Pals is the premier platform for expatriates, students, and professionals to find their community abroad. 
              Whether you're seeking professional networking, cultural connections, or simply want to meet people who share your background, 
              we bridge the gap between home and your new destination.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <Button 
              onClick={() => navigate('/search')}
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-10 py-4 text-xl shadow-2xl btn-animated border-0"
            >
              <Search className="h-6 w-6 mr-3" />
              Find Your Community
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              onClick={() => navigate('/chat')}
              className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white px-10 py-4 text-xl shadow-2xl btn-animated border-0"
            >
              <MessageCircle className="h-6 w-6 mr-3" />
              Start Connecting
              <Heart className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {quickStats.map((stat, index) => (
            <Card key={index} className={`animated-card hover:scale-105 transition-all duration-300 hover:shadow-2xl border-0 shimmer-effect`}>
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <stat.icon className="h-16 w-16 mx-auto text-blue-300" />
                </div>
                <p className="text-4xl font-bold mb-2 text-white">{stat.value}</p>
                <p className="text-lg text-gray-300">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* What is Passport Pals */}
        <Card className="glass-card mb-16 hover:shadow-2xl transition-all duration-300 border-0">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-4xl text-white flex items-center justify-center gap-4 mb-4">
              <Zap className="h-10 w-10 text-yellow-400" />
              What is Passport Pals?
              <Star className="h-8 w-8 text-yellow-400" />
            </CardTitle>
            <CardDescription className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Passport Pals is more than just a social network - it's your bridge to belonging anywhere in the world. 
              We understand the unique challenges of living away from home and have created a platform that brings your community to you.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  Why Choose Us?
                </h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="animated-card p-6 hover:scale-105 transition-all duration-300">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                    <p className="text-gray-300 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Welcome Message for Logged In Users */}
        {user && (
          <Card className="glass-card mb-16 hover:shadow-2xl transition-all duration-300 border-0">
            <CardHeader>
              <CardTitle className="text-3xl text-white flex items-center gap-4">
                <Users className="h-8 w-8 text-blue-400" />
                Welcome back, {user.name}!
                <MapPin className="h-6 w-6 text-green-400" />
              </CardTitle>
              <CardDescription className="text-xl text-gray-300">
                Your global community is waiting to connect with you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-6">
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
            <CardTitle className="text-white text-3xl flex items-center gap-4 mb-4">
              <Globe className="h-8 w-8 text-blue-400" />
              Featured Communities
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">Active</Badge>
            </CardTitle>
            <CardDescription className="text-xl text-gray-300">
              Popular communities from around the world
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredCommunities.map((community, index) => (
                <div
                  key={index}
                  className="animated-card p-8 hover:scale-105 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="text-5xl">{community.flag}</div>
                      <div>
                        <h3 className="font-semibold text-white text-xl mb-2">{community.name}</h3>
                        <div className="flex items-center space-x-2 text-gray-300 mb-3">
                          <MapPin className="h-4 w-4" />
                          <span>{community.location}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
                            {community.members.toLocaleString()} members
                          </Badge>
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                            {getTypeIcon(community.type)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={() => navigate('/search')}
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
