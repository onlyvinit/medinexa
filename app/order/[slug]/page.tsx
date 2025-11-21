"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

import { products } from "@/app/database/product";
import { createOrder } from "@/app/lib/orderService";
import { Order } from "@/app/types/order";
import ButtonPrimary from "@/app/components/ui/ButtonPrimary";

export default function OrderStatusPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { user } = useAuth();

  const status = searchParams.get("status");
  const failReason = searchParams.get("reason") || "Unknown error";

  const [order, setOrder] = useState<Order | null>(null);
  const orderCreatedRef = useRef(false);

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-red-600">Invalid product.</p>
      </div>
    );
  }

  useEffect(() => {
    if (!user || status !== "success" || !product) return;
    if (orderCreatedRef.current) return;

    orderCreatedRef.current = true;

    const patientInfo =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("patientInfo") || "{}")
        : {};

    const intakeAnswers =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("intakeAnswers") || "{}")
        : {};

    const recommendation =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("recommendation") || "{}")
        : {};

    const orderId = "ORD-" + Math.floor(Math.random() * 900000 + 100000);

    const newOrder: Order = {
      id: orderId,
      userId: user.id,
      userEmail: user.email,

      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        slug: product.slug,
        reason: recommendation.reason || "",
      },

      patientInfo,
      intakeAnswers,

      payment: {
        status: "success",
        date: new Date().toISOString(),
      },

      status: "pending_review",
      createdAt: new Date().toISOString(),
    };

    async function saveOrder() {
      const savedOrder = await createOrder(newOrder);
      if (savedOrder) {
        setOrder(savedOrder);
      }
    }
    localStorage.removeItem("patientInfo");
    localStorage.removeItem("intakeAnswers");
    localStorage.removeItem("recommendation");
    localStorage.removeItem("intakeFlowState_v1");

    saveOrder();
  }, [status, user, product]);

  if (status === "fail") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-red-600">✘ Payment Failed</h1>

          <p className="text-gray-700 mt-3">
            Reason: <span className="font-semibold">{failReason}</span>
          </p>

          <p className="text-gray-600 mt-2">Don't worry, you can try again.</p>

          <ButtonPrimary
            label="Retry Payment"
            onClick={() => router.push(`/payment/${slug}`)}
          />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Finalizing your order...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-600">
          ✔ Payment Successful
        </h1>

        <p className="text-gray-700 mt-3">
          Your order <span className="font-semibold">{order.id}</span> has been
          placed.
        </p>

        <div className="mt-6 text-left">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>

          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="font-medium">{order.product?.name}</p>
            <p className="text-gray-600">${order.product?.price} / month</p>
            <p className="text-gray-600 mt-1 text-sm">
              Reason: {order.product?.reason}
            </p>
          </div>
        </div>

        <ButtonPrimary
          label="Go to Dashboard"
          className="mt-3"
          onClick={() => router.push("/dashboard")}
        />
      </div>
    </div>
  );
}
