"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function BulkOfferBanner() {
  const enabled = true;

  // Admin ON/OFF
  if (!enabled) return null;

  return (
    <section className="w-full">
      <div className="relative h-[250px] overflow-hidden md:h-[320px]">

        {/* Desktop Banner */}
        <Image
          src="/images/bulkoffer/offer.png"
          alt="Bulk Offer Banner"
          fill
          priority
          className="hidden object-fill md:block"
        />

        {/* Mobile Banner */}
        <Image
          src="/images/bulkoffer/offermobile.png"
          alt="Bulk Offer Banner"
          fill
          priority
          className="object-fill md:hidden"
        />

        {/* Limited Time Offer Badge */}
        <div className="absolute left-4 top-4 z-20 md:left-6 md:top-6">
          <div className="group relative overflow-hidden rounded-r-xl rounded-b-xl border border-white bg-[#030068] px-4 py-2 shadow-[0_0_30px_rgba(29,78,216,0.9)] md:px-6 md:py-3">

            {/* Glow Effect */}
            <div className="absolute inset-0 animate-pulse bg-white/10" />

            {/* Shine Animation */}
            <div className="absolute -left-16 top-0 h-full w-10 rotate-12 bg-white/40 blur-md transition-all duration-700 group-hover:left-[130%]" />

            {/* Text */}
            <p className="relative text-[9px] font-semibold uppercase tracking-wide text-white md:text-xs">
              Limited Time Offer
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 md:bottom-5 md:left-auto md:right-5 md:translate-x-0">
          <button className="group flex items-center gap-1 bg-blue-700 px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-600 md:px-6 md:py-2.5 md:text-sm">

            <span>Make Quotation</span>

            {/* Arrow */}
            <span className="flex h-5 w-7 items-center justify-center rounded-full transition-all duration-300 group-hover:translate-x-1">
              <ArrowRight size={18} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}