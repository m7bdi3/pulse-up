import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Users, Calendar, TimerIcon } from "lucide-react";
import useSWR, { mutate } from "swr";
import { toast } from "sonner";
import { JoinChallenge } from "@/actions/CommunityActions";
import { differenceInDays } from "date-fns";
import { useSession } from "next-auth/react";

interface Challenge {
  id: string;
  name: string;
  description: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
  startDate: Date;
  expiryDate: Date;
  _count: {
    participants: number;
  };
  participants: {
    userId: string;
    user: {
      name: string;
      image: string;
    };
  }[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ChallengeCard: React.FC<{
  challenge: Challenge;
  onJoin: (id: string) => Promise<void>;
}> = ({ challenge, onJoin }) => {
  const [loading, setLoading] = useState(false);

  const daysLeftToStart = differenceInDays(
    new Date(challenge.startDate),
    new Date()
  );

  const handleJoin = async () => {
    setLoading(true);
    await onJoin(challenge.id);
    setLoading(false);
  };
  const session = useSession();

  const userInChallenge = !!challenge.participants.find(
    (c) => c.userId === session.data?.user.id
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">
            {challenge.name}
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            <Users className="w-3 h-3 mr-1" />
            {challenge._count.participants} participants
          </Badge>
        </div>
        <CardDescription>{challenge.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>
              <TimerIcon className="w-4 h-4 inline mr-1" />
              {daysLeftToStart > 0
                ? `${daysLeftToStart} days left to start`
                : "Ended"}
            </span>
            <span>
              <Calendar className="w-4 h-4 inline mr-1" />
              {challenge.duration} days
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {challenge.participants.slice(0, 3).map((participant) => (
                <Avatar
                  key={participant.userId}
                  className="border-2 border-background"
                >
                  <AvatarImage
                    src={participant.user.image}
                    alt={participant.user.name}
                  />
                  <AvatarFallback>{participant.user.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            {challenge._count.participants > 3 && (
              <span className="text-sm text-muted-foreground">
                +{challenge._count.participants - 3} more
              </span>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleJoin}
          disabled={loading || daysLeftToStart <= 0}
        >
          {loading && userInChallenge
            ? "Leaving..."
            : loading && !userInChallenge
            ? "Joining..."
            : daysLeftToStart <= 0
            ? "Challenge Ended"
            : userInChallenge
            ? "Leave Challenge"
            : "Join Challenge"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export const ChallengesComponent: React.FC = () => {
  const {
    data: challenges,
    isLoading,
    error,
  } = useSWR<Challenge[]>("/api/challenges", fetcher);

  const onJoin = async (challengeId: string) => {
    try {
      const res = await JoinChallenge(challengeId);
      await mutate("/api/challenges");
      if (res.error) {
        toast.error(`Error: ${res.error}`);
      } else {
        toast.success("Joined challenge successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred while joining the challenge.");
    }
  };

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <p className="text-center text-red-500">
            Failed to load challenges. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <Trophy className="mr-2" /> Active Challenges
        </CardTitle>
        <CardDescription>
          Join a challenge and push your limits!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 ">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Card key={index}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                    <Skeleton className="h-4 w-1/2 mx-auto" />
                    <div className="flex justify-between items-center">
                      <div className="flex -space-x-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <Skeleton key={i} className="h-8 w-8 rounded-full" />
                        ))}
                      </div>
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-9 w-full" />
                  </CardFooter>
                </Card>
              ))
            : challenges?.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onJoin={onJoin}
                />
              ))}
        </div>
      </CardContent>
    </Card>
  );
};
