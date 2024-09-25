import React from "react";
import { ContentLayout } from "@/components/protected/content-layout";
import { AdminUsersManagement } from "@/components/protected/admin/UsersManagementComponent";

export default function UserManagementPage() {
  return (
    <ContentLayout title="Users Management" isAdmin>
      <AdminUsersManagement />
    </ContentLayout>
  );
}
