"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";
import { Users, GraduationCap, Loader2 } from "lucide-react";

export default function RoleSelectionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const preselectedType = searchParams.get("type");

  useEffect(() => {
    // If user already has role from signup, redirect accordingly
    if (session?.user?.role) {
      if (session.user.role === "mentor") {
        router.push("/onboarding/mentor");
      } else if (session.user.role === "mentee") {
        router.push("/onboarding/mentee");
      } else if (session.user.role === "both") {
        // Let them choose which profile to complete first
        return;
      }
    }
  }, [session, router]);

  const handleRoleSelection = (role: "mentor" | "mentee") => {
    router.push(`/onboarding/${role}`);
  };

  if (status === "loading") {
    return (
      <PageContainer className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </PageContainer>
    );
  }

  return (
    <PageContainer className="flex items-center justify-center" maxWidth="4xl">
      <div className="w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Choose Your Path</h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Are you looking to guide others or seeking guidance?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card
            className={`cursor-pointer border hover:border-primary hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group ${
              preselectedType === "mentee" ? "border-primary shadow-xl scale-[1.02]" : "border-border"
            }`}
            onClick={() => handleRoleSelection("mentee")}
          >
            <CardContent className="pt-10 pb-10 text-center">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">I'm a Mentee</h2>
              <p className="text-sm md:text-base text-muted-foreground mb-8 leading-relaxed px-4">
                Looking for career guidance, learning support, and professional growth opportunities.
              </p>
              <div className="space-y-3 text-left mb-8 px-4">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">Connect with experienced professionals</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">Get personalized career advice</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">Accelerate your professional growth</p>
                </div>
              </div>
              <Button
                className="w-full bg-primary hover:bg-primary/90 transition-all duration-300"
                size="lg"
              >
                Find a Mentor
              </Button>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer border hover:border-accent hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group ${
              preselectedType === "mentor" ? "border-accent shadow-xl scale-[1.02]" : "border-border"
            }`}
            onClick={() => handleRoleSelection("mentor")}
          >
            <CardContent className="pt-10 pb-10 text-center">
              <div className="w-20 h-20 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">I'm a Mentor</h2>
              <p className="text-sm md:text-base text-muted-foreground mb-8 leading-relaxed px-4">
                Ready to share my experience and help guide the next generation of leaders.
              </p>
              <div className="space-y-3 text-left mb-8 px-4">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">Make a lasting impact on young professionals</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">Share your expertise and experience</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">Give back to your community</p>
                </div>
              </div>
              <Button
                className="w-full bg-accent hover:bg-accent/90 transition-all duration-300"
                size="lg"
              >
                Become a Mentor
              </Button>
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          You can always update your role preferences later in your settings
        </p>
      </div>
    </PageContainer>
  );
}
