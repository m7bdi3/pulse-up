import React from "react";
import { ContentLayout } from "@/components/protected/content-layout";
import { CommunityComponent } from "@/components/protected/dashboard/community/Community";

export default function CommunityPage() {
  return (
    <ContentLayout title="Community" isAdmin={false}>
      <CommunityComponent />
    </ContentLayout>
  );
}
