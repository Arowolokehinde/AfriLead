"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Calendar, Target, TrendingUp, MessageCircle } from "lucide-react";
import Link from "next/link";

// Mock data
const mockConnections = [
  {
    id: "1",
    mentor: {
      id: "mentor1",
      name: "Aisha Mohammed",
      country: "Nigeria",
      skills: ["Tech", "Business"],
      photoUrl: "",
    },
    status: "active",
    sessionsCompleted: 3,
    nextSession: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  },
];

export default function MenteeDashboardPage() {
  return (
    <div className="min-h-screen px-4 py-24 bg-gradient-to-br from-orange-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Mentee Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your learning journey and connect with mentors
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Mentors</p>
                  <p className="text-3xl font-bold">{mockConnections.length}</p>
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
                  <p className="text-sm text-gray-600 dark:text-gray-400">Sessions Completed</p>
                  <p className="text-3xl font-bold">3</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Goals Achieved</p>
                  <p className="text-3xl font-bold">2</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Learning Streak</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="mentors" className="space-y-6">
          <TabsList>
            <TabsTrigger value="mentors">
              My Mentors ({mockConnections.length})
            </TabsTrigger>
            <TabsTrigger value="sessions">
              Sessions
            </TabsTrigger>
            <TabsTrigger value="progress">
              Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mentors" className="space-y-4">
            <div className="flex justify-end mb-4">
              <Button asChild className="bg-orange-600 hover:bg-orange-700">
                <Link href="/discover">Find More Mentors</Link>
              </Button>
            </div>

            {mockConnections.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {mockConnections.map((connection) => {
                  const initials = connection.mentor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase();

                  return (
                    <Card key={connection.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4 mb-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={connection.mentor.photoUrl} />
                            <AvatarFallback className="bg-gradient-to-br from-orange-400 to-green-400 text-white">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold">{connection.mentor.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {connection.mentor.country}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                              {connection.sessionsCompleted} sessions completed
                            </p>
                          </div>
                        </div>

                        {connection.nextSession && (
                          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                              Next session: {connection.nextSession.toLocaleDateString()}
                            </p>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1" asChild>
                            <Link href={`/profile/${connection.mentor.id}`}>
                              View Profile
                            </Link>
                          </Button>
                          <Button className="flex-1" asChild>
                            <Link href={`/messages?mentorId=${connection.mentor.id}`}>
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Message
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    You haven't connected with any mentors yet
                  </p>
                  <Button asChild className="bg-orange-600 hover:bg-orange-700">
                    <Link href="/discover">Browse Mentors</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming & Past Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Session with Aisha Mohammed</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Tomorrow at 3:00 PM
                        </p>
                      </div>
                      <Button size="sm" asChild>
                        <Link href="/session/upcoming-id">View Details</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Your Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Profile Completion</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">80%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: "80%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Goal Progress</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">40%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "40%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
