'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, animate } from 'framer-motion'

export function PreLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [displayProgress, setDisplayProgress] = useState(0)

  useEffect(() => {
    // Check if the user has already seen the intro during this browser tab session
    const hasSeenIntro = sessionStorage.getItem('wcc-has-seen-intro')
    if (hasSeenIntro) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    document.body.style.overflow = 'hidden'

    // Use Framer Motion's ultra-smooth animate function for the number counter
    const controls = animate(0, 100, {
      duration: 2.2, // Slightly longer for a more cinematic feel
      ease: [0.76, 0, 0.24, 1], // Butter-smooth custom cubic-bezier
      onUpdate: (val) => {
        setDisplayProgress(Math.round(val))
      },
      onComplete: () => {
        sessionStorage.setItem('wcc-has-seen-intro', 'true')
        setTimeout(() => {
          setIsLoading(false)
          document.body.style.overflow = ''
        }, 400) // Brief dramatic pause at 100% before exit
      }
    })

    return () => {
      controls.stop()
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505] px-6" // Slightly darker background
          initial={{ y: 0 }}
          exit={{
            y: '-100vh', // GPU accelerated transform
            opacity: 0,
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40 blur-[120px]">
            <div className="h-[400px] w-[400px] rounded-full bg-gold/10" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              className="relative mb-6 h-28 w-28 sm:h-36 sm:w-36"
            >
              <Image
                src="/images/wcc-logo.png"
                alt="WCC Garments Logo"
                fill
                className="object-contain drop-shadow-[0_0_30px_rgba(201,168,76,0.3)]"
                priority
                sizes="(max-width: 640px) 112px, 144px"
              />
            </motion.div>

            {/* Brand Title */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="text-center"
            >
              <h1 className="font-display text-2xl font-bold tracking-[0.15em] text-white sm:text-3xl">
                WCC <span className="font-light text-gold">GARMENTS</span>
              </h1>
              <p className="mt-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-white/50 sm:text-xs">
                Western Clothing Co. · Est. 2010
              </p>
            </motion.div>

            {/* Progress Bar & Number */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-12 w-64 sm:w-80"
            >
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/50 font-mono">
                <span>Initializing Systems</span>
                <span className="text-gold">{displayProgress}%</span>
              </div>

              <div className="mt-2.5 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                {/* GPU Accelerated ScaleX Animation */}
                <motion.div
                  className="h-full bg-gradient-to-r from-gold/40 via-gold to-gold origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 2.2, ease: [0.76, 0, 0.24, 1] }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
