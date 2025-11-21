"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { getAllOrders } from "@/app/lib/orderService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

export default function OrdersTrendChart() {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    async function loadData() {
      const orders = await getAllOrders();

      const labels: string[] = [];
      const counts: Record<string, number> = {};

      for (let i = 29; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const key = d.toISOString().split("T")[0];
        labels.push(key);
        counts[key] = 0;
      }

      orders.forEach((order) => {
        if (!order.createdAt) return;
        const dateKey = order.createdAt.split("T")[0];
        if (counts[dateKey] !== undefined) {
          counts[dateKey] += 1;
        }
      });

      const values = labels.map((d) => counts[d]);

      if (values.every((v) => v === 0)) {
        setChartData({
          labels,
          datasets: [
            {
              label: "Orders",
              data: Array(30).fill(0),
              borderColor: "#9ca3af",
              backgroundColor: "rgba(156,163,175,0.3)",
              tension: 0.3,
            },
          ],
        });
        return;
      }

      setChartData({
        labels,
        datasets: [
          {
            label: "Orders per Day",
            data: values,
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59,130,246,0.3)",
            pointBackgroundColor: "#1d4ed8",
            tension: 0.35,
          },
        ],
      });
    }

    loadData();
  }, []);

  return <Line data={chartData} />;
}
