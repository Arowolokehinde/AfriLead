"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Video, CheckCircle, Star } from "lucide-react";
import Link from "next/link";

export default function SessionPage({ params }: { params: { id: string } }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [sessionCompleted, setSessionCompleted] = useState(false);

  // Mock session data
  const session = {
    id: params.id,
    mentor: {
      id: "mentor1",
      name: "Aisha Mohammed",
      photoUrl: "",
    },
    mentee: {
      id: "mentee1",
      name: "Chioma Nwosu",
      photoUrl: "",
    },
    scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
    duration: 30,
    status: "scheduled" as const,
    topic: "Transitioning to Product Management",
    notes: "Discuss: PM roles, required skills, career path, and next steps",
  };

  const handleCompleteSession = () => {
    console.log("Session completed with rating:", rating, "feedback:", feedback);
    setSessionCompleted(true);
  };

  const formatDateTime = (date: Date) => {
    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
      }),
    };
  };

  const { date, time } = formatDateTime(session.scheduledAt);

  if (sessionCompleted) {
    return (
      <div className="min-h-screen px-4 py-24 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Session Completed!</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Thank you for your feedback. Keep up the great work!
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/dashboard/mentee">Back to Dashboard</Link>
            </Button>
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/discover">Find More Mentors</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">Mentorship Session</h1>
          <Badge className="bg-green-600">{session.status}</Badge>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Session Info */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Session Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <span>{date}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span>{time} ({session.duration} minutes)</span>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-2">Topic</h3>
                  <p className="text-gray-700 dark:text-gray-300">{session.topic}</p>
                </div>

                {session.notes && (
                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-2">Session Notes</h3>
                    <p className="text-gray-600 dark:text-gray-400">{session.notes}</p>
                  </div>
                )}

                <div className="pt-4">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                    <Video className="h-5 w-5 mr-2" />
                    Join Google Meet
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Meeting link will be activated 10 minutes before session
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Complete Session Form */}
            <Card>
              <CardHeader>
                <CardTitle>Complete Session</CardTitle>
                <CardDescription>
                  After your session, mark it as complete and share your feedback
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Rate this session
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="feedback" className="block text-sm font-semibold mb-2">
                    Session Feedback (Optional)
                  </label>
                  <Textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share what you learned or how the session helped you..."
                    rows={4}
                  />
                </div>

                <Button
                  onClick={handleCompleteSession}
                  disabled={rating === 0}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Mark as Complete
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mentor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-3 ring-2 ring-primary/10">
                    <AvatarImage src={session.mentor.photoUrl} />
                    <AvatarFallback className="bg-primary text-white text-xl font-semibold">
                      {session.mentor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold mb-2">{session.mentor.name}</h3>
                  <Button asChild variant="outline" className="w-full" size="sm">
                    <Link href={`/profile/${session.mentor.id}`}>View Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/messages?mentorId=${session.mentor.id}`}>
                    Send Message
                  </Link>
                </Button>
                <Button variant="outline" className="w-full">
                  Reschedule Session
                </Button>
                <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                  Cancel Session
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
