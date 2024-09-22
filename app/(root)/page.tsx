import { Loader } from "@/components/loader";
import { ExplorePrograms } from "@/components/main/ExploreProgramms";
import { GettingStarted } from "@/components/main/GettingStarted";
import { Hero } from "@/components/main/Hero";
import { JoinCommunity } from "@/components/main/JoinCommunity";
import { PricingSection } from "@/components/main/PricingSection";
import { StartJourney } from "@/components/main/StartJourney";
import { SuccessStories } from "@/components/main/Testimonials";
import { WhyPulseUp } from "@/components/main/whySection";
import { db } from "@/lib/db";
import { Suspense } from "react";

export default async function Home() {
  const plans = await db.subscriptionPlan.findMany();
  return (
    <Suspense fallback={<Loader />}>
      <Hero />
      <WhyPulseUp />
      <GettingStarted />
      <PricingSection plans={plans!} />
      <SuccessStories />
      <JoinCommunity />
      <ExplorePrograms />
      <StartJourney />
    </Suspense>
  );
}
