"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { getAllOrders } from "@/app/lib/orderService";
import OrderItem from "./OrderItem";
import EmptyState from "./EmptyState";

export default function OrderList() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const allOrders = await getAllOrders();

        const userOrders = allOrders.filter(
          (order) => order.userId === user.id
        );

        const sortedOrders = userOrders.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0).getTime();
          const dateB = new Date(b.createdAt || 0).getTime();
          return dateB - dateA;
        });

        setOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <EmptyState message="No orders found. Your medication will appear here after purchase." />
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        Recent Orders
      </h3>

      <div className="space-y-3">
        {orders.map((order: any) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
