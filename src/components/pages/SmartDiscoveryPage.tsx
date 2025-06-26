
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Zap, MapPin, Briefcase, Heart, Sparkles, Users, Target } from 'lucide-react';

const SmartDiscoveryPage = () => {
  const recommendedUsers = [
    {
      id: '1',
      name: 'Alex Chen',
      role: 'developer',
      country: 'China',
      city: 'Vancouver',
      occupation: 'Full Stack Developer',
      interests: ['React', 'Node.js', 'AI'],
      matchScore: 95,
      reason: 'Same tech interests and location'
    },
    {
      id: '2',
      name: 'Maya Patel',
      role: 'student',
      country: 'India',
      city: 'Toronto',
      occupation: 'MBA Student',
      interests: ['Business', 'Finance', 'Networking'],
      matchScore: 88,
      reason: 'Similar career goals'
    },
    {
      id: '3',
      name: 'Sophie Laurent',
      role: 'artist',
      country: 'France',
      city: 'Montreal',
      occupation: 'Digital Artist',
      interests: ['Design', 'Photography', 'Culture'],
      matchScore: 82,
      reason: 'Creative background match'
    }
  ];

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'from-green-500 to-emerald-500';
    if (score >= 80) return 'from-blue-500 to-cyan-500';
    return 'from-purple-500 to-pink-500';
  };

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
              <Zap className="h-12 w-12 text-white drop-shadow-lg transform hover:rotate-12 transition-transform duration-500" />
              <Sparkles className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              Smart Discovery
            </h1>
            <Heart className="h-8 w-8 text-red-300 animate-pulse" />
          </div>
          <p className="text-white/90 text-lg">
            AI-powered matching based on your interests and goals
          </p>
        </div>

        {/* Matching Algorithm Info */}
        <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="h-6 w-6" />
              How Smart Discovery Works
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white/90">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4 mb-2">
                  <Users className="h-8 w-8 mx-auto text-blue-300" />
                </div>
                <h3 className="font-semibold mb-1">Interest Matching</h3>
                <p className="text-sm">Based on your hobbies and professional interests</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-4 mb-2">
                  <MapPin className="h-8 w-8 mx-auto text-green-300" />
                </div>
                <h3 className="font-semibold mb-1">Location Proximity</h3>
                <p className="text-sm">Connect with people in your city or nearby areas</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 mb-2">
                  <Briefcase className="h-8 w-8 mx-auto text-purple-300" />
                </div>
                <h3 className="font-semibold mb-1">Career Alignment</h3>
                <p className="text-sm">Match with professionals in similar fields</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Connections */}
        <div className="space-y-6">
          {recommendedUsers.map((user) => (
            <Card key={user.id} className="bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{user.name}</h3>
                        <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white mt-1">
                          {user.role === 'student' ? '🎓' : user.role === 'artist' ? '🎨' : user.role === 'developer' ? '💻' : '👨‍💻'} 
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="text-right">
                        <div className={`bg-gradient-to-r ${getMatchColor(user.matchScore)} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                          {user.matchScore}% Match
                        </div>
                        <p className="text-white/80 text-xs mt-1">{user.reason}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-white">
                          <MapPin className="h-4 w-4 text-pink-300" />
                          <span>{user.city}, {user.country}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-white">
                          <Briefcase className="h-4 w-4 text-green-300" />
                          <span>{user.occupation}</span>
                        </div>
                      </div>

                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                        <h4 className="text-white font-semibold mb-2 text-sm">Common Interests</h4>
                        <div className="flex flex-wrap gap-1">
                          {user.interests.map((interest, index) => (
                            <Badge key={index} variant="outline" className="bg-white/20 text-white border-white/30 text-xs">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                        Connect Now
                      </Button>
                      <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                        View Profile
                      </Button>
                      <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                        Send Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartDiscoveryPage;
