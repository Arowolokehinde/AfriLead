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
    <div className="min-h-screen px-4 py-24 bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Mentor Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your mentorship connections and track your impact
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending Requests</p>
                  <p className="text-3xl font-bold">{requests.length}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Mentees</p>
                  <p className="text-3xl font-bold">{mockActiveMentees.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Sessions Completed</p>
                  <p className="text-3xl font-bold">45</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Average Rating</p>
                  <p className="text-3xl font-bold">4.9</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList>
            <TabsTrigger value="requests">
              Pending Requests ({requests.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              Active Mentees ({mockActiveMentees.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
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
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">No pending requests</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    New mentorship requests will appear here
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Mentorship Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockActiveMentees.map((mentee) => (
                    <div key={mentee.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{mentee.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {mentee.sessionsCompleted} sessions completed
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-sm text-blue-600 hover:underline">
                          View Profile
                        </button>
                        <button className="text-sm text-green-600 hover:underline">
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
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No completed mentorships yet</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
