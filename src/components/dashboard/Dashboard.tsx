
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  MessageCircle, 
  Globe, 
  Shield, 
  Calendar, 
  MapPin,
  Upload,
  Clock
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  const mockConnections = [
    {
      id: '1',
      name: 'Priya Sharma',
      role: 'student',
      country: 'India',
      currentLocation: 'Toronto, Canada',
      isVerified: true,
    },
    {
      id: '2',
      name: 'Raj Patel',
      role: 'businessperson',
      country: 'India',
      currentLocation: 'London, UK',
      isVerified: true,
    },
    {
      id: '3',
      name: 'Ananya Kumar',
      role: 'artist',
      country: 'India',
      currentLocation: 'Berlin, Germany',
      isVerified: false,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600">
          Stay connected with your community abroad
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.profileImage} />
                <AvatarFallback className="text-lg">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-lg">{user.name}</CardTitle>
                <CardDescription className="flex items-center space-x-2">
                  <Badge variant={user.role === 'student' ? 'default' : user.role === 'artist' ? 'secondary' : 'outline'}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                  {user.isVerified && (
                    <Badge variant="secondary" className="text-green-700 bg-green-100">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{user.city}, {user.country}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Joined {user.createdAt.toLocaleDateString()}</span>
            </div>
            {user.bio && (
              <p className="text-sm text-gray-700">{user.bio}</p>
            )}
            {!user.isVerified && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-amber-800 mb-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">Verification Pending</span>
                </div>
                <p className="text-xs text-amber-700 mb-2">
                  Upload your visa documents to get verified and access all features.
                </p>
                <Button size="sm" variant="outline" className="text-amber-700 border-amber-300">
                  <Upload className="h-3 w-3 mr-1" />
                  Upload Documents
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600">Connections</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Messages</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Globe className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">5</p>
              <p className="text-sm text-gray-600">Countries</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Connections */}
      <Card>
        <CardHeader>
          <CardTitle>Your Connections</CardTitle>
          <CardDescription>
            People from your community living abroad
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockConnections.map((connection) => (
              <div
                key={connection.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {connection.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-gray-900">{connection.name}</p>
                      {connection.isVerified && (
                        <Badge variant="secondary" className="text-xs px-1 py-0">
                          <Shield className="h-3 w-3" />
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 capitalize">{connection.role}</p>
                    <p className="text-xs text-gray-500">
                      From {connection.country} • Now in {connection.currentLocation}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Message
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Find More Connections
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
