"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { INTERESTS, AFRICAN_COUNTRIES } from "@/lib/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function MentorForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    skills: [] as string[],
    bio: "",
    experience: "",
    availability: "",
  });

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save to database
    console.log("Mentor form data:", formData);
    router.push("/dashboard/mentor");
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-xl border border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl md:text-2xl">Create Your Mentor Profile</CardTitle>
        <CardDescription className="text-sm">
          Share your expertise to help guide the next generation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@example.com"
              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="text-sm font-medium">Country *</Label>
            <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
              <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-primary/20">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                {AFRICAN_COUNTRIES.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Your Skills & Expertise * (Select at least 1)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
              {INTERESTS.map((skill) => (
                <div key={skill} className="flex items-center space-x-2 bg-muted/30 hover:bg-muted/50 px-3 py-2 rounded-lg transition-colors">
                  <Checkbox
                    id={`skill-${skill}`}
                    checked={formData.skills.includes(skill)}
                    onCheckedChange={() => handleSkillToggle(skill)}
                  />
                  <label htmlFor={`skill-${skill}`} className="text-sm cursor-pointer">
                    {skill}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience" className="text-sm font-medium">Professional Experience *</Label>
            <Textarea
              id="experience"
              required
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              placeholder="Briefly describe your professional background and expertise (e.g., 'Software Engineer with 8 years at Google, specialized in mobile development')"
              rows={3}
              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-sm font-medium">About You (Optional)</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Share what motivates you to mentor, your interests, or anything else mentees should know..."
              rows={3}
              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="availability" className="text-sm font-medium">Availability (Optional)</Label>
            <Input
              id="availability"
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              placeholder="e.g., 'Weekends, 2-3 hours per week'"
              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 transition-all duration-300"
            size="lg"
            disabled={formData.skills.length === 0}
          >
            Complete Profile & Start Mentoring
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
