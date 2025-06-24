
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Globe, 
  MessageCircle, 
  TrendingUp,
  MapPin,
  Heart,
  Star,
  Award,
  Clock,
  UserCheck
} from 'lucide-react';

const StatsPage = () => {
  const globalStats = [
    { label: 'Total Active Members', value: '12,547', icon: Users, color: 'from-blue-600 to-blue-800', change: '+2.3%' },
    { label: 'Countries Represented', value: '85', icon: Globe, color: 'from-green-600 to-green-800', change: '+5 new' },
    { label: 'Messages Sent Today', value: '3,247', icon: MessageCircle, color: 'from-purple-600 to-purple-800', change: '+12%' },
    { label: 'New Connections This Week', value: '1,156', icon: TrendingUp, color: 'from-emerald-600 to-emerald-800', change: '+8.5%' }
  ];

  const topCountries = [
    { country: 'India', flag: '🇮🇳', members: 3240, percentage: 25.8 },
    { country: 'China', flag: '🇨🇳', members: 2156, percentage: 17.2 },
    { country: 'Mexico', flag: '🇲🇽', members: 1890, percentage: 15.1 },
    { country: 'Philippines', flag: '🇵🇭', members: 1456, percentage: 11.6 },
    { country: 'Nigeria', flag: '🇳🇬', members: 1234, percentage: 9.8 }
  ];

  const activeRegions = [
    { region: 'North America', cities: 45, members: 4567, growth: '+15%' },
    { region: 'Europe', cities: 38, members: 3890, growth: '+12%' },
    { region: 'Asia Pacific', cities: 52, members: 3234, growth: '+18%' },
    { region: 'Middle East', cities: 23, members: 1456, growth: '+25%' }
  ];

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden pb-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full float-animation blur-xl"></div>
        <div className="absolute top-40 right-40 w-24 h-24 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full drift-animation blur-xl" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-40 w-28 h-28 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full float-animation blur-xl" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-7xl relative z-10">
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="relative pulse-glow">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-full p-3 shadow-2xl">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <Star className="h-3 w-3 text-yellow-400 absolute -top-1 -right-1 bounce-gentle" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Community Statistics
            </h1>
            <Globe className="h-5 w-5 text-blue-400 bounce-gentle" />
          </div>
          <p className="text-gray-200 text-base">
            Real-time insights into our global community
          </p>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {globalStats.map((stat, index) => (
            <Card key={index} className="animated-card hover:scale-105 transition-all duration-300 hover:shadow-2xl border-0 shimmer-effect">
              <CardContent className="p-4 text-center">
                <div className="mb-3">
                  <stat.icon className="h-8 w-8 mx-auto text-blue-300" />
                </div>
                <p className="text-xl font-bold mb-1 text-white">{stat.value}</p>
                <p className="text-xs text-gray-300 mb-2">{stat.label}</p>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-xs">
                  {stat.change}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Countries */}
          <Card className="glass-card shadow-2xl border-0">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-400" />
                Top Countries by Members
              </CardTitle>
              <CardDescription className="text-gray-300 text-sm">
                Countries with the most active community members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCountries.map((country, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{country.flag}</div>
                      <div>
                        <p className="text-white font-medium text-sm">{country.country}</p>
                        <p className="text-gray-400 text-xs">{country.members.toLocaleString()} members</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-300 font-medium text-sm">{country.percentage}%</p>
                      <Progress value={country.percentage} className="w-16 h-2 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Regions */}
          <Card className="glass-card shadow-2xl border-0">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-400" />
                Active Regions
              </CardTitle>
              <CardDescription className="text-gray-300 text-sm">
                Regional distribution and growth rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeRegions.map((region, index) => (
                  <div key={index} className="animated-card p-4 hover:scale-102 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-medium text-sm">{region.region}</h3>
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-xs">
                        {region.growth}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{region.cities} cities</span>
                      <span>{region.members.toLocaleString()} members</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass-card shadow-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-400" />
                Community Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">Active Daily Users</span>
                  <span className="text-white font-medium text-sm">89%</span>
                </div>
                <Progress value={89} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">User Satisfaction</span>
                  <span className="text-white font-medium text-sm">94%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card shadow-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-green-400" />
                Verification Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white mb-1">78%</p>
                  <p className="text-gray-300 text-sm">Verified Profiles</p>
                </div>
                <Progress value={78} className="h-2" />
                <p className="text-xs text-gray-400">9,847 verified members</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card shadow-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-400" />
                Activity Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Peak Hours</span>
                  <span className="text-white">6PM - 10PM</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Most Active Day</span>
                  <span className="text-white">Saturday</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Avg. Session</span>
                  <span className="text-white">23 minutes</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
