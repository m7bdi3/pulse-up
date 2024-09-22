import AdminPanelLayout from "@/components/protected/admin-panel-layout";
import { CheckUserData } from "@/components/protected/dashboard/CheckUserData";
import { Toaster } from "@/components/ui/toaster";

export default async function Dashboardlayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
