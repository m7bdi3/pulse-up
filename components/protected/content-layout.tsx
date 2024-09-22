import { Navbar } from "./navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
  isAdmin: boolean;
}

export function ContentLayout({
  title,
  children,
  isAdmin,
}: ContentLayoutProps) {
  return (
    <>
      <Navbar isAdmin={isAdmin} title={title} />
      <div className="container h-full pt-8 px-4 sm:px-8">{children}</div>
    </>
  );
}
