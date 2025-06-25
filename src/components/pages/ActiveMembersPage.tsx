
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, MapPin, Clock, TrendingUp } from 'lucide-react';

const ActiveMembersPage = () => {
  const activeMembers = [
    { name: 'Priya Sharma', country: 'India', city: 'Toronto', role: 'student', lastActive: '2 min ago', status: 'online' },
    { name: 'Raj Patel', country: 'India', city: 'London', role: 'entrepreneur', lastActive: '5 min ago', status: 'online' },
    { name: 'Maria Rodriguez', country: 'Spain', city: 'New York', role: 'artist', lastActive: '1 min ago', status: 'online' },
    { name: 'Ahmed Ali', country: 'Egypt', city: 'Dubai', role: 'professional', lastActive: '3 min ago', status: 'online' },
    { name: 'Li Wei', country: 'China', city: 'San Francisco', role: 'researcher', lastActive: '7 min ago', status: 'online' },
    { name: 'Sofia Chen', country: 'China', city: 'Berlin', role: 'designer', lastActive: '4 min ago', status: 'online' },
  ];

  const stats = [
    { label: 'Currently Online', value: '2,847', icon: Users, color: 'text-green-500' },
    { label: 'Active Today', value: '12,456', icon: TrendingUp, color: 'text-blue-500' },
    { label: 'New This Week', value: '1,203', icon: Clock, color: 'text-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 relative overflow-hidden pb-20">
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-4">Active Members</h1>
          <p className="text-xl text-white/90">Connect with members who are online right now</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/20 backdrop-blur-md border border-white/30">
              <CardContent className="p-6 text-center">
                <stat.icon className={`h-10 w-10 ${stat.color} mx-auto mb-3`} />
                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                <p className="text-white/80">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Active Members List */}
        <Card className="bg-white/20 backdrop-blur-md border border-white/30">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Members Online Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeMembers.map((member, index) => (
                <div key={index} className="bg-white/10 p-4 rounded-lg border border-white/20">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{member.name}</h3>
                      <p className="text-white/70 text-sm flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {member.city}, {member.country}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      {member.role}
                    </Badge>
                    <span className="text-white/60 text-xs">{member.lastActive}</span>
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

export default ActiveMembersPage;
