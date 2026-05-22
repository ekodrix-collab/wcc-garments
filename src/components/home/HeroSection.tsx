"use client";

import React, { useEffect, useState, JSX } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const CAMPAIGN_SETS = [
  {
    id: 1,
    center: "/images/products/egyptian_cotton_shirt.png",
    left: "/images/products/cargo_work_pants.png",
    right: "/images/products/chef_uniform.png",
    title: "Industrial Elegance",
    tag: "Campaign 2026"
  },
  {
    id: 2,
    center: "/images/products/hotel_bed_linen.png",
    left: "/images/products/luxury_bath_towels.png",
    right: "/images/products/egyptian_cotton_shirt.png",
    title: "Hospitality & Bedding",
    tag: "Luxury Suite"
  },
  {
    id: 3,
    center: "/images/products/chef_uniform.png",
    left: "/images/products/cargo_work_pants.png",
    right: "/images/products/hotel_bed_linen.png",
    title: "Professional Workwear",
    tag: "Corporate Uniforms"
  }
];

export function HeroSection(): JSX.Element {
  const [mounted, setMounted] = useState<boolean>(false);
  const [campaignIdx, setCampaignIdx] = useState<number>(0);

  useEffect((): void => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCampaignIdx((prev) => (prev + 1) % CAMPAIGN_SETS.length);
    }, 4500); 
    return () => clearInterval(timer);
  }, []);

  const campaign = CAMPAIGN_SETS[campaignIdx];

  return (
    <>
      <section
        className={[
          "relative w-full h-screen md:h-[78svh] lg:h-[88svh] xl:h-[92svh] overflow-hidden noise-layer z-5 py-20",
          "bg-white dark:bg-black",
          mounted ? "opacity-100" : "opacity-0",
          "transition-opacity duration-500",
        ].join(" ")}
      >
        {/* Ambient Glow */}
        <div
          className={[
            "absolute w-[600px] h-[600px] -top-24 left-[40%]",
            "rounded-full pointer-events-none z-0 animate-glow-pulse",
            "bg-[radial-gradient(circle,rgba(180,160,100,0.04)_0%,transparent_70%)]",
          ].join(" ")}
        />

        {/* Hero Content */}
        <div className="relative z-[5] w-full flex flex-col items-center justify-center min-h-[calc(100svh-120px)] md:min-h-[calc(78svh-120px)] lg:min-h-[calc(88svh-120px)] xl:min-h-[calc(92svh-120px)] pt-0 hover-trigger cursor-default">
          <div className="relative w-full max-w-[1440px] px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 md:grid-rows-[auto_auto] gap-y-0 md:gap-8 items-center">

            {/* ── Block 1: Heading (mobile order-1, desktop left col row-1) ── */}
            <div className="relative flex flex-col order-1 md:col-start-1 md:col-span-7 md:row-start-1 md:self-end pb-0">

              {/* Mobile: all three on one line │ Desktop: stacked */}
              <div className="flex flex-row items-baseline justify-center gap-x-[0.5em] md:flex-col md:justify-start md:gap-x-0">

                {/* WESTERN */}
                <motion.span
                  initial={{ opacity: 0, scale: 1.8, y: 40, skewY: 0 }}
                  animate={{ opacity: 1, scale: 1, y: 0, skewY: 0 }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="font-sans md:font-bold text-[#3b82f6] text-[28px] md:text-[clamp(52px,8vw,110px)] leading-tight md:leading-[0.8] tracking-[-0.03em] origin-left whitespace-nowrap"
                  style={{
                    WebkitTextStroke: '1.2px #3b82f6',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  WESTERN
                </motion.span>

                {/* CLOTHING */}
                <motion.span
                  initial={{ opacity: 0, scale: 0.35, y: 80, skewY: 0 }}
                  animate={{ opacity: 1, scale: 1, y: 0, skewY: 0 }}
                  transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                  className="font-sans md:font-bold text-black dark:text-white text-[28px] md:text-[clamp(52px,8vw,110px)] leading-tight md:leading-[0.95] tracking-[-0.06em] origin-center whitespace-nowrap drop-shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                >
                  CLOTHING
                </motion.span>

                {/* COMPANY */}
                <motion.span
                  initial={{ opacity: 0, scale: 0.35, y: 80, skewY: 0 }}
                  animate={{ opacity: 1, scale: 1, y: 0, skewY: 0 }}
                  transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                  className="font-sans md:font-bold text-black dark:text-white text-[28px] md:text-[clamp(52px,8vw,110px)] leading-tight md:leading-[0.95] tracking-[-0.06em] origin-center whitespace-nowrap drop-shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                >
                  COMPANY
                </motion.span>

              </div>
            </div>

            {/* ── Block 2: Image (mobile order-2, desktop right col spans both rows) ── */}
            <div className="relative flex items-center justify-center order-2 md:col-start-8 md:col-span-5 md:row-start-1 md:row-span-2 w-full h-[320px] md:h-[460px] mt-6 md:mt-0 select-none z-[40]">
              {/* Left Card (Background) */}
              <motion.div
                key={`${campaign.id}-left`}
                initial={{ opacity: 0, x: -120, y: 0, rotate: -20 }}
                animate={{ opacity: 0.4, x: -70, y: -30, rotate: -10 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                className="absolute w-[170px] h-[230px] md:w-[220px] md:h-[300px] overflow-hidden border border-black/10 dark:border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.08)]"
              >
                <Image
                  src={campaign.left}
                  alt="Campaign background"
                  fill
                  sizes="(max-width: 1024px) 200px, 240px"
                  className="object-cover grayscale"
                />
              </motion.div>

              {/* Right Card (Background) */}
              <motion.div
                key={`${campaign.id}-right`}
                initial={{ opacity: 0, x: 120, y: 40, rotate: 20 }}
                animate={{ opacity: 0.3, x: 70, y: 15, rotate: 8 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
                className="absolute w-[170px] h-[230px] md:w-[220px] md:h-[300px] overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl"
              >
                <Image
                  src={campaign.right}
                  alt="Campaign background detail"
                  fill
                  sizes="(max-width: 1024px) 200px, 240px"
                  className="object-cover grayscale"
                />
              </motion.div>

              {/* Center Card (Foreground) */}
              <motion.div
                key={`${campaign.id}-center`}
                initial={{ opacity: 0, scale: 0.8, y: 80, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, y: -10, rotate: -2 }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
                className="absolute w-[180px] h-[245px] md:w-[230px] md:h-[320px] overflow-hidden border border-black/20 dark:border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10 group cursor-pointer"
              >
                <Image
                  src={campaign.center}
                  alt={campaign.title}
                  fill
                  sizes="(max-width: 1024px) 210px, 250px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                {/* Content inside the main card */}
                <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col items-start">
                  <span className="font-mono text-[8px] font-bold tracking-[0.2em] text-[#3b82f6] uppercase mb-1">
                    {campaign.tag}
                  </span>
                  <span className="font-display text-lg md:text-xl font-medium text-white leading-tight">
                    {campaign.title}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* ── Block 3: Description + Button (mobile order-3, desktop left col row-2) ── */}
            <div className="relative flex flex-col order-3 md:col-start-1 md:col-span-7 md:row-start-2 md:self-start pt-4 md:pt-0">
              {/* Body Text */}
              <div className="flex items-start justify-center md:justify-start w-full overflow-hidden">
                <p
                  className={[
                    "font-barlow-body text-[9px] font-bold tracking-[0.15em]",
                    "uppercase leading-[1.8] text-neutral-700 dark:text-neutral-300 md:text-blue-600/80 md:dark:text-blue-400/80 max-w-[700px] text-center md:text-left",
                    "animate-fade-up [animation-delay:1100ms]",
                    "pt-2",
                  ].join(" ")}
                >
                  An industrial fashion manufacturing group operating at global scale. Delivering bespoke garments, hospitality uniforms, home textiles, and premium raw materials across 50+ countries.
                </p>
              </div>

              {/* Action Button */}
              <div className="flex items-start justify-center md:justify-start md:mb-20 w-full mt-6 animate-fade-up [animation-delay:1200ms]">
                <Link
                  href="/contact"
                  className="group flex items-center justify-center gap-2 border border-[#3b82f6] bg-[#3b82f6] w-full md:w-auto px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-black hover:border-black hover:text-white dark:hover:bg-white dark:hover:border-white dark:hover:text-black hover:shadow-[0_0_25px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                >
                  <span>Request a Quotation</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
