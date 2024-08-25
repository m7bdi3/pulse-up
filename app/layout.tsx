import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
export const metadata: Metadata = {
  title: "PulseUp - Elevate Your Fitness Journey",
  description:
    "PulseUp is a dynamic fitness app designed to empower individuals of all ages to achieve their fitness goals through personalized workouts and holistic well-being. Join the PulseUp community and elevate your fitness journey today.",
};

const fontHeading = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: "300",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
