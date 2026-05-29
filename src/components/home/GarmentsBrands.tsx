"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { brandStore } from "@/lib/brand-store";
import { Brand } from "@/types";
import treasurelogo from "../../../public/images/tresurelogo.png";
import vandegrafflogo from "../../../public/images/vadegrafflogo.png";
import tomjacklogo from "../../../public/images/tomjacklogo.png";
import treasureimg from "../../../public/images/treaureimg.png";
import vandegraffimg from "../../../public/images/vendegraddimg.png";
import tomjackimg from "../../../public/images/tomkackimg.png";
import shirtlogo from "../../../public/images/shirt.png";

import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const BRAND_PANELS = [
  {
    id: "treasure",
    bg: "bg-[#1a1a1a]",
    accentColor: "#c9a84c",
    logo: treasurelogo,
    tagline: "Premium",
    description:
      "Sophisticated formalwear and refined essentials designed for the modern gentleman.",
    specializing: "Formal Shirts, Premium Collections & Tailored Essentials",
    href: "/products/garments?brand=treasure",
    segment: "Premium Line",
    image: treasureimg,
    icon: shirtlogo,
    iconBg: "bg-[#1a1a1a]",
  },
  {
    id: "vandegraff",
    bg: "bg-[#7a1515]",
    accentColor: "#f0c4c4",
    logo: vandegrafflogo,
    tagline: "Smart Casual",
    description:
      "Contemporary shirts and trousers blending comfort, style and uncompromised quality.",
    specializing: "Shirts, Trousers, Smart Casuals & Everyday Classics",
    href: "/products/garments?brand=vandegraff",
    segment: "Value Line",
    image: vandegraffimg,
    icon: shirtlogo,
    iconBg: "bg-[#7a1515]",
  },
  {
    id: "tom-jack",
    bg: "bg-[#1a2535]",
    accentColor: "#c9a84c",
    logo: tomjacklogo,
    tagline: "Casual Wear",
    description:
      "Modern casualwear made for those who live life on their own terms.",
    specializing: "Polo Tees, Casualwear, Basics & Lifestyle Collections",
    href: "/products/garments?brand=tom-jack",
    segment: "Active Premium",
    image: tomjackimg,
    icon: shirtlogo,
    iconBg: "bg-[#1a2535]",
  },
] as const;

