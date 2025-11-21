"use client";

import MedicationStatus from "../components/general/Dashboard/MedicationStatus";
import OrderList from "../components/general/Dashboard/OrderList";
import { useIntakeSummary } from "@/app/hooks/useIntakeSummary";

export default function Dashboard() {
  const intakeAnswers = useIntakeSummary();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          Welcome back 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Here's a quick overview of your health journey.
        </p>
      </div>

      <MedicationStatus />

      <OrderList />
    </div>
  );
}
