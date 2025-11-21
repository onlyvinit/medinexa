"use client";

import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { getAllOrders } from "@/app/lib/orderService";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MedicationDistributionChart() {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    async function loadData() {
      const orders = await getAllOrders();

      // Count medication usage
      const counts: Record<string, number> = {};

      orders.forEach((order) => {
        if (!order.product?.name) return;
        const medName = order.product.name;
        counts[medName] = (counts[medName] || 0) + 1;
      });

      const labels = Object.keys(counts);
      const values = Object.values(counts);

      // If no orders exist yet → show empty placeholder
      if (labels.length === 0) {
        setChartData({
          labels: ["No data available"],
          datasets: [
            {
              data: [1],
              backgroundColor: ["#e5e7eb"],
              hoverBackgroundColor: ["#e5e7eb"],
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
              "#4f46e5", // Indigo
              "#22c55e", // Green
              "#f59e0b", // Amber
              "#ef4444", // Red
              "#3b82f6", // Blue
              "#a855f7", // Purple
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
        <Pie data={chartData} />
      </div>
    </div>
  );
}
