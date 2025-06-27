
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, 
  MessageCircle, 
  UserPlus, 
  Globe, 
  Users,
  Filter,
  Sparkles,
  Heart,
  Star
} from 'lucide-react';
import SearchBox from '../common/SearchBox';

interface SearchResult {
  id: string;
  name: string;
  role: 'student' | 'artist' | 'businessperson';
  location: string;
  occupation: string;
  interests: string[];
  bio?: string;
  profileImage?: string;
  isVerified: boolean;
  isOnline: boolean;
  mutualConnections: number;
}

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Demo search results
  const demoResults: SearchResult[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'student',
      location: 'Toronto, Canada',
      occupation: 'Computer Science Student',
      interests: ['Technology', 'AI', 'Travel', 'Photography'],
      bio: 'International student from Taiwan studying CS at University of Toronto. Love exploring new tech and meeting people from different cultures!',
      isVerified: true,
      isOnline: true,
      mutualConnections: 5
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      role: 'artist',
      location: 'Berlin, Germany',
      occupation: 'Digital Artist & Designer',
      interests: ['Digital Art', 'Music', 'Culture', 'Design'],
      bio: 'Creating digital experiences that bridge cultures. Originally from Mexico, now calling Berlin home.',
      isVerified: true,
      isOnline: false,
      mutualConnections: 12
    },
    {
      id: '3',
      name: 'Priya Sharma',
      role: 'businessperson',
      location: 'London, UK',
      occupation: 'Marketing Director',
      interests: ['Business', 'Networking', 'Yoga', 'Cooking'],
      bio: 'Building brands and connecting communities. Always excited to meet fellow entrepreneurs and creative minds.',
      isVerified: false,
      isOnline: true,
      mutualConnections: 8
    },
    {
      id: '4',
      name: 'Ahmed Hassan',
      role: 'student',
      location: 'Sydney, Australia',
      occupation: 'Medical Student',
      interests: ['Medicine', 'Research', 'Sports', 'Community Service'],
      bio: 'Future doctor passionate about global health. Love playing soccer and volunteering in local communities.',
      isVerified: true,
      isOnline: false,
      mutualConnections: 3
    }
  ];

  const handleSearch = (query: string, filters: any) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let results = [...demoResults];
      
      if (query.trim()) {
        results = results.filter(person => 
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          person.occupation.toLowerCase().includes(query.toLowerCase()) ||
          person.location.toLowerCase().includes(query.toLowerCase()) ||
          person.interests.some(interest => 
            interest.toLowerCase().includes(query.toLowerCase())
          )
        );
      }
      
      if (filters.role) {
        results = results.filter(person => person.role === filters.role);
      }
      
      if (filters.location) {
        results = results.filter(person => 
          person.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }
      
      setSearchResults(results);
      setIsLoading(false);
    }, 1000);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student': return '🎓';
      case 'artist': return '🎨';
      case 'businessperson': return '💼';
      default: return '👤';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'from-blue-500 to-cyan-500';
      case 'artist': return 'from-purple-500 to-pink-500';
      case 'businessperson': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden pb-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full float-animation blur-xl"></div>
        <div className="absolute top-60 right-32 w-32 h-32 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full drift-animation blur-xl"></div>
        <div className="absolute bottom-40 left-32 w-36 h-36 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full float-animation blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative pulse-glow">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-full p-4 shadow-2xl">
                <Users className="h-10 w-10 text-white" />
              </div>
              <Sparkles className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1 bounce-gentle" />
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent text-shadow mb-2">
                Find Your Community
              </h1>
              <p className="text-lg text-blue-200 font-medium">Connect with people from your homeland worldwide</p>
            </div>
          </div>
        </div>

        {/* Search Box */}
        <div className="mb-8">
          <SearchBox onSearch={handleSearch} />
        </div>

        {/* Search Results */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p className="text-white/80 text-lg">Searching for your community...</p>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                Found {searchResults.length} people
              </h2>
              <Button className="btn-outline">
                <Filter className="h-4 w-4 mr-2" />
                Sort by relevance
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((person) => (
                <Card key={person.id} className="animated-card card-hover border-0">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="relative">
                        <Avatar className="h-16 w-16 border-2 border-white/20">
                          <AvatarImage src={person.profileImage} alt={person.name} />
                          <AvatarFallback className={`bg-gradient-to-r ${getRoleColor(person.role)} text-white font-bold text-lg`}>
                            {person.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {person.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white font-semibold text-lg truncate">{person.name}</h3>
                          {person.isVerified && (
                            <Star className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`bg-gradient-to-r ${getRoleColor(person.role)} text-white border-0 text-xs`}>
                            {getRoleIcon(person.role)} {person.role.charAt(0).toUpperCase() + person.role.slice(1)}
                          </Badge>
                        </div>

                        <div className="flex items-center text-white/70 text-sm mb-2">
                          <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span className="truncate">{person.location}</span>
                        </div>

                        <p className="text-white/80 text-sm font-medium mb-2">{person.occupation}</p>
                      </div>
                    </div>

                    {person.bio && (
                      <p className="text-white/70 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {person.bio}
                      </p>
                    )}

                    {person.interests.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {person.interests.slice(0, 3).map((interest, index) => (
                            <Badge key={index} variant="outline" className="bg-white/10 text-white/80 border-white/20 text-xs">
                              {interest}
                            </Badge>
                          ))}
                          {person.interests.length > 3 && (
                            <Badge variant="outline" className="bg-white/10 text-white/60 border-white/20 text-xs">
                              +{person.interests.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {person.mutualConnections > 0 && (
                      <div className="flex items-center text-blue-300 text-xs mb-4">
                        <Users className="h-3 w-3 mr-1" />
                        {person.mutualConnections} mutual connections
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 btn-primary">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button size="sm" className="flex-1 btn-outline">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-6">
              <Globe className="h-16 w-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Ready to find your community?</h3>
              <p className="text-white/70 text-lg max-w-md mx-auto">
                Use the search bar above to find people from your homeland, with similar interests, or in specific locations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="animated-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Search by Location</h4>
                  <p className="text-white/70 text-sm">Find people in your city or from your home country</p>
                </CardContent>
              </Card>

              <Card className="animated-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Common Interests</h4>
                  <p className="text-white/70 text-sm">Connect through shared hobbies and passions</p>
                </CardContent>
              </Card>

              <Card className="animated-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Professional Networks</h4>
                  <p className="text-white/70 text-sm">Meet people in your field or industry</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
