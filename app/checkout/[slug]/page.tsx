"use client";

import { products } from "@/app/database/product";
import { useParams, useSearchParams } from "next/navigation";

import ButtonPrimary from "@/app/components/ui/ButtonPrimary";
import Image from "next/image";

export default function CheckoutPage() {
  const { slug } = useParams() as { slug: string };
  const searchParams = useSearchParams();
  const reason =
    searchParams.get("reason") ||
    "This medication is suitable for your profile.";

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <h2 className="text-3xl font-semibold">Product Not Found</h2>
        <p className="text-gray-600 mt-2">
          Please go back and complete your intake again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* TITLE */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Your Recommended Medication
        </h1>

        {/* PRODUCT CARD */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 flex justify-center">
            <Image
              src={product.image}
              alt={product.name}
              width={180}
              height={180}
              className="object-contain rounded-lg"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-900">
              {product.name}
            </h2>
            <p className="text-gray-600 mt-2">{product.shortDescription}</p>

            {/* PRICE */}
            <div className="mt-4">
              <p className="text-xl font-semibold text-gray-900">
                ${product.price}
                <span className="ml-1 text-gray-500 text-base font-normal">
                  / month
                </span>
              </p>
            </div>

            {/* DOSAGE */}
            {product.dosage && (
              <p className="text-gray-500 text-sm mt-2">
                Typical Dosage: {product.dosage}
              </p>
            )}

            {/* BESTSELLER TAG */}
            {product.bestseller && (
              <span className="inline-block mt-3 px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                Bestseller
              </span>
            )}
          </div>
        </div>

        {/* WHY RECOMMENDED */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-8">
          <h3 className="text-xl font-semibold text-gray-900">
            Why this medication?
          </h3>

          <p className="text-gray-600 mt-2 leading-relaxed">{reason}</p>
        </div>

        {/* WHAT HAPPENS NEXT */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-8">
          <h3 className="text-xl font-semibold text-gray-900">
            What happens next?
          </h3>

          <ul className="mt-3 space-y-3 text-gray-600 list-disc pl-6">
            <li>Your intake answers are reviewed by a licensed physician.</li>
            <li>
              If approved, a prescription is issued based on your health
              profile.
            </li>
            <li>Your medication is prepared and shipped discreetly.</li>
            <li>
              You get ongoing support to track progress and adjust dosage.
            </li>
          </ul>
        </div>

        {/* CTA BUTTON */}
        <div className="mt-8">
          <ButtonPrimary
            label="Proceed to Payment"
            onClick={() => {
              window.location.href = `/payment/${product.slug}`;
            }}
          />
        </div>
      </div>
    </div>
  );
}
