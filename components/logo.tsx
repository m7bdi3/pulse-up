import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 w-fit" prefetch={false}>
      <Image
        src={"/logo.svg"}
        height={60}
        width={60}
        alt="logo"
        className="invert dark:invert-0"
      />
    </Link>
  );
};
