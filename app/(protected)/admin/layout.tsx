import AdminPanelLayout from "@/components/protected/admin-panel-layout";
import { Toaster } from "@/components/ui/toaster";
import { InitAdminUsers } from "@/hooks/store/initUser";
import { db } from "@/lib/db";

export default async function Adminlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await db.user.findMany({
    include: {
      workoutPlan: {
        include: {
          workoutPlan: {
            select: {
              name: true,
            },
          },
          sessions: {
            include: {
              exercises: {
                include: {
                  exercise: true,
                },
              },
            },
          },
        },
      },
      nutritionPlan: {
        include: {
          nutritionPlan: {
            select: {
              name: true,
            },
          },
          UserMealPlan: {
            include: {
              meal: true,
            },
          },
        },
      },
      Subscription: true,
      Post: true,
      Comment: true,
      LifeTimePayment: true,
      UserChallenge: {
        include: {
          challenge: {
            select: {
              name: true,
            },
          },
        },
      },
      UserEvent: {
        include: {
          event: {
            select: {
              name: true,
            },
          },
        },
      },
      progress: true,
    },
  });

  return (
    <>
      <AdminPanelLayout isAdmin>{children}</AdminPanelLayout>
      <Toaster />
      <InitAdminUsers users={users || undefined} />
    </>
  );
}
