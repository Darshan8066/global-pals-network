
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Search, 
  Plus, 
  Users,
  Sparkles,
  Phone,
  Video,
  Settings,
  Archive,
  Filter
} from 'lucide-react';
import ChatBox from '../common/ChatBox';

interface Conversation {
  id: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  type: 'direct' | 'group';
  participantRole?: 'student' | 'artist' | 'businessperson';
}

const ChatPage = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Demo conversations
  const conversations: Conversation[] = [
    {
      id: '1',
      participantName: 'Sarah Chen',
      lastMessage: 'Yes! I work as a UX designer. Would love to connect and maybe grab coffee sometime.',
      lastMessageTime: new Date(Date.now() - 1800000),
      unreadCount: 2,
      isOnline: true,
      type: 'direct',
      participantRole: 'student'
    },
    {
      id: '2',
      participantName: 'Toronto Students Group',
      lastMessage: 'Marcus: Anyone interested in a study group for midterms?',
      lastMessageTime: new Date(Date.now() - 3600000),
      unreadCount: 5,
      isOnline: false,
      type: 'group'
    },
    {
      id: '3',
      participantName: 'Ahmed Hassan',
      lastMessage: 'Thanks for the advice! Really helpful.',
      lastMessageTime: new Date(Date.now() - 7200000),
      unreadCount: 0,
      isOnline: false,
      type: 'direct',
      participantRole: 'student'
    },
    {
      id: '4',
      participantName: 'Priya Sharma',
      lastMessage: 'Looking forward to our networking event next week!',
      lastMessageTime: new Date(Date.now() - 10800000),
      unreadCount: 1,
      isOnline: true,
      type: 'direct',
      participantRole: 'businessperson'
    },
    {
      id: '5',
      participantName: 'Berlin Creative Hub',
      lastMessage: 'Julia: Check out this amazing art exhibition happening this weekend!',
      lastMessageTime: new Date(Date.now() - 14400000),
      unreadCount: 0,
      isOnline: false,
      type: 'group'
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConversationData = conversations.find(conv => conv.id === selectedConversation);

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) {
      return 'Just now';
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days < 7) {
      return `${days}d ago`;
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  const getRoleColor = (role?: string) => {
    switch (role) {
      case 'student': return 'from-blue-500 to-cyan-500';
      case 'artist': return 'from-purple-500 to-pink-500';
      case 'businessperson': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full float-animation blur-xl"></div>
        <div className="absolute top-60 right-32 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full drift-animation blur-xl"></div>
        <div className="absolute bottom-40 left-32 w-36 h-36 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full float-animation blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative pulse-glow">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-4 shadow-2xl">
                <MessageCircle className="h-10 w-10 text-white" />
              </div>
              <Sparkles className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1 bounce-gentle" />
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent text-shadow mb-2">
                Messages
              </h1>
              <p className="text-lg text-blue-200 font-medium">
                Stay connected with your community
                {totalUnread > 0 && (
                  <Badge className="ml-2 bg-red-500 text-white px-2 py-1 text-sm">
                    {totalUnread} unread
                  </Badge>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="glass-card border-0 shadow-2xl h-full flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="text-white text-xl">Conversations</CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" className="btn-outline">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="btn-primary">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                  <Input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-blue-400"
                  />
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-0">
                <div className="space-y-1">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={`p-4 cursor-pointer transition-all duration-200 hover:bg-white/10 ${
                        selectedConversation === conversation.id ? 'bg-white/15 border-r-4 border-blue-400' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12 border-2 border-white/20">
                            <AvatarImage src={conversation.participantAvatar} alt={conversation.participantName} />
                            <AvatarFallback className={`bg-gradient-to-r ${getRoleColor(conversation.participantRole)} text-white font-semibold`}>
                              {conversation.type === 'group' ? <Users className="h-5 w-5" /> : conversation.participantName.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.isOnline && conversation.type === 'direct' && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-white font-medium truncate flex items-center gap-2">
                              {conversation.participantName}
                              {conversation.type === 'group' && (
                                <Badge className="bg-white/20 text-white/80 text-xs px-2 py-0.5">
                                  Group
                                </Badge>
                              )}
                            </h3>
                            <span className="text-white/60 text-xs flex-shrink-0">
                              {formatTime(conversation.lastMessageTime)}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <p className="text-white/70 text-sm truncate pr-2">
                              {conversation.lastMessage}
                            </p>
                            {conversation.unreadCount > 0 && (
                              <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex-shrink-0">
                                {conversation.unreadCount}
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
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            {selectedConversationData ? (
              <ChatBox
                recipientId={selectedConversationData.id}
                recipientName={selectedConversationData.participantName}
                recipientAvatar={selectedConversationData.participantAvatar}
                isOnline={selectedConversationData.isOnline}
                className="h-full"
              />
            ) : (
              <Card className="glass-card border-0 shadow-2xl h-full flex items-center justify-center">
                <CardContent className="text-center">
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="h-10 w-10 text-white/60" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Welcome to Messages</h3>
                    <p className="text-white/70 text-lg max-w-md mx-auto mb-6">
                      Select a conversation to start chatting with your community members.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                    <Button className="btn-primary">
                      <Plus className="h-4 w-4 mr-2" />
                      New Chat
                    </Button>
                    <Button className="btn-outline">
                      <Users className="h-4 w-4 mr-2" />
                      Find People
                    </Button>
                  </div>

                  <div className="mt-8 text-center">
                    <p className="text-white/50 text-sm">
                      💡 Tip: Use our search feature to find people from your homeland or with similar interests
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
