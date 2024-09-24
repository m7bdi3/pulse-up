"use server";

import { db } from "@/lib/db";

export const GetTotalRevenue = async () => {
  const paidOrders = await db.subscription.findMany();
  const lifeTimeOrders = await db.lifeTimePayment.findMany();

  const totalLifeRevenue = lifeTimeOrders.reduce((total, order) => {
    const orderPrice = order.price / 100;
    return total + orderPrice;
  }, 0);

  const totalSubRevenue = paidOrders.reduce((total, order) => {
    const SubscriptionOrderToral = order.subscriptionPrice / 100;

    return total + SubscriptionOrderToral;
  }, 0);

  return totalSubRevenue + totalLifeRevenue;
};

export const getSalesCount = async () => {
  const SalesSubCount = await db.subscription.count();
  const SalesLifeCount = await db.lifeTimePayment.count();
  return SalesSubCount + SalesLifeCount;
};

export interface GraphData {
  name: string;
  total: number;
}

export const getGraphRevenue = async () => {
  const paidOrders = await db.subscription.findMany();
  const lifeOrders = await db.lifeTimePayment.findMany();
  const monthlyRevenue: { [key: string]: number } = {};

  for (const order of paidOrders) {
    const month = new Date(order.createdAt).getMonth();
    let revenueForOrder = 0;

    revenueForOrder += order.subscriptionPrice / 100;

    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  for (const order of lifeOrders) {
    const month = new Date(order.createdAt).getMonth();
    let revenueForOrder = 0;

    revenueForOrder += order.price;

    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  const graphData: GraphData[] = [
    { name: "January", total: 0 },
    { name: "February", total: 0 },
    { name: "March", total: 0 },
    { name: "April", total: 0 },
    { name: "May", total: 0 },
    { name: "June", total: 0 },
    { name: "July", total: 0 },
    { name: "August", total: 0 },
    { name: "September", total: 0 },
    { name: "October", total: 0 },
    { name: "November", total: 0 },
    { name: "December", total: 0 },
  ];

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return graphData;
};
