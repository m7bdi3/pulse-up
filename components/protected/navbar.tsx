import { ModeToggle } from "../darkToggle";
import { UserNav } from "../main/UserHeader";
import { SheetMenu } from "./sheet-menu";

interface NavbarProps {
  title: string;
  isAdmin: boolean;
}

export function Navbar({ title, isAdmin }: NavbarProps) {
  return (
    <header className="sticky top-0 z-20 w-full bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-muted">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu isAdmin={isAdmin} />
          <h1 className="font-bold text-xl">{title}</h1>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
