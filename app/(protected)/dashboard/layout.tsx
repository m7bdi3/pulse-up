import AdminPanelLayout from "@/components/dashboard/admin-panel-layout";

export default async function Adminlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminPanelLayout>{children}</AdminPanelLayout>
    </>
  );
}
