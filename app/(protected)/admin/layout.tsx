import AdminPanelLayout from "@/components/protected/admin-panel-layout";
import { Toaster } from "@/components/ui/toaster";

export default async function Adminlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminPanelLayout isAdmin>{children}</AdminPanelLayout>
      <Toaster />
    </>
  );
}
