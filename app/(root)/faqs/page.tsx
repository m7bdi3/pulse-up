"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for all unused items in their original packaging. Please contact our customer service team to initiate a return.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Shipping times vary depending on your location. Typically, domestic orders are delivered within 3-5 business days, while international orders may take 7-14 business days.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to most countries worldwide. Shipping costs and delivery times may vary depending on the destination.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order has been shipped, you will receive a confirmation email with a tracking number. You can use this number to track your package on our website or the carrier's site.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.",
  },
  {
    question: "Are your products eco-friendly?",
    answer:
      "We are committed to sustainability and continuously work to make our products and packaging more eco-friendly. Many of our products are made from recycled or sustainable materials.",
  },
  {
    question: "Do you offer gift wrapping?",
    answer:
      "Yes, we offer gift wrapping services for a small additional fee. You can select this option during checkout.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach our customer support team via email at support@example.com, by phone at 1-800-123-4567, or through the chat feature on our website. Our support hours are Monday to Friday, 9 AM to 5 PM EST.",
  },
];

export default function FAQsPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredFAQs, setFilteredFAQs] = React.useState(faqs);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const filtered = faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFAQs(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search FAQs</CardTitle>
          <CardDescription>
            Find answers to your questions quickly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {filteredFAQs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {filteredFAQs.length === 0 && (
        <p className="text-center mt-4 text-gray-500">
          No matching questions found. Please try a different search term.
        </p>
      )}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Still have questions?</CardTitle>
          <CardDescription>We&apos;re here to help</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            If you couldn&apos;t find the answer you were looking for, please
            don&apos;t hesitate to contact our customer support team.
          </p>
        </CardContent>
        <CardFooter>
          <Button>Contact Support</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
