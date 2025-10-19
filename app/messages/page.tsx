"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Search, Phone, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data
const mockConversations = [
  {
    id: "1",
    name: "Aisha Mohammed",
    role: "mentor",
    photoUrl: "",
    lastMessage: "That sounds like a great plan! Let's discuss it in our next session.",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    unread: 2,
  },
  {
    id: "2",
    name: "Grace Mwangi",
    role: "mentee",
    photoUrl: "",
    lastMessage: "Thank you so much for the advice!",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unread: 0,
  },
];

const mockMessages = [
  {
    id: "1",
    senderId: "other",
    content: "Hi! I'm really interested in transitioning to product management. Could you share your experience?",
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
  },
  {
    id: "2",
    senderId: "me",
    content: "Of course! I'd be happy to help. Product management is a great field with lots of opportunities.",
    timestamp: new Date(Date.now() - 55 * 60 * 1000),
  },
  {
    id: "3",
    senderId: "other",
    content: "What skills do you think are most important for a PM?",
    timestamp: new Date(Date.now() - 50 * 60 * 1000),
  },
  {
    id: "4",
    senderId: "me",
    content: "Great question! The key skills are: strategic thinking, user empathy, data analysis, and communication. Let me share more details...",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
  },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log("Sending message:", messageInput);
      setMessageInput("");
    }
  };

  const filteredConversations = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen px-4 py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">Messages</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Connect with your mentors and mentees
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-16rem)]">
          {/* Conversations List */}
          <Card className="lg:col-span-1 overflow-hidden flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => {
                const initials = conversation.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase();

                return (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                      selectedConversation.id === conversation.id
                        ? "bg-gray-50 dark:bg-gray-800"
                        : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={conversation.photoUrl} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-400 text-white">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold truncate">{conversation.name}</h3>
                          {conversation.unread > 0 && (
                            <Badge className="bg-orange-600">{conversation.unread}</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {conversation.lastMessage}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatTime(conversation.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 overflow-hidden flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedConversation.photoUrl} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-400 text-white">
                    {selectedConversation.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedConversation.name}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                    {selectedConversation.role}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.senderId === "me"
                        ? "bg-orange-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.senderId === "me"
                          ? "text-orange-100"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
