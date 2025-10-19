"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FormField } from "@/components/ui/form-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Loader2, CheckCircle2, X } from "lucide-react";
import { africanCountries } from "@/lib/data/countries";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  country: z.string().min(1, "Please select a country"),
  bio: z.string().optional(),
  experience: z.string().optional(),
  availability: z.string().optional(),
  skills: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
  goals: z.array(z.string()).optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [interestInput, setInterestInput] = useState("");
  const [goalInput, setGoalInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

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
      const response = await fetch(`/api/users/${session?.user?.id}`);
      if (!response.ok) throw new Error("Failed to fetch profile");

      const data = await response.json();

      // Set form values
      setValue("name", data.name);
      setValue("country", data.country);
      setValue("bio", data.profile?.bio || "");
      setValue("experience", data.profile?.experience || "");
      setValue("availability", data.profile?.availability || "");

      // Set badge arrays
      setSkills(data.profile?.skills || []);
      setInterests(data.profile?.interests || []);
      setGoals(data.profile?.goals || []);
    } catch (err: any) {
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      const profileData = {
        ...data,
        skills,
        interests,
        goals,
      };

      const response = await fetch(`/api/users/${session?.user?.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to update profile");
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const addInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput("");
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  const addGoal = () => {
    if (goalInput.trim() && !goals.includes(goalInput.trim())) {
      setGoals([...goals, goalInput.trim()]);
      setGoalInput("");
    }
  };

  const removeGoal = (goal: string) => {
    setGoals(goals.filter((g) => g !== goal));
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your profile and preferences</p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
            <p className="text-sm text-green-600">Profile updated successfully!</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                label="Full Name"
                error={errors.name?.message}
                required
                htmlFor="name"
              >
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter your full name"
                  disabled={saving}
                />
              </FormField>

              <FormField
                label="Country"
                error={errors.country?.message}
                required
                htmlFor="country"
              >
                <Select
                  onValueChange={(value) => setValue("country", value)}
                  defaultValue={watch("country")}
                  disabled={saving}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {africanCountries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
              <CardDescription>Tell others about yourself</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                label="Bio"
                error={errors.bio?.message}
                htmlFor="bio"
              >
                <Textarea
                  id="bio"
                  {...register("bio")}
                  placeholder="Write a brief bio about yourself..."
                  rows={4}
                  disabled={saving}
                />
              </FormField>

              {(session?.user?.role === "mentor" || session?.user?.role === "both") && (
                <>
                  <FormField
                    label="Experience"
                    error={errors.experience?.message}
                    htmlFor="experience"
                  >
                    <Textarea
                      id="experience"
                      {...register("experience")}
                      placeholder="Describe your professional experience..."
                      rows={3}
                      disabled={saving}
                    />
                  </FormField>

                  <FormField
                    label="Availability"
                    error={errors.availability?.message}
                    htmlFor="availability"
                  >
                    <Input
                      id="availability"
                      {...register("availability")}
                      placeholder="e.g., Weekends, 2-3 hours per week"
                      disabled={saving}
                    />
                  </FormField>
                </>
              )}
            </CardContent>
          </Card>

          {/* Skills/Interests/Goals */}
          <Card>
            <CardHeader>
              <CardTitle>
                {session?.user?.role === "mentor" ? "Skills & Expertise" : "Interests & Goals"}
              </CardTitle>
              <CardDescription>
                {session?.user?.role === "mentor"
                  ? "Add skills you can mentor others in"
                  : "Add your interests and learning goals"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {(session?.user?.role === "mentor" || session?.user?.role === "both") && (
                <div>
                  <FormField label="Skills" htmlFor="skills">
                    <div className="flex gap-2">
                      <Input
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addSkill();
                          }
                        }}
                        placeholder="Add a skill..."
                        disabled={saving}
                      />
                      <Button type="button" onClick={addSkill} disabled={saving}>
                        Add
                      </Button>
                    </div>
                  </FormField>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-sm">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {(session?.user?.role === "mentee" || session?.user?.role === "both") && (
                <>
                  <div>
                    <FormField label="Interests" htmlFor="interests">
                      <div className="flex gap-2">
                        <Input
                          value={interestInput}
                          onChange={(e) => setInterestInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addInterest();
                            }
                          }}
                          placeholder="Add an interest..."
                          disabled={saving}
                        />
                        <Button type="button" onClick={addInterest} disabled={saving}>
                          Add
                        </Button>
                      </div>
                    </FormField>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {interests.map((interest) => (
                        <Badge key={interest} variant="secondary" className="text-sm">
                          {interest}
                          <button
                            type="button"
                            onClick={() => removeInterest(interest)}
                            className="ml-2 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <FormField label="Goals" htmlFor="goals">
                      <div className="flex gap-2">
                        <Input
                          value={goalInput}
                          onChange={(e) => setGoalInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addGoal();
                            }
                          }}
                          placeholder="Add a goal..."
                          disabled={saving}
                        />
                        <Button type="button" onClick={addGoal} disabled={saving}>
                          Add
                        </Button>
                      </div>
                    </FormField>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {goals.map((goal) => (
                        <Badge key={goal} variant="secondary" className="text-sm">
                          {goal}
                          <button
                            type="button"
                            onClick={() => removeGoal(goal)}
                            className="ml-2 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/profile")}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="bg-primary">
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
