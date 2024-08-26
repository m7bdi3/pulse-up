import { auth } from "@/auth";
import { Footer } from "@/components/main/Footer";
import { Header } from "@/components/main/Header";

import { db } from "@/lib/db";
import React, { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}

export default async function MainPagelayout({ children }: Props) {
  const session = await auth();

  return (
    <>
      <Header />
      <Suspense fallback={null}>{children}</Suspense>
      <Footer />
    </>
  );
}
