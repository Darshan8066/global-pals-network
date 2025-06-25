
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sparkles, Target, Users, Star, MessageCircle, UserPlus } from 'lucide-react';

const SmartDiscoveryPage = () => {
  const recommendations = [
    {
      name: 'Dr. Ananya Gupta',
      country: 'India',
      city: 'Toronto',
      role: 'researcher',
      matchScore: 95,
      commonInterests: ['AI Research', 'Technology', 'Academia'],
      reason: 'Both researchers in AI field, same city'
    },
    {
      name: 'Miguel Rodriguez',
      country: 'Spain',
      city: 'New York',
      role: 'artist',
      matchScore: 88,
      commonInterests: ['Digital Art', 'Design', 'Photography'],
      reason: 'Similar creative background and interests'
    },
    {
      name: 'Sarah Kim',
      country: 'South Korea',
      city: 'Vancouver',
      role: 'entrepreneur',
      matchScore: 92,
      commonInterests: ['Startups', 'Technology', 'Business'],
      reason: 'Both entrepreneurs in tech space'
    },
    {
      name: 'Ahmed Hassan',
      country: 'Egypt',
      city: 'Dubai',
      role: 'professional',
      matchScore: 85,
      commonInterests: ['Finance', 'International Business'],
      reason: 'Professional background alignment'
    }
  ];

  const discoveryFeatures = [
    {
      icon: Target,
      title: 'Precision Matching',
      description: 'AI analyzes your profile, interests, and goals to find the most relevant connections'
    },
    {
      icon: Star,
      title: 'Quality Over Quantity',
      description: 'Focused recommendations based on compatibility and shared experiences'
    },
    {
      icon: Users,
      title: 'Community Building',
      description: 'Connects you with people who can become long-term friends and professional contacts'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 relative overflow-hidden pb-20">
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-10 w-10 text-yellow-300 animate-pulse" />
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">Smart Discovery</h1>
            <Sparkles className="h-10 w-10 text-yellow-300 animate-pulse" />
          </div>
          <p className="text-xl text-white/90">AI-powered matching to find your perfect connections</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {discoveryFeatures.map((feature, index) => (
            <Card key={index} className="bg-white/20 backdrop-blur-md border border-white/30">
              <CardContent className="p-6 text-center">
                <feature.icon className="h-12 w-12 text-yellow-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/80 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recommendations */}
        <Card className="bg-white/20 backdrop-blur-md border border-white/30">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center gap-2">
              <Target className="h-6 w-6" />
              Recommended for You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((person, index) => (
                <div key={index} className="bg-white/10 p-6 rounded-lg border border-white/20">
                  <div className="flex items-start space-x-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg">
                        {person.name.split(' ').map(n => n.charAt(0)).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-bold text-lg">{person.name}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-yellow-400 font-bold">{person.matchScore}%</span>
                        </div>
                      </div>
                      <p className="text-white/70 text-sm">{person.city}, {person.country}</p>
                      <Badge className="mt-1 bg-blue-500/20 text-blue-300 border-blue-500/30">
                        {person.role}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-white/80 text-sm font-medium mb-2">Why this match:</p>
                      <p className="text-white/70 text-sm italic">{person.reason}</p>
                    </div>
                    
                    <div>
                      <p className="text-white/80 text-sm font-medium mb-2">Common Interests:</p>
                      <div className="flex flex-wrap gap-1">
                        {person.commonInterests.map((interest, interestIndex) => (
                          <Badge key={interestIndex} variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex-1">
                        <UserPlus className="h-4 w-4 mr-1" />
                        Connect
                      </Button>
                      <Button size="sm" variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30 flex-1">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                    </div>
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

export default SmartDiscoveryPage;
