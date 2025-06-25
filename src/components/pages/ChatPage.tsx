
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Send, Phone, Video, MoreVertical, MessageCircle, Users } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../integrations/supabase/client';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  is_read: boolean;
  sender?: any;
}

interface Conversation {
  id: string;
  participant_1: string;
  participant_2: string;
  last_message_at: string;
  other_participant?: any;
  latest_message?: string;
}

const ChatPage = () => {
  const { profile } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Demo conversations and messages for development
  const demoConversations = [
    {
      id: '1',
      name: 'Priya Sharma',
      lastMessage: 'Hey! How are you settling in Toronto?',
      time: '2 min ago',
      unread: 2,
      status: 'online',
      country: 'India',
      role: 'student'
    },
    {
      id: '2',
      name: 'Ahmed Hassan',
      lastMessage: 'Thanks for the advice about Dubai!',
      time: '15 min ago',
      unread: 0,
      status: 'offline',
      country: 'Egypt',
      role: 'professional'
    },
    {
      id: '3',
      name: 'Maria Rodriguez',
      lastMessage: 'Would love to collaborate on the art project',
      time: '1 hour ago',
      unread: 1,
      status: 'online',
      country: 'Spain',
      role: 'artist'
    },
    {
      id: '4',
      name: 'Li Wei',
      lastMessage: 'The conference was amazing! Did you attend?',
      time: '2 hours ago',
      unread: 0,
      status: 'away',
      country: 'China',
      role: 'researcher'
    },
    {
      id: '5',
      name: 'Sofia Chen',
      lastMessage: 'Great design insights! Can we schedule a call?',
      time: '3 hours ago',
      unread: 3,
      status: 'online',
      country: 'China',
      role: 'designer'
    }
  ];

  const demoMessages = {
    '1': [
      { id: '1', content: 'Hi there! Welcome to Toronto!', sender: 'Priya Sharma', time: '10:00 AM', isOwn: false },
      { id: '2', content: 'Thank you! I\'m excited to be here. Any recommendations for good places to eat?', sender: 'You', time: '10:05 AM', isOwn: true },
      { id: '3', content: 'Absolutely! There\'s this amazing Indian restaurant called "Spice Route" downtown. You\'ll love it!', sender: 'Priya Sharma', time: '10:07 AM', isOwn: false },
      { id: '4', content: 'That sounds perfect! Would you like to join me there sometime?', sender: 'You', time: '10:10 AM', isOwn: true },
      { id: '5', content: 'I\'d love to! How about this weekend?', sender: 'Priya Sharma', time: '10:12 AM', isOwn: false },
    ],
    '2': [
      { id: '1', content: 'Hey! I heard you recently moved to Dubai. How\'s it going?', sender: 'Ahmed Hassan', time: '9:00 AM', isOwn: false },
      { id: '2', content: 'It\'s been quite an adventure! The weather is intense but the opportunities are amazing.', sender: 'You', time: '9:15 AM', isOwn: true },
      { id: '3', content: 'That\'s great to hear! If you need any tips about the local culture or best places to network, just let me know.', sender: 'Ahmed Hassan', time: '9:20 AM', isOwn: false },
      { id: '4', content: 'Thanks so much! I really appreciate the support. The community here has been so welcoming.', sender: 'You', time: '9:25 AM', isOwn: true },
    ],
    '3': [
      { id: '1', content: 'Your latest artwork is absolutely stunning! The colors are so vibrant.', sender: 'You', time: '2:00 PM', isOwn: true },
      { id: '2', content: 'Thank you so much! I\'ve been experimenting with new techniques I learned here in NYC.', sender: 'Maria Rodriguez', time: '2:05 PM', isOwn: false },
      { id: '3', content: 'It really shows! Are you planning to exhibit any of these pieces?', sender: 'You', time: '2:10 PM', isOwn: true },
      { id: '4', content: 'Actually, yes! I have a gallery showing next month. Would you like to come?', sender: 'Maria Rodriguez', time: '2:15 PM', isOwn: false },
    ]
  };

  const filteredConversations = demoConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'You',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };

    // This would normally send to the database
    setNewMessage('');
  };

  if (!profile?.profile_completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 flex items-center justify-center">
        <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl max-w-md">
          <CardContent className="p-8 text-center">
            <MessageCircle className="h-16 w-16 text-white mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Complete Your Profile</h2>
            <p className="text-white/80 mb-6">
              Please complete your profile and verify your identity to start chatting with other members.
            </p>
            <Button 
              onClick={() => window.location.href = '/profile/edit'}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              Complete Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 relative overflow-hidden pb-20">
      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-4">Messages</h1>
          <p className="text-xl text-white/90">Connect with verified members from around the world</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="bg-white/20 backdrop-blur-md border border-white/30 overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-white text-xl flex items-center gap-2">
                <Users className="h-5 w-5" />
                Conversations
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto h-[450px]">
              <div className="space-y-1">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`p-4 hover:bg-white/10 cursor-pointer transition-colors border-l-4 ${
                      selectedConversation === conv.id 
                        ? 'bg-white/10 border-l-white' 
                        : 'border-l-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            {conv.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          conv.status === 'online' ? 'bg-green-500' : 
                          conv.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-semibold truncate">{conv.name}</h3>
                          <span className="text-white/60 text-xs">{conv.time}</span>
                        </div>
                        <p className="text-white/70 text-sm truncate">{conv.lastMessage}</p>
                        <div className="flex items-center justify-between mt-1">
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                            {conv.role}
                          </Badge>
                          {conv.unread > 0 && (
                            <Badge className="bg-red-500 text-white text-xs">
                              {conv.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            {selectedConversation ? (
              <Card className="bg-white/20 backdrop-blur-md border border-white/30 h-full flex flex-col">
                {/* Chat Header */}
                <CardHeader className="pb-4 border-b border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                          {filteredConversations.find(c => c.id === selectedConversation)?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-white font-bold">
                          {filteredConversations.find(c => c.id === selectedConversation)?.name}
                        </h3>
                        <p className="text-white/70 text-sm">
                          {filteredConversations.find(c => c.id === selectedConversation)?.status}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {(demoMessages[selectedConversation as keyof typeof demoMessages] || []).map((message: any) => (
                    <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isOwn 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                          : 'bg-white/20 text-white border border-white/30'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.isOwn ? 'text-white/80' : 'text-white/60'}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>

                {/* Message Input */}
                <div className="p-4 border-t border-white/20">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="bg-white/20 backdrop-blur-md border border-white/30 h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-white/60 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Select a conversation</h3>
                  <p className="text-white/70">Choose a conversation from the list to start chatting</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
