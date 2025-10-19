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
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-orange-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Path</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Are you looking to guide others or seeking guidance?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card
            className={`cursor-pointer border-2 hover:border-orange-500 hover:shadow-lg transition-all ${
              preselectedType === "mentee" ? "border-orange-500 shadow-lg" : ""
            }`}
            onClick={() => handleRoleSelection("mentee")}
          >
            <CardContent className="pt-8 pb-8 text-center">
              <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="h-10 w-10 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">I'm a Mentee</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Looking for career guidance, learning support, and professional growth opportunities.
              </p>
              <Button
                className="w-full bg-orange-600 hover:bg-orange-700"
                size="lg"
              >
                Find a Mentor
              </Button>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer border-2 hover:border-green-500 hover:shadow-lg transition-all ${
              preselectedType === "mentor" ? "border-green-500 shadow-lg" : ""
            }`}
            onClick={() => handleRoleSelection("mentor")}
          >
            <CardContent className="pt-8 pb-8 text-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">I'm a Mentor</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Ready to share my experience and help guide the next generation of African leaders.
              </p>
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
              >
                Become a Mentor
              </Button>
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
          You can always switch roles later in your account settings
        </p>
      </div>
    </div>
  );
}
