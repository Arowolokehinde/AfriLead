"use client";

import { useState } from "react";
import { MentorRequestCard } from "@/components/dashboard/mentor-request-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, Star, TrendingUp } from "lucide-react";
import { MenteeProfile, Interest } from "@/lib/types";

// Mock data
const mockRequests = [
  {
    id: "1",
    mentee: {
      id: "m1",
      name: "Chioma Nwosu",
      email: "chioma@example.com",
      role: "mentee" as const,
      country: "Nigeria",
      interests: ["Tech", "Business"] as Interest[],
      goals: ["Career Guidance", "Skill Development"],
      sessionsCompleted: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    requestDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
    message: "I'm a junior developer looking to transition into product management. Your experience at Microsoft would be invaluable!",
  },
  {
    id: "2",
    mentee: {
      id: "m2",
      name: "Ahmed Osman",
      email: "ahmed@example.com",
      role: "mentee" as const,
      country: "Egypt",
      interests: ["Tech", "Entrepreneurship"] as Interest[],
      goals: ["Learning", "Networking"],
      sessionsCompleted: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    requestDate: new Date(Date.now() - 5 * 60 * 60 * 1000),
    message: "Building a startup in fintech. Would love your guidance on product strategy!",
  },
];

const mockActiveMentees = [
  {
    id: "m3",
    name: "Grace Mwangi",
    email: "grace@example.com",
    role: "mentee" as const,
    country: "Kenya",
    interests: ["Tech"] as Interest[],
    goals: ["Career Guidance"],
    sessionsCompleted: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function MentorDashboardPage() {
  const [requests, setRequests] = useState(mockRequests);

  const handleAccept = (requestId: string) => {
    console.log("Accepted request:", requestId);
    setRequests(requests.filter(r => r.id !== requestId));
    // TODO: Create connection in database
  };

  const handleReject = (requestId: string) => {
    console.log("Rejected request:", requestId);
    setRequests(requests.filter(r => r.id !== requestId));
  };

  return (
    <div className="min-h-screen px-4 py-20 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Mentor Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage your mentorship connections and track your impact
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-lg border border-border hover:shadow-xl transition-all duration-300">
            <CardContent className="pt-5 pb-5">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground font-medium">Pending</p>
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                </div>
                <p className="text-2xl md:text-3xl font-bold">{requests.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-border hover:shadow-xl transition-all duration-300">
            <CardContent className="pt-5 pb-5">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground font-medium">Active</p>
                  <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                </div>
                <p className="text-2xl md:text-3xl font-bold">{mockActiveMentees.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-border hover:shadow-xl transition-all duration-300">
            <CardContent className="pt-5 pb-5">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground font-medium">Sessions</p>
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                </div>
                <p className="text-2xl md:text-3xl font-bold">45</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-border hover:shadow-xl transition-all duration-300">
            <CardContent className="pt-5 pb-5">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground font-medium">Rating</p>
                  <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                </div>
                <p className="text-2xl md:text-3xl font-bold">4.9</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="requests" className="text-xs md:text-sm">
              Pending Requests ({requests.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="text-xs md:text-sm">
              Active Mentees ({mockActiveMentees.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs md:text-sm">
              Completed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-4">
            {requests.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {requests.map((request) => (
                  <MentorRequestCard
                    key={request.id}
                    mentee={request.mentee}
                    requestDate={request.requestDate}
                    message={request.message}
                    onAccept={() => handleAccept(request.id)}
                    onReject={() => handleReject(request.id)}
                  />
                ))}
              </div>
            ) : (
              <Card className="shadow-lg border border-border">
                <CardContent className="pt-6 text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No pending requests</p>
                  <p className="text-sm text-muted-foreground/70 mt-2">
                    New mentorship requests will appear here
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="active">
            <Card className="shadow-lg border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Active Mentorship Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockActiveMentees.map((mentee) => (
                    <div key={mentee.id} className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-primary hover:shadow-lg transition-all duration-300 bg-card">
                      <div>
                        <p className="font-semibold text-base">{mentee.name}</p>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          {mentee.sessionsCompleted} sessions completed
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-xs md:text-sm text-primary hover:underline transition-colors">
                          View Profile
                        </button>
                        <button className="text-xs md:text-sm text-accent hover:underline transition-colors">
                          Message
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed">
            <Card className="shadow-lg border border-border">
              <CardContent className="pt-6 text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No completed mentorships yet</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
