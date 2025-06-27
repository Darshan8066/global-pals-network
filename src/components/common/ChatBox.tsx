
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Smile, Paperclip, MoreVertical, Phone, Video, Info } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
}

interface ChatBoxProps {
  recipientId?: string;
  recipientName?: string;
  recipientAvatar?: string;
  messages?: Message[];
  onSendMessage?: (content: string) => void;
  isOnline?: boolean;
  className?: string;
}

const ChatBox = ({ 
  recipientId, 
  recipientName = "Chat", 
  recipientAvatar, 
  messages = [], 
  onSendMessage,
  isOnline = false,
  className = "" 
}: ChatBoxProps) => {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Demo messages for showcase
  const demoMessages: Message[] = [
    {
      id: '1',
      senderId: 'demo-user',
      senderName: 'Sarah Chen',
      senderAvatar: '',
      content: 'Hey! I saw you\'re also from Toronto. How are you finding life there?',
      timestamp: new Date(Date.now() - 3600000),
      type: 'text'
    },
    {
      id: '2',
      senderId: user?.id || 'current-user',
      senderName: user?.name || 'You',
      senderAvatar: user?.profileImage,
      content: 'Hi Sarah! It\'s been great so far. The community here is really welcoming. Are you in the tech industry too?',
      timestamp: new Date(Date.now() - 3000000),
      type: 'text'
    },
    {
      id: '3',
      senderId: 'demo-user',
      senderName: 'Sarah Chen',
      senderAvatar: '',
      content: 'Yes! I work as a UX designer. Would love to connect and maybe grab coffee sometime.',
      timestamp: new Date(Date.now() - 1800000),
      type: 'text'
    }
  ];

  const allMessages = messages.length > 0 ? messages : demoMessages;

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    if (onSendMessage) {
      onSendMessage(newMessage.trim());
    }

    setNewMessage('');
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isCurrentUser = (senderId: string) => {
    return senderId === user?.id || senderId === 'current-user';
  };

  return (
    <div className={`flex flex-col h-full max-h-[600px] ${className}`}>
      <Card className="glass-card border-0 shadow-2xl flex-1 flex flex-col">
        {/* Chat Header */}
        <CardHeader className="pb-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-10 w-10 border-2 border-white/20">
                  <AvatarImage src={recipientAvatar} alt={recipientName} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                    {recipientName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              
              <div>
                <CardTitle className="text-white text-lg font-semibold">{recipientName}</CardTitle>
                <p className="text-white/60 text-sm">
                  {isOnline ? 'Online now' : 'Last seen recently'}
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button size="sm" variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                <Phone className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                <Video className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                <Info className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Messages Area */}
        <CardContent className="flex-1 p-4 overflow-y-auto space-y-4">
          {allMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${isCurrentUser(message.senderId) ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end space-x-2 max-w-[70%] ${isCurrentUser(message.senderId) ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {!isCurrentUser(message.senderId) && (
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                    <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs">
                      {message.senderName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`px-4 py-3 rounded-2xl shadow-lg ${
                    isCurrentUser(message.senderId)
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                      : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    isCurrentUser(message.senderId) ? 'text-blue-100' : 'text-white/60'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={recipientAvatar} alt={recipientName} />
                  <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs">
                    {recipientName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </CardContent>

        {/* Message Input */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center space-x-3">
            <Button size="sm" variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
              <Paperclip className="h-4 w-4" />
            </Button>

            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pr-12 bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 rounded-full"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
              >
                <Smile className="h-4 w-4" />
              </Button>
            </div>

            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="btn-primary rounded-full p-3"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatBox;
