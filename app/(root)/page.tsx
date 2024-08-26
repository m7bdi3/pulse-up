import { ExplorePrograms } from "@/components/main/ExploreProgramms";
import { GettingStarted } from "@/components/main/GettingStarted";
import { Hero } from "@/components/main/Hero";
import { JoinCommunity } from "@/components/main/JoinCommunity";
import { StartJourney } from "@/components/main/StartJourney";
import { SuccessStories } from "@/components/main/Testimonials";
import { WhyPulseUp } from "@/components/main/whySection";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <Hero />
      <WhyPulseUp />
      <GettingStarted />
      <SuccessStories />
      <JoinCommunity />
      <ExplorePrograms />
      <StartJourney />
    </Suspense>
  );
}
