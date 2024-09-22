import { ContentLayout } from "@/components/protected/content-layout";
import { OverviewComponent } from "@/components/protected/dashboard/OverView";
import React from "react";

export default async function DashboardPage() {
  return (
    <ContentLayout title="Dashboard" isAdmin={false}>
      <OverviewComponent />
    </ContentLayout>
  );
}
