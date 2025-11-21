"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Filter, Eye } from "lucide-react";
import StatusBadge from "../../ui/StatusBadge";

const MOCK_ORDERS = [
  {
    id: "ORD-90321",
    user: "John Carter",
    email: "john.carter@example.com",
    medication: "Semaglutide",
    status: "pending_review",
    date: "2025-02-18",
    amount: 249,
  },
  {
    id: "ORD-90320",
    user: "Sarah Thompson",
    email: "sarah.t@example.com",
    medication: "Tirzepatide",
    status: "approved",
    date: "2025-02-18",
    amount: 299,
  },
  {
    id: "ORD-90319",
    user: "Amit Patel",
    email: "amit.patel@example.com",
    medication: "Orlistat",
    status: "shipped",
    date: "2025-02-17",
    amount: 49,
  },
  {
    id: "ORD-90318",
    user: "Emily Johnson",
    email: "emily.j@example.com",
    medication: "Phentermine",
    status: "completed",
    date: "2025-02-16",
    amount: 79,
  },
  {
    id: "ORD-90317",
    user: "Michael Lee",
    email: "michael.lee@example.com",
    medication: "Liraglutide",
    status: "declined",
    date: "2025-02-15",
    amount: 199,
  },
];

const STATUS_OPTIONS = [
  { label: "All statuses", value: "all" },
  { label: "Pending Review", value: "pending_review" },
  { label: "Approved", value: "approved" },
  { label: "Shipped", value: "shipped" },
  { label: "Completed", value: "completed" },
  { label: "Declined", value: "declined" },
];

export default function AdminOrdersList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = useMemo(() => {
    return MOCK_ORDERS.filter((order) => {
      const matchesSearch =
        search.trim().length === 0 ||
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.user.toLowerCase().includes(search.toLowerCase()) ||
        order.email.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="space-y-4">
      {/* HEADER ROW */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Orders</h2>
          <p className="text-gray-500 text-sm mt-1">
            Review and manage all patient orders.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* SEARCH */}
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search by order, name, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 rounded-lg border text-sm bg-white w-full sm:w-72 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* STATUS FILTER */}
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">
              <Filter size={16} />
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-9 pr-8 py-2 rounded-lg border text-sm bg-white min-w-[170px] focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="text-left text-gray-600 text-sm border-b">
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Patient</th>
              <th className="py-3 px-4">Medication</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b last:border-0 hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 font-medium text-gray-900">
                  {order.id}
                </td>

                <td className="py-3 px-4">
                  <div className="flex flex-col">
                    <span className="text-gray-800 text-sm font-medium">
                      {order.user}
                    </span>
                    <span className="text-gray-500 text-xs">{order.email}</span>
                  </div>
                </td>

                <td className="py-3 px-4 text-gray-700 text-sm">
                  {order.medication}
                </td>

                <td className="py-3 px-4">
                  <StatusBadge status={order.status} />
                </td>

                <td className="py-3 px-4 text-gray-800 text-sm">
                  ${order.amount}
                </td>

                <td className="py-3 px-4 text-gray-600 text-sm">
                  {new Date(order.date).toLocaleDateString()}
                </td>

                <td className="py-3 px-4 text-right">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    <Eye size={16} />
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className="py-6 text-center text-gray-500 text-sm">
            No orders match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
