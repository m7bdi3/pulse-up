"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      toast.success("Message sent successfully!");
      form.reset();
    }, 2000);
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <motion.div
        className="space-y-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.section className="text-center" variants={itemVariants}>
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a question or feedback? We&apos;d love to hear from you. Get in
            touch with our team using the form below or through our contact
            information.
          </p>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 px-4">
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Message subject" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your message" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </motion.section>

          <motion.section variants={itemVariants} className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                Contact Information
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  <span>123 Fitness Street, Healthy City, 12345</span>
                </li>
                <li className="flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-primary" />
                  <span>contact@pulseup.com</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-6">Our Location</h2>
              <div className="aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648731966!2d-73.98784892404045!3d40.75839383566361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1685153000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="PulseUp Location Map"
                ></iframe>
              </div>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
}
