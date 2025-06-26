
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserPlus, MapPin, Briefcase, Heart, Sparkles, Clock } from 'lucide-react';

const NewConnectionsPage = () => {
  const newConnections = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'designer',
      country: 'Canada',
      city: 'Toronto',
      occupation: 'UI/UX Designer',
      interests: ['Design', 'Art', 'Technology'],
      joinedAgo: '2 hours ago'
    },
    {
      id: '2',
      name: 'Raj Patel',
      role: 'entrepreneur',
      country: 'India',
      city: 'London',
      occupation: 'Tech Entrepreneur',
      interests: ['Startups', 'AI', 'Innovation'],
      joinedAgo: '5 hours ago'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      role: 'student',
      country: 'Australia',
      city: 'Berlin',
      occupation: 'Computer Science Student',
      interests: ['Programming', 'Gaming', 'Music'],
      joinedAgo: '1 day ago'
    },
    {
      id: '4',
      name: 'Carlos Rodriguez',
      role: 'chef',
      country: 'Spain',
      city: 'New York',
      occupation: 'Executive Chef',
      interests: ['Cooking', 'Culture', 'Travel'],
      joinedAgo: '2 days ago'
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
              <UserPlus className="h-12 w-12 text-white drop-shadow-lg transform hover:rotate-12 transition-transform duration-500" />
              <Sparkles className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              New Connections
            </h1>
            <Heart className="h-8 w-8 text-red-300 animate-pulse" />
          </div>
          <p className="text-white/90 text-lg">
            Connect with recently joined community members
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newConnections.map((person) => (
            <Card key={person.id} className="bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
                    <AvatarFallback className="text-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      {person.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <CardTitle className="text-xl text-white">{person.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {person.role === 'student' ? '🎓' : person.role === 'artist' ? '🎨' : person.role === 'designer' ? '🎨' : person.role === 'entrepreneur' ? '💼' : person.role === 'chef' ? '👨‍🍳' : '👨‍💻'} 
                        {person.role.charAt(0).toUpperCase() + person.role.slice(1)}
                      </Badge>
                      <div className="flex items-center text-white text-sm">
                        <Clock className="h-3 w-3 mr-1 text-yellow-300" />
                        {person.joinedAgo}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-white">
                    <MapPin className="h-4 w-4 text-pink-300" />
                    <span>{person.city}, {person.country}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-white">
                    <Briefcase className="h-4 w-4 text-green-300" />
                    <span>{person.occupation}</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <h3 className="text-white font-semibold mb-2 text-sm">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {person.interests.map((interest, index) => (
                      <Badge key={index} variant="outline" className="bg-white/20 text-white border-white/30 text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    Connect
                  </Button>
                  <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewConnectionsPage;
