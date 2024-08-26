"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Logo } from "../logo";

const navigationLinks = [
  {
    title: "Explore",
    links: [
      { name: "Home", href: "/" },
      { name: "Features", href: "/features" },
      { name: "How It Works", href: "/how-it-works" },
      { name: "Testimonials", href: "/testimonials" },
      { name: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", href: "/help" },
      { name: "FAQs", href: "/faqs" },
      { name: "Contact Us", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  },
  {
    title: "Community",
    links: [
      { name: "Join the Community", href: "/community" },
      { name: "Success Stories", href: "/success-stories" },
      { name: "Challenges", href: "/challenges" },
      { name: "Forum", href: "/forum" },
      { name: "Events", href: "/events" },
    ],
  },
];

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/pulseup" },
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/pulseup" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/pulseup" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/pulseup" },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/company/pulseup",
  },
];

const contactInfo = [
  { icon: Mail, info: "support@pulseup.com" },
  { icon: Phone, info: "+1 (800) 123-4567" },
  { icon: MapPin, info: "123 Fitness Lane, Wellness City, CA 90210, USA" },
];

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
    <Link
      href={href}
      className="text-muted-foreground hover:text-primary transition-colors"
    >
      {children}
    </Link>
  </motion.div>
);

const FooterSection = ({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string }[];
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: false }}
  >
    <h2 className="font-semibold text-lg mb-4">{title}</h2>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <motion.li
          key={link.name}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          viewport={{ once: false }}
        >
          <FooterLink href={link.href}>{link.name}</FooterLink>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

export const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-4">
          <Logo />
          <motion.p
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              type: "spring",
              damping: 8,
              stiffness: 100,
            }}
            viewport={{ once: false }}
            className="font-black text-2xl"
          >
            PULSE UP
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {navigationLinks.map((section) => (
            <FooterSection
              key={section.title}
              title={section.title}
              links={section.links}
            />
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
            className="lg:col-span-1"
          >
            <h2 className="font-semibold text-lg mb-4">Connect With Us</h2>
            <motion.div
              className="flex space-x-4 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: false }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={`Follow us on ${social.name}`}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </motion.div>
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: false }}
            >
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={index}
                  className="flex items-center text-muted-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                >
                  <contact.icon size={16} className="mr-2 flex-shrink-0" />
                  <span className="text-sm">{contact.info}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 pt-8 border-t border-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: false }}
        >
          <p className="text-center text-muted-foreground text-sm">
            © 2024 PulseUp. All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
