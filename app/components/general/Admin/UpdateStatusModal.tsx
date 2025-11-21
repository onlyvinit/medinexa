"use client";

import { useState } from "react";
import { X } from "lucide-react";
import ButtonPrimary from "@/app/components/ui/ButtonPrimary";
import StatusBadge from "../../ui/StatusBadge";

const STATUS_OPTIONS = [
  { label: "Pending Review", value: "pending_review" },
  { label: "Approved", value: "approved" },
  { label: "Shipped", value: "shipped" },
  { label: "Completed", value: "completed" },
  { label: "Declined", value: "declined" },
];

export default function UpdateStatusModal({
  orderId,
  currentStatus,
  onStatusChange,
}: {
  orderId: string;
  currentStatus: string;
  onStatusChange?: (status: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);

    await new Promise((res) => setTimeout(res, 800));

    if (onStatusChange) onStatusChange(status);

    setLoading(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* OPEN BUTTON */}
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
        onClick={() => setIsOpen(true)}
      >
        Update Status
      </button>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-3000">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
            {/* CLOSE BUTTON */}
            <button
              className="absolute right-4 top-4 text-gray-500"
              onClick={() => setIsOpen(false)}
            >
              <X size={22} />
            </button>

            {/* TITLE */}
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Update Order Status
            </h2>

            {/* CURRENT STATUS */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Current Status:</p>
              <StatusBadge status={currentStatus} />
            </div>

            {/* SELECT NEW STATUS */}
            <div className="space-y-1 mb-6">
              <label className="text-sm font-medium text-gray-700">
                Select new status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-gray-800 focus:ring-blue-500 focus:outline-none"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>

              <ButtonPrimary
                label={loading ? "Updating..." : "Update Status"}
                onClick={handleUpdate}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
