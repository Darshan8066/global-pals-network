
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
  Heart,
  UserPlus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  
  // State for button interactions
  const [connectingUsers, setConnectingUsers] = useState<Set<string>>(new Set());
  const [connectedUsers, setConnectedUsers] = useState<Set<string>>(new Set());
  const [messagingUsers, setMessagingUsers] = useState<Set<string>>(new Set());

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
    },
    {
      id: '5',
      name: 'Maria Rodriguez',
      role: 'doctor',
      country: 'Mexico',
      currentLocation: 'Madrid, Spain',
      occupation: 'Pediatric Doctor',
      isVerified: true,
      interests: ['Medicine', 'Children', 'Travel']
    },
    {
      id: '6',
      name: 'Ahmed Ali',
      role: 'engineer',
      country: 'Pakistan',
      currentLocation: 'Dubai, UAE',
      occupation: 'Software Engineer',
      isVerified: true,
      interests: ['Technology', 'Innovation', 'Sports']
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

  const handleConnect = (userId: string) => {
    setConnectingUsers(prev => new Set(prev).add(userId));
    
    // Simulate connection process
    setTimeout(() => {
      setConnectingUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
      setConnectedUsers(prev => new Set(prev).add(userId));
    }, 1000);
  };

  const handleMessage = (userId: string) => {
    setMessagingUsers(prev => new Set(prev).add(userId));
    
    // Simulate message process and navigate to chat
    setTimeout(() => {
      setMessagingUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
      navigate('/chat');
    }, 800);
  };

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden pb-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full float-animation blur-xl"></div>
        <div className="absolute top-40 right-40 w-24 h-24 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full drift-animation blur-xl" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-40 w-28 h-28 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full float-animation blur-xl" style={{animationDelay: '2s'}}></div>
        
        {/* Floating search icons */}
        <div className="absolute top-32 right-32 text-3xl opacity-10 bounce-gentle">🔍</div>
        <div className="absolute bottom-40 left-20 text-4xl opacity-10 float-animation" style={{animationDelay: '1.5s'}}>👥</div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative pulse-glow">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-full p-3 shadow-2xl">
                <Search className="h-8 w-8 text-white" />
              </div>
              <MapPin className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 bounce-gentle" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Find Your Community
            </h1>
            <Globe className="h-6 w-6 text-blue-400 bounce-gentle" />
          </div>
          <p className="text-gray-200 text-lg">
            Connect with people from your homeland living around the world
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="glass-card shadow-2xl mb-8 border-0 hover:shadow-3xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 text-lg">
              <Filter className="h-5 w-5 text-blue-400" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search by name, job, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-800/50 border-blue-500/30 focus:border-blue-400 focus:ring-blue-400 text-white placeholder-gray-400 text-sm py-2"
                />
              </div>
              
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="bg-slate-800/50 border-blue-500/30 focus:border-blue-400 text-white text-sm">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-blue-500/30">
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="student">🎓 Student</SelectItem>
                  <SelectItem value="artist">🎨 Artist</SelectItem>
                  <SelectItem value="businessperson">💼 Business Person</SelectItem>
                  <SelectItem value="doctor">👩‍⚕️ Doctor</SelectItem>
                  <SelectItem value="engineer">👨‍💻 Engineer</SelectItem>
                  <SelectItem value="teacher">👩‍🏫 Teacher</SelectItem>
                  <SelectItem value="lawyer">⚖️ Lawyer</SelectItem>
                  <SelectItem value="chef">👨‍🍳 Chef</SelectItem>
                  <SelectItem value="photographer">📸 Photographer</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterCountry} onValueChange={setFilterCountry}>
                <SelectTrigger className="bg-slate-800/50 border-blue-500/30 focus:border-blue-400 text-white text-sm">
                  <SelectValue placeholder="Filter by country" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-blue-500/30">
                  <SelectItem value="all">All Countries</SelectItem>
                  <SelectItem value="India">🇮🇳 India</SelectItem>
                  <SelectItem value="Pakistan">🇵🇰 Pakistan</SelectItem>
                  <SelectItem value="Bangladesh">🇧🇩 Bangladesh</SelectItem>
                  <SelectItem value="Mexico">🇲🇽 Mexico</SelectItem>
                  <SelectItem value="China">🇨🇳 China</SelectItem>
                  <SelectItem value="Philippines">🇵🇭 Philippines</SelectItem>
                  <SelectItem value="Nigeria">🇳🇬 Nigeria</SelectItem>
                  <SelectItem value="Brazil">🇧🇷 Brazil</SelectItem>
                  <SelectItem value="Turkey">🇹🇷 Turkey</SelectItem>
                  <SelectItem value="Vietnam">🇻🇳 Vietnam</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="glass-card shadow-2xl border-0">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center gap-3">
              <Users className="h-6 w-6 text-blue-400" />
              Found {filteredUsers.length} People
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-xs">Active</Badge>
            </CardTitle>
            <CardDescription className="text-gray-300 text-base">
              Connect with amazing people from your community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((person) => (
                <div
                  key={person.id}
                  className="animated-card p-6 hover:scale-102 transition-all duration-300 hover:shadow-2xl shimmer-effect"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="h-16 w-16 border-4 border-blue-400/50 shadow-xl">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-bold">
                            {person.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {person.isVerified && (
                          <Shield className="h-5 w-5 text-green-400 absolute -bottom-1 -right-1 bg-slate-800 rounded-full p-1" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-white text-lg">{person.name}</h3>
                          {person.isVerified && (
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-xs">
                              <Shield className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-300 mb-2 flex items-center gap-1 text-sm">
                          {person.role === 'student' ? '🎓' : person.role === 'artist' ? '🎨' : person.role === 'doctor' ? '👩‍⚕️' : person.role === 'engineer' ? '👨‍💻' : '💼'} 
                          {person.occupation}
                        </p>
                        <div className="flex items-center space-x-2 text-gray-400 mb-3 text-sm">
                          <MapPin className="h-4 w-4" />
                          <span>From {person.country} • Now in {person.currentLocation}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {person.interests.map((interest, index) => (
                            <Badge key={index} className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 text-xs">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-3">
                      <Button 
                        onClick={() => handleConnect(person.id)}
                        disabled={connectingUsers.has(person.id) || connectedUsers.has(person.id)}
                        size="sm"
                        className={`btn-animated border-0 text-sm ${
                          connectedUsers.has(person.id)
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                        } text-white`}
                      >
                        {connectingUsers.has(person.id) ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                            Connecting...
                          </>
                        ) : connectedUsers.has(person.id) ? (
                          <>
                            <Heart className="h-3 w-3 mr-1 fill-current" />
                            Connected
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-3 w-3 mr-1" />
                            Connect
                          </>
                        )}
                      </Button>
                      <Button 
                        onClick={() => handleMessage(person.id)}
                        disabled={messagingUsers.has(person.id)}
                        size="sm"
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white btn-animated border-0 text-sm"
                      >
                        {messagingUsers.has(person.id) ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                            Opening...
                          </>
                        ) : (
                          <>
                            <MessageCircle className="h-3 w-3 mr-1" />
                            Message
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredUsers.length === 0 && (
              <div className="text-center py-16">
                <Search className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-300 text-lg mb-2">No people found matching your criteria</p>
                <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SearchPage;
