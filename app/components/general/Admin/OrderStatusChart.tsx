"use client";

import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { getAllOrders } from "@/app/lib/orderService";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function OrderStatusChart() {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    async function loadData() {
      const orders = await getAllOrders();

      const statusCounts: Record<string, number> = {
        pending_review: 0,
        approved: 0,
        shipped: 0,
        completed: 0,
        declined: 0,
      };

      orders.forEach((order) => {
        statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
      });

      const labels = [
        "Pending Review",
        "Approved",
        "Shipped",
        "Completed",
        "Declined",
      ];
      const values = [
        statusCounts.pending_review,
        statusCounts.approved,
        statusCounts.shipped,
        statusCounts.completed,
        statusCounts.declined,
      ];

      if (values.every((v) => v === 0)) {
        setChartData({
          labels: ["No Orders"],
          datasets: [
            {
              data: [1],
              backgroundColor: ["#e5e7eb"],
            },
          ],
        });
        return;
      }

      setChartData({
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: [
              "#6366f1",
              "#22c55e",
              "#3b82f6",
              "#10b981",
              "#ef4444",
            ],
            hoverOffset: 6,
          },
        ],
      });
    }

    loadData();
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="w-64 h-64">
        <Doughnut data={chartData} />
      </div>
    </div>
  );
}