export function GarmentsBrands() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isContainerInView = useInView(containerRef, {
    once: true,
    margin: "-100px",
  });
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    setBrands(brandStore.getBrands());
  }, []);

  const customBrands = brands.filter(
    (brand) =>
      brand.slug !== "treasure" &&
      brand.slug !== "vandegraff" &&
      brand.slug !== "tom-jack",
  );

  return (
    <section
      className="bg-[var(--bg)] px-5 md:px-0"
      ref={containerRef}
    >
      {/* ── TOP HERO SECTION ── */}
      <div className="relative overflow-hidden bg-[#f5f4f2] dark:bg-[var(--bg-subtle)] py-10 md:py-15">
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className="flex items-center gap-3 mb-3"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">
                  OUR BRANDS
                </span>
              </motion.div>

              <motion.h2
                className="mt-4 font-display text-4xl sm:text-5xl font-semibold text-[#1a1a1a] dark:text-white leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                Our Manufacturing <span className="text-gold">Brands</span>
              </motion.h2>

              <motion.p
                className="mt-6 max-w-md text-sm leading-relaxed text-[#5a5a5a] dark:text-[var(--text-muted)]"
                initial={{ opacity: 0 }}
                animate={isContainerInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.25 }}
              >
                WCC operates specialized brands, each with a distinct identity
                and shared dedication to quality, craftsmanship and style.
              </motion.p>
            </div>

            {/* View All CTA — top-right, desktop only */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.5,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="hidden sm:flex shrink-0 items-start pt-2"
            >
              <Link
                href="/products/garments"
                className="group btn-gold text-[10px] flex items-center gap-2"
              >
                View All Garments
                <span className="relative flex h-4 w-4 items-center justify-center">
                  <ArrowUpRight className="absolute h-4 w-4 transition-all duration-500 ease-in-out opacity-100 scale-100 translate-x-0 group-hover:opacity-0 group-hover:scale-75 group-hover:translate-x-2" />
                  <ArrowRight className="absolute h-4 w-4 opacity-0 scale-75 -translate-x-2 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── THREE BRAND PANELS ── */}
      {/* CHANGED: added gap-y-3 for mobile spacing between stacked panels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 sm:gap-y-0">
        {BRAND_PANELS.map((brand, index) => {
          return (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.1,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="relative"
            >
              <Link
                href={brand.href}
                className={`group relative flex flex-col overflow-hidden ${brand.bg} transition-all duration-500`}
                data-cursor="view"
              >
                {/* Background photo with overlay */}
                <div className="absolute inset-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out "
                    style={{ backgroundImage: `url('${brand.image.src}')` }}
                  />
                  <div className="absolute inset-0 " />
                </div>

                {/* Image overlay content */}
                <div
                  className="relative z-10 flex flex-col p-8"
                  style={{ minHeight: "380px" }}
                >
                  {/* Logo area — top */}
                  <div className="mb-auto flex ">
                    <Image
                      src={brand.logo}
                      alt={`${brand.segment} Logo`}
                      className="h-8 w-auto object-contain"
                    />
                  </div>

                  {/* Middle: tagline + divider + description */}
                  <div className="mt-8">
                    <h3 className="text-[#f8aa00] font-bold leading-tight uppercase">
                      {brand.tagline}
                    </h3>
                    <p className="mt-4 text-white text-sm leading-relaxed">
                      {brand.description}
                    </p>
                  </div>
                </div>

                {/* White bottom strip: specializing + discover */}
                {/* CHANGED: added mx-3 mb-3 rounded-b-lg on mobile; reset at sm: */}
                <div className="relative h-[120px] z-10 bg-white dark:bg-[var(--bg-surface)] px-5 py-5 border dark:border-[var(--border)] sm:mx-0 sm:mb-0 sm:rounded-none">
                  <div className="flex h-full items-center justify-between gap-4">
                    <div
                      className={` ${brand.iconBg} p-2  border border-black rounded-full`}
                    >
                      <Image
                        src={brand.icon}
                        alt="Shirt Logo"
                        className="h-10 w-auto object-contain"
                      />
                    </div>
                    <div>
                      <span className="block text-[8px] uppercase tracking-[0.3em] font-semibold mb-2 text-gold">
                        SPECIALIZING IN
                      </span>
                      <span className="text-[11px] text-[#3a3a3a] dark:text-[var(--text)] leading-snug">
                        {brand.specializing}
                      </span>
                    </div>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] transition-all duration-300 group-hover:border-gold group-hover:bg-gold">
                      <span className="relative flex h-4 w-4 items-center justify-center">
                        <ArrowUpRight className="absolute h-4 w-4 text-[var(--text-muted)] transition-all duration-500 ease-in-out opacity-100 scale-100 translate-x-0 group-hover:opacity-0 group-hover:scale-75 group-hover:translate-x-2" />
                        <ArrowRight className="absolute h-4 w-4 text-white opacity-0 scale-75 -translate-x-2 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0" />
                      </span>
                    </div>
                  </div>
                  {/* Gold accent line */}
                  <div className="mt-4 h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* View All CTA — mobile only, full width */}
      {/* CHANGED: added w-full and justify-center to make button full width on mobile */}
      <div className="flex sm:hidden mt-10 border-t border-[var(--border)] bg-[var(--bg)]">
        <Link
          href="/products/garments"
          className="group btn-gold font-mono text-xs font-bold tracking-[0.2em] rounded-none flex w-full items-center justify-center gap-2"
        >
          View All Garments
          <span className="relative flex h-4 w-4 items-center justify-center">
            <ArrowUpRight className="absolute h-4 w-4 transition-all duration-500 ease-in-out opacity-100 scale-100 translate-x-0 group-hover:opacity-0 group-hover:scale-75 group-hover:translate-x-2" />
            <ArrowRight className="absolute h-4 w-4 opacity-0 scale-75 -translate-x-2 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0" />
          </span>
        </Link>
      </div>

      {/* ── CUSTOM BRANDS (dynamic) ── */}
      {customBrands.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isContainerInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.45 }}
          className="bg-[var(--bg)] border-t border-[var(--border)] px-6 lg:px-12 py-8 mx-auto max-w-[1440px]"
        >
          <span className="mb-4 block font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)]">
            Dynamically synchronized portfolios
          </span>
          <div className="flex flex-wrap gap-4">
            {customBrands.map((brand) => (
              <Link
                key={brand.id}
                href={`/products/garments?brand=${brand.slug}`}
                className="border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text)] transition-colors hover:border-gold hover:text-gold"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}