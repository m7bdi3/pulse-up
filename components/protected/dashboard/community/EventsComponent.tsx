import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, MapPin, Clock, Calendar as CalendarIcon } from "lucide-react";
import useSWR, { mutate } from "swr";
import { format } from "date-fns";
import { toast } from "sonner";
import { JoinEvent } from "@/actions/CommunityActions";
import { useSession } from "next-auth/react";

interface Event {
  id: string;
  name: string;
  description: string;
  date: Date;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    attendees: number;
  };
  attendees: {
    userId: string;
    user: {
      name: string;
      image: string;
    };
  }[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const EventCard: React.FC<{
  event: Event;
  onRSVP: (eventId: string) => Promise<void>;
}> = ({ event, onRSVP }) => {
  const [loading, setLoading] = useState(false);

  const handleRSVP = async () => {
    setLoading(true);
    await onRSVP(event.id);
    setLoading(false);
  };

  const session = useSession();

  const userInEvent = !!event.attendees.find(
    (a) => a.userId === session.data?.user.id
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.name}</CardTitle>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(new Date(event.date), "PPP")}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            {format(new Date(event.date), "p")}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            {event.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="mr-2 h-4 w-4" />
            {event._count.attendees} attendees
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2">Attendees</h4>
          <div className="flex -space-x-2 overflow-hidden">
            {event.attendees.slice(0, 5).map((attendee) => (
              <Avatar
                key={attendee.userId}
                className="inline-block border-2 border-background"
              >
                <AvatarImage
                  src={attendee.user.image}
                  alt={attendee.user.name}
                />
                <AvatarFallback>{attendee.user.name[0]}</AvatarFallback>
              </Avatar>
            ))}
            {event._count.attendees > 5 && (
              <Badge variant="secondary" className="ml-2">
                +{event._count.attendees - 5} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleRSVP} disabled={loading} className="w-full">
          {loading
            ? "Processing..."
            : userInEvent
            ? "Leave Event"
            : "Join Event"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export const EventsComponent: React.FC = () => {
  const {
    data: events,
    isLoading,
    error,
  } = useSWR<Event[]>("/api/events", fetcher);

  const onRSVP = async (eventId: string) => {
    try {
      const res = await JoinEvent(eventId);
      await mutate("/api/events");
      if (res.error) {
        toast.error("Failed to RSVP");
      } else {
        if (res.subscribed) {
          toast.success("Successfully joined the event!");
        } else {
          toast.success("Successfully left the event!");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to RSVP. Please try again.");
    }
  };

  if (error) {
    return (
      <div className="text-center text-red-500">
        Failed to load events. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1  gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-3/4" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-9 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : events && events.length > 0 ? (
            <div className="space-y-4">
              {events.map((event) => (
                <EventCard key={event.id} event={event} onRSVP={onRSVP} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No events found for the selected date.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
