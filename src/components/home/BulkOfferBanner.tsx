"use client";

import Image from "next/image";
import { ArrowUpRight, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

interface BulkOfferBannerProps {
  enabled?: boolean;
  tagText?: string;
  headingStart?: string;
  headingHighlight?: string;
  description?: string;
  discountPercentage?: number;
  discountText?: string;
  discountSubText?: string;
  offerEndDate?: string;
  buttonText?: string;
  slideImages?: string[];
}

import { contentStore } from "@/lib/content-store";
import Link from "next/link";

export default function BulkOfferBanner({
  enabled = true,
  tagText = "Bulk Garments Order",
  headingStart = "Exclusive Discounts on Bulk Garment",
  headingHighlight = "Orders",
  description = "Large-scale premium clothing production for brands, wholesalers, and businesses with top-quality materials and reliable delivery.",
  discountPercentage = 25,
  discountText = "Flat Discount",
  discountSubText = "On orders above 500 pieces",
  offerEndDate = "June 30, 2026",
  buttonText = "Get Quote",
  slideImages = [
    "/images/bulkoffer/premium_hoodie.png",
    "/images/bulkoffer/premium_jeans.png",
    "/images/bulkoffer/premium_shirt.png",
  ],
}: BulkOfferBannerProps) {
  const [current, setCurrent] = useState(0);

  const [data, setData] = useState({
    enabled, tagText, headingStart, headingHighlight, description,
    discountPercentage, discountText, discountSubText, offerEndDate,
    buttonText, slideImages
  });

  const slideImagesString = JSON.stringify(slideImages);

  useEffect(() => {
    const loaded = contentStore.getSectionData("bulk-offer", {
      enabled, tagText, headingStart, headingHighlight, description,
      discountPercentage, discountText, discountSubText, offerEndDate,
      buttonText, slideImages
    });
    setData(loaded);
  }, [enabled, tagText, headingStart, headingHighlight, description, discountPercentage, discountText, discountSubText, offerEndDate, buttonText, slideImagesString]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % data.slideImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [data.slideImages.length]);

  if (!data.enabled) return null;

  return (
    <section className="relative overflow-hidden bg-black py-5">
      <div className="relative mx-auto max-w-7xl">
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 items-center gap-10 px-5 py-10 md:p-8 lg:grid-cols-2 lg:p-14">

            {/* Left Content */}
            <div className="space-y-8">

              {/* Tag / Overline */}
              <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">
                {data.tagText}
              </span>

              {/* Heading */}
              <div className="space-y-0">
                <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
                  {data.headingStart} <span className="text-gold">{data.headingHighlight}</span>
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-400">
                  {data.description}
                </p>
              </div>

              {/* Offer Card */}
              <div className="flex flex-col gap-5 border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-purple-600 text-2xl font-bold text-white shadow-lg">
                    {data.discountPercentage}%
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      {data.discountText}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {data.discountSubText}
                    </p>
                  </div>
                </div>

                <div className="hidden h-12 w-px bg-white/10 sm:block" />

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <Calendar className="text-purple-400" size={20} />
                  <div>
                    <p className="text-xs text-gray-400">Offer Ends</p>
                    <p className="text-sm font-medium text-white">{data.offerEndDate}</p>
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className="hidden lg:block w-full">
                <Link
                  href="/contact?source=new-arrivals&intent=request-quote&businessType=Wholesale%20Distributor"
                  className="btn-gold text-[10px]"
                >
                  {data.buttonText} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Side Slider */}
            <div className="relative flex h-[400px] lg:h-[520px] w-full items-center justify-center overflow-hidden">

              {/* Glow */}
              <div className="absolute h-[300px] w-[300px] lg:h-[350px] lg:w-[350px] rounded-full bg-blue-500/20 blur-[120px]" />

              {/* Main Slider */}
              <div className="relative h-[350px] w-full md:h-[430px] md:w-full overflow-hidden rounded-3xl bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                <div
                  className="flex h-full transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${current * 100}%)` }}
                >
                  {data.slideImages.map((img, index) => (
                    <div key={index} className="relative h-full min-w-full overflow-hidden">
                      <Image
                        src={img}
                        alt={`Bulk Product ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Button - Bottom */}
            <div className="w-full lg:hidden text-center">
              <Link
                href="/contact?source=new-arrivals&intent=request-quote&businessType=Wholesale%20Distributor"
                className="btn-gold text-[10px]"
              >
                {data.buttonText} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}