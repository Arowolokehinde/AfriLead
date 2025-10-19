"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap } from "lucide-react";

export default function RoleSelectionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedType = searchParams.get("type");

  const handleRoleSelection = (role: "mentor" | "mentee") => {
    router.push(`/onboarding/${role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="max-w-4xl w-full relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">Choose Your Path</h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Are you looking to guide others or seeking guidance?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className={`cursor-pointer border-2 hover:border-primary hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group ${
              preselectedType === "mentee" ? "border-primary shadow-xl scale-[1.02]" : "border-border"
            }`}
            onClick={() => handleRoleSelection("mentee")}
          >
            <CardContent className="pt-8 pb-8 text-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-3">I'm a Mentee</h2>
              <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">
                Looking for career guidance, learning support, and professional growth opportunities.
              </p>
              <Button
                className="w-full bg-primary hover:bg-primary/90 transition-all duration-300"
                size="lg"
              >
                Find a Mentor
              </Button>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer border-2 hover:border-accent hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group ${
              preselectedType === "mentor" ? "border-accent shadow-xl scale-[1.02]" : "border-border"
            }`}
            onClick={() => handleRoleSelection("mentor")}
          >
            <CardContent className="pt-8 pb-8 text-center">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-3">I'm a Mentor</h2>
              <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">
                Ready to share my experience and help guide the next generation of African leaders.
              </p>
              <Button
                className="w-full bg-accent hover:bg-accent/90 transition-all duration-300"
                size="lg"
              >
                Become a Mentor
              </Button>
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-xs md:text-sm text-muted-foreground mt-6">
          You can always switch roles later in your account settings
        </p>
      </div>
    </div>
  );
}
