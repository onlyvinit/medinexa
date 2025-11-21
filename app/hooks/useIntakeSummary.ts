"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { getAllOrders } from "@/app/lib/orderService";

export function useIntakeSummary() {
  const { user } = useAuth();
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestIntake() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Get all orders
        const orders = await getAllOrders();

        // Filter orders for current user
        const userOrders = orders.filter((order) => order.userId === user.id);

        if (userOrders.length === 0) {
          setSummary(null);
          setLoading(false);
          return;
        }

        // Sort by createdAt to get the latest order
        const sortedOrders = userOrders.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0).getTime();
          const dateB = new Date(b.createdAt || 0).getTime();
          return dateB - dateA; // Most recent first
        });

        const latestOrder = sortedOrders[0];

        // Return the intake data from the latest order
        setSummary({
          patientInfo: latestOrder.patientInfo || {},
          intakeAnswers: latestOrder.intakeAnswers || {},
        });
      } catch (error) {
        console.error("Error fetching intake summary:", error);
        setSummary(null);
      } finally {
        setLoading(false);
      }
    }

    fetchLatestIntake();
  }, [user]);

  if (loading) return null;
  return summary;
}
