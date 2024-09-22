import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "./menu";
import { Logo } from "../logo";

interface Props {
  isAdmin: boolean;
}

export function SheetMenu({ isAdmin }: Props) {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader className="flex flex-row h-32 items-center justify-start gap-2 space-y-0">
          <Button
            className="flex justify-center items-center "
            variant="link"
            asChild
          >
            <Logo />
          </Button>
          <h1 className="font-bold text-2xl whitespace-nowrap text-foreground">
            PULSE
          </h1>
        </SheetHeader>
        <div className="h-full flex-1">
          <Menu isOpen isAdmin={isAdmin} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
