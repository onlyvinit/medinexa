"use client";

import { useEffect, useState } from "react";
import { getAllOrders } from "@/app/lib/orderService";

import AdminStatsCard from "../components/general/Admin/AdminStatsCard";
import MedicationDistributionChart from "../components/general/Admin/MedicationDistributionChart";
import OrderStatusChart from "../components/general/Admin/OrderStatusChart";
import OrdersTrendChart from "../components/general/Admin/OrdersTrendChart";
import RecentOrdersTable from "../components/general/Admin/RecentOrdersTable";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingReview: 0,
    monthlyRevenue: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const orders = await getAllOrders();

      // Total Orders
      const totalOrders = orders.length;

      // Pending Review
      const pendingReview = orders.filter(
        (o) => o.status === "pending_review"
      ).length;

      // Total Revenue (last 30 days)
      const last30days = new Date();
      last30days.setDate(last30days.getDate() - 30);

      const monthlyRevenue = orders
        .filter((o) => o.createdAt && new Date(o.createdAt) >= last30days)
        .reduce((sum, o) => sum + (o.product?.price || 0), 0);

      // Total Users — count unique userIds
      const uniqueUsers = new Set(orders.map((o) => o.userId));

      setStats({
        totalOrders,
        pendingReview,
        monthlyRevenue,
        totalUsers: uniqueUsers.size,
      });
    }

    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* ---- TOP REAL-TIME STAT CARDS ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminStatsCard
          title="Total Users"
          value={stats.totalUsers.toString()}
          change={stats.totalUsers > 0 ? "+100%" : "0%"}
        />

        <AdminStatsCard
          title="Total Orders"
          value={stats.totalOrders.toString()}
          change={stats.totalOrders > 0 ? "+100%" : "0%"}
        />

        <AdminStatsCard
          title="Pending Physician Review"
          value={stats.pendingReview.toString()}
          change={stats.pendingReview > 0 ? "+10%" : "0%"}
          highlight
        />

        <AdminStatsCard
          title="Monthly Revenue"
          value={"$" + stats.monthlyRevenue.toString()}
          change={stats.monthlyRevenue > 0 ? "+12%" : "0%"}
        />
      </div>

      {/* CHARTS + RECENT ORDERS (unchanged) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Orders Trend (Last 30 days)
          </h2>
          <OrdersTrendChart />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Medication Distribution
          </h2>
          <MedicationDistributionChart />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Order Status Overview
        </h2>
        <OrderStatusChart />
      </div>


    </div>
  );
}
