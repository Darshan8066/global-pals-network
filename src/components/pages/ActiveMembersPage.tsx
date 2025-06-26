
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, MapPin, Shield, Clock, Heart, Sparkles } from 'lucide-react';

const ActiveMembersPage = () => {
  const activeMembers = [
    {
      id: '1',
      name: 'Priya Sharma',
      role: 'student',
      country: 'India',
      city: 'Toronto',
      lastActive: '2 min ago',
      isVerified: true,
      isOnline: true
    },
    {
      id: '2',
      name: 'Ahmed Hassan',
      role: 'businessperson',
      country: 'Egypt',
      city: 'London',
      lastActive: '5 min ago',
      isVerified: true,
      isOnline: true
    },
    {
      id: '3',
      name: 'Maria Rodriguez',
      role: 'artist',
      country: 'Spain',
      city: 'Berlin',
      lastActive: '10 min ago',
      isVerified: false,
      isOnline: true
    },
    {
      id: '4',
      name: 'Chen Wei',
      role: 'professional',
      country: 'China',
      city: 'Vancouver',
      lastActive: '15 min ago',
      isVerified: true,
      isOnline: false
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
              <Users className="h-12 w-12 text-white drop-shadow-lg transform hover:rotate-12 transition-transform duration-500" />
              <Sparkles className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              Active Members
            </h1>
            <Heart className="h-8 w-8 text-red-300 animate-pulse" />
          </div>
          <p className="text-white/90 text-lg">
            Connect with active community members around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeMembers.map((member) => (
            <Card key={member.id} className="bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-center">
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative">
                    <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                      <AvatarFallback className="text-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        {member.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {member.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                    {member.isVerified && (
                      <Shield className="h-6 w-6 text-green-400 absolute -top-1 -left-1 bg-white rounded-full p-1" />
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <CardTitle className="text-xl text-white">{member.name}</CardTitle>
                    <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {member.role === 'student' ? '🎓' : member.role === 'artist' ? '🎨' : member.role === 'businessperson' ? '💼' : '👨‍💻'} 
                      {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-white justify-center">
                  <MapPin className="h-4 w-4 text-pink-300" />
                  <span>{member.city}, {member.country}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-white justify-center">
                  <Clock className="h-4 w-4 text-yellow-300" />
                  <span className="text-sm">Active {member.lastActive}</span>
                </div>

                <div className="flex justify-center">
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg transition-all duration-300">
                    Connect
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveMembersPage;
