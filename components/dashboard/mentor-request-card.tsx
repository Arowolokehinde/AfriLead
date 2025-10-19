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
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={mentee.photoUrl} alt={mentee.name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-400 text-white">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h3 className="font-semibold">{mentee.name}</h3>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {mentee.country}
            </div>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-500 mt-1">
              <Clock className="h-3 w-3 mr-1" />
              {timeAgo(requestDate)}
            </div>
          </div>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300 italic">
              "{message}"
            </p>
          </div>
        )}

        <div className="space-y-2">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase">Interests</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {mentee.interests.map((interest) => (
                <Badge key={interest} variant="outline" className="text-xs">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase">Goals</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {mentee.goals.map((goal) => (
                <Badge key={goal} variant="secondary" className="text-xs">
                  {goal}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={onReject}
        >
          Decline
        </Button>
        <Button
          className="flex-1 bg-green-600 hover:bg-green-700"
          onClick={onAccept}
        >
          Accept & Connect
        </Button>
      </CardFooter>
    </Card>
  );
}
