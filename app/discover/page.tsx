"use client";

import { useState } from "react";
import { MentorCard } from "@/components/discover/mentor-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";
import { MentorProfile, Interest } from "@/lib/types";
import { INTERESTS } from "@/lib/constants";

// Mock data - replace with actual API call
const mockMentors: MentorProfile[] = [
  {
    id: "1",
    name: "Arowolo Kehinde",
    email: "Kenny@gmail.com",
    role: "mentor",
    country: "Nigeria",
    skills: ["Tech", "Business", "Entrepreneurship"] as Interest[],
    experience: "Software Engineer with 1year in tech",
    bio: "Passionate about helping young Africans break into tech. I've mentored 50+ mentees and love seeing more succeed.",
    availability: "Weekends",
    sessionsCompleted: 45,
    rating: 4.9,
    photoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Theophilus Uchechukwu",
    email: "theo@gmail.com",
    role: "mentor",
    country: "Nigeria",
    skills: ["Design", "Software Development", "Entrepreneurship"] as Interest[],
    experience: "Lead Software Engineer at Hito AI",
    bio: "I provide mentorship to young software engineer in order for them to succeed .",
    sessionsCompleted: 32,
    rating: 4.8,
    photoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Aisha Mohammed",
    email: "AishaMohammed@gmail.com",
    role: "mentor",
    country: "Nigeria",
    skills: ["Finance", "Business", "Entrepreneurship"] as Interest[],
    experience: "Investment Banker turned Startup Founder, raised $20k in funding",
    bio: "Guiding entrepreneurs through fundraising, business strategy, and scaling.",
    sessionsCompleted: 28,
    rating: 5.0,
    photoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Emmanuel Paul",
    email: "Emmanuel@gmail.com",
    role: "mentor",
    country: "Nigeria",
    skills: ["Tech", "Blockchain", "Crypto"] as Interest[],
    experience: "Experienced Blockchain developer with over 3+years in blockchain development",
    bio: "Teaching Guiding young talents about building on Blockchain",
    sessionsCompleted: 28,
    rating: 5.0,
    photoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleSkillFilter = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const filteredMentors = mockMentors.filter((mentor) => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSkills = selectedSkills.length === 0 ||
      selectedSkills.some(skill => mentor.skills.includes(skill));

    return matchesSearch && matchesSkills;
  });

  return (
    <div className="min-h-screen px-4 py-20 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Discover Mentors</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Find experienced mentors matched to your interests and goals
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20 border-2 border-border/50 hover:border-primary/20"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 hover:bg-muted transition-all duration-300"
            >
              <Filter className="h-4 w-4" />
              Filters
              {selectedSkills.length > 0 && (
                <Badge variant="secondary" className="ml-1 bg-primary text-primary-foreground">
                  {selectedSkills.length}
                </Badge>
              )}
            </Button>
          </div>

          {showFilters && (
            <div className="p-4 border border-border rounded-xl bg-card shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Filter by Skills</h3>
                {selectedSkills.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedSkills([])}
                    className="text-xs hover:text-primary"
                  >
                    Clear all
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((skill) => (
                  <Badge
                    key={skill}
                    variant={selectedSkills.includes(skill) ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-300 text-xs ${selectedSkills.includes(skill) ? "bg-primary hover:bg-primary/90" : "hover:bg-muted"}`}
                    onClick={() => toggleSkillFilter(skill)}
                  >
                    {skill}
                    {selectedSkills.includes(skill) && (
                      <X className="ml-1 h-3 w-3" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {selectedSkills.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="font-medium">Active filters:</span>
              {selectedSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="cursor-pointer hover:bg-muted transition-colors text-xs"
                  onClick={() => toggleSkillFilter(skill)}
                >
                  {skill}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-xs md:text-sm text-muted-foreground font-medium">
            Showing {filteredMentors.length} mentor{filteredMentors.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} matchScore={85} />
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">
              No mentors found matching your criteria
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedSkills([]);
              }}
              className="hover:bg-muted transition-all duration-300"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
