import { ContentLayout } from "@/components/protected/content-layout";

import { WorkoutsComponent } from "@/components/protected/dashboard/Workouts";
import React from "react";

export default function WorkoutsPage() {
  return (
    <ContentLayout title="Workouts" isAdmin={false}>
      <WorkoutsComponent />
    </ContentLayout>
  );
}
