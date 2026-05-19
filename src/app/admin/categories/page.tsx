'use client'

import { useState } from 'react'
import { Plus, FolderOpen, MoreVertical, Layers, CheckCircle2, TrendingUp, Sparkles, Filter, ShieldCheck, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { DIVISIONS } from '@/lib/constants'

interface CategoryItem {
  id: string
  name: string
  slug: string
  division: string
  count: number
  status: 'Active' | 'Locked'
  description: string
}

const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: 'CAT-01', name: 'Formal & Executive Wear', slug: 'formal-executive-wear', division: 'Garments', count: 8, status: 'Active', description: 'Premium bespoke formal shirting and suiting for corporate export.' },
  { id: 'CAT-02', name: 'Industrial & Heavy Duty', slug: 'industrial-heavy-duty', division: 'Uniforms', count: 12, status: 'Active', description: 'High-durability coveralls, flame-retardant workwear, and safety gear.' },
  { id: 'CAT-03', name: 'Hospitality & Culinary Linens', slug: 'hospitality-culinary-linens', division: 'Hospitality', count: 15, status: 'Active', description: 'Luxury hotel bedsheets, bathrobes, chef jackets, and aprons.' },
  { id: 'CAT-04', name: 'Healthcare Scubs & Coats', slug: 'healthcare-scrubs', division: 'Uniforms', count: 9, status: 'Active', description: 'Anti-microbial medical scrubs, lab coats, and patient attire.' },
  { id: 'CAT-05', name: 'Home Furnishings & Drapery', slug: 'home-furnishings', division: 'Home', count: 6, status: 'Active', description: 'Curated home linen, curtains, table runners, and upholstery fabrics.' },
  { id: 'CAT-06', name: 'Oud & Niche Attars', slug: 'oud-niche-attars', division: 'Fragrance', count: 5, status: 'Active', description: 'Precious pure oud oils, niche perfumes, and private label bottling.' },
  { id: 'CAT-07', name: 'Bulk Household Essentials', slug: 'bulk-households', division: 'Households', count: 7, status: 'Active', description: 'Commercial cleaning supplies, microfiber towels, and bulk detergents.' },
]

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>(INITIAL_CATEGORIES)
  const [selectedDivision, setSelectedDivision] = useState<string>('all')
  const [newModalOpen, setNewModalOpen] = useState(false)
  const [newCat, setNewCat] = useState({ name: '', slug: '', division: 'Garments', description: '' })

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCat.name || !newCat.slug) return
    const created: CategoryItem = {
      id: `CAT-${String(categories.length + 1).padStart(2, '0')}`,
      name: newCat.name,
      slug: newCat.slug.toLowerCase().replace(/\s+/g, '-'),
      division: newCat.division,
      count: 0,
      status: 'Active',
      description: newCat.description || 'New taxonomy classification node.'
    }
    setCategories([created, ...categories])
    setNewCat({ name: '', slug: '', division: 'Garments', description: '' })
    setNewModalOpen(false)
  }

  const filteredCategories = categories.filter(c => {
    if (selectedDivision === 'all') return true
    return c.division.toLowerCase() === selectedDivision.toLowerCase()
  })

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto text-white">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-3xl font-bold tracking-tight text-white">Taxonomy Classification</h1>
            <span className="rounded-full bg-gold/10 border border-gold/30 px-3 py-0.5 font-mono text-xs font-bold text-gold">
              {categories.length} Nodes
            </span>
          </div>
          <p className="mt-1 font-mono text-xs text-white/50">
            Hierarchical category definitions across all 6 industrial divisions
          </p>
        </div>

        <button
          onClick={() => setNewModalOpen(true)}
          className="flex items-center gap-2.5 rounded-lg bg-gold px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-gold-light hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add Category Node</span>
        </button>
      </div>

      {/* Division Navigation Filter */}
      <div className="flex items-center gap-2 overflow-x-auto bg-white/5 p-3 rounded-xl border border-white/10 scrollbar-none font-mono">
        <button
          onClick={() => setSelectedDivision('all')}
          className={`rounded-lg px-4 py-2 text-xs tracking-wider uppercase whitespace-nowrap transition-all ${
            selectedDivision === 'all' ? 'bg-gold text-black shadow-md font-bold' : 'text-white/60 hover:bg-white/10 hover:text-white'
          }`}
        >
          All Divisions ({categories.length})
        </button>
        {DIVISIONS.map((d) => {
          const count = categories.filter(c => c.division.toLowerCase() === d.name.toLowerCase()).length
          return (
            <button
              key={d.slug}
              onClick={() => setSelectedDivision(d.name)}
              className={`rounded-lg px-4 py-2 text-xs tracking-wider uppercase whitespace-nowrap transition-all ${
                selectedDivision.toLowerCase() === d.name.toLowerCase() ? 'bg-gold text-black shadow-md font-bold' : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {d.name} ({count})
            </button>
          )
        })}
      </div>

      {/* Bento Grid Category Nodes */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 font-mono">
        <AnimatePresence>
          {filteredCategories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl transition-all duration-300 hover:border-gold/50 hover:bg-white/10"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 group-hover:border-gold transition-colors">
                      <FolderOpen className="h-5 w-5 text-gold transition-transform group-hover:scale-110" />
                    </div>
                    <div>
                      <span className="text-[10px] text-white/40 font-bold tracking-widest uppercase">{cat.id}</span>
                      <h3 className="font-display text-base font-bold text-white group-hover:text-gold transition-colors">{cat.name}</h3>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-400 uppercase tracking-widest">
                    {cat.status}
                  </span>
                </div>

                <p className="text-xs text-white/60 leading-relaxed min-h-[2.5rem]">
                  {cat.description}
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 mt-6 flex items-center justify-between text-xs">
                <span className="text-white/40">Division Core: <strong className="text-white">{cat.division}</strong></span>
                <span className="font-bold text-gold bg-gold/10 px-2.5 py-1 rounded-md border border-gold/20">
                  {cat.count} Active Products
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredCategories.length === 0 && (
        <div className="p-16 text-center font-mono space-y-3 rounded-2xl border border-white/10 bg-white/5">
          <Layers className="h-8 w-8 text-white/30 mx-auto" />
          <p className="text-sm text-white/60 font-semibold">No category classifications configured for this division.</p>
        </div>
      )}

      {/* Add Category Modal */}
      <AnimatePresence>
        {newModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-mono">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0D0D0D] p-8 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center border border-gold bg-gold/10 text-gold">
                    <Plus className="h-4 w-4" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">Create Category Taxonomy</h3>
                </div>
                <button onClick={() => setNewModalOpen(false)} className="text-white/40 hover:text-white p-1 rounded-lg">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4 text-xs">
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-white/40">Category Name *</label>
                  <input
                    type="text"
                    required
                    value={newCat.name}
                    onChange={e => setNewCat({ ...newCat, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                    placeholder="e.g. Cleanroom Apparel"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/20 focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-white/40">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={newCat.slug}
                    onChange={e => setNewCat({ ...newCat, slug: e.target.value })}
                    placeholder="cleanroom-apparel"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/20 focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-white/40">Parent Division *</label>
                  <select
                    value={newCat.division}
                    onChange={e => setNewCat({ ...newCat, division: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white focus:border-gold focus:outline-none"
                  >
                    {DIVISIONS.map(d => (
                      <option key={d.slug} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-white/40">Taxonomy Description</label>
                  <textarea
                    rows={3}
                    value={newCat.description}
                    onChange={e => setNewCat({ ...newCat, description: e.target.value })}
                    placeholder="Classification details, export standards, and target applications..."
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/20 focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setNewModalOpen(false)}
                    className="flex-1 rounded-lg border border-white/10 bg-white/5 py-3 font-semibold text-white/70 hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-gold py-3 font-bold text-black hover:bg-gold-light transition-all shadow-lg shadow-gold/20"
                  >
                    Deploy Node
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
