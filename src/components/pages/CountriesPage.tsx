
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
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full float-animation blur-xl"></div>
        <div className="absolute top-60 right-32 w-32 h-32 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full drift-animation blur-xl" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-32 w-36 h-36 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full float-animation blur-xl" style={{animationDelay: '2s'}}></div>
        
        {/* Floating elements */}
        <div className="absolute top-32 right-64 text-6xl opacity-10 bounce-gentle">🌍</div>
        <div className="absolute bottom-32 left-64 text-5xl opacity-10 float-animation" style={{animationDelay: '1.5s'}}>✈️</div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative pulse-glow">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-full p-4 shadow-2xl">
                <Globe className="h-12 w-12 text-white" />
              </div>
              <MapPin className="h-5 w-5 text-yellow-400 absolute -top-1 -right-1 bounce-gentle" />
            </div>
            <div className="text-center">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-2xl mb-2">
                Global Countries
              </h1>
              <p className="text-lg text-blue-200 font-medium">Discover Communities Worldwide</p>
            </div>
            <Heart className="h-8 w-8 text-red-300 animate-pulse" />
          </div>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Discover our community presence worldwide and connect with your homeland
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country, index) => (
            <Card key={index} className="glass-card hover:scale-105 transition-transform duration-300 border-0 shimmer-effect">
              <CardHeader className="text-center">
                <div className="text-6xl mb-3">{country.flag}</div>
                <CardTitle className="text-2xl text-white">{country.name}</CardTitle>
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg px-4 py-2">
                  <Users className="h-4 w-4 mr-2" />
                  {country.members} Members
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="animated-card p-4">
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
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-lg transition-all duration-300 btn-animated">
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
