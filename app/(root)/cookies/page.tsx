"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function CookiesPage() {
  const [essentialCookies, setEssentialCookies] = React.useState(true);
  const [analyticsCookies, setAnalyticsCookies] = React.useState(true);
  const [marketingCookies, setMarketingCookies] = React.useState(false);

  const handleSavePreferences = () => {
    console.log("Saving preferences:", {
      essentialCookies,
      analyticsCookies,
      marketingCookies,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
      <p className="mb-4">
        We use cookies to improve your experience on our site and to show you
        relevant advertising. To find out more, read our{" "}
        <Link href="/privacy-policy" className="text-blue-600 hover:underline">
          privacy policy
        </Link>
        .
      </p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Cookie Preferences</CardTitle>
          <CardDescription>Manage your cookie settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="essential-cookies">Essential Cookies</Label>
                <p className="text-sm text-muted-foreground">
                  These cookies are necessary for the website to function and
                  cannot be switched off.
                </p>
              </div>
              <Switch
                id="essential-cookies"
                checked={essentialCookies}
                onCheckedChange={setEssentialCookies}
                disabled
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="analytics-cookies">Analytics Cookies</Label>
                <p className="text-sm text-muted-foreground">
                  These cookies allow us to count visits and traffic sources so
                  we can measure and improve the performance of our site.
                </p>
              </div>
              <Switch
                id="analytics-cookies"
                checked={analyticsCookies}
                onCheckedChange={setAnalyticsCookies}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing-cookies">Marketing Cookies</Label>
                <p className="text-sm text-muted-foreground">
                  These cookies may be set through our site by our advertising
                  partners to build a profile of your interests.
                </p>
              </div>
              <Switch
                id="marketing-cookies"
                checked={marketingCookies}
                onCheckedChange={setMarketingCookies}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSavePreferences}>Save Preferences</Button>
        </CardFooter>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="what-are-cookies">
          <AccordionTrigger>What are cookies?</AccordionTrigger>
          <AccordionContent>
            Cookies are small text files that are placed on your computer or
            mobile device when you browse websites. They allow the website to
            recognize your device and remember if you&apos;ve been to the
            website before.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="how-we-use-cookies">
          <AccordionTrigger>How do we use cookies?</AccordionTrigger>
          <AccordionContent>
            We use cookies for a variety of reasons, such as keeping you signed
            in, remembering your preferences, analyzing how you use our website,
            and personalizing your experience.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="types-of-cookies">
          <AccordionTrigger>Types of cookies we use</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Essential cookies: Necessary for the website to function
                properly.
              </li>
              <li>
                Analytics cookies: Help us understand how visitors interact with
                our website.
              </li>
              <li>
                Marketing cookies: Used to track visitors across websites to
                allow targeted advertising.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="manage-cookies">
          <AccordionTrigger>How to manage cookies</AccordionTrigger>
          <AccordionContent>
            You can manage your cookie preferences using the toggles above.
            Additionally, most web browsers allow some control of cookies
            through browser settings. To find out more about cookies, including
            how to see what cookies have been set and how to manage and delete
            them, visit{" "}
            <a
              href="https://www.aboutcookies.org"
              className="text-blue-600 hover:underline"
            >
              www.aboutcookies.org
            </a>
            .
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
