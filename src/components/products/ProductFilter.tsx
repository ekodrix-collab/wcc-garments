'use client'

import { DIVISIONS } from '@/lib/constants'

interface ProductFilterProps {
  activeDivision: string
  onDivisionChange: (division: string) => void
}

export function ProductFilter({ activeDivision, onDivisionChange }: ProductFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onDivisionChange('')}
        className={`px-4 py-2 text-[11px] font-medium uppercase tracking-[0.15em] transition-all duration-300 ${
          activeDivision === ''
            ? 'border-b-2 border-gold text-gold'
            : 'border-b-2 border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
        }`}
      >
        All Products
      </button>
      {DIVISIONS.map((div) => (
        <button
          key={div.slug}
          onClick={() => onDivisionChange(div.slug)}
          className={`px-4 py-2 text-[11px] font-medium uppercase tracking-[0.15em] transition-all duration-300 ${
            activeDivision === div.slug
              ? 'border-b-2 border-gold text-gold'
              : 'border-b-2 border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          {div.name}
        </button>
      ))}
    </div>
  )
}
