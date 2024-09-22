"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostsComponent } from "./PostsComponent";
import { ChallengesComponent } from "./ChallengesComponent";
import { EventsComponent } from "./EventsComponent";

export const CommunityComponent: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-background"
    >
      <Tabs defaultValue="feed" className="space-y-4">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="feed" className="space-y-4">
              <PostsComponent />
            </TabsContent>

            <TabsContent value="challenges" className="space-y-4">
              <ChallengesComponent />
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <EventsComponent />
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
};
