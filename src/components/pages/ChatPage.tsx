
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageCircle, 
  Send, 
  Search, 
  Shield,
  Users,
  Heart,
  Sparkles,
  Clock
} from 'lucide-react';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');
  const [searchChat, setSearchChat] = useState('');

  const mockChats = [
    {
      id: '1',
      name: 'Priya Sharma',
      lastMessage: 'Hey! How are you settling in Toronto?',
      timestamp: '2 min ago',
      unread: 2,
      isVerified: true,
      isOn: true
    },
    {
      id: '2',
      name: 'Toronto Indian Students',
      lastMessage: 'Anyone knows good Indian restaurants near campus?',
      timestamp: '15 min ago',
      unread: 5,
      isVerified: false,
      isGroup: true,
      isOn: false
    },
    {
      id: '3',
      name: 'Raj Patel',
      lastMessage: 'Thanks for the business networking tip!',
      timestamp: '1 hour ago',
      unread: 0,
      isVerified: true,
      isOn: false
    },
    {
      id: '4',
      name: 'Ananya Kumar',
      lastMessage: 'Check out this amazing art gallery I found!',
      timestamp: '3 hours ago',
      unread: 1,
      isVerified: false,
      isOn: true
    },
    {
      id: '5',
      name: 'Maria Rodriguez',
      lastMessage: 'Hola! How is the weather in your city?',
      timestamp: '5 hours ago',
      unread: 0,
      isVerified: true,
      isOn: true
    },
    {
      id: '6',
      name: 'Ahmed Ali',
      lastMessage: 'Great meeting you at the tech meetup!',
      timestamp: '1 day ago',
      unread: 0,
      isVerified: true,
      isOn: false
    }
  ];

  const mockMessages = [
    {
      id: '1',
      sender: 'Priya Sharma',
      message: 'Hey! How are you settling in Toronto?',
      timestamp: '2:30 PM',
      isMine: false
    },
    {
      id: '2',
      sender: 'Me',
      message: 'Hi Priya! It\'s going well, thanks for asking. Still getting used to the weather though 😅',
      timestamp: '2:32 PM',
      isMine: true
    },
    {
      id: '3',
      sender: 'Priya Sharma',
      message: 'Haha, I totally understand! Wait till winter comes. Do you need any recommendations for warm clothes shopping?',
      timestamp: '2:33 PM',
      isMine: false
    },
    {
      id: '4',
      sender: 'Me',
      message: 'That would be amazing! I\'d really appreciate some local insights.',
      timestamp: '2:35 PM',
      isMine: true
    }
  ];

  // Filter chats based on search query
  const filteredChats = useMemo(() => {
    if (!searchChat.trim()) return mockChats;
    
    return mockChats.filter(chat => 
      chat.name.toLowerCase().includes(searchChat.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchChat.toLowerCase())
    );
  }, [searchChat]);

  const selectedChatData = mockChats.find(chat => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden pb-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full float-animation blur-xl"></div>
        <div className="absolute top-40 right-40 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full drift-animation blur-xl" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-40 w-28 h-28 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full float-animation blur-xl" style={{animationDelay: '2s'}}></div>
        
        {/* Floating chat icons */}
        <div className="absolute top-32 right-64 text-4xl opacity-10 bounce-gentle">💬</div>
        <div className="absolute bottom-32 left-64 text-3xl opacity-10 float-animation" style={{animationDelay: '1.5s'}}>📱</div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-7xl relative z-10">
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="relative pulse-glow">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-3 shadow-2xl">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <Sparkles className="h-3 w-3 text-yellow-300 absolute -top-1 -right-1 bounce-gentle" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Chat with Friends
            </h1>
            <Heart className="h-5 w-5 text-red-300 bounce-gentle" />
          </div>
          <p className="text-gray-200 text-base">
            Stay connected with your community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[600px]">
          {/* Chat List */}
          <Card className="glass-card shadow-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2 text-base">
                <Users className="h-4 w-4" />
                Messages ({filteredChats.length})
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
                <Input
                  placeholder="Search conversations..."
                  value={searchChat}
                  onChange={(e) => setSearchChat(e.target.value)}
                  className="pl-8 bg-slate-800/50 border-blue-500/30 focus:border-blue-400 text-white placeholder-gray-400 text-sm h-8"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {filteredChats.length > 0 ? (
                  filteredChats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => setSelectedChat(chat.id)}
                      className={`flex items-center space-x-2 p-3 cursor-pointer transition-all duration-200 mx-3 rounded-lg hover:bg-slate-800/30 ${
                        selectedChat === chat.id 
                          ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30' 
                          : ''
                      }`}
                    >
                      <div className="relative">
                        <Avatar className="h-8 w-8 border border-blue-400/50">
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                            {chat.isGroup ? '👥' : chat.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {chat.isOn && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 border border-white rounded-full"></div>
                        )}
                        {chat.isVerified && (
                          <Shield className="h-3 w-3 text-green-400 absolute -top-0.5 -right-0.5 bg-slate-800 rounded-full p-0.5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-white truncate text-xs">{chat.name}</h3>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-400">{chat.timestamp}</span>
                            {chat.unread > 0 && (
                              <Badge className="bg-red-500 text-white text-xs px-1 py-0 h-4 min-w-[16px]">
                                {chat.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 truncate">{chat.lastMessage}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 px-4">
                    <Search className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">No conversations found</p>
                    <p className="text-gray-500 text-xs">Try searching with different terms</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-2 glass-card shadow-2xl border-0 flex flex-col">
            {selectedChatData ? (
              <>
                {/* Chat Header */}
                <CardHeader className="border-b border-blue-500/20 pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Avatar className="h-8 w-8 border border-blue-400/50">
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                          {selectedChatData.isGroup ? '👥' : selectedChatData.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {selectedChatData.isOn && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 border border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-white text-sm">{selectedChatData.name}</CardTitle>
                      <p className="text-gray-400 text-xs">
                        {selectedChatData.isOn ? 'Online' : 'Last seen ' + selectedChatData.timestamp}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-3 overflow-y-auto">
                  <div className="space-y-3">
                    {mockMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
                            message.isMine
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                              : 'bg-slate-800/50 text-white border border-blue-500/30'
                          }`}
                        >
                          <p className="text-xs">{message.message}</p>
                          <div className="flex items-center justify-end mt-1">
                            <span className="text-xs opacity-70">{message.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Message Input */}
                <div className="p-3 border-t border-blue-500/20">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 bg-slate-800/50 border-blue-500/30 focus:border-blue-400 text-white placeholder-gray-400 text-sm"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                    >
                      <Send className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400 text-base">Select a conversation to start chatting</p>
                  <p className="text-gray-500 text-sm">Choose from your contacts on the left</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
