import { ContentLayout } from "@/components/protected/content-layout";

import { MyProgressComponent } from "@/components/protected/dashboard/Progress";
import React from "react";

export default function MyProgressPage() {
  return (
    <ContentLayout title="My Progress" isAdmin={false}>
      <MyProgressComponent />
    </ContentLayout>
  );
}
