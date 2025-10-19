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
    <div className="min-h-screen px-4 py-20 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Mentee Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Track your learning journey and connect with mentors
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-lg border border-border hover:shadow-xl transition-all duration-300">
            <CardContent className="pt-5 pb-5">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground font-medium">Mentors</p>
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                </div>
                <p className="text-2xl md:text-3xl font-bold">{mockConnections.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-border hover:shadow-xl transition-all duration-300">
            <CardContent className="pt-5 pb-5">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground font-medium">Sessions</p>
                  <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                </div>
                <p className="text-2xl md:text-3xl font-bold">3</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-border hover:shadow-xl transition-all duration-300">
            <CardContent className="pt-5 pb-5">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground font-medium">Goals</p>
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                </div>
                <p className="text-2xl md:text-3xl font-bold">2</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-border hover:shadow-xl transition-all duration-300">
            <CardContent className="pt-5 pb-5">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground font-medium">Streak</p>
                  <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                </div>
                <p className="text-2xl md:text-3xl font-bold">12</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="mentors" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="mentors" className="text-xs md:text-sm">
              My Mentors ({mockConnections.length})
            </TabsTrigger>
            <TabsTrigger value="sessions" className="text-xs md:text-sm">
              Sessions
            </TabsTrigger>
            <TabsTrigger value="progress" className="text-xs md:text-sm">
              Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mentors" className="space-y-4">
            <div className="flex justify-end mb-4">
              <Button asChild className="bg-primary hover:bg-primary/90 transition-all duration-300">
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
                    <Card key={connection.id} className="shadow-lg border border-border hover:shadow-xl transition-all duration-300">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4 mb-4">
                          <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                            <AvatarImage src={connection.mentor.photoUrl} />
                            <AvatarFallback className="bg-primary text-white font-semibold">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold text-base">{connection.mentor.name}</h3>
                            <p className="text-xs md:text-sm text-muted-foreground">
                              {connection.mentor.country}
                            </p>
                            <p className="text-xs text-muted-foreground/70 mt-1">
                              {connection.sessionsCompleted} sessions completed
                            </p>
                          </div>
                        </div>

                        {connection.nextSession && (
                          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                            <p className="text-xs md:text-sm font-semibold text-blue-900 dark:text-blue-300">
                              Next session: {connection.nextSession.toLocaleDateString()}
                            </p>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1 hover:bg-muted transition-all duration-300 text-xs md:text-sm" asChild>
                            <Link href={`/profile/${connection.mentor.id}`}>
                              View Profile
                            </Link>
                          </Button>
                          <Button className="flex-1 bg-primary hover:bg-primary/90 transition-all duration-300 text-xs md:text-sm" asChild>
                            <Link href={`/messages?mentorId=${connection.mentor.id}`}>
                              <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
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
              <Card className="shadow-lg border border-border">
                <CardContent className="pt-6 text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    You haven't connected with any mentors yet
                  </p>
                  <Button asChild className="bg-primary hover:bg-primary/90 transition-all duration-300">
                    <Link href="/discover">Browse Mentors</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="sessions">
            <Card className="shadow-lg border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Upcoming & Past Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 border border-border rounded-xl hover:border-primary hover:shadow-lg transition-all duration-300 bg-card">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-base">Session with Aisha Mohammed</p>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          Tomorrow at 3:00 PM
                        </p>
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-xs md:text-sm" asChild>
                        <Link href="/session/upcoming-id">View Details</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <Card className="shadow-lg border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Your Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Profile Completion</span>
                      <span className="text-sm text-muted-foreground font-semibold">80%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                      <div className="bg-primary h-2.5 rounded-full transition-all duration-500" style={{ width: "80%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Goal Progress</span>
                      <span className="text-sm text-muted-foreground font-semibold">40%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                      <div className="bg-accent h-2.5 rounded-full transition-all duration-500" style={{ width: "40%" }} />
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
