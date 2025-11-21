import { Suspense } from "react";
import Header from "@/app/components/layout/Header";
import HeroSection from "./components/general/Home/HeroSection";
import StatsSection from "./components/general/Home/StatsSection";
import ProductCarousel from "./components/general/Home/ProductCarousel";
import FAQSection from "./components/general/Home/FAQSection";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <>
      <Suspense fallback={<div className="h-20" />}>
        <Header />
      </Suspense>
      <main>
        <HeroSection />
        <StatsSection />
        <ProductCarousel />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
