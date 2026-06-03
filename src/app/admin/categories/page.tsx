'use client'

import { useState, useMemo, useEffect } from 'react'
import { Plus, Edit2, Trash2, ChevronDown, ChevronRight, X, HelpCircle, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '@/lib/api'

// ── Types ──────────────────────────────────────────────────────────────────────
type ItemStatus = 'active' | 'coming-soon' | 'hidden'
type SectionKey = 'all' | 'garments' | 'households' | 'divisions'

interface SubCatItem {
  id: string
  name: string
  slug: string
  status: ItemStatus
  displayOrder: number
}
interface CatItem {
  id: string
  divisionSlug: string
  divisionName: string
  name: string
  slug: string
  status: ItemStatus
  displayOrder: number
  subCategories: SubCatItem[]
}

const STATUS_STYLES: Record<ItemStatus, string> = {
  active:         'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'coming-soon':  'bg-amber-500/15 text-amber-400 border-amber-500/30',
  hidden:         'bg-neutral-700/30 text-neutral-400 border-neutral-600/30',
}
const STATUS_LABELS: Record<ItemStatus, string> = {
  active: 'Active', 'coming-soon': 'Coming Soon', hidden: 'Hidden',
}

// ── Section mapping ────────────────────────────────────────────────────────────
const SECTION_SLUGS: Record<Exclude<SectionKey, 'all'>, string[]> = {
  garments:   ['garments'],
  households: ['households'],
  divisions:  ['uniforms', 'hospitality', 'fragrance', 'home'],
}

// ── Empty form state ───────────────────────────────────────────────────────────
const EMPTY_CAT = { divisionSlug: 'garments', name: '', slug: '', status: 'active' as ItemStatus }
const EMPTY_SUB = { name: '', slug: '', status: 'active' as ItemStatus }

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CatItem[]>([])
  const [divisionsData, setDivisionsData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [section, setSection] = useState<SectionKey>('all')
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  // Category modal
  const [catModal, setCatModal] = useState<'add' | 'edit' | null>(null)
  const [editingCat, setEditingCat] = useState<CatItem | null>(null)
  const [catForm, setCatForm] = useState(EMPTY_CAT)
  const [saving, setSaving] = useState(false)

  // Sub-category modal
  const [subModal, setSubModal] = useState<'add' | 'edit' | null>(null)
  const [subParentId, setSubParentId] = useState<string | null>(null)
  const [editingSubId, setEditingSubId] = useState<string | null>(null)
  const [subForm, setSubForm] = useState(EMPTY_SUB)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    setLoading(true)
    try {
      const res = await api.admin.getCategories()
      if (res.success && res.data) {
        setDivisionsData(res.data)
        const result: CatItem[] = []
        for (const div of res.data) {
          for (const cat of (div.sub_categories ?? [])) {
            result.push({
              id: cat.id,
              divisionSlug: div.slug,
              divisionName: div.name,
              name: cat.name,
              slug: cat.slug,
              status: cat.status as ItemStatus,
              displayOrder: cat.displayOrder || cat.display_order,
              subCategories: (cat.subCategories || cat.sub_categories || []).map((s: any) => ({
                id: s.id, name: s.name, slug: s.slug,
                status: s.status as ItemStatus, displayOrder: s.displayOrder || s.display_order,
              })),
            })
          }
        }
        setCategories(result)
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    } finally {
      setLoading(false)
    }
  }

  // ── Filtered view ────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    if (section === 'all') return categories
    const slugs = SECTION_SLUGS[section]
    return categories.filter((c) => slugs.includes(c.divisionSlug))
  }, [categories, section])

  const grouped = useMemo(() => {
    const map = new Map<string, { divisionName: string; items: CatItem[] }>()
    for (const cat of filtered) {
      if (!map.has(cat.divisionSlug)) map.set(cat.divisionSlug, { divisionName: cat.divisionName, items: [] })
      map.get(cat.divisionSlug)!.items.push(cat)
    }
    return map
  }, [filtered])

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const toSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const toggleExpand = (id: string) => setExpanded((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  const divOptions = divisionsData.map((d) => ({ slug: d.slug, name: d.name }))

  // ── Category CRUD ────────────────────────────────────────────────────────────
  const openAddCat = () => { setCatForm(EMPTY_CAT); setEditingCat(null); setCatModal('add') }
  const openEditCat = (c: CatItem) => { setEditingCat(c); setCatForm({ divisionSlug: c.divisionSlug, name: c.name, slug: c.slug, status: c.status }); setCatModal('edit') }

  const syncDivisionToDB = async (divisionSlug: string, updatedCategories: any[]) => {
    const div = divisionsData.find(d => d.slug === divisionSlug)
    if (div && div.id) {
      await api.admin.updateCategory(undefined, div.id, { sub_categories: updatedCategories })
    }
  }

  const saveCat = async () => {
    if (!catForm.name || !catForm.slug) return
    setSaving(true)
    
    let updatedList = [...categories]
    if (catModal === 'add') {
      const newCat: CatItem = {
        id: `CAT-${Date.now()}`, divisionSlug: catForm.divisionSlug,
        divisionName: divOptions.find((d) => d.slug === catForm.divisionSlug)?.name ?? catForm.divisionSlug,
        name: catForm.name, slug: catForm.slug, status: catForm.status,
        displayOrder: categories.filter((c) => c.divisionSlug === catForm.divisionSlug).length + 1,
        subCategories: [],
      }
      updatedList.push(newCat)
    } else if (catModal === 'edit' && editingCat) {
      updatedList = categories.map((c) => c.id === editingCat.id ? { ...c, ...catForm, divisionName: divOptions.find((d) => d.slug === catForm.divisionSlug)?.name ?? catForm.divisionSlug } : c)
    }
    
    // Extract just the categories for this division to save to DB
    const divCats = updatedList.filter(c => c.divisionSlug === catForm.divisionSlug).map(c => ({
      id: c.id, name: c.name, slug: c.slug, status: c.status, displayOrder: c.displayOrder, subCategories: c.subCategories
    }))
    
    await syncDivisionToDB(catForm.divisionSlug, divCats)
    setCategories(updatedList)
    setSaving(false)
    setCatModal(null)
  }

  const deleteCat = async (id: string, divSlug: string) => {
    if (!confirm('Remove this category? Sub-categories will also be removed.')) return
    const updatedList = categories.filter((c) => c.id !== id)
    
    const divCats = updatedList.filter(c => c.divisionSlug === divSlug).map(c => ({
      id: c.id, name: c.name, slug: c.slug, status: c.status, displayOrder: c.displayOrder, subCategories: c.subCategories
    }))
    await syncDivisionToDB(divSlug, divCats)
    setCategories(updatedList)
  }

  const toggleCatStatus = async (id: string, divSlug: string) => {
    const updatedList = categories.map((c) => {
      if (c.id !== id) return c
      const next: ItemStatus = c.status === 'active' ? 'coming-soon' : c.status === 'coming-soon' ? 'hidden' : 'active'
      return { ...c, status: next }
    })
    
    const divCats = updatedList.filter(c => c.divisionSlug === divSlug).map(c => ({
      id: c.id, name: c.name, slug: c.slug, status: c.status, displayOrder: c.displayOrder, subCategories: c.subCategories
    }))
    await syncDivisionToDB(divSlug, divCats)
    setCategories(updatedList)
  }

  // ── Sub-category CRUD ─────────────────────────────────────────────────────────
  const openAddSub = (parentId: string) => { setSubParentId(parentId); setEditingSubId(null); setSubForm(EMPTY_SUB); setSubModal('add') }
  const openEditSub = (parentId: string, sub: SubCatItem) => { setSubParentId(parentId); setEditingSubId(sub.id); setSubForm({ name: sub.name, slug: sub.slug, status: sub.status }); setSubModal('edit') }

  const saveSub = async () => {
    if (!subForm.name || !subForm.slug || !subParentId) return
    setSaving(true)
    
    let targetCat: CatItem | undefined
    
    const updatedList = categories.map((c) => {
      if (c.id !== subParentId) return c
      let newCat = { ...c }
      if (subModal === 'add') {
        const newSub: SubCatItem = { id: `SUB-${Date.now()}`, name: subForm.name, slug: subForm.slug, status: subForm.status, displayOrder: c.subCategories.length + 1 }
        newCat = { ...c, subCategories: [...c.subCategories, newSub] }
      } else if (subModal === 'edit' && editingSubId) {
        newCat = { ...c, subCategories: c.subCategories.map((s) => s.id === editingSubId ? { ...s, ...subForm } : s) }
      }
      targetCat = newCat
      return newCat
    })
    
    if (targetCat) {
      const divCats = updatedList.filter(c => c.divisionSlug === targetCat!.divisionSlug).map(c => ({
        id: c.id, name: c.name, slug: c.slug, status: c.status, displayOrder: c.displayOrder, subCategories: c.subCategories
      }))
      await syncDivisionToDB(targetCat.divisionSlug, divCats)
    }
    
    setCategories(updatedList)
    setSaving(false)
    setSubModal(null)
  }

  const deleteSub = async (parentId: string, subId: string) => {
    if (!confirm('Remove this sub-category?')) return
    
    let divSlug = ''
    const updatedList = categories.map((c) => {
      if (c.id === parentId) {
        divSlug = c.divisionSlug
        return { ...c, subCategories: c.subCategories.filter((s) => s.id !== subId) }
      }
      return c
    })
    
    if (divSlug) {
      const divCats = updatedList.filter(c => c.divisionSlug === divSlug).map(c => ({
        id: c.id, name: c.name, slug: c.slug, status: c.status, displayOrder: c.displayOrder, subCategories: c.subCategories
      }))
      await syncDivisionToDB(divSlug, divCats)
    }
    setCategories(updatedList)
  }

  const toggleSubStatus = async (parentId: string, subId: string) => {
    let divSlug = ''
    const updatedList = categories.map((c) => {
      if (c.id !== parentId) return c
      divSlug = c.divisionSlug
      return { ...c, subCategories: c.subCategories.map((s) => {
        if (s.id !== subId) return s
        const next: ItemStatus = s.status === 'active' ? 'coming-soon' : s.status === 'coming-soon' ? 'hidden' : 'active'
        return { ...s, status: next }
      })}
    })
    
    if (divSlug) {
      const divCats = updatedList.filter(c => c.divisionSlug === divSlug).map(c => ({
        id: c.id, name: c.name, slug: c.slug, status: c.status, displayOrder: c.displayOrder, subCategories: c.subCategories
      }))
      await syncDivisionToDB(divSlug, divCats)
    }
    setCategories(updatedList)
  }

  // ── Stats ─────────────────────────────────────────────────────────────────────
  const totalCats = categories.length
  const totalSubs = categories.reduce((a, c) => a + c.subCategories.length, 0)
  const activeCats = categories.filter((c) => c.status === 'active').length
  const comingSoon = categories.filter((c) => c.status === 'coming-soon').length

  // ── Form field helpers ────────────────────────────────────────────────────────
  const inputCls = 'w-full rounded-none border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-gold focus:outline-none'
  const selectCls = 'w-full rounded-none border border-white/10 bg-black px-4 py-2.5 text-sm text-white focus:border-gold focus:outline-none'
  const labelCls = 'mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-white/40'

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto text-white">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl font-bold tracking-tight text-white uppercase">Category & Sub-Category Manager</h1>
            <span className="bg-gold/10 border border-gold/30 px-3 py-0.5 font-mono text-xs font-bold text-gold">Live Control</span>
          </div>
          <p className="mt-1 font-mono text-xs text-white/40">Manage all division categories and sub-categories. Changes reflect across the site and API instantly.</p>
        </div>
        <button onClick={openAddCat} className="flex items-center gap-2 bg-gold px-5 py-2.5 font-mono text-xs font-bold text-black hover:bg-gold/90 transition-all shrink-0">
          <Plus className="h-3.5 w-3.5" /> Add Category
        </button>
      </div>

      {/* ── Stats Strip ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Categories', value: totalCats },
          { label: 'Sub-Categories', value: totalSubs },
          { label: 'Active', value: activeCats },
          { label: 'Coming Soon', value: comingSoon },
        ].map((s) => (
          <div key={s.label} className="border border-white/10 bg-white/5 px-4 py-3">
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">{s.label}</p>
            <p className="mt-1 font-display text-2xl font-bold text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* ── Guide ── */}
      <div className="bg-white/5 border border-white/10 p-4 flex items-start gap-3">
        <HelpCircle className="h-5 w-5 text-gold shrink-0 mt-0.5" />
        <div className="font-mono text-xs text-white/60 space-y-1">
          <p className="font-bold text-white uppercase tracking-wider text-[10px]">How it works</p>
          <p>• Click <strong className="text-gold">chevron ›</strong> on any category to expand sub-categories.</p>
          <p>• Click <strong className="text-gold">status badge</strong> to cycle: Active → Coming Soon → Hidden.</p>
          <p>• Click <strong className="text-gold">+ Sub</strong> inside any category to add a new sub-category.</p>
          <p>• <strong className="text-gold">Adding future items:</strong> just click "Add Category" or "+ Sub" — set status to Coming Soon until ready.</p>
        </div>
      </div>

      {/* ── Section Tabs ── */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {([
          { key: 'all', label: `All (${totalCats})` },
          { key: 'garments', label: '👗 Garments' },
          { key: 'households', label: '🏠 Households' },
          { key: 'divisions', label: '🚀 Other Divisions' },
        ] as { key: SectionKey; label: string }[]).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSection(tab.key)}
            className={`px-4 py-2 font-mono text-xs font-bold uppercase border transition-all ${section === tab.key ? 'bg-gold border-gold text-black' : 'border-white/10 text-white/50 hover:text-white'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Category Groups ── */}
      <div className="space-y-8">
        {Array.from(grouped.entries()).map(([divSlug, { divisionName, items }]) => (
          <div key={divSlug}>
            {/* Division header */}
            <div className="flex items-center justify-between border-l-4 border-gold pl-4 mb-4">
              <div>
                <h2 className="font-display text-lg font-bold uppercase text-white">{divisionName}</h2>
                <p className="font-mono text-[10px] text-white/30">{items.length} categories · {items.reduce((a, c) => a + c.subCategories.length, 0)} sub-categories</p>
              </div>
              <button
                onClick={() => { setCatForm({ ...EMPTY_CAT, divisionSlug: divSlug }); setEditingCat(null); setCatModal('add') }}
                className="flex items-center gap-1.5 border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[10px] font-bold text-white hover:bg-gold hover:text-black transition-all"
              >
                <Plus className="h-3 w-3" /> Add to {divisionName}
              </button>
            </div>

            {/* Category cards */}
            <div className="space-y-3">
              {loading ? (
                <div className="py-8 flex justify-center"><Loader2 className="w-5 h-5 text-gold animate-spin" /></div>
              ) : items.sort((a, b) => a.displayOrder - b.displayOrder).map((cat) => (
                <div key={cat.id} className="border border-white/10 bg-white/[0.03] hover:border-white/20 transition-all">
                  {/* Category row */}
                  <div className="flex items-center gap-3 px-4 py-3">
                    <button onClick={() => toggleExpand(cat.id)} className="text-white/40 hover:text-white transition-colors shrink-0">
                      {expanded.has(cat.id) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-[9px] text-white/30">{cat.id}</span>
                        <span className="font-body text-sm font-semibold text-white">{cat.name}</span>
                        <span className="font-mono text-[10px] text-white/30">/products/{cat.divisionSlug}/{cat.slug}</span>
                      </div>
                      <p className="font-mono text-[9px] text-white/20 mt-0.5">{cat.subCategories.length} sub-categories</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        {/* Status toggle badge */}
                        <button
                          onClick={() => toggleCatStatus(cat.id, cat.divisionSlug)}
                          title="Click to cycle status"
                          className={`px-2.5 py-0.5 font-mono text-[8px] font-bold uppercase border transition-all cursor-pointer hover:opacity-80 ${STATUS_STYLES[cat.status]}`}
                        >
                        {STATUS_LABELS[cat.status]}
                      </button>
                      <button onClick={() => openAddSub(cat.id)} className="flex items-center gap-1 border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[9px] font-bold text-white hover:bg-gold hover:text-black transition-all">
                        <Plus className="h-3 w-3" /> Sub
                      </button>
                      <button onClick={() => openEditCat(cat)} className="flex h-7 w-7 items-center justify-center border border-gold/20 bg-gold/10 text-gold hover:bg-gold hover:text-black transition-colors">
                        <Edit2 className="h-3 w-3" />
                      </button>
                        <button onClick={() => deleteCat(cat.id, cat.divisionSlug)} className="flex h-7 w-7 items-center justify-center border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors">
                          <Trash2 className="h-3 w-3" />
                        </button>
                    </div>
                  </div>

                  {/* Sub-categories expanded */}
                  <AnimatePresence>
                    {expanded.has(cat.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden border-t border-white/[0.06]"
                      >
                        <div className="px-4 py-3 space-y-2 bg-white/[0.02]">
                          <p className="font-mono text-[9px] uppercase tracking-widest text-white/20 mb-2">Sub-Categories</p>
                          {cat.subCategories.length === 0 && (
                            <p className="font-mono text-[10px] text-white/20 italic">No sub-categories yet. Click "+ Sub" to add one.</p>
                          )}
                          {cat.subCategories.sort((a, b) => a.displayOrder - b.displayOrder).map((sub) => (
                            <div key={sub.id} className="flex items-center gap-3 pl-4 border-l border-white/10">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-mono text-[8px] text-white/20">{sub.id}</span>
                                  <span className="font-body text-xs text-white/80">{sub.name}</span>
                                  <span className="font-mono text-[9px] text-white/20">/.../{sub.slug}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <button
                                  onClick={() => toggleSubStatus(cat.id, sub.id)}
                                  className={`px-2 py-0.5 font-mono text-[8px] font-bold uppercase border cursor-pointer hover:opacity-80 transition-all ${STATUS_STYLES[sub.status]}`}
                                >
                                  {STATUS_LABELS[sub.status]}
                                </button>
                                <button onClick={() => openEditSub(cat.id, sub)} className="flex h-6 w-6 items-center justify-center border border-gold/20 bg-gold/10 text-gold hover:bg-gold hover:text-black transition-colors">
                                  <Edit2 className="h-3 w-3" />
                                </button>
                                <button onClick={() => deleteSub(cat.id, sub.id)} className="flex h-6 w-6 items-center justify-center border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors">
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Category Modal ── */}
      <AnimatePresence>
        {catModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md border border-white/10 bg-[#0D0D0D] p-7 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-display text-lg font-bold uppercase text-white">
                  {catModal === 'add' ? 'Add Category' : 'Edit Category'}
                </h3>
                <button onClick={() => setCatModal(null)} className="text-white/40 hover:text-white"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Division</label>
                  <select value={catForm.divisionSlug} onChange={(e) => setCatForm({ ...catForm, divisionSlug: e.target.value })} className={selectCls}>
                    {divOptions.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Category Name *</label>
                  <input value={catForm.name} onChange={(e) => setCatForm({ ...catForm, name: e.target.value, slug: toSlug(e.target.value) })} placeholder="e.g. Kitchen" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>URL Slug *</label>
                  <input value={catForm.slug} onChange={(e) => setCatForm({ ...catForm, slug: toSlug(e.target.value) })} placeholder="kitchen" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Status</label>
                  <select value={catForm.status} onChange={(e) => setCatForm({ ...catForm, status: e.target.value as ItemStatus })} className={selectCls}>
                    <option value="active">Active</option>
                    <option value="coming-soon">Coming Soon</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setCatModal(null)} className="flex-1 border border-white/10 py-2.5 font-mono text-xs text-white/60 hover:bg-white/5 transition-all">Cancel</button>
                <button disabled={saving} onClick={saveCat} className="flex-1 flex justify-center items-center gap-2 bg-gold py-2.5 font-mono text-xs font-bold text-black hover:bg-gold/90 transition-all">
                  {saving && <Loader2 className="w-3 h-3 animate-spin" />}
                  {catModal === 'add' ? 'Create' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Sub-Category Modal ── */}
      <AnimatePresence>
        {subModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md border border-white/10 bg-[#0D0D0D] p-7 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-display text-lg font-bold uppercase text-white">
                  {subModal === 'add' ? 'Add Sub-Category' : 'Edit Sub-Category'}
                </h3>
                <button onClick={() => setSubModal(null)} className="text-white/40 hover:text-white"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Sub-Category Name *</label>
                  <input value={subForm.name} onChange={(e) => setSubForm({ ...subForm, name: e.target.value, slug: toSlug(e.target.value) })} placeholder="e.g. Cutlery" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>URL Slug *</label>
                  <input value={subForm.slug} onChange={(e) => setSubForm({ ...subForm, slug: toSlug(e.target.value) })} placeholder="cutlery" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Status</label>
                  <select value={subForm.status} onChange={(e) => setSubForm({ ...subForm, status: e.target.value as ItemStatus })} className={selectCls}>
                    <option value="active">Active</option>
                    <option value="coming-soon">Coming Soon</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setSubModal(null)} className="flex-1 border border-white/10 py-2.5 font-mono text-xs text-white/60 hover:bg-white/5 transition-all">Cancel</button>
                <button disabled={saving} onClick={saveSub} className="flex-1 flex justify-center items-center gap-2 bg-gold py-2.5 font-mono text-xs font-bold text-black hover:bg-gold/90 transition-all">
                  {saving && <Loader2 className="w-3 h-3 animate-spin" />}
                  {subModal === 'add' ? 'Create' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
