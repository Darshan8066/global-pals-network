
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Users, 
  MapPin, 
  Shield,
  MessageCircle,
  Globe,
  Building
} from 'lucide-react';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterCountry, setFilterCountry] = useState('');

  const mockUsers = [
    {
      id: '1',
      name: 'Priya Sharma',
      role: 'student',
      country: 'India',
      currentLocation: 'Toronto, Canada',
      occupation: 'Computer Science Student',
      isVerified: true,
      interests: ['Technology', 'Travel', 'Food']
    },
    {
      id: '2',
      name: 'Raj Patel',
      role: 'businessperson',
      country: 'India',
      currentLocation: 'London, UK',
      occupation: 'Marketing Manager',
      isVerified: true,
      interests: ['Business', 'Networking', 'Cricket']
    },
    {
      id: '3',
      name: 'Ananya Kumar',
      role: 'artist',
      country: 'India',
      currentLocation: 'Berlin, Germany',
      occupation: 'Graphic Designer',
      isVerified: false,
      interests: ['Design', 'Art', 'Music']
    },
    {
      id: '4',
      name: 'Vikram Singh',
      role: 'student',
      country: 'India',
      currentLocation: 'Sydney, Australia',
      occupation: 'MBA Student',
      isVerified: true,
      interests: ['Business', 'Sports', 'Photography']
    }
  ];

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.occupation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.currentLocation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = !filterRole || filterRole === 'all' || user.role === filterRole;
    const matchesCountry = !filterCountry || filterCountry === 'all' || user.country === filterCountry;
    
    return matchesSearch && matchesRole && matchesCountry;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 relative overflow-hidden pb-20">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full opacity-20 float-animation"></div>
        <div className="absolute top-40 right-40 w-24 h-24 bg-green-200 rounded-full opacity-20 float-animation" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-40 w-28 h-28 bg-blue-300 rounded-full opacity-20 float-animation" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <div className="mb-8 text-center slide-in">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-full p-3 shadow-xl">
                <Search className="h-10 w-10 text-white" />
              </div>
              <MapPin className="h-4 w-4 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Find Your Community
            </h1>
            <Globe className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-gray-700 text-xl">
            Connect with people from your homeland living around the world
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl mb-8 border border-blue-200">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center gap-2">
              <Filter className="h-5 w-5 text-blue-600" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search by name, occupation, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="bg-white border-blue-300 focus:border-blue-500">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent className="bg-white border-blue-300">
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="student">🎓 Student</SelectItem>
                  <SelectItem value="artist">🎨 Artist</SelectItem>
                  <SelectItem value="businessperson">💼 Business Person</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterCountry} onValueChange={setFilterCountry}>
                <SelectTrigger className="bg-white border-blue-300 focus:border-blue-500">
                  <SelectValue placeholder="Filter by country" />
                </SelectTrigger>
                <SelectContent className="bg-white border-blue-300">
                  <SelectItem value="all">All Countries</SelectItem>
                  <SelectItem value="India">🇮🇳 India</SelectItem>
                  <SelectItem value="Pakistan">🇵🇰 Pakistan</SelectItem>
                  <Select value="Bangladesh">🇧🇩 Bangladesh</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border border-blue-200">
          <CardHeader>
            <CardTitle className="text-gray-800 text-2xl flex items-center gap-3">
              <Users className="h-6 w-6 text-blue-600" />
              Found {filteredUsers.length} People
              <Badge className="bg-green-100 text-green-700 border-green-300">Active</Badge>
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              Connect with amazing people from your community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((person) => (
                <div
                  key={person.id}
                  className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-102"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16 border-3 border-white shadow-lg">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500 text-white text-xl font-bold">
                          {person.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {person.isVerified && (
                        <Shield className="h-5 w-5 text-green-500 absolute -bottom-1 -right-1 bg-white rounded-full p-0.5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-800 text-xl">{person.name}</h3>
                        {person.isVerified && (
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-300">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-700 mb-1 flex items-center gap-1">
                        {person.role === 'student' ? '🎓' : person.role === 'artist' ? '🎨' : '💼'} 
                        {person.occupation}
                      </p>
                      <div className="flex items-center space-x-2 text-gray-600 mb-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">From {person.country} • Now in {person.currentLocation}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {person.interests.map((interest, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-300">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button 
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                    >
                      <Users className="h-4 w-4 mr-1" />
                      Connect
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-blue-600 text-blue-700 hover:bg-blue-50"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No people found matching your criteria</p>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SearchPage;
