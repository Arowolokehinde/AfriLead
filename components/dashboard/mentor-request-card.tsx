import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Clock } from "lucide-react";
import { MenteeProfile } from "@/lib/types";

interface MentorRequestCardProps {
  mentee: MenteeProfile;
  requestDate: Date;
  message?: string;
  onAccept: () => void;
  onReject: () => void;
}

export function MentorRequestCard({ mentee, requestDate, message, onAccept, onReject }: MentorRequestCardProps) {
  const initials = mentee.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <Card className="shadow-lg border border-border hover:shadow-xl hover:border-primary transition-all duration-300">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-14 w-14 ring-2 ring-primary/10">
            <AvatarImage src={mentee.photoUrl} alt={mentee.name} />
            <AvatarFallback className="bg-primary text-white font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base truncate">{mentee.name}</h3>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="truncate">{mentee.country}</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground/70 mt-1">
              <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
              {timeAgo(requestDate)}
            </div>
          </div>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-muted/30 rounded-lg border border-border/50">
            <p className="text-xs text-foreground/80 italic leading-relaxed">
              "{message}"
            </p>
          </div>
        )}

        <div className="space-y-3">
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Interests</span>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {mentee.interests.map((interest) => (
                <Badge key={interest} variant="outline" className="text-xs border-primary/20 hover:bg-primary/5 transition-colors">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Goals</span>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {mentee.goals.map((goal) => (
                <Badge key={goal} variant="secondary" className="text-xs bg-accent/10 text-accent border border-accent/20">
                  {goal}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-4 pb-5">
        <Button
          variant="outline"
          className="flex-1 text-xs hover:bg-muted transition-all"
          onClick={onReject}
        >
          Decline
        </Button>
        <Button
          className="flex-1 text-xs bg-accent hover:bg-accent/90 transition-all"
          onClick={onAccept}
        >
          Accept & Connect
        </Button>
      </CardFooter>
    </Card>
  );
}
