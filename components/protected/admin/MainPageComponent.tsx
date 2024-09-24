"use client";

import React from "react";
import {
  CreditCard,
  DollarSign,
  Podcast,
  SubscriptIcon,
  UserPlus2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getGraphRevenue,
  getSalesCount,
  GetTotalRevenue,
  GraphData,
} from "@/actions/AdminDashboardStats";

import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { OverView } from "./OverView";

interface CardProps {
  title: string;
  value: string | number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  isLoading?: boolean;
}

const StatCard: React.FC<CardProps> = ({
  title,
  value,
  icon: Icon,
  isLoading,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="dark:bg-muted dark:text-secondary-foreground h-full">
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
        </div>
        <Separator className="my-2" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-24" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

export const MainPageComponent = () => {
  const [totalRevenue, setTotalRevenue] = React.useState<number>(0);
  const [salesCount, setSalesCount] = React.useState<number>(0);
  const [graphRevenue, setGraphRevenue] = React.useState<GraphData[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [revenue, sales, graph] = await Promise.all([
          GetTotalRevenue(),
          getSalesCount(),
          getGraphRevenue(),
        ]);
        setTotalRevenue(revenue);
        setSalesCount(sales);
        setGraphRevenue(graph);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 sm:px-6 py-12 md:gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon={DollarSign}
          isLoading={isLoading}
        />
        <StatCard
          title="Subscriptions"
          value={`${salesCount}`}
          icon={UserPlus2}
          isLoading={isLoading}
        />
        
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="h-full"
      >
        <Card className="dark:bg-muted dark:text-secondary-foreground h-full">
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Total Revenue for the year</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <OverView data={graphRevenue} />
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

