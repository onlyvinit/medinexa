"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function AdminStatsCard({
  title,
  value,
  change,
  highlight = false,
}: {
  title: string;
  value: string | number;
  change?: string;
  highlight?: boolean;
}) {
  const isPositive = change?.startsWith("+");

  return (
    <div
      className={`p-5 rounded-xl shadow-sm border transition hover:shadow-md bg-white 
      ${highlight ? "border-yellow-400/60 bg-yellow-50" : "border-gray-200"}`}
    >
      {/* TITLE */}
      <p className="text-sm font-medium text-gray-600">{title}</p>

      {/* VALUE */}
      <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>

      {/* CHANGE */}
      {change && (
        <div
          className={`flex items-center gap-1 mt-2 text-sm font-medium ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight size={16} />
          ) : (
            <ArrowDownRight size={16} />
          )}
          {change}
        </div>
      )}
    </div>
  );
}
