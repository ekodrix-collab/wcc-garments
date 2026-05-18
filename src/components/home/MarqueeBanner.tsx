'use client'

import { motion } from 'framer-motion'

const MARQUEE_ROW_1 = [
  'GARMENTS', 'UNIFORMS', 'HOSPITALITY', 'HOME FURNISHINGS',
  'FRAGRANCE', 'HOUSEHOLDS', 'INDUSTRIAL TEXTILES',
  'PRIVATE LABEL', 'BULK PRODUCTION', 'UAE EXPORT'
]

const MARQUEE_ROW_2 = [
  'WHOLESALE MANUFACTURING', 'GLOBAL DISTRIBUTION',
  'GCC SUPPLY', 'AFRICA EXPORT', 'OEM SERVICES',
  'ISO CERTIFIED', 'B2B FOCUSED', 'DUBAI BASED'
]

export function MarqueeBanner() {
  return (
    <div className="border-y border-[var(--border)] bg-[var(--bg-surface)] py-8 overflow-hidden font-mono text-xs font-bold uppercase tracking-[0.3em] text-[var(--text)]">
      {/* Row 1 — Moving Left */}
      <div className="marquee-container mb-6">
        <motion.div
          className="marquee-track flex items-center gap-12"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          {[...MARQUEE_ROW_1, ...MARQUEE_ROW_1, ...MARQUEE_ROW_1].map((item, index) => (
            <div key={index} className="flex items-center gap-12 flex-shrink-0">
              <span className="transition-colors hover:text-gold">{item}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2 — Moving Right */}
      <div className="marquee-container">
        <motion.div
          className="marquee-track flex items-center gap-12"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        >
          {[...MARQUEE_ROW_2, ...MARQUEE_ROW_2, ...MARQUEE_ROW_2].map((item, index) => (
            <div key={index} className="flex items-center gap-12 flex-shrink-0 text-[var(--text-muted)]">
              <span className="transition-colors hover:text-gold">{item}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--border)]" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
