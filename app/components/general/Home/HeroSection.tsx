import React from "react";

export default function HeroSection() {
  return (
    <>
      <section className="relative w-full flex justify-center mt-4 p-5">
        <div className="w-full rounded-3xl overflow-hidden shadow-xl border border-white/20">
          <div className="relative w-full h-[600px] md:h-[80vh]">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
            >
              <source src="/videos/herosection.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white max-w-lg">
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight drop-shadow-xl">
                Transform your health, one step at a time.
              </h1>
              <p className="mt-3 text-white/80 text-lg md:text-xl">
                Personalized weight-loss care designed around you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
