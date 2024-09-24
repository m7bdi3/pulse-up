import { Footer } from "@/components/main/Footer";
import { Header } from "@/components/main/Header";
import Image from "next/image";
import Link from "next/link";

export default async function NotfoundPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Header />
      <div className="mx-auto max-w-md text-center py-12 md:py-24 h-screen">
        <Image
          src="/sad-dumbbell.svg"
          alt="Lost explorer"
          width={600}
          height={600}
          className="mx-auto mb-6"
        />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oops, looks like you&apos;re lost!
        </h1>
        <p className="mt-4 text-muted-foreground">
          The page you requested could not be found. Let&apos;s get you back on
          track.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-2"
          >
            Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
