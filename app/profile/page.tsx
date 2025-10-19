"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  Mail,
  Edit,
  Loader2,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: "mentor" | "mentee" | "both";
  country: string;
  photoUrl?: string;
  createdAt: string;
  profile?: {
    bio?: string;
    skills?: string[];
    interests?: string[];
    goals?: string[];
    experience?: string;
    availability?: string;
    sessionsCompleted?: number;
    rating?: number;
  };
}

export default function MyProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    }

    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status, router]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch user data
      const userResponse = await fetch(`/api/users/${session?.user?.id}`);
      if (!userResponse.ok) {
        throw new Error("Failed to fetch profile");
      }

      const userData = await userResponse.json();
      setProfile(userData);
    } catch (err: any) {
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-destructive">{error}</p>
            <Button onClick={fetchProfile} className="w-full mt-4">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const memberSince = new Date(profile.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen px-4 py-24 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <Button asChild>
            <Link href="/settings">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Link>
          </Button>
        </div>

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
                        <h2 className="text-3xl font-bold">{profile.name}</h2>
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

                    <div className="flex items-center gap-1 mt-3">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {profile.email}
                      </span>
                    </div>

                    {profile.profile?.rating && (
                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 font-semibold">{profile.profile.rating}</span>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          ({profile.profile.sessionsCompleted || 0} sessions completed)
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  {profile.profile?.experience && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="h-5 w-5 text-gray-500" />
                        <h3 className="font-semibold">Experience</h3>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 ml-7">
                        {profile.profile.experience}
                      </p>
                    </div>
                  )}

                  {profile.profile?.bio && (
                    <div>
                      <h3 className="font-semibold mb-2">About</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {profile.profile.bio}
                      </p>
                    </div>
                  )}

                  {profile.profile?.skills && profile.profile.skills.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Skills & Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.profile.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-sm">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {profile.profile?.interests && profile.profile.interests.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.profile.interests.map((interest) => (
                          <Badge key={interest} variant="outline" className="text-sm">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {profile.profile?.goals && profile.profile.goals.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Goals</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.profile.goals.map((goal) => (
                          <Badge key={goal} variant="outline" className="text-sm">
                            {goal}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {profile.profile?.availability && (
                    <div>
                      <h3 className="font-semibold mb-2">Availability</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {profile.profile.availability}
                      </p>
                    </div>
                  )}

                  {!profile.profile?.bio && !profile.profile?.experience && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        Your profile is incomplete. Complete your profile to get better matches!
                      </p>
                      <Button asChild>
                        <Link href="/settings">Complete Profile</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href={`/dashboard/${profile.role === "mentor" ? "mentor" : "mentee"}`}>
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Go to Dashboard
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/settings">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {profile.profile?.rating && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Total Sessions
                    </span>
                    <span className="font-semibold">
                      {profile.profile.sessionsCompleted || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Average Rating
                    </span>
                    <span className="font-semibold">
                      {profile.profile.rating || 0} / 5.0
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
