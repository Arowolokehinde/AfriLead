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
    <Card className="shadow-lg border border-border hover:shadow-xl hover:border-primary transition-all duration-300 h-full flex flex-col">
      <CardContent className="pt-6 flex-1">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-14 w-14 ring-2 ring-primary/10">
            <AvatarImage src={mentor.photoUrl} alt={mentor.name} />
            <AvatarFallback className="bg-primary text-white font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-base truncate">{mentor.name}</h3>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="truncate">{mentor.country}</span>
                </div>
              </div>
              {matchScore && (
                <Badge variant="secondary" className="bg-accent/10 text-accent border border-accent/20 text-xs font-semibold whitespace-nowrap">
                  {matchScore}% Match
                </Badge>
              )}
            </div>

            {mentor.rating && (
              <div className="flex items-center gap-1 mt-2">
                <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                <span className="text-xs font-semibold">{mentor.rating.toFixed(1)}</span>
                <span className="text-xs text-muted-foreground">
                  ({mentor.sessionsCompleted})
                </span>
              </div>
            )}
          </div>
        </div>

        {mentor.experience && (
          <div className="flex items-start gap-2 mb-3 bg-muted/30 p-2.5 rounded-lg">
            <Briefcase className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-primary" />
            <p className="text-xs text-foreground line-clamp-2 leading-relaxed">{mentor.experience}</p>
          </div>
        )}

        {mentor.bio && (
          <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
            {mentor.bio}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5">
          {mentor.skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs border-primary/20 hover:bg-primary/5 transition-colors">
              {skill}
            </Badge>
          ))}
          {mentor.skills.length > 4 && (
            <Badge variant="outline" className="text-xs border-muted-foreground/20">
              +{mentor.skills.length - 4}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-4 pb-5">
        <Button asChild variant="outline" className="flex-1 text-xs hover:bg-muted transition-all">
          <Link href={`/profile/${mentor.id}`}>View Profile</Link>
        </Button>
        <Button asChild className="flex-1 text-xs bg-primary hover:bg-primary/90 transition-all">
          <Link href={`/messages?mentorId=${mentor.id}`}>Request</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
