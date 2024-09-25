"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toast } from "sonner";
import { DeleteSubPlan } from "@/actions/subPlansActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserWithData } from "@/hooks/store/user";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DeleteUser } from "@/actions/AdminDashboardStats";

export interface UserColumn {
  id: string;
  name: string | null;
  email: string;
  workoutPlan: string | undefined;
  NutritionPlan: string | undefined;
  SubscriptionPlan: number | undefined;
  user: UserWithData;
}

const handleDelete = async (id: string) => {
  try {
    const res = await DeleteUser(id);
    if (res.error) {
      toast.error(`Error: ${res.error}`);
    } else {
      toast.success("User deleted successfully.");
    }
  } catch (error) {
    console.error("Failed to delete User:", error);
    toast.error("An unexpected error occurred while deleting the user.");
  }
};

const UserDetailsDialog: React.FC<{ user: UserWithData }> = ({ user }) => {
  const completedWorkouts = user.workoutPlan?.sessions.filter(
    (p) => p.completed
  );

  const unCompletedWorkouts = user.workoutPlan?.sessions.filter(
    (p) => p.completed === false
  );

  const completedMeals = user.nutritionPlan?.UserMealPlan.filter(
    (m) => m.isCompleted
  );

  const unCompletedMeals = user.nutritionPlan?.UserMealPlan.filter(
    (m) => m.isCompleted === false
  );

  const handleChangeRole = async () => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4" />
          <span className="sr-only">View user details</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Details: {user.name}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList>
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="workout">Workout Plan</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition Plan</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="challenges">Challenges & Events</TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <dt className="font-medium">Email</dt>
                    <dd>{user.email}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Role</dt>
                    <dd>{user.role}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Subscribed</dt>
                    <dd>{user.isSubscribed ? "Yes" : "No"}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Gender</dt>
                    <dd>{user.gender}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Age</dt>
                    <dd>{user.age || "N/A"}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Height</dt>
                    <dd>{user.height ? `${user.height} cm` : "N/A"}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Weight</dt>
                    <dd>{user.weight ? `${user.weight} kg` : "N/A"}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Goal</dt>
                    <dd>{user.goal || "N/A"}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Activity Level</dt>
                    <dd>{user.activityLevel || "N/A"}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="workout">
            <Card>
              <CardHeader>
                <CardTitle>Workout Plan</CardTitle>
              </CardHeader>
              <CardContent>
                {user.workoutPlan ? (
                  <div>
                    <p>Completed Sessions : {completedWorkouts?.length}</p>
                    <p>Remaining Sessions : {unCompletedWorkouts?.length}</p>
                  </div>
                ) : (
                  <p>No workout plan assigned.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="nutrition">
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Plan</CardTitle>
              </CardHeader>
              <CardContent>
                {user.nutritionPlan ? (
                  <div>
                    <p>Completed Meals : {completedMeals?.length}</p>
                    <p>Remaining Meals : {unCompletedMeals?.length}</p>
                  </div>
                ) : (
                  <p>No nutrition plan assigned.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="subscription">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Details</CardTitle>
              </CardHeader>
              <CardContent>
                {user.Subscription ? (
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <dt className="font-medium">Status</dt>
                      <dd>{user.Subscription.status}</dd>
                    </div>
                    <div>
                      <dt className="font-medium">Price</dt>
                      <dd>
                        $
                        {(user.Subscription.subscriptionPrice / 100).toFixed(2)}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium">Auto Renew</dt>
                      <dd>{user.Subscription.autoRenew ? "Yes" : "No"}</dd>
                    </div>
                    <div>
                      <dt className="font-medium">Current Period End</dt>
                      <dd>
                        {new Date(
                          user.Subscription.stripeCurrentPeriodEnd
                        ).toLocaleDateString()}
                      </dd>
                    </div>
                  </dl>
                ) : user.LifeTimePayment ? (
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <dt className="font-medium">Type</dt>
                      <dd>Lifetime Subscription</dd>
                    </div>
                    <div>
                      <dt className="font-medium">Price Paid</dt>
                      <dd>${(user.LifeTimePayment.price / 100).toFixed(2)}</dd>
                    </div>
                    <div>
                      <dt className="font-medium">Purchase Date</dt>
                      <dd>
                        {new Date(
                          user.LifeTimePayment.createdAt
                        ).toLocaleDateString()}
                      </dd>
                    </div>
                  </dl>
                ) : (
                  <p>No active subscription.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>User Progress</CardTitle>
              </CardHeader>
              <CardContent>
                {user.progress.length > 0 ? (
                  <ScrollArea className="h-[400px]">
                    {user.progress.map((entry) => (
                      <div key={entry.id} className="mb-4 p-4 border rounded">
                        <h3 className="font-semibold">
                          Date: {new Date(entry.date).toLocaleDateString()}
                        </h3>
                        <dl className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                          {entry.weight && (
                            <div>
                              <dt className="font-medium">Weight</dt>
                              <dd>{entry.weight} kg</dd>
                            </div>
                          )}
                          {entry.bodyFat && (
                            <div>
                              <dt className="font-medium">Body Fat</dt>
                              <dd>{entry.bodyFat}%</dd>
                            </div>
                          )}
                          {entry.muscleMass && (
                            <div>
                              <dt className="font-medium">Muscle Mass</dt>
                              <dd>{entry.muscleMass} kg</dd>
                            </div>
                          )}
                          {entry.bmi && (
                            <div>
                              <dt className="font-medium">BMI</dt>
                              <dd>{entry.bmi}</dd>
                            </div>
                          )}
                          {entry.bmr && (
                            <div>
                              <dt className="font-medium">BMR</dt>
                              <dd>{entry.bmr} kcal</dd>
                            </div>
                          )}
                          {entry.chest_weight && (
                            <div>
                              <dt className="font-medium">Chest</dt>
                              <dd>{entry.chest_weight} kg</dd>
                            </div>
                          )}
                          {entry.back_weight && (
                            <div>
                              <dt className="font-medium">Back</dt>
                              <dd>{entry.back_weight} kg</dd>
                            </div>
                          )}
                          {entry.deadlift_weight && (
                            <div>
                              <dt className="font-medium">Deadlift</dt>
                              <dd>{entry.deadlift_weight} kg</dd>
                            </div>
                          )}
                          {entry.squat_weight && (
                            <div>
                              <dt className="font-medium">Squat</dt>
                              <dd>{entry.squat_weight} kg</dd>
                            </div>
                          )}
                          {entry.shoulder_weight && (
                            <div>
                              <dt className="font-medium">Shoulder</dt>
                              <dd>{entry.shoulder_weight} kg</dd>
                            </div>
                          )}
                          {entry.bicep_weight && (
                            <div>
                              <dt className="font-medium">Bicep</dt>
                              <dd>{entry.bicep_weight} kg</dd>
                            </div>
                          )}
                          {entry.tricep_weight && (
                            <div>
                              <dt className="font-medium">Tricep</dt>
                              <dd>{entry.tricep_weight} kg</dd>
                            </div>
                          )}
                          {entry.core_weight && (
                            <div>
                              <dt className="font-medium">Core</dt>
                              <dd>{entry.core_weight} kg</dd>
                            </div>
                          )}
                          {entry.glute_weight && (
                            <div>
                              <dt className="font-medium">Glute</dt>
                              <dd>{entry.glute_weight} kg</dd>
                            </div>
                          )}
                          {entry.calf_weight && (
                            <div>
                              <dt className="font-medium">Calf</dt>
                              <dd>{entry.calf_weight} kg</dd>
                            </div>
                          )}
                          {entry.traps_weight && (
                            <div>
                              <dt className="font-medium">Traps</dt>
                              <dd>{entry.traps_weight} kg</dd>
                            </div>
                          )}
                        </dl>
                        {entry.notes && (
                          <p className="mt-2">
                            <span className="font-medium">Notes:</span>{" "}
                            {entry.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </ScrollArea>
                ) : (
                  <p>No progress data available.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="challenges">
            <Card>
              <CardHeader>
                <CardTitle>Challenges and Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Challenges</h3>
                    {user.UserChallenge.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {user.UserChallenge.map((challenge) => (
                          <li key={challenge.id}>{challenge.challenge.name}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No challenges joined.</p>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">Events</h3>
                    {user.UserEvent.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {user.UserEvent.map((event) => (
                          <li key={event.id}>{event.event.name}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No events attended.</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export const UsersColumns: ColumnDef<UserColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all exercises"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={`Select ${row.original.name}`}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "SubscriptionPlan",
    header: "Nutrition Plan",
  },
  {
    accessorKey: "NutritionPlan",
    header: "Subscription Plan",
  },
  {
    accessorKey: "workoutPlan",
    header: "workoutPlan",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center">
        <UserDetailsDialog user={row.original.user} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(row.original.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                handleDelete(row.original.id);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
