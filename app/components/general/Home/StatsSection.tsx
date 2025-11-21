import React from "react";
import Link from "next/link";
import { Zap, Heart, BarChart3 } from "lucide-react";
import ButtonPrimary from "../../ui/ButtonPrimary";
import CountUp from "../../ui/CountUp";

export default function StatsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <h2 className="text-4xl md:text-5xl text-[#0a0f29] font-serif tracking-tight">
            Lasting results, <span className="italic">lasting success.</span>
          </h2>
          <div className="w-full md:w-auto">
            <Link href="/intake">
                <ButtonPrimary 
                    label="Am I eligible?" 
                    className="!w-auto px-8 !bg-[#0a0f29] hover:!bg-[#1a214d] !rounded-full" 
                />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-blue-50/50 p-8 rounded-3xl hover:shadow-lg transition-shadow duration-300">
            <Zap className="w-6 h-6 text-[#0a0f29] mb-4" />
            <div className="text-4xl font-serif text-[#0a0f29] mb-4 flex items-baseline font-medium">
              <CountUp end={10} suffix="%" />
            </div>
            <p className="text-gray-600 leading-relaxed">
              weight loss is achieved in six months for over half of our members.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-blue-50/50 p-8 rounded-3xl hover:shadow-lg transition-shadow duration-300">
            <Heart className="w-6 h-6 text-[#0a0f29] mb-4" />
            <div className="text-4xl font-serif text-[#0a0f29] mb-4 flex items-baseline font-medium">
               <CountUp end={36} suffix=" pounds" />
            </div>
            <p className="text-gray-600 leading-relaxed">
              is the average weight loss for our members in their first year.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-blue-50/50 p-8 rounded-3xl hover:shadow-lg transition-shadow duration-300">
            <BarChart3 className="w-6 h-6 text-[#0a0f29] mb-4" />
            <div className="text-4xl font-serif text-[#0a0f29] mb-4 flex items-baseline font-medium">
               <CountUp end={5} suffix="/6" />
            </div>
            <p className="text-gray-600 leading-relaxed">
              of our members stay at least a second month.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
