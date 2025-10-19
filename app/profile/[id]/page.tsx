"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Briefcase,
  Star,
  Calendar,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage({ params }: { params: { id: string } }) {
  // Mock profile data - replace with actual API call
  const profile = {
    id: params.id,
    name: "Aisha Mohammed",
    role: "mentor" as const,
    email: "aisha@example.com",
    country: "Nigeria",
    photoUrl: "",
    skills: ["Tech", "Business", "Entrepreneurship", "Product Management"],
    experience: "Senior Product Manager at Microsoft with 10+ years in tech industry",
    bio: "Passionate about helping young Africans break into tech and build successful careers. I've mentored over 50 mentees and love seeing them achieve their goals. My approach is hands-on and practical, focusing on real-world skills and career strategies.",
    availability: "Weekends, 2-3 hours per week",
    sessionsCompleted: 45,
    rating: 4.9,
    createdAt: new Date("2024-01-15"),
    testimonials: [
      {
        id: "1",
        mentee: "Grace Mwangi",
        rating: 5,
        comment:
          "Aisha helped me transition from engineering to product management. Her guidance was invaluable!",
        date: new Date("2024-09-15"),
      },
      {
        id: "2",
        mentee: "David Okonkwo",
        rating: 5,
        comment:
          "Amazing mentor! Very responsive and provided practical advice that I could implement immediately.",
        date: new Date("2024-08-20"),
      },
    ],
  };

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const memberSince = profile.createdAt.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen px-4 py-24 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/discover">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Discovery
          </Link>
        </Button>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Profile Section */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-6 mb-6">
                  <Avatar className="h-24 w-24 ring-2 ring-primary/10">
                    <AvatarImage src={profile.photoUrl} alt={profile.name} />
                    <AvatarFallback className="bg-primary text-white text-2xl font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h1 className="text-3xl font-bold">{profile.name}</h1>
                        <Badge className="mt-2 capitalize">{profile.role}</Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mt-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{profile.country}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">Member since {memberSince}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 font-semibold">{profile.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        ({profile.sessionsCompleted} sessions completed)
                      </span>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  {profile.experience && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="h-5 w-5 text-gray-500" />
                        <h3 className="font-semibold">Experience</h3>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 ml-7">
                        {profile.experience}
                      </p>
                    </div>
                  )}

                  {profile.bio && (
                    <div>
                      <h3 className="font-semibold mb-2">About</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {profile.bio}
                      </p>
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold mb-3">Skills & Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {profile.availability && (
                    <div>
                      <h3 className="font-semibold mb-2">Availability</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {profile.availability}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Testimonials */}
            {profile.testimonials.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Testimonials</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="border-l-4 border-orange-500 pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold">
                          {testimonial.mentee}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                        "{testimonial.comment}"
                      </p>
                      <p className="text-xs text-gray-500">
                        {testimonial.date.toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6 space-y-3">
                <Button asChild className="w-full bg-orange-600 hover:bg-orange-700" size="lg">
                  <Link href={`/messages?mentorId=${profile.id}`}>
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Request Mentorship
                  </Link>
                </Button>
                <p className="text-xs text-center text-gray-500">
                  Send a message to connect with this mentor
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Total Sessions
                  </span>
                  <span className="font-semibold">{profile.sessionsCompleted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Average Rating
                  </span>
                  <span className="font-semibold">{profile.rating} / 5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Response Rate
                  </span>
                  <span className="font-semibold">95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Response Time
                  </span>
                  <span className="font-semibold">~2 hours</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Similar Mentors</CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/discover">Browse More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
