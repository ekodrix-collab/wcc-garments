"use client";

import React, { useEffect, useRef, useState, JSX } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
}

interface Vec2 {
  x: number;
  y: number;
}

// ─── Starburst SVG Logo ───────────────────────────────────────────────────────
function StarburstLogo(): JSX.Element {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-spin-slow"
    >
      {Array.from({ length: 16 }).map((_, i: number) => {
        const angle = (i * 360) / 16;
        const rad = (angle * Math.PI) / 180;
        const inner = 6;
        const outer = i % 2 === 0 ? 17 : 13;

        return (
          <line
            key={i}
            x1={18 + Math.cos(rad) * inner}
            y1={18 + Math.sin(rad) * inner}
            x2={18 + Math.cos(rad) * outer}
            y2={18 + Math.sin(rad) * outer}
            stroke="#d4c9a8"
            strokeWidth={i % 2 === 0 ? 1.2 : 0.7}
          />
        );
      })}

      <circle cx="18" cy="18" r="3" fill="#d4c9a8" />
    </svg>
  );
}

// ─── Canvas Ball with Smoke Trail ─────────────────────────────────────────────
function BallCanvas(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const prevPosRef = useRef<Vec2>({ x: 0, y: 0 });
  const currentRRef = useRef<number>(16);
  const blendFactorRef = useRef<number>(0);

  useEffect((): (() => void) => {
    const canvas = canvasRef.current;
    if (!canvas) return () => { };

    const ctx = canvas.getContext("2d");
    if (!ctx) return () => { };



    const getPos = (t: number): Vec2 => {
      const isDesktop = canvas.width >= 1024;
      if (isDesktop) {
        return {
          x: canvas.width * 0.28 + canvas.width * 0.10 * Math.sin(t),
          y: canvas.height * 0.42 + canvas.height * 0.16 * Math.sin(t * 1.6 + 0.5),
        };
      } else {
        return {
          x: canvas.width * 0.5 + canvas.width * 0.22 * Math.sin(t),
          y: canvas.height * 0.22 + canvas.height * 0.08 * Math.sin(t * 1.6 + 0.5),
        };
      }
    };

    const spawnSmoke = (
      x: number,
      y: number,
      vx: number,
      vy: number
    ): void => {
      for (let i = 0; i < 3; i++) {
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: -vx * 0.15 + (Math.random() - 0.5) * 0.8,
          vy: -vy * 0.15 + (Math.random() - 0.5) * 0.8,
          life: 0,
          maxLife: 60 + Math.random() * 60,
          size: 4 + Math.random() * 14,
          opacity: 0.5 + Math.random() * 0.4,
        });
      }
    };

    prevPosRef.current = getPos(0);

    const draw = (): void => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      const t = timeRef.current;
      timeRef.current += 0.018;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pos = getPos(t);

      // Check if over content area
      const isDesktop = canvas.width >= 1024;
      let isHovering = false;
      if (isDesktop) {
        const dx = Math.abs(pos.x - canvas.width * 0.28);
        const dy = Math.abs(pos.y - canvas.height * 0.42);
        isHovering = dx < (canvas.width * 0.2) && dy < (canvas.height * 0.3);
      } else {
        const dx = Math.abs(pos.x - canvas.width * 0.5);
        const dy = Math.abs(pos.y - canvas.height * 0.22);
        isHovering = dx < (canvas.width * 0.4) && dy < (canvas.height * 0.15);
      }

      const targetR = isHovering ? 45 : 16;
      currentRRef.current += (targetR - currentRRef.current) * 0.05;
      const r = currentRRef.current;

      const targetBlend = isHovering ? 1 : 0;
      blendFactorRef.current += (targetBlend - blendFactorRef.current) * 0.05;
      const bf = blendFactorRef.current;

      // Flat beige circle for difference blending
      if (bf > 0.01) {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 236, 224, ${bf})`;
        ctx.fill();
      }

      // Normal rendered ball, faded out when zoomed
      if (bf < 0.99) {
        ctx.globalAlpha = 1 - bf;

        const bg = ctx.createRadialGradient(
          pos.x - r * 0.3,
          pos.y - r * 0.3,
          2,
          pos.x,
          pos.y,
          r
        );

        bg.addColorStop(0, "#f0ece0");
        bg.addColorStop(0.4, "#c8bfa0");
        bg.addColorStop(0.75, "#8c8070");
        bg.addColorStop(1, "#3a3530");

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        ctx.fillStyle = bg;
        ctx.fill();

        const sg = ctx.createRadialGradient(
          pos.x - r * 0.3,
          pos.y - r * 0.4,
          0,
          pos.x - r * 0.3,
          pos.y - r * 0.4,
          r * 0.6
        );

        sg.addColorStop(0, "rgba(255, 252, 240, 0.85)");
        sg.addColorStop(1, "rgba(255, 252, 240, 0)");

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        ctx.fillStyle = sg;
        ctx.fill();

        ctx.globalAlpha = 1.0;
      }

      prevPosRef.current = { ...pos };

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return (): void => {
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

// ─── Social Icon Wrapper ──────────────────────────────────────────────────────
function SocialIcon({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <a
      href="#"
      className="text-[#7a7260] hover:text-[#d4c9a8] transition-colors duration-300"
    >
      {children}
    </a>
  );
}

// ─── Campaign Data Sets ───────────────────────────────────────────────────────
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

// ─── Hero Section ─────────────────────────────────────────────────────────────
export function HeroSection(): JSX.Element {
  const [mounted, setMounted] = useState<boolean>(false);
  const [campaignIdx, setCampaignIdx] = useState<number>(0);

  useEffect((): void => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCampaignIdx((prev) => (prev + 1) % CAMPAIGN_SETS.length);
    }, 4500); // Rotate every 4.5 seconds
    return () => clearInterval(timer);
  }, []);

  const campaign = CAMPAIGN_SETS[campaignIdx];

  return (
    <>
      <section
        className={[
          "relative w-full min-h-screen md:min-h-[78svh] lg:min-h-[88svh] xl:min-h-[92svh] overflow-hidden noise-layer z-10",
          "bg-black",
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

        {/* Navigation */}
        <nav
          className={[
            "relative z-10 flex items-center justify-between px-12 py-7",
            mounted ? "animate-fade-down" : "opacity-0",
          ].join(" ")}
        >
          <div className="animate-spin-slow">
            <StarburstLogo />
          </div>

          <div className="flex items-center gap-5">
            <SocialIcon>
              <svg
                width="14"
                height="14"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </SocialIcon>

            <SocialIcon>
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </SocialIcon>

            <SocialIcon>
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="3" />
              </svg>
            </SocialIcon>
          </div>
        </nav>

        {/* Ball Canvas */}
        <div className="hidden md:block absolute inset-x-0 bottom-0 top-24 z-[50] pointer-events-none" style={{ mixBlendMode: 'difference' }}>
          <BallCanvas />
        </div>

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
                  className="font-sans md:font-bold text-white text-[28px] md:text-[clamp(52px,8vw,110px)] leading-tight md:leading-[0.95] tracking-[-0.06em] origin-center whitespace-nowrap drop-shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                >
                  CLOTHING
                </motion.span>

                {/* COMPANY */}
                <motion.span
                  initial={{ opacity: 0, scale: 0.35, y: 80, skewY: 0 }}
                  animate={{ opacity: 1, scale: 1, y: 0, skewY: 0 }}
                  transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                  className="font-sans md:font-bold text-white text-[28px] md:text-[clamp(52px,8vw,110px)] leading-tight md:leading-[0.95] tracking-[-0.06em] origin-center whitespace-nowrap drop-shadow-[0_0_30px_rgba(255,255,255,0.08)]"
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
                className="absolute w-[170px] h-[230px] md:w-[220px] md:h-[300px] overflow-hidden border border-white/10 shadow-2xl"
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
                className="absolute w-[170px] h-[230px] md:w-[220px] md:h-[300px] overflow-hidden border border-white/10 shadow-2xl"
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
                className="absolute w-[180px] h-[245px] md:w-[230px] md:h-[320px] overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10 group cursor-pointer"
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
                    "uppercase leading-[1.8] text-white md:text-blue-500/70 max-w-[700px] text-center md:text-left",
                    "animate-fade-up [animation-delay:1100ms]",
                    "pt-2",
                  ].join(" ")}
                >
                  An industrial fashion manufacturing group operating at global scale. Delivering bespoke garments, hospitality uniforms, home textiles, and premium raw materials across 50+ countries.
                </p>
              </div>

              {/* Action Button */}
              <div className="flex items-start justify-center md:justify-start w-full mt-6 animate-fade-up [animation-delay:1200ms]">
                <Link
                  href="/contact"
                  className="group flex items-center justify-center gap-2 border border-[#3b82f6] bg-[#3b82f6] w-full md:w-auto px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:border-white hover:text-black hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
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
