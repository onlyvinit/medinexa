"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { getAllOrders } from "@/app/lib/orderService";

export default function MedicationStatus() {
  const { user } = useAuth();
  const [latestOrder, setLatestOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestOrder() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const allOrders = await getAllOrders();
        const userOrders = allOrders.filter(
          (order) => order.userId === user.id
        );

        if (userOrders.length > 0) {
          const sorted = userOrders.sort((a, b) => {
            const dateA = new Date(a.createdAt || 0).getTime();
            const dateB = new Date(b.createdAt || 0).getTime();
            return dateB - dateA;
          });
          setLatestOrder(sorted[0]);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLatestOrder();
  }, [user]);

  if (loading) {
    return (
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!latestOrder) {
    return (
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Medication Status
        </h3>
        <p className="text-gray-600 mt-1">
          No active medication. Complete your intake to get started.
        </p>
      </div>
    );
  }

  const statusConfig: Record<
    string,
    { label: string; color: string; bg: string }
  > = {
    pending_review: {
      label: "Pending Review",
      color: "text-yellow-700",
      bg: "bg-yellow-100",
    },
    approved: { label: "Approved", color: "text-blue-700", bg: "bg-blue-100" },
    shipped: {
      label: "Shipped",
      color: "text-purple-700",
      bg: "bg-purple-100",
    },
    completed: {
      label: "Completed",
      color: "text-green-700",
      bg: "bg-green-100",
    },
    declined: { label: "Declined", color: "text-red-700", bg: "bg-red-100" },
  };

  const currentStatus =
    statusConfig[latestOrder.status] || statusConfig.pending_review;

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900">Medication Status</h3>

      <p className="text-gray-600 mt-1">
        Your medication{" "}
        <span className="font-medium">{latestOrder.product?.name}</span> is{" "}
        <span className="font-medium">"{currentStatus.label}"</span>
      </p>

      <div className="mt-3">
        <span
          className={`inline-block ${currentStatus.bg} ${currentStatus.color} text-xs font-medium px-3 py-1 rounded-full`}
        >
          {currentStatus.label}
        </span>
      </div>
    </div>
  );
}
