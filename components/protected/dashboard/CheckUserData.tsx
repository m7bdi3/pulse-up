"use client";
import { useModalStore } from "@/hooks/store/use-store-modal";
import { useUser } from "@/hooks/store/user";
import React, { useEffect } from "react";

export const CheckUserData = () => {
  const { openDateRegister } = useModalStore();
  const { user } = useUser();

  useEffect(() => {
    if (
      !user?.activityLevel ||
      !user?.address ||
      !user?.age ||
      !user?.bodyFat ||
      !user?.gender ||
      !user?.weight ||
      !user?.height ||
      !user?.muscleMass ||
      !user?.phone
    )
      openDateRegister();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};
