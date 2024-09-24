"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

interface Props {
  isMobile: boolean;
}

export const HeaderNavigation = ({ isMobile }: Props) => {
  const navItems = [
    { href: "/subscription", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "contact" },
  ];

  const MobileNav = () => (
    <nav className="flex flex-col items-start justify-center gap-4 w-full h-full">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-lg font-medium hover:underline hover:underline-offset-4"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );

  const DesktopNav = () => (
    <NavigationMenu className="hidden md:block ml-auto">
      <NavigationMenuList className="flex gap-6 items-center">
        {navItems.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink asChild>
              <Link
                href={item.href}
                prefetch
                className="text-base font-medium hover:underline hover:underline-offset-4"
              >
                {item.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );

  return isMobile ? <MobileNav /> : <DesktopNav />;
};
