"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import ButtonPrimary from "./ButtonPrimary";

interface Product {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  image: string;
  features: string[];
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative h-[400px] w-full bg-blue-50/50 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-xl">
      <div className="absolute inset-0 p-8 flex flex-col justify-between transition-opacity duration-500 group-hover:opacity-0 pointer-events-none group-hover:pointer-events-none">
        <div>
          <h3 className="text-xl text-[#0a0f29] font-medium mb-2">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-serif text-[#0a0f29]">
              ${product.price}
            </span>
            <span className="text-gray-500 text-sm">/{product.period}</span>
          </div>
          <p className="text-xs text-blue-600 font-medium mt-1">+membership</p>
        </div>

        <div className="relative h-48 w-full flex items-center justify-center">
          <div className="relative w-32 h-48">
            <img
              src={product.image}
              alt={product.name}
              className="object-contain w-full h-full drop-shadow-xl"
            />
          </div>
        </div>

        <div className="pointer-events-auto">
          <Link href="/intake" className="block w-max">
            <ButtonPrimary
              label="Am I eligible?"
              className="!w-auto !px-8 !py-2.5 !text-sm !bg-[#0a0f29] hover:!bg-[#1a214d] !rounded-full"
            />
          </Link>
        </div>
      </div>

      <div className="absolute inset-0 bg-[#0a0f29] p-8 flex flex-col justify-between opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
        <div>
          <h3 className="text-xl text-white font-medium mb-4">
            {product.name}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            {product.description}
          </p>
          <ul className="space-y-3">
            {product.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 text-sm text-gray-200"
              >
                <div className="p-1 rounded-full bg-blue-500/20 text-blue-400">
                  <Check size={12} />
                </div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <Link href="/intake" className="w-full group/btn">
          <button className="w-full bg-white text-[#0a0f29] py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
            Get Started{" "}
            <ArrowRight
              size={16}
              className="group-hover/btn:translate-x-1 transition-transform"
            />
          </button>
        </Link>
      </div>
    </div>
  );
}
