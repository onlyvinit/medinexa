"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllOrders } from "@/app/lib/orderService";
import StatusBadge from "../../ui/StatusBadge";

export default function RecentOrdersTable() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    async function loadOrders() {
      const list = await getAllOrders();
      const sorted = list.sort(
        (a: any, b: any) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
      );
      setOrders(sorted.slice(0, 8));
    }
    loadOrders();
  }, []);

  if (orders.length === 0) {
    return (
      <p className="text-gray-500 text-sm">No orders have been placed yet.</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded-lg bg-white">
        <thead>
          <tr className="bg-gray-50 text-left text-sm text-gray-600 border-b">
            <th className="py-3 px-4">Order ID</th>
            <th className="py-3 px-4">User</th>
            <th className="py-3 px-4">Medication</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4"></th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order: any) => (
            <tr key={order.id} className="border-b hover:bg-gray-50 transition">
              <td className="py-3 px-4 font-medium">{order.id}</td>

              <td className="py-3 px-4 text-gray-700">
                {order.userName}
                <div className="text-xs text-gray-500">{order.userEmail}</div>
              </td>

              <td className="py-3 px-4 text-gray-700">{order.product.name}</td>

              <td className="py-3 px-4">
                <StatusBadge status={order.status} />
              </td>

              <td className="py-3 px-4 text-gray-600 text-sm">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>

              <td className="py-3 px-4 text-right">
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="text-blue-600 text-sm hover:underline"
                >
                  View →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
