import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star, Briefcase } from "lucide-react";
import { MentorProfile } from "@/lib/types";
import Link from "next/link";

interface MentorCardProps {
  mentor: MentorProfile;
  matchScore?: number;
}

export function MentorCard({ mentor, matchScore }: MentorCardProps) {
  const initials = mentor.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={mentor.photoUrl} alt={mentor.name} />
            <AvatarFallback className="bg-gradient-to-br from-orange-400 to-green-400 text-white">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{mentor.name}</h3>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  {mentor.country}
                </div>
              </div>
              {matchScore && (
                <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30">
                  {matchScore}% Match
                </Badge>
              )}
            </div>

            {mentor.rating && (
              <div className="flex items-center gap-1 mt-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{mentor.rating.toFixed(1)}</span>
                <span className="text-sm text-gray-500">
                  ({mentor.sessionsCompleted} sessions)
                </span>
              </div>
            )}
          </div>
        </div>

        {mentor.experience && (
          <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <Briefcase className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p className="line-clamp-2">{mentor.experience}</p>
          </div>
        )}

        {mentor.bio && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {mentor.bio}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {mentor.skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {mentor.skills.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{mentor.skills.length - 4} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button asChild variant="outline" className="flex-1">
          <Link href={`/profile/${mentor.id}`}>View Profile</Link>
        </Button>
        <Button asChild className="flex-1 bg-orange-600 hover:bg-orange-700">
          <Link href={`/messages?mentorId=${mentor.id}`}>Request Mentorship</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
