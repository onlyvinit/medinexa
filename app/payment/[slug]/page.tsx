"use client";

import { useParams, useRouter } from "next/navigation";
import { products } from "@/app/database/product";
import { useState } from "react";
import Image from "next/image";
import ButtonPrimary from "@/app/components/ui/ButtonPrimary";

export default function PaymentPage() {
  const { slug } = useParams();
  const router = useRouter();

  const product = products.find((p) => p.slug === slug);

  const [cardNumber, setCardNumber] = useState("");
  const [loading, setLoading] = useState(false);

  if (!product) return <p className="text-center py-20">Product not found.</p>;

  const handlePayment = async () => {
    if (cardNumber.length < 8) {
      alert("Enter a valid card number");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/payment", {
      method: "POST",
      body: JSON.stringify({ slug }),
    });

    const data = await res.json();

    setLoading(false);

    if (data.success) {
      router.push(`/order/${slug}?status=success&orderId=${data.orderId}`);
    } else {
      router.push(`/order/${slug}?status=fail&reason=${data.error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-semibold mb-4">Complete Your Payment</h1>

        <div className="flex items-center gap-4 mb-4">
          <Image
            src={product.image}
            alt={product.name}
            width={80}
            height={80}
          />
          <div>
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}/month</p>
          </div>
        </div>

        <label className="block text-sm font-medium mb-1">
          Card Number (Fake)
        </label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <div className="mt-6">
          <ButtonPrimary
            label={loading ? "Processing..." : "Pay Now"}
            disabled={loading}
            onClick={handlePayment}
          />
        </div>
      </div>
    </div>
  );
}
