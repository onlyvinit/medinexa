"use client";

import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../../ui/ProductCard";
import productsData from "../../../database/products.json";

export default function ProductCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 400;
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl md:text-4xl text-[#0a0f29] font-serif tracking-tight mb-4">
            Weight loss medications at{" "}
            <span className="italic">affordable prices.</span>
          </h2>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex mb-10 gap-4">
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Carousel Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {productsData.map((product) => (
              <div
                key={product.id}
                className="min-w-75 md:min-w-100 snap-start shrink-0"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
