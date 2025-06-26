
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Users, MapPin, Heart, Sparkles } from 'lucide-react';

const CountriesPage = () => {
  const countries = [
    { name: 'Canada', members: 1250, flag: '🇨🇦', cities: ['Toronto', 'Vancouver', 'Montreal'] },
    { name: 'United States', members: 2340, flag: '🇺🇸', cities: ['New York', 'Los Angeles', 'Chicago'] },
    { name: 'United Kingdom', members: 890, flag: '🇬🇧', cities: ['London', 'Manchester', 'Edinburgh'] },
    { name: 'Germany', members: 750, flag: '🇩🇪', cities: ['Berlin', 'Munich', 'Hamburg'] },
    { name: 'Australia', members: 650, flag: '🇦🇺', cities: ['Sydney', 'Melbourne', 'Brisbane'] },
    { name: 'France', members: 580, flag: '🇫🇷', cities: ['Paris', 'Lyon', 'Marseille'] },
    { name: 'Netherlands', members: 420, flag: '🇳🇱', cities: ['Amsterdam', 'Rotterdam', 'The Hague'] },
    { name: 'Sweden', members: 380, flag: '🇸🇪', cities: ['Stockholm', 'Gothenburg', 'Malmö'] }
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
              <Globe className="h-12 w-12 text-white drop-shadow-lg transform hover:rotate-12 transition-transform duration-500" />
              <Sparkles className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              Global Countries
            </h1>
            <Heart className="h-8 w-8 text-red-300 animate-pulse" />
          </div>
          <p className="text-white/90 text-lg">
            Discover our community presence worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country, index) => (
            <Card key={index} className="bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-center">
                <div className="text-6xl mb-3">{country.flag}</div>
                <CardTitle className="text-2xl text-white">{country.name}</CardTitle>
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg px-4 py-2">
                  <Users className="h-4 w-4 mr-2" />
                  {country.members} Members
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Popular Cities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {country.cities.map((city, cityIndex) => (
                      <Badge key={cityIndex} variant="outline" className="bg-white/20 text-white border-white/30">
                        {city}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center">
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-lg transition-all duration-300">
                    Explore {country.name}
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

export default CountriesPage;
