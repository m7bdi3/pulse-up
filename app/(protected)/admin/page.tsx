import { MainPageComponent } from "@/components/protected/admin/MainPageComponent";
import { ContentLayout } from "@/components/protected/content-layout";
import React from "react";

export default function AdminPage() {
  return (
    <ContentLayout title="Dashboard" isAdmin>
      <MainPageComponent />
    </ContentLayout>
  );
}
