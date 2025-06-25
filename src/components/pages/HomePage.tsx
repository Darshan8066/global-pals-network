import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  MapPin, 
  MessageCircle, 
  TrendingUp, 
  Star,
  Globe,
  Shield,
  Heart,
  Sparkles,
  Zap,
  Award,
  Camera,
  Coffee,
  Plane
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProfileCompletionBanner from '../ProfileCompletionBanner';

const HomePage = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { icon: Users, label: 'Active Members', value: '45,282', color: 'text-blue-500' },
    { icon: MapPin, label: 'Countries', value: '195', color: 'text-green-500' },
    { icon: MessageCircle, label: 'Messages Today', value: '12,847', color: 'text-purple-500' },
    { icon: TrendingUp, label: 'New Connections', value: '1,203', color: 'text-pink-500' }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Verified Profiles',
      description: 'All members verify their identity with government documents for your safety',
      color: 'bg-green-500'
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Connect with people from your home country living in 195+ countries worldwide',
      color: 'bg-blue-500'
    },
    {
      icon: MessageCircle,
      title: 'Real-time Chat',
      description: 'Instant messaging with verified members, including group chats and communities',
      color: 'bg-purple-500'
    },
    {
      icon: Star,
      title: 'Smart Discovery',
      description: 'AI-powered matching to find the most relevant connections based on your profile',
      color: 'bg-yellow-500'
    }
  ];

  const successStories = [
    {
      name: 'Priya & Raj',
      story: 'Met through Passport Pals and started a successful tech company in Toronto',
      image: '👩‍💻👨‍💻',
      location: 'Toronto, Canada'
    },
    {
      name: 'Ahmed & Team',
      story: 'Found roommates and built a strong support network in Dubai',
      image: '🏠👥',
      location: 'Dubai, UAE'
    },
    {
      name: 'Maria\'s Journey',
      story: 'Connected with artists and now exhibits her work in NYC galleries',
      image: '🎨🏛️',
      location: 'New York, USA'
    }
  ];

  const communityHighlights = [
    { icon: Award, text: 'Top-rated community platform for international connections' },
    { icon: Heart, text: '98% user satisfaction rate with meaningful connections made' },
    { icon: Zap, text: 'Average response time: 30 minutes for verified members' },
    { icon: Camera, text: 'Share your journey with photo stories and cultural exchanges' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 relative overflow-hidden pb-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute top-40 right-40 w-24 h-24 bg-green-300 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-40 w-28 h-28 bg-red-300 rounded-full opacity-10 animate-bounce delay-1000"></div>
        <div className="absolute bottom-40 right-20 w-20 h-20 bg-blue-300 rounded-full opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Profile Completion Banner */}
        {profile && (
          <ProfileCompletionBanner 
            profileCompleted={profile.profile_completed || false}
            isVerified={profile.is_verified}
          />
        )}

        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <Globe className="h-16 w-16 text-white drop-shadow-lg transform hover:rotate-12 transition-transform duration-500" />
              <Sparkles className="h-6 w-6 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-6xl font-bold text-white drop-shadow-lg">
              Welcome to Passport Pals
            </h1>
            <Heart className="h-12 w-12 text-red-300 animate-pulse" />
          </div>
          <p className="text-2xl text-white/90 mb-4 drop-shadow">
            Your global community awaits - Connect, Share, Grow Together
          </p>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Join thousands of verified international professionals, students, and entrepreneurs 
            who have found their community abroad through Passport Pals.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <stat.icon className={`h-10 w-10 ${stat.color} mx-auto mb-3`} />
                <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-white/80 text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Features */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">
            Why Choose Passport Pals?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6">
                  <div className={`${feature.color} w-14 h-14 rounded-full flex items-center justify-center mb-4`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">
            Success Stories from Our Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <Card key={index} className="bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{story.image}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{story.name}</h3>
                  <p className="text-white/80 text-sm mb-3 leading-relaxed">{story.story}</p>
                  <Badge className="bg-white/20 text-white border-white/30">
                    <MapPin className="h-3 w-3 mr-1" />
                    {story.location}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Highlights */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">
            Community Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {communityHighlights.map((highlight, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-xl border border-white/30 flex items-center space-x-4">
                <highlight.icon className="h-8 w-8 text-yellow-300" />
                <p className="text-white font-medium">{highlight.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-12">
          <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
              <p className="text-xl text-white/90 mb-6">
                Join our global community and discover connections that will change your life abroad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/search')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-3"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Find Your Community
                </Button>
                <Button 
                  onClick={() => navigate('/chat')}
                  variant="outline"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 text-lg px-8 py-3"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Start Chatting
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Getting Started Guide */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-md w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Create Your Profile</h3>
              <p className="text-white/80">Complete your profile with verification documents for security</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-md w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Discover Connections</h3>
              <p className="text-white/80">Use our smart search to find people from your country living abroad</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-md w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Start Connecting</h3>
              <p className="text-white/80">Chat, meet, and build lasting friendships with verified members</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Coffee className="h-8 w-8 text-white" />
              <Plane className="h-8 w-8 text-white" />
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Your Adventure Starts Here</h3>
            <p className="text-white/80 text-lg leading-relaxed max-w-3xl mx-auto">
              Whether you're a student looking for study groups, a professional seeking career opportunities, 
              or an entrepreneur building your network, Passport Pals is your gateway to meaningful connections 
              that transcend borders and cultures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
