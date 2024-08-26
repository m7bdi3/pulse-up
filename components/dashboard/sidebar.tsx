import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/hooks/store/use-sidebar-store";
import { useSidebarToggle } from "@/hooks/store/use-sidebar-toggle";
import { SidebarToggle } from "./sidebar-toggle";
import { Button } from "@/components/ui/button";
import { Menu } from "./menu";

export function Sidebar() {
  const sidebar = useSidebarStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        sidebar?.isOpen === false ? "w-[90px]" : "w-72"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800 ">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={"/moto.svg"}
              alt="logo"
              width={40}
              height={40}
              className={cn("w-8 h-8 dark:invert")}
            />
            <h1
              className={cn(
                "font-bold text-2xl whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300 text-foreground",
                sidebar?.isOpen === false
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100"
              )}
            >
              Moto
            </h1>
          </Link>
        </Button>
        <div className="flex-1 h-full">
          <Menu isOpen={sidebar?.isOpen} />
        </div>
      </div>
    </aside>
  );
}
