import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockTeacherConversations, mockTeacherMessages, TeacherConversation, Message } from '@/data/mockData';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowLeft, Send, MessageCircle, Search, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TeacherMessages() {
  const [selectedConversation, setSelectedConversation] = useState<TeacherConversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockTeacherMessages);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = mockTeacherConversations.filter(conv =>
    conv.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.studentClass.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const conversationMessages = selectedConversation
    ? messages.filter(m => m.conversationId === selectedConversation.id)
    : [];

  const totalUnread = mockTeacherConversations.reduce((acc, conv) => acc + conv.unreadCount, 0);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: `tmsg${Date.now()}`,
      conversationId: selectedConversation.id,
      senderId: '2',
      senderName: 'Mme Martin',
      senderRole: 'teacher',
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: true,
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (selectedConversation) {
    return (
      <Card className="shadow-soft h-[calc(100vh-220px)] flex flex-col">
        {/* Header */}
        <CardHeader className="pb-3 border-b flex-shrink-0">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedConversation(null)}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Avatar className="h-10 w-10">
              <AvatarImage src={selectedConversation.avatar} />
              <AvatarFallback>{selectedConversation.studentName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{selectedConversation.studentName}</h3>
              <p className="text-xs text-muted-foreground">{selectedConversation.studentClass}</p>
            </div>
          </div>
        </CardHeader>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {conversationMessages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.senderRole === 'teacher' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2",
                    message.senderRole === 'teacher'
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted rounded-bl-sm"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={cn(
                    "text-[10px] mt-1",
                    message.senderRole === 'teacher' ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>
                    {format(parseISO(message.timestamp), 'HH:mm', { locale: fr })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-3 border-t flex-shrink-0">
          <div className="flex gap-2">
            <Input
              placeholder="Écrire un message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{mockTeacherConversations.length}</div>
            <p className="text-xs text-muted-foreground">Conversations</p>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">{totalUnread}</div>
            <p className="text-xs text-muted-foreground">Non lus</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher un élève..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Conversations list */}
      <Card className="shadow-soft">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-primary" />
            Messages des élèves
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className="w-full p-4 flex items-start gap-3 hover:bg-muted/50 transition-colors text-left"
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={conversation.avatar} />
                    <AvatarFallback>{conversation.studentName[0]}</AvatarFallback>
                  </Avatar>
                  {conversation.unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-medium">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-semibold text-sm truncate">{conversation.studentName}</h4>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                      {format(parseISO(conversation.lastMessageTime), 'd MMM', { locale: fr })}
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 mb-1">
                    {conversation.studentClass}
                  </Badge>
                  <p className={cn(
                    "text-xs truncate",
                    conversation.unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground"
                  )}>
                    {conversation.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
