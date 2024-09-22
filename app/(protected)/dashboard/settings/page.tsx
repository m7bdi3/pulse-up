import React from "react";
import { ContentLayout } from "@/components/protected/content-layout";
import { UserSettingComponent } from "@/components/protected/dashboard/UserSettingsComponent";

export default function SettingsPage() {
  return (
    <ContentLayout title="User Settings" isAdmin={false}>
      <UserSettingComponent />
    </ContentLayout>
  );
}
