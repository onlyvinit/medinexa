// app/lib/orderService.ts
"use client";

import { Order } from "@/app/types/order";

// Fetch all orders from API
export async function getAllOrders(): Promise<Order[]> {
  try {
    const res = await fetch("/api/orders");
    const data = await res.json();
    return data.success ? data.orders : [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

// Create a new order via API
export async function createOrder(order: Order): Promise<Order | null> {
  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    const data = await res.json();
    return data.success ? data.order : null;
  } catch (error) {
    console.error("Error creating order:", error);
    return null;
  }
}

// Fetch single order by ID
export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const res = await fetch(`/api/orders/${id}`);
    const data = await res.json();
    return data.success ? data.order : null;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
}

// Update order status
export async function updateOrderStatus(
  id: string,
  newStatus:
    | "pending_review"
    | "approved"
    | "shipped"
    | "completed"
    | "declined"
): Promise<Order | null> {
  try {
    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    const data = await res.json();
    return data.success ? data.order : null;
  } catch (error) {
    console.error("Error updating order:", error);
    return null;
  }
}
