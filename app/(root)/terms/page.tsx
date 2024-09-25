import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
          <CardDescription>
            Last updated: {new Date().toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p>
                Welcome to [Your Company Name] (&quot;Company&quot;,
                &quot;we&quot;, &quot;our&quot;, &quot;us&quot;)! These Terms of
                Service (&quot;Terms&quot;, &quot;Terms of Service&quot;) govern
                your use of our website located at [Your Website URL] (together
                or individually &quot;Service&quot;) operated by [Your Company
                Name].
              </p>
              <p className="mt-2">
                Our Privacy Policy also governs your use of our Service and
                explains how we collect, safeguard and disclose information that
                results from your use of our web pages. Please read it here
                [Link to Privacy Policy].
              </p>
              <p className="mt-2">
                Your agreement with us includes these Terms and our Privacy
                Policy (&quot;Agreements&quot;). You acknowledge that you have
                read and understood Agreements, and agree to be bound by them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Communications</h2>
              <p>
                By using our Service, you agree to subscribe to newsletters,
                marketing or promotional materials and other information we may
                send. However, you may opt out of receiving any, or all, of
                these communications from us by following the unsubscribe link
                or by emailing at [Your Contact Email].
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Purchases</h2>
              <p>
                If you wish to purchase any product or service made available
                through the Service (&quot;Purchase&quot;), you may be asked to
                supply certain information relevant to your Purchase including,
                without limitation, your credit card number, the expiration date
                of your credit card, your billing address, and your shipping
                information.
              </p>
              <p className="mt-2">
                You represent and warrant that: (i) you have the legal right to
                use any credit card(s) or other payment method(s) in connection
                with any Purchase; and that (ii) the information you supply to
                us is true, correct and complete.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                4. Contests, Sweepstakes and Promotions
              </h2>
              <p>
                Any contests, sweepstakes or other promotions (collectively,
                &quot;Promotions&quot;) made available through the Service may
                be governed by rules that are separate from these Terms of
                Service. If you participate in any Promotions, please review the
                applicable rules as well as our Privacy Policy. If the rules for
                a Promotion conflict with these Terms of Service, the Promotion
                rules will apply.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Refunds</h2>
              <p>
                We issue refunds for Contracts within 30 days of the original
                purchase of the Contract.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Content</h2>
              <p>
                Our Service allows you to post, link, store, share and otherwise
                make available certain information, text, graphics, videos, or
                other material (&quot;Content&quot;). You are responsible for
                the Content that you post on or through the Service, including
                its legality, reliability, and appropriateness.
              </p>
              <p className="mt-2">
                By posting Content on or through the Service, You represent and
                warrant that: (i) the Content is yours (you own it) and/or you
                have the right to use it and the right to grant us the rights
                and license as provided in these Terms, and (ii) that the
                posting of your Content on or through the Service does not
                violate the privacy rights, publicity rights, copyrights,
                contract rights or any other rights of any person or entity.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                7. Prohibited Uses
              </h2>
              <p>
                You may use the Service only for lawful purposes and in
                accordance with Terms. You agree not to use the Service:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  In any way that violates any applicable national or
                  international law or regulation.
                </li>
                <li>
                  For the purpose of exploiting, harming, or attempting to
                  exploit or harm minors in any way by exposing them to
                  inappropriate content or otherwise.
                </li>
                <li>
                  To transmit, or procure the sending of, any advertising or
                  promotional material, including any &quot;junk mail&quot;,
                  &quot;chain letter,&quot; &quot;spam,&quot; or any other
                  similar solicitation.
                </li>
                <li>
                  To impersonate or attempt to impersonate Company, a Company
                  employee, another user, or any other person or entity.
                </li>
                <li>
                  In any way that infringes upon the rights of others, or in any
                  way is illegal, threatening, fraudulent, or harmful, or in
                  connection with any unlawful, illegal, fraudulent, or harmful
                  purpose or activity.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                8. Limitation of Liability
              </h2>
              <p>
                In no event shall [Your Company Name], nor its directors,
                employees, partners, agents, suppliers, or affiliates, be liable
                for any indirect, incidental, special, consequential or punitive
                damages, including without limitation, loss of profits, data,
                use, goodwill, or other intangible losses, resulting from (i)
                your access to or use of or inability to access or use the
                Service; (ii) any conduct or content of any third party on the
                Service; (iii) any content obtained from the Service; and (iv)
                unauthorized access, use or alteration of your transmissions or
                content, whether based on warranty, contract, tort (including
                negligence) or any other legal theory, whether or not we have
                been informed of the possibility of such damage, and even if a
                remedy set forth herein is found to have failed of its essential
                purpose.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Disclaimer</h2>
              <p>
                Your use of the Service is at your sole risk. The Service is
                provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot;
                basis. The Service is provided without warranties of any kind,
                whether express or implied, including, but not limited to,
                implied warranties of merchantability, fitness for a particular
                purpose, non-infringement or course of performance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with
                the laws of [Your Country], without regard to its conflict of
                law provisions.
              </p>
              <p className="mt-2">
                Our failure to enforce any right or provision of these Terms
                will not be considered a waiver of those rights. If any
                provision of these Terms is held to be invalid or unenforceable
                by a court, the remaining provisions of these Terms will remain
                in effect. These Terms constitute the entire agreement between
                us regarding our Service, and supersede and replace any prior
                agreements we might have had between us regarding the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                11. Changes to Service
              </h2>
              <p>
                We reserve the right to withdraw or amend our Service, and any
                service or material we provide via Service, in our sole
                discretion without notice. We will not be liable if for any
                reason all or any part of Service is unavailable at any time or
                for any period. From time to time, we may restrict access to
                some parts of Service, or the entire Service, to users,
                including registered users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                12. Amendments to Terms
              </h2>
              <p>
                We may amend Terms at any time by posting the amended terms on
                this site. It is your responsibility to review these Terms
                periodically.
              </p>
              <p className="mt-2">
                Your continued use of the Platform following the posting of
                revised Terms means that you accept and agree to the changes.
                You are expected to check this page frequently so you are aware
                of any changes, as they are binding on you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us
                at [Your Contact Email].
              </p>
            </section>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-4xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                How can I cancel my subscription?
              </AccordionTrigger>
              <AccordionContent>
                You can cancel your subscription at any time by logging into
                your account and going to the subscription management page.
                Please note that cancellations will take effect at the end of
                your current billing cycle.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                What happens to my data if I close my account?
              </AccordionTrigger>
              <AccordionContent>
                When you close your account, we will delete your personal
                information within 30 days, except for information we are
                required to keep for legal or business purposes. For more
                details, please refer to our Privacy Policy.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                How do I report a violation of these Terms?
              </AccordionTrigger>
              <AccordionContent>
                If you believe someone is violating our Terms of Service, please
                contact our support team immediately. Provide as much detail as
                possible about the violation, including any relevant links or
                screenshots.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Can I use your service for commercial purposes?
              </AccordionTrigger>
              <AccordionContent>
                The use of our service for commercial purposes depends on the
                type of account you have. Please refer to your specific plan
                details or contact our sales team for more information about
                commercial use licenses.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
