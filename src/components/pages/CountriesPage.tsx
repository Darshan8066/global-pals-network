
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Globe } from 'lucide-react';

const CountriesPage = () => {
  const countries = [
    { name: 'India', members: 12456, cities: ['Toronto', 'London', 'Dubai', 'New York'], flag: '🇮🇳' },
    { name: 'China', members: 8734, cities: ['Vancouver', 'Berlin', 'Sydney', 'Tokyo'], flag: '🇨🇳' },
    { name: 'Nigeria', members: 6892, cities: ['London', 'Atlanta', 'Houston', 'Toronto'], flag: '🇳🇬' },
    { name: 'Philippines', members: 5647, cities: ['Dubai', 'Singapore', 'Los Angeles', 'Toronto'], flag: '🇵🇭' },
    { name: 'Pakistan', members: 4923, cities: ['London', 'Toronto', 'Dubai', 'New York'], flag: '🇵🇰' },
    { name: 'Bangladesh', members: 3856, cities: ['London', 'New York', 'Toronto', 'Sydney'], flag: '🇧🇩' },
    { name: 'Egypt', members: 3124, cities: ['Dubai', 'London', 'Cairo', 'Toronto'], flag: '🇪🇬' },
    { name: 'Brazil', members: 2987, cities: ['Miami', 'New York', 'Toronto', 'Boston'], flag: '🇧🇷' },
    { name: 'Turkey', members: 2765, cities: ['Berlin', 'London', 'Toronto', 'Amsterdam'], flag: '🇹🇷' },
    { name: 'Iran', members: 2543, cities: ['Toronto', 'Vancouver', 'London', 'Berlin'], flag: '🇮🇷' },
    { name: 'Mexico', members: 2234, cities: ['Los Angeles', 'Chicago', 'Toronto', 'Houston'], flag: '🇲🇽' },
    { name: 'South Korea', members: 2187, cities: ['New York', 'Los Angeles', 'Toronto', 'Vancouver'], flag: '🇰🇷' },
  ];

  const totalMembers = countries.reduce((sum, country) => sum + country.members, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 relative overflow-hidden pb-20">
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-4">Countries & Communities</h1>
          <p className="text-xl text-white/90">Discover communities from {countries.length} countries with {totalMembers.toLocaleString()} members worldwide</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/20 backdrop-blur-md border border-white/30">
            <CardContent className="p-6 text-center">
              <Globe className="h-10 w-10 text-blue-300 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-white">{countries.length}</h3>
              <p className="text-white/80">Countries</p>
            </CardContent>
          </Card>
          <Card className="bg-white/20 backdrop-blur-md border border-white/30">
            <CardContent className="p-6 text-center">
              <Users className="h-10 w-10 text-green-300 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-white">{totalMembers.toLocaleString()}</h3>
              <p className="text-white/80">Total Members</p>
            </CardContent>
          </Card>
          <Card className="bg-white/20 backdrop-blur-md border border-white/30">
            <CardContent className="p-6 text-center">
              <MapPin className="h-10 w-10 text-pink-300 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-white">500+</h3>
              <p className="text-white/80">Cities</p>
            </CardContent>
          </Card>
        </div>

        {/* Countries Grid */}
        <Card className="bg-white/20 backdrop-blur-md border border-white/30">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Member Communities by Country</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {countries.map((country, index) => (
                <div key={index} className="bg-white/10 p-6 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-3xl">{country.flag}</span>
                    <div>
                      <h3 className="text-white font-bold text-lg">{country.name}</h3>
                      <p className="text-white/70 text-sm">{country.members.toLocaleString()} members</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-white/80 text-sm font-medium">Top Cities:</p>
                    <div className="flex flex-wrap gap-1">
                      {country.cities.map((city, cityIndex) => (
                        <Badge key={cityIndex} variant="outline" className="bg-white/10 text-white border-white/30 text-xs">
                          {city}
                        </Badge>
                      ))}
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

export default CountriesPage;
