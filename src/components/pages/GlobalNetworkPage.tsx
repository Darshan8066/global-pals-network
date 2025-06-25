
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Users, MapPin, TrendingUp, Network, Building } from 'lucide-react';

const GlobalNetworkPage = () => {
  const networkStats = [
    { region: 'North America', members: 15847, countries: 3, growth: '+12%' },
    { region: 'Europe', members: 12934, countries: 27, growth: '+18%' },
    { region: 'Asia Pacific', members: 11256, countries: 15, growth: '+25%' },
    { region: 'Middle East', members: 6789, countries: 12, growth: '+22%' },
    { region: 'Africa', members: 4567, countries: 8, growth: '+30%' },
    { region: 'South America', members: 3245, countries: 6, growth: '+15%' },
  ];

  const professionalNetworks = [
    { field: 'Technology', members: 18500, icon: '💻' },
    { field: 'Healthcare', members: 12300, icon: '🏥' },
    { field: 'Education', members: 9800, icon: '📚' },
    { field: 'Business', members: 8700, icon: '💼' },
    { field: 'Arts & Design', members: 6400, icon: '🎨' },
    { field: 'Engineering', members: 5900, icon: '⚙️' },
  ];

  const universitiesPartners = [
    'University of Toronto', 'MIT', 'Stanford University', 'Harvard University',
    'Oxford University', 'Cambridge University', 'ETH Zurich', 'NUS Singapore'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 relative overflow-hidden pb-20">
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="h-10 w-10 text-white animate-spin" style={{ animationDuration: '8s' }} />
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">Global Network</h1>
            <Network className="h-10 w-10 text-white animate-pulse" />
          </div>
          <p className="text-xl text-white/90">Connect with professionals and students across 195+ countries</p>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/20 backdrop-blur-md border border-white/30">
            <CardContent className="p-6 text-center">
              <Globe className="h-12 w-12 text-blue-300 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-white">195+</h3>
              <p className="text-white/80">Countries</p>
            </CardContent>
          </Card>
          <Card className="bg-white/20 backdrop-blur-md border border-white/30">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-green-300 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-white">54,638</h3>
              <p className="text-white/80">Active Members</p>
            </CardContent>
          </Card>
          <Card className="bg-white/20 backdrop-blur-md border border-white/30">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-pink-300 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-white">+20%</h3>
              <p className="text-white/80">Monthly Growth</p>
            </CardContent>
          </Card>
        </div>

        {/* Regional Distribution */}
        <Card className="bg-white/20 backdrop-blur-md border border-white/30 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Regional Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {networkStats.map((region, index) => (
                <div key={index} className="bg-white/10 p-4 rounded-lg border border-white/20">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-bold">{region.region}</h3>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                      {region.growth}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-white/80">
                      <Users className="h-4 w-4 inline mr-1" />
                      {region.members.toLocaleString()} members
                    </p>
                    <p className="text-white/80">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      {region.countries} countries
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Professional Networks */}
        <Card className="bg-white/20 backdrop-blur-md border border-white/30 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Professional Networks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {professionalNetworks.map((network, index) => (
                <div key={index} className="bg-white/10 p-4 rounded-lg border border-white/20 text-center">
                  <div className="text-3xl mb-2">{network.icon}</div>
                  <h3 className="text-white font-bold mb-1">{network.field}</h3>
                  <p className="text-white/80">{network.members.toLocaleString()} members</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* University Partners */}
        <Card className="bg-white/20 backdrop-blur-md border border-white/30">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center gap-2">
              <Building className="h-6 w-6" />
              University Partners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {universitiesPartners.map((university, index) => (
                <div key={index} className="bg-white/10 p-3 rounded-lg border border-white/20 text-center">
                  <p className="text-white font-medium text-sm">{university}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-white/80">And 500+ more institutions worldwide</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GlobalNetworkPage;
