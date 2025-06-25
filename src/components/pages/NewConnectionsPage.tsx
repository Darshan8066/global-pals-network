
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserPlus, MapPin, Clock, Heart, MessageCircle } from 'lucide-react';

const NewConnectionsPage = () => {
  const newMembers = [
    { name: 'Aisha Khan', country: 'Pakistan', city: 'Toronto', role: 'student', joinedAgo: '2 hours ago', interests: ['Technology', 'Travel'] },
    { name: 'Carlos Martinez', country: 'Mexico', city: 'Los Angeles', role: 'artist', joinedAgo: '5 hours ago', interests: ['Art', 'Music'] },
    { name: 'Fatima Al-Zahra', country: 'Egypt', city: 'Dubai', role: 'professional', joinedAgo: '1 day ago', interests: ['Business', 'Culture'] },
    { name: 'Yuki Tanaka', country: 'Japan', city: 'Vancouver', role: 'researcher', joinedAgo: '1 day ago', interests: ['Science', 'Anime'] },
    { name: 'Olumide Adebayo', country: 'Nigeria', city: 'London', role: 'entrepreneur', joinedAgo: '2 days ago', interests: ['Startup', 'Sports'] },
    { name: 'Anastasia Petrov', country: 'Russia', city: 'Berlin', role: 'designer', joinedAgo: '2 days ago', interests: ['Design', 'Photography'] },
    { name: 'Hassan Ibrahim', country: 'Somalia', city: 'Minneapolis', role: 'student', joinedAgo: '3 days ago', interests: ['Medicine', 'Community'] },
    { name: 'Isabella Santos', country: 'Brazil', city: 'Miami', role: 'teacher', joinedAgo: '3 days ago', interests: ['Education', 'Dance'] },
  ];

  const connectionStats = [
    { label: 'New Today', value: '127', icon: UserPlus, color: 'text-green-500' },
    { label: 'This Week', value: '1,203', icon: Heart, color: 'text-pink-500' },
    { label: 'Total Connections', value: '45,892', icon: MessageCircle, color: 'text-blue-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 relative overflow-hidden pb-20">
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-4">New Connections</h1>
          <p className="text-xl text-white/90">Welcome our newest community members from around the world</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {connectionStats.map((stat, index) => (
            <Card key={index} className="bg-white/20 backdrop-blur-md border border-white/30">
              <CardContent className="p-6 text-center">
                <stat.icon className={`h-10 w-10 ${stat.color} mx-auto mb-3`} />
                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                <p className="text-white/80">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* New Members */}
        <Card className="bg-white/20 backdrop-blur-md border border-white/30">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Recently Joined Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newMembers.map((member, index) => (
                <div key={index} className="bg-white/10 p-6 rounded-lg border border-white/20">
                  <div className="flex items-start space-x-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg">
                        {member.name.split(' ').map(n => n.charAt(0)).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg">{member.name}</h3>
                      <p className="text-white/70 flex items-center gap-1 mb-1">
                        <MapPin className="h-4 w-4" />
                        {member.city}, {member.country}
                      </p>
                      <p className="text-white/60 flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3" />
                        Joined {member.joinedAgo}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      {member.role}
                    </Badge>
                    
                    <div>
                      <p className="text-white/80 text-sm font-medium mb-2">Interests:</p>
                      <div className="flex flex-wrap gap-1">
                        {member.interests.map((interest, interestIndex) => (
                          <Badge key={interestIndex} variant="outline" className="bg-white/10 text-white border-white/30 text-xs">
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

export default NewConnectionsPage;
