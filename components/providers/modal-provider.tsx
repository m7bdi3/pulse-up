"use client";

import React from "react";
import { LoginModal } from "@/components/LoginModal";
import { useModalStore } from "@/hooks/store/use-store-modal";
import { RegisterUserDataModal } from "../RegisterDataModal";

export const ModalProvider = () => {
  const [mounted, setIsMounted] = React.useState(false);
  const { isLoginOpen, isDataRegisterOpen } = useModalStore();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {isLoginOpen && <LoginModal />}
      {isDataRegisterOpen && <RegisterUserDataModal />}
    </>
  );
};
