"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getOrderById } from "@/app/lib/orderService";
import StatusBadge from "@/app/components/ui/StatusBadge";
import { ArrowLeft } from "lucide-react";

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const data = await getOrderById(id);
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Order Not Found
        </h2>
        <p className="text-gray-600">This order does not exist.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
      >
        <ArrowLeft size={18} />
        Back to Orders
      </button>

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          Order Details
        </h1>
        <p className="text-gray-500 mt-1">Order #{order.id}</p>
      </div>

      {/* ORDER INFO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* MEDICATION INFO */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Medication
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">
                {order.product?.name || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Price:</span>
              <span className="font-medium">
                ${order.product?.price || 0}/month
              </span>
            </div>
            <div className="border-t pt-3">
              <span className="text-gray-600 block mb-2">
                Recommendation Reason:
              </span>
              <p className="text-sm text-gray-700 leading-relaxed">
                {order.product?.reason || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* ORDER STATUS */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Order Status
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Status:</span>
              <StatusBadge status={order.status} />
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order Date:</span>
              <span className="font-medium">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment:</span>
              <span className="font-medium text-green-600">
                {order.payment?.status || "Completed"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Date:</span>
              <span className="font-medium">
                {order.payment?.date
                  ? new Date(order.payment.date).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PATIENT INFO */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Patient Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 block mb-1">Email:</span>
            <p className="font-medium">{order.userEmail}</p>
          </div>
          {order.patientInfo?.fullName && (
            <div>
              <span className="text-gray-600 block mb-1">Full Name:</span>
              <p className="font-medium">{order.patientInfo.fullName}</p>
            </div>
          )}
          {order.patientInfo?.phone && (
            <div>
              <span className="text-gray-600 block mb-1">Phone:</span>
              <p className="font-medium">{order.patientInfo.phone}</p>
            </div>
          )}
          {order.patientInfo?.age && (
            <div>
              <span className="text-gray-600 block mb-1">Age:</span>
              <p className="font-medium">{order.patientInfo.age} years</p>
            </div>
          )}
          {order.patientInfo?.gender && (
            <div>
              <span className="text-gray-600 block mb-1">Gender:</span>
              <p className="font-medium capitalize">
                {order.patientInfo.gender}
              </p>
            </div>
          )}
          {order.patientInfo?.address && (
            <div className="md:col-span-2">
              <span className="text-gray-600 block mb-1">Address:</span>
              <p className="font-medium">{order.patientInfo.address}</p>
            </div>
          )}
        </div>
      </div>

      {/* HEALTH METRICS */}
      {order.intakeAnswers && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Health Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            {order.intakeAnswers.weight && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <span className="text-gray-600 block mb-1">Weight:</span>
                <p className="font-semibold text-lg">
                  {order.intakeAnswers.weight} kg
                </p>
              </div>
            )}
            {order.intakeAnswers.height && (
              <div className="bg-green-50 p-4 rounded-lg">
                <span className="text-gray-600 block mb-1">Height:</span>
                <p className="font-semibold text-lg">
                  {order.intakeAnswers.height} cm
                </p>
              </div>
            )}
            {order.intakeAnswers.bmi && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <span className="text-gray-600 block mb-1">BMI:</span>
                <p className="font-semibold text-lg">
                  {order.intakeAnswers.bmi}
                </p>
              </div>
            )}
            {order.intakeAnswers.bmiLabel && (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <span className="text-gray-600 block mb-1">BMI Category:</span>
                <p className="font-semibold text-lg">
                  {order.intakeAnswers.bmiLabel}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* COMPLETE INTAKE ANSWERS */}
      {order.intakeAnswers && Object.keys(order.intakeAnswers).length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Complete Intake Responses
          </h3>
          <div className="space-y-4">
            {Object.entries(order.intakeAnswers).map(([key, value]) => {
              if (["weight", "height", "bmi", "bmiLabel"].includes(key)) {
                return null;
              }

              return (
                <div key={key} className="border-b pb-3 last:border-b-0">
                  <p className="text-sm font-medium text-gray-700 capitalize mb-1">
                    {key.replace(/_/g, " ")}
                  </p>
                  <p className="text-sm text-gray-900">
                    {Array.isArray(value) ? (
                      <span className="inline-flex flex-wrap gap-2">
                        {value.map((item, idx) => (
                          <span
                            key={idx}
                            className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                          >
                            {item}
                          </span>
                        ))}
                      </span>
                    ) : typeof value === "object" && value !== null ? (
                      <pre className="bg-gray-50 p-2 rounded text-xs overflow-auto">
                        {JSON.stringify(value, null, 2)}
                      </pre>
                    ) : (
                      <span className="font-medium">
                        {value?.toString() || "N/A"}
                      </span>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* RAW DATA (FOR DEBUGGING) */}
      <details className="bg-gray-50 rounded-xl border p-4">
        <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900">
          View Raw Order Data (Developer View)
        </summary>
        <pre className="mt-4 text-xs bg-white p-4 rounded border overflow-auto max-h-96">
          {JSON.stringify(order, null, 2)}
        </pre>
      </details>
    </div>
  );
}
