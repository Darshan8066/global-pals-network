
import React, { useState } from 'react';
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

  const filteredChats = mockChats.filter(chat => 
    chat.name.toLowerCase().includes(searchChat.toLowerCase())
  );

  const selectedChatData = mockChats.find(chat => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute top-40 right-40 w-24 h-24 bg-green-300 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-40 w-28 h-28 bg-red-300 rounded-full opacity-10 animate-bounce delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="relative">
              <MessageCircle className="h-12 w-12 text-white drop-shadow-lg transform hover:rotate-12 transition-transform duration-500" />
              <Sparkles className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              Chat with Friends
            </h1>
            <Heart className="h-8 w-8 text-red-300 animate-pulse" />
          </div>
          <p className="text-white/90 text-xl drop-shadow">
            Stay connected with your community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Chat List */}
          <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-5 w-5" />
                Messages
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
                <Input
                  placeholder="Search conversations..."
                  value={searchChat}
                  onChange={(e) => setSearchChat(e.target.value)}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`flex items-center space-x-3 p-4 cursor-pointer transition-all duration-200 mx-4 rounded-lg ${
                      selectedChat === chat.id 
                        ? 'bg-white/30 border border-white/50' 
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12 border-2 border-white/50">
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                          {chat.isGroup ? '👥' : chat.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {chat.isOn && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                      {chat.isVerified && (
                        <Shield className="h-4 w-4 text-green-400 absolute -top-1 -right-1 bg-white rounded-full p-0.5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-white truncate">{chat.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-white/70">{chat.timestamp}</span>
                          {chat.unread > 0 && (
                            <Badge className="bg-red-500 text-white text-xs px-2 py-0.5">
                              {chat.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-white/80 truncate">{chat.lastMessage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-2 bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl flex flex-col">
            {selectedChatData ? (
              <>
                {/* Chat Header */}
                <CardHeader className="border-b border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10 border-2 border-white/50">
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                          {selectedChatData.isGroup ? '👥' : selectedChatData.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {selectedChatData.isOn && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{selectedChatData.name}</CardTitle>
                      <p className="text-white/70 text-sm">
                        {selectedChatData.isOn ? 'Online' : 'Last seen ' + selectedChatData.timestamp}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {mockMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.isMine
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                              : 'bg-white/30 text-white backdrop-blur-sm'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs opacity-70">{message.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Message Input */}
                <div className="p-4 border-t border-white/20">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-white/50 mx-auto mb-4" />
                  <p className="text-white/70 text-lg">Select a conversation to start chatting</p>
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
