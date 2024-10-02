import { auth } from "@/auth";
import AdminPanelLayout from "@/components/protected/admin-panel-layout";
import { CheckUserData } from "@/components/protected/dashboard/CheckUserData";
import { Toaster } from "@/components/ui/toaster";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Dashboardlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // const subscription = await db.subscription.findFirst({
  //   where: {
  //     userId: session?.user.id,
  //   },
  // });

  if (!session) {
    return redirect("/login");
    // } else if (!subscription) {
    //   return redirect("/subscription");
  } else {
    return (
      <>
        <AdminPanelLayout isAdmin={false}>
          {children}
          <CheckUserData />
          <Toaster />
        </AdminPanelLayout>
      </>
    );
  }
}
