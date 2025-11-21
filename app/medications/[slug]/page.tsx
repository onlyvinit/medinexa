"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  ShoppingCart,
} from "lucide-react";
import { medications } from "@/app/lib/medications";
import Image from "next/image";

export default function MedicationPage() {
  const params = useParams();
  const slug = params.slug as string;

  const medication = medications.find((med) => med.slug === slug);

  if (!medication) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-purple-50 opacity-50" />

        <div className="max-w-7xl mx-auto px-6 pt-12 pb-20 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-8 group"
          >
            <ArrowLeft
              size={20}
              className="mr-2 group-hover:-translate-x-1 transition-transform"
            />
            Back to Home
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fadeIn">
              <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold tracking-wide uppercase">
                Prescription Medication
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
                {medication.name}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                {medication.shortDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/intake">
                  <button className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
                    Start Treatment
                    <ShoppingCart size={20} />
                  </button>
                </Link>
                <div className="px-8 py-4 bg-white border-2 border-gray-100 text-gray-700 text-lg font-semibold rounded-xl shadow-sm flex items-center justify-center">
                  ${medication.price} / month
                </div>
              </div>

              <p className="text-sm text-gray-500 italic">
                *Prescription required. Eligibility determined by a licensed
                provider.
              </p>
            </div>

            <div className="relative lg:h-125 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.01] transition-transform duration-500">
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <Image
                  src={medication.image}
                  alt={medication.name}
                  width={1000}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-semibold text-gray-800">In Stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <HelpCircle className="text-blue-600" />
                What is {medication.name}?
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {medication.fullDescription}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CheckCircle className="text-green-600" />
                Key Benefits
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {medication.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100"
                  >
                    <CheckCircle
                      size={20}
                      className="text-green-600 shrink-0 mt-0.5"
                    />
                    <span className="text-gray-800 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {medication.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Treatment Details
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Dosage</div>
                  <div className="font-medium text-gray-900">
                    {medication.dosage}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">
                    Administration
                  </div>
                  <div className="font-medium text-gray-900">
                    Self-administered
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Frequency</div>
                  <div className="font-medium text-gray-900">
                    Weekly or Daily (see details)
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle size={20} className="text-orange-500" />
                Potential Side Effects
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Most side effects are mild and temporary.
              </p>
              <ul className="space-y-2">
                {medication.sideEffects.map((effect, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-gray-700 text-sm"
                  >
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                    {effect}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-blue-900 font-bold mb-2">
                Important Safety Information
              </h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                Do not take this medication if you have a personal or family
                history of medullary thyroid carcinoma (MTC) or Multiple
                Endocrine Neoplasia syndrome type 2 (MEN 2).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
