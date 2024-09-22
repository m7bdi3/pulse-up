import { ContentLayout } from "@/components/protected/content-layout";
import { SessionsComponent } from "@/components/protected/dashboard/MySessions";

import React from "react";

export default function SessionsPage() {
  return (
    <ContentLayout title="My Sessions" isAdmin={false}>
      <SessionsComponent />
    </ContentLayout>
  );
}
