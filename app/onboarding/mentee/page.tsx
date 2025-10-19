"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FormField } from "@/components/ui/form-field";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { menteeProfileSchema, MenteeProfileFormData } from "@/lib/validations/mentee";
import { menteeGoals, menteeInterests } from "@/lib/data/skills";
import { AlertCircle, Loader2, X, CheckCircle } from "lucide-react";

export default function MenteeOnboardingPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MenteeProfileFormData>({
    resolver: zodResolver(menteeProfileSchema),
  });

  const toggleInterest = (interest: string) => {
    const newInterests = selectedInterests.includes(interest)
      ? selectedInterests.filter((i) => i !== interest)
      : [...selectedInterests, interest];
    setSelectedInterests(newInterests);
    setValue("interests", newInterests);
  };

  const toggleGoal = (goal: string) => {
    const newGoals = selectedGoals.includes(goal)
      ? selectedGoals.filter((g) => g !== goal)
      : [...selectedGoals, goal];
    setSelectedGoals(newGoals);
    setValue("goals", newGoals);
  };

  const onSubmit = async (data: MenteeProfileFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/mentees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Failed to create profile");
        return;
      }

      setSuccess(true);

      // Redirect to discover page after a short delay
      setTimeout(() => {
        router.push("/discover");
        router.refresh();
      }, 1500);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <PageContainer className="flex items-center justify-center">
        <Card className="max-w-md w-full shadow-xl">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Profile Created!</h2>
            <p className="text-muted-foreground mb-6">
              Your mentee profile has been successfully created. Redirecting you to find mentors...
            </p>
            <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto" />
          </CardContent>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="2xl">
      <PageHeader
        title="Create Your Mentee Profile"
        description="Tell us about yourself so we can match you with the perfect mentor"
      />

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Your Information</CardTitle>
          <CardDescription>
            This helps mentors understand your background and goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg mb-6">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Bio Section */}
            <FormField
              label="About You"
              error={errors.bio?.message}
              htmlFor="bio"
            >
              <Textarea
                id="bio"
                {...register("bio")}
                placeholder="Tell us a bit about yourself, your background, and what you're passionate about..."
                className="min-h-[120px]"
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Optional - This helps mentors get to know you better
              </p>
            </FormField>

            {/* Career Stage */}
            <FormField
              label="Career Stage"
              error={errors.careerStage?.message}
              required
              htmlFor="careerStage"
            >
              <Select
                onValueChange={(value) => setValue("careerStage", value as any)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your current stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="early-career">Early Career (0-3 years)</SelectItem>
                  <SelectItem value="career-change">Career Change</SelectItem>
                  <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            {/* Education */}
            <FormField
              label="Education"
              error={errors.education?.message}
              htmlFor="education"
            >
              <Input
                id="education"
                {...register("education")}
                placeholder="e.g., BSc Computer Science, University of Lagos"
                disabled={isLoading}
              />
            </FormField>

            {/* Current Role */}
            <FormField
              label="Current Role"
              error={errors.currentRole?.message}
              htmlFor="currentRole"
            >
              <Input
                id="currentRole"
                {...register("currentRole")}
                placeholder="e.g., Junior Software Developer, Unemployed, Student"
                disabled={isLoading}
              />
            </FormField>

            {/* Interests */}
            <div className="space-y-3">
              <div>
                <label className="text-sm font-semibold">
                  Areas of Interest <span className="text-destructive">*</span>
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  Select at least 1 area (max 15)
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {menteeInterests.map((interest) => (
                  <Badge
                    key={interest}
                    variant={selectedInterests.includes(interest) ? "default" : "outline"}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                    {selectedInterests.includes(interest) && (
                      <X className="ml-1 h-3 w-3" />
                    )}
                  </Badge>
                ))}
              </div>
              {errors.interests && (
                <p className="text-xs text-destructive">{errors.interests.message}</p>
              )}
              {selectedInterests.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  {selectedInterests.length} selected
                </p>
              )}
            </div>

            {/* Goals */}
            <div className="space-y-3">
              <div>
                <label className="text-sm font-semibold">
                  Your Goals <span className="text-destructive">*</span>
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  What do you hope to achieve? (Select at least 1, max 10)
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {menteeGoals.map((goal) => (
                  <Badge
                    key={goal}
                    variant={selectedGoals.includes(goal) ? "default" : "outline"}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => toggleGoal(goal)}
                  >
                    {goal}
                    {selectedGoals.includes(goal) && (
                      <X className="ml-1 h-3 w-3" />
                    )}
                  </Badge>
                ))}
              </div>
              {errors.goals && (
                <p className="text-xs text-destructive">{errors.goals.message}</p>
              )}
              {selectedGoals.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  {selectedGoals.length} selected
                </p>
              )}
            </div>

            {/* LinkedIn */}
            <FormField
              label="LinkedIn Profile"
              error={errors.linkedinUrl?.message}
              htmlFor="linkedinUrl"
            >
              <Input
                id="linkedinUrl"
                {...register("linkedinUrl")}
                placeholder="https://linkedin.com/in/yourprofile"
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Optional - helps mentors learn more about your professional background
              </p>
            </FormField>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isLoading}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={isLoading || selectedInterests.length === 0 || selectedGoals.length === 0}
                className="flex-1 bg-primary hover:bg-primary/90"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating Profile...
                  </>
                ) : (
                  "Complete Profile & Find Mentors"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
