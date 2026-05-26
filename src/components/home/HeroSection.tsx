"use client";

import React, { useEffect, useState, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const BLUR_PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

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

const ALL_IMAGE_PATHS = Array.from(
  new Set(CAMPAIGN_SETS.flatMap((c) => [c.center, c.left, c.right]))
);

export function HeroSection(): JSX.Element {
  const [campaignIdx, setCampaignIdx] = useState<number>(0);
  const [allLoaded, setAllLoaded] = useState<boolean>(false);

  useEffect(() => {
    let count = 0;
    ALL_IMAGE_PATHS.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = img.onerror = () => {
        count += 1;
        if (count >= ALL_IMAGE_PATHS.length) setAllLoaded(true);
      };
    });
  }, []);

  useEffect(() => {
    if (!allLoaded) return;
    const timer = setInterval(() => {
      setCampaignIdx((prev) => (prev + 1) % CAMPAIGN_SETS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [allLoaded]);

  const campaign = CAMPAIGN_SETS[campaignIdx];

  return (
    <>
      <section
        className={[
          "relative w-full min-h-screen md:h-[88svh] lg:h-[98svh] xl:h-[102svh] overflow-hidden noise-layer z-5 flex items-center justify-center pt-10",
          "bg-white dark:bg-black animate-fade-in",
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
        <div className="relative z-[5] w-full flex flex-col items-center justify-center hover-trigger cursor-default px-6 md:px-0 py-16 md:py-0">
          <div className="relative w-full max-w-[1440px] md:px-12 flex flex-col md:grid md:grid-cols-12 md:grid-rows-[auto_auto] md:gap-8 md:items-center gap-12">

            {/* ── TEXT BLOCK ── */}
            <div className="flex flex-col items-center md:items-start md:col-start-1 md:col-span-7 md:row-start-1 md:row-span-2 md:self-center justify-center text-center md:text-left">
              <div className="flex flex-col items-center md:items-start gap-0">

                <motion.span
                  initial={{ opacity: 0, scale: 1.8, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="font-sans font-bold text-[#3b82f6] text-[clamp(36px,9vw,110px)] leading-[0.9] tracking-[-0.03em] whitespace-nowrap"
                  style={{
                    WebkitTextStroke: '1.2px #3b82f6',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  WESTERN
                </motion.span>

                <motion.span
                  initial={{ opacity: 0, scale: 0.35, y: 80 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                  className="font-sans font-bold text-black dark:text-white text-[clamp(36px,9vw,110px)] leading-[0.9] tracking-[-0.06em] whitespace-nowrap drop-shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                >
                  CLOTHING
                </motion.span>

                <motion.span
                  initial={{ opacity: 0, scale: 0.35, y: 80 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                  className="font-sans font-bold text-black dark:text-white text-[clamp(36px,9vw,110px)] leading-[0.9] tracking-[-0.06em] whitespace-nowrap drop-shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                >
                  COMPANY
                </motion.span>
              </div>

              <p
                className={[
                  "mt-6 font-barlow-body text-[10px] sm:text-[11px] font-bold tracking-[0.15em]",
                  "uppercase leading-[1.8] text-neutral-700 dark:text-neutral-300 md:text-blue-600/80 md:dark:text-blue-400/80 max-w-[480px] md:max-w-[700px]",
                  "animate-fade-up [animation-delay:1100ms]",
                ].join(" ")}
              >
                An industrial fashion manufacturing group operating at global scale. Delivering bespoke garments, hospitality uniforms, home textiles, and premium raw materials across 50+ countries.
              </p>

              <div className="mt-8 w-full flex justify-center md:justify-start animate-fade-up [animation-delay:1200ms]">
                <Link
                  href="/contact"
                  className="group flex items-center justify-center gap-2 border border-[#3b82f6] bg-[#3b82f6] w-full sm:w-auto px-8 py-3.5 font-mono text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-black hover:border-black hover:text-white dark:hover:bg-white dark:hover:border-white dark:hover:text-black"
                >
                  <span>Request a Quotation</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>

            {/* ── IMAGE CAROUSEL BLOCK ── */}
            <div className="relative flex items-center justify-center md:col-start-8 md:col-span-5 md:row-start-1 md:row-span-2 w-full h-[320px] sm:h-[400px] md:h-[540px] select-none z-[40]">

              {/* Hidden preload */}
              <div className="absolute w-0 h-0 overflow-hidden pointer-events-none opacity-0" aria-hidden="true">
                {ALL_IMAGE_PATHS.map((src) => (
                  <Image key={src} src={src} alt="" fill priority sizes="1px" className="object-cover" />
                ))}
              </div>

              {/* Left Card */}
              <AnimatePresence>
                <motion.div
                  key={`left-${campaign.id}`}
                  initial={{ opacity: 0, x: -120, y: 0, rotate: -20 }}
                  animate={{ opacity: 0.4, x: -65, y: -25, rotate: -10 }}
                  exit={{ opacity: 0, x: -40, rotate: -5, transition: { duration: 0.4, ease: "easeIn" } }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                  className="absolute w-[160px] h-[220px] sm:w-[200px] sm:h-[270px] md:w-[260px] md:h-[360px] overflow-hidden"
                  style={{
                    border: "1px boreder-black",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.06)",
                  }}
                >
                  <Image
                    src={campaign.left}
                    alt="Campaign background"
                    fill
                    priority
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                    sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 260px"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Right Card */}
              <AnimatePresence>
                <motion.div
                  key={`right-${campaign.id}`}
                  initial={{ opacity: 0, x: 120, y: 40, rotate: 20 }}
                  animate={{ opacity: 0.3, x: 65, y: 15, rotate: 8 }}
                  exit={{ opacity: 0, x: 40, rotate: 5, transition: { duration: 0.4, ease: "easeIn" } }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
                  className="absolute w-[160px] h-[220px] sm:w-[200px] sm:h-[270px] md:w-[260px] md:h-[360px] overflow-hidden"
                  style={{
                    border: "1px boreder-black",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.06)",
                  }}
                >
                  <Image
                    src={campaign.right}
                    alt="Campaign background detail"
                    fill
                    priority
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                    sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 260px"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Center Card */}
              <AnimatePresence>
                <motion.div
                  key={`center-${campaign.id}`}
                  initial={{ opacity: 0, scale: 0.8, y: 80, rotate: 0 }}
                  animate={{ opacity: 1, scale: 1, y: -10, rotate: -2 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.4, ease: "easeIn" } }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
                  className="absolute w-[180px] h-[245px] sm:w-[220px] sm:h-[300px] md:w-[280px] md:h-[390px] overflow-hidden z-10 group cursor-pointer"
                  style={{
                    border: "1px boreder-black",
                    boxShadow: "0 0 0 1px rgba(0,0,0,0.08), 0 20px 60px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.08)",
                  }}
                >
                  <Image
                    src={campaign.center}
                    alt={campaign.title}
                    fill
                    priority
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                    sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 280px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 flex flex-col items-start">
                    <span className="font-mono text-[8px] font-bold tracking-[0.2em] text-[#3b82f6] uppercase mb-1">
                      {campaign.tag}
                    </span>
                    <span className="font-display text-sm md:text-xl font-medium text-white leading-tight">
                      {campaign.title}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}