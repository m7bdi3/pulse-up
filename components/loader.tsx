import { Loader2Icon } from "lucide-react";
import React from "react";

export const Loader: React.FC = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader2Icon className="h-16 w-16 animate-spin" />
    </div>
  );
};
