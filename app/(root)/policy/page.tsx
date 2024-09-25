import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <h1 className="text-3xl font-bold mb-6">Our Policies</h1>
      <Tabs defaultValue="privacy" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
          <TabsTrigger value="terms">Terms of Service</TabsTrigger>
          <TabsTrigger value="cookies">Cookie Policy</TabsTrigger>
        </TabsList>
        <Card className="mt-6">
          <CardContent className="p-6">
            <ScrollArea className="h-[60vh]">
              <TabsContent value="privacy">
                <CardHeader>
                  <CardTitle>Privacy Policy</CardTitle>
                  <CardDescription>
                    Last updated: {new Date().toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <div className="space-y-4">
                  <section>
                    <h2 className="text-xl font-semibold mb-2">
                      1. Introduction
                    </h2>
                    <p>
                      This Privacy Policy describes how we collect, use,
                      process, and disclose your information, including personal
                      information, in conjunction with your access to and use of
                      our services.
                    </p>
                  </section>
                  <section>
                    <h2 className="text-xl font-semibold mb-2">
                      2. Information We Collect
                    </h2>
                    <p>We collect various types of information, including:</p>
                    <ul className="list-disc pl-5 mt-2">
                      <li>Information you provide to us directly</li>
                      <li>
                        Information we collect automatically when you use our
                        services
                      </li>
                      <li>Information we collect from third parties</li>
                    </ul>
                  </section>
                  <section>
                    <h2 className="text-xl font-semibold mb-2">
                      3. How We Use Your Information
                    </h2>
                    <p>
                      We use the information we collect for various purposes,
                      including:
                    </p>
                    <ul className="list-disc pl-5 mt-2">
                      <li>Providing, improving, and developing our services</li>
                      <li>Communicating with you</li>
                      <li>Promoting safety and security</li>
                    </ul>
                  </section>
                  <section>
                    <h2 className="text-xl font-semibold mb-2">
                      4. Sharing of Information
                    </h2>
                    <p>We may share your information with:</p>
                    <ul className="list-disc pl-5 mt-2">
                      <li>Third-party service providers</li>
                      <li>Legal and regulatory authorities</li>
                      <li>Affiliated companies</li>
                    </ul>
                  </section>
                  <section>
                    <h2 className="text-xl font-semibold mb-2">
                      5. Your Rights
                    </h2>
                    <p>
                      You have certain rights relating to your personal
                      information, including:
                    </p>
                    <ul className="list-disc pl-5 mt-2">
                      <li>The right to access your personal information</li>
                      <li>The right to rectify your personal information</li>
                      <li>The right to erase your personal information</li>
                      <li>
                        The right to restrict processing of your personal
                        information
                      </li>
                      <li>The right to data portability</li>
                    </ul>
                  </section>
                </div>
              </TabsContent>
              <TabsContent value="terms">
                <CardHeader>
                  <CardTitle>Terms of Service</CardTitle>
                  <CardDescription>
                    Last updated: {new Date().toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <div className="space-y-4">
                  <section>
                    <h2 className="text-xl font-semibold mb-2">
                      1. Acceptance of Terms
                    </h2>
                    <p>
                      By accessing or using our services, you agree to be bound
                      by these Terms of Service and all applicable laws and
                      regulations.
                    </p>
                  </section>
                  <section>
                    <h2 className="text-xl font-semibold mb-2">
                      2. Use of Services
                    </h2>
                    <p>
                      You agree to use our services only for purposes that are
                      permitted by these Terms and any applicable law,
                      regulation, or generally accepted practices or guidelines
                      in the relevant jurisdictions.
                    </p>
                  </section>
                  <section>
                    <h2 className="text-xl font-semibold mb-2">
                      3. User Accounts
                    </h2>
                    <p>
                      You may need to create an account to use some of our
                      services. You are responsible for maintaining the
                      confidentiality of your account and password and for
                      restricting access to your account.
                    </p>
                  </section>
                  <section>
                    <h2 className="text-xl font-semibold mb-2">
                      4. Intellectual Property
                    </h2>
                    <p>
                      The content, organization, graphics, design, compilation,
                      magnetic translation, digital conversion and other matters
                      related to our services are protected under applicable
                      copyrights, trademarks and other proprietary rights.
                    </p>
                  </section>
                  <section>
                    <h2 className="text-xl font-semibold mb-2">
                      5. Termination
                    </h2>
                    <p>
                      We may terminate or suspend your access to our services
                      immediately, without prior notice or liability, for any
                      reason whatsoever, including without limitation if you
                      breach the Terms.
                    </p>
                  </section>
                </div>
              </TabsContent>
              <TabsContent value="cookies">
                <CardHeader>
                  <CardTitle>Cookie Policy</CardTitle>
                  <CardDescription>
                    Last updated: {new Date().toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <div className="space-y-4">
                  <section>
                    <h2 className="text-xl font-semibold mb-2">
                      1. What Are Cookies
                    </h2>
                    <p>
                      Cookies are small pieces of text sent by your web browser
                      by a website you visit. A cookie file is stored in your
                      web browser and allows the service or a third-party to
                      recognize you and make your next visit easier and the
                      service more useful to you.
                    </p>
                  </section>
                  <section>
                    <h2 className="text-xl font-semibold mb-2">
                      2. How We Use Cookies
                    </h2>
                    <p>We use cookies for the following purposes:</p>
                    <ul className="list-disc pl-5 mt-2">
                      <li>To enable certain functions of the service</li>
                      <li>To provide analytics</li>
                      <li>To store your preferences</li>
                      <li>
                        To enable advertisements delivery, including behavioral
                        advertising
                      </li>
                    </ul>
                  </section>
                  <section>
                    <h2 className="text-xl font-semibold mb-2">
                      3. Types of Cookies We Use
                    </h2>
                    <ul className="list-disc pl-5 mt-2">
                      <li>
                        Session Cookies: These cookies are temporary and expire
                        once you close your browser.
                      </li>
                      <li>
                        Persistent Cookies: These cookies remain on your hard
                        drive until you erase them or they expire.
                      </li>
                      <li>
                        Essential Cookies: These cookies are necessary for the
                        website to function properly.
                      </li>
                      <li>
                        Analytics Cookies: These cookies allow us to measure and
                        analyze how our customers use the site.
                      </li>
                    </ul>
                  </section>
                  <section>
                    <h2 className="text-xl font-semibold mb-2">
                      4. Your Choices Regarding Cookies
                    </h2>
                    <p>
                      If you&apos;d like to delete cookies or instruct your web
                      browser to delete or refuse cookies, please visit the help
                      pages of your web browser. Please note, however, that if
                      you delete cookies or refuse to accept them, you might not
                      be able to use all of the features we offer.
                    </p>
                  </section>
                </div>
              </TabsContent>
            </ScrollArea>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
