import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { db } from "@/lib/db";

//////////////////////////////////////////////////////////////////
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LenisScroll } from "@/hooks/Lenis-Scroll";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import InitUser from "@/hooks/store/initUser";
//////////////////////////////////////////////////////////////////

export const metadata: Metadata = {
  title: "PulseUp - Elevate Your Fitness Journey",
  description:
    "PulseUp is a dynamic fitness app designed to empower individuals of all ages to achieve their fitness goals through personalized workouts and holistic well-being. Join the PulseUp community and elevate your fitness journey today.",
};

const fontHeading = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: "300",
});

const userInfo = async () => {
  const session = await auth();

  if (!session) return null;

  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });
  const progress = await db.progress.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      date: "desc",
    },
  });

  const workoutPlan = await db.userWorkoutPlan.findUnique({
    where: {
      userId: session.user.id,
    },
    include: {
      workoutPlan: true,
    },
  });

  const userSessions = await db.userSessions.findMany({
    where: {
      workoutPlanId: workoutPlan?.id!,
    },
    include: {
      exercises: {
        include: {
          exercise: true,
        },
      },
    },
    orderBy: {
      day: "asc",
    },
  });

  const nutritionPlan = await db.userNutritionPlan.findUnique({
    where: {
      userId: session.user.id,
    },
    include: {
      nutritionPlan: {
        select: {
          id: true,
          name: true,
          image: true,
          description: true,
        },
      },
    },
  });

  const userMeals = await db.userMealPlan.findMany({
    where: {
      userNutritionPlanId: nutritionPlan?.id,
    },
    include: {
      meal: {
        include: {
          foods: true,
        },
      },
    },
    orderBy: {
      day: "asc",
    },
  });

  return {
    user,
    progress,
    workoutPlan,
    nutritionPlan,
    userSessions,
    userMeals,
  };
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await userInfo();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
            <LenisScroll />
            <ModalProvider />
            <InitUser
              user={user?.user || undefined}
              progress={user?.progress || undefined}
              workoutPlan={user?.workoutPlan || null}
              nutritionPlan={user?.nutritionPlan || null}
              userSessions={user?.userSessions || null}
              userMeals={user?.userMeals || null}
            />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
