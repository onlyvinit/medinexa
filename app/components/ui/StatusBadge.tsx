"use client";

import React from "react";

export default function StatusBadge({ status }: { status: string }) {
  const colors: any = {
    pending_review: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    shipped: "bg-blue-100 text-blue-700",
    completed: "bg-purple-100 text-purple-700",
    declined: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${colors[status]}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
