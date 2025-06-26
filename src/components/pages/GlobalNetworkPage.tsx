
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Users, MapPin, Heart, Sparkles, TrendingUp, Award, Star } from 'lucide-react';

const GlobalNetworkPage = () => {
  const networkStats = {
    totalMembers: 15420,
    countries: 85,
    cities: 340,
    connections: 45600
  };

  const topCountries = [
    { name: 'United States', members: 2340, growth: '+12%' },
    { name: 'Canada', members: 1250, growth: '+18%' },
    { name: 'United Kingdom', members: 890, growth: '+8%' },
    { name: 'Germany', members: 750, growth: '+15%' },
    { name: 'Australia', members: 650, growth: '+22%' }
  ];

  const networkHighlights = [
    {
      title: 'Global Professionals',
      count: '8,500+',
      icon: '💼',
      description: 'Business professionals and entrepreneurs worldwide'
    },
    {
      title: 'International Students',
      count: '4,200+',
      icon: '🎓',
      description: 'Students studying abroad in various fields'
    },
    {
      title: 'Creative Artists',
      count: '2,720+',
      icon: '🎨',
      description: 'Artists, designers, and creative professionals'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 relative overflow-hidden pb-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute top-40 right-40 w-24 h-24 bg-green-300 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-40 w-28 h-28 bg-red-300 rounded-full opacity-10 animate-bounce delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="relative">
              <Globe className="h-12 w-12 text-white drop-shadow-lg transform hover:rotate-12 transition-transform duration-500" />
              <Sparkles className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              Global Network
            </h1>
            <Heart className="h-8 w-8 text-red-300 animate-pulse" />
          </div>
          <p className="text-white/90 text-lg">
            Connecting communities across continents
          </p>
        </div>

        {/* Network Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl text-center">
            <CardContent className="p-4">
              <div className="text-3xl font-bold text-white">{networkStats.totalMembers.toLocaleString()}</div>
              <div className="text-white/80 text-sm">Total Members</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl text-center">
            <CardContent className="p-4">
              <div className="text-3xl font-bold text-white">{networkStats.countries}</div>
              <div className="text-white/80 text-sm">Countries</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl text-center">
            <CardContent className="p-4">
              <div className="text-3xl font-bold text-white">{networkStats.cities}</div>
              <div className="text-white/80 text-sm">Cities</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl text-center">
            <CardContent className="p-4">
              <div className="text-3xl font-bold text-white">{networkStats.connections.toLocaleString()}</div>
              <div className="text-white/80 text-sm">Connections Made</div>
            </CardContent>
          </Card>
        </div>

        {/* Network Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {networkHighlights.map((highlight, index) => (
            <Card key={index} className="bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">{highlight.icon}</div>
                <CardTitle className="text-white text-lg">{highlight.title}</CardTitle>
                <div className="text-3xl font-bold text-yellow-300">{highlight.count}</div>
              </CardHeader>
              <CardContent>
                <p className="text-white/90 text-center text-sm">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Top Countries */}
        <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              Top Countries by Membership
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCountries.map((country, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/10 rounded-lg border border-white/20">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{country.name}</h3>
                      <p className="text-white/80 text-sm">{country.members} members</p>
                    </div>
                  </div>
                  
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    {country.growth}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Join Network CTA */}
        <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md border border-white/30 shadow-2xl text-center">
          <CardContent className="p-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="h-8 w-8 text-yellow-300" />
              <h2 className="text-3xl font-bold text-white">Join Our Global Community</h2>
              <Star className="h-8 w-8 text-yellow-300" />
            </div>
            <p className="text-white/90 text-lg mb-6">
              Connect with professionals, students, and creatives from around the world. 
              Build meaningful relationships that transcend borders.
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Expand Your Network
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GlobalNetworkPage;
