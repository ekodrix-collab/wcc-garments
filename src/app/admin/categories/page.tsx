'use client'

import { useState, useRef } from 'react'
import { Plus, FolderOpen, Edit2, Trash2, Layers, X, HelpCircle, Upload, Image as ImageIcon, Link as LinkIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface CategoryItem {
  id: string
  name: string
  slug: string
  division: 'Garments' | 'Households' | 'Divisions'
  count: number
  status: 'Active' | 'Locked'
  description: string
  image: string
}

// Exact match of frontend home page sections: 6 Garments, 4 Households, and 4 Expansion Divisions
const INITIAL_CATEGORIES: CategoryItem[] = [
  // SECTION 1: Garments Grid (6 Core Cards)
  { id: 'GAR-01', name: 'Formal Shirts', slug: 'formal-shirts', division: 'Garments', count: 12, status: 'Active', description: 'Premium corporate executive dress shirts and bespoke shirting.', image: '/images/formal-shirts.png' },
  { id: 'GAR-02', name: 'Blazers & Suits', slug: 'blazers-suits', division: 'Garments', count: 8, status: 'Active', description: 'Architectural-cut executive blazers, corporate suits, and waistcoats.', image: '/images/Blazers and suits.png' },
  { id: 'GAR-03', name: 'Trousers', slug: 'trousers', division: 'Garments', count: 10, status: 'Active', description: 'Premium flat-front trousers, formal slacks, and casual chinos.', image: '/images/trousers.png' },
  { id: 'GAR-04', name: 'Jackets', slug: 'jackets', division: 'Garments', count: 6, status: 'Active', description: 'All-weather institutional outerwear, windbreakers, and high-fashion coats.', image: '/images/jackets.png' },
  { id: 'GAR-05', name: 'Polo T-Shirts', slug: 'polo-tshirts', division: 'Garments', count: 15, status: 'Active', description: 'Premium heavyweight piqué cotton corporate polo shirts.', image: '/images/polo tshirts.png' },
  { id: 'GAR-06', name: 'Jeans & Denim', slug: 'jeans-denim', division: 'Garments', count: 9, status: 'Active', description: 'Heavy-duty industrial denim and premium wholesale casual jeans.', image: '/images/jeans-denims.png' },

  // SECTION 2: Household Grid (4 Core Cards)
  { id: 'HH-01', name: 'Industrial Microfiber', slug: 'microfiber', division: 'Households', count: 14, status: 'Active', description: 'High-density commercial cleaning wipes and specialized microfiber towels.', image: '/images/hh-1.png' },
  { id: 'HH-02', name: 'Bulk Liquids & Sanitizers', slug: 'liquids', division: 'Households', count: 6, status: 'Active', description: 'Premium wholesale chemical formulations, disinfectants, and industrial soap.', image: '/images/hh-2.png' },
  { id: 'HH-03', name: 'Institutional Linens', slug: 'kitchen-linens', division: 'Households', count: 18, status: 'Active', description: 'Heavy-duty commercial kitchen sheets, premium catering napery, and cloths.', image: '/images/hh-3.png' },
  { id: 'HH-04', name: 'OEM Custom Essentials', slug: 'oem-essentials', division: 'Households', count: 5, status: 'Active', description: 'Bespoke household product custom branding and wholesale export packages.', image: '/images/hh-4.png' },

  // SECTION 3: Strategic Expansion Divisions (4 Divisions)
  { id: 'EXP-01', name: 'Uniforms & Workwear', slug: 'uniforms', division: 'Divisions', count: 24, status: 'Active', description: 'Flame-retardant safety wear, clinical scrubs, and corporate workwear.', image: '/images/uniform-workwear.png' },
  { id: 'EXP-02', name: 'Hospitality Linen', slug: 'hospitality', division: 'Divisions', count: 19, status: 'Active', description: 'Luxury hotel bedsheets, plush bath towels, spa robes, and restaurant linens.', image: '/images/hospitality.png' },
  { id: 'EXP-03', name: 'Arabian Fragrance', slug: 'fragrance', division: 'Divisions', count: 11, status: 'Active', description: 'Precious niche perfumes, pure oud attars, and luxury custom bottling.', image: '/images/fragrance.png' },
  { id: 'EXP-04', name: 'Home Furnishing', slug: 'home-furnishing', division: 'Divisions', count: 8, status: 'Active', description: 'Curated home textiles, upholstery fabrics, table runners, and drapery.', image: '/images/home furnishing.png' }
]

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>(INITIAL_CATEGORIES)
  const [selectedSection, setSelectedSection] = useState<'all' | 'garments' | 'household' | 'divisions'>('all')
  
  // Modals state
  const [newModalOpen, setNewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null)
  
  // Image input method: 'upload' or 'link'
  const [imageInputMethod, setImageInputMethod] = useState<'upload' | 'link'>('upload')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formState, setFormState] = useState({
    name: '',
    slug: '',
    division: 'Garments' as 'Garments' | 'Households' | 'Divisions',
    description: '',
    status: 'Active' as 'Active' | 'Locked',
    image: ''
  })

  // Open modal for new item
  const openNewModal = (section?: 'Garments' | 'Households' | 'Divisions') => {
    setFormState({
      name: '',
      slug: '',
      division: section || 'Garments',
      description: '',
      status: 'Active',
      image: ''
    })
    setImageInputMethod('upload')
    setNewModalOpen(true)
  }

  // Open modal to edit existing item
  const openEditModal = (cat: CategoryItem) => {
    setEditingCategory(cat)
    setFormState({
      name: cat.name,
      slug: cat.slug,
      division: cat.division,
      description: cat.description,
      status: cat.status,
      image: cat.image
    })
    setImageInputMethod(cat.image.startsWith('data:') || !cat.image.startsWith('/') ? 'upload' : 'link')
    setEditModalOpen(true)
  }

  // Image Upload File Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormState(prev => ({
          ...prev,
          image: reader.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Create category handler
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.name || !formState.slug) return
    
    const prefix = formState.division === 'Garments' ? 'GAR' : formState.division === 'Households' ? 'HH' : 'EXP'
    const defaultImg = formState.division === 'Garments' ? '/images/formal-shirts.png' : formState.division === 'Households' ? '/images/hh-1.png' : '/images/hospitality.png'
    
    const created: CategoryItem = {
      id: `${prefix}-${String(categories.length + 1).padStart(2, '0')}`,
      name: formState.name,
      slug: formState.slug.toLowerCase().replace(/\s+/g, '-'),
      division: formState.division,
      count: 0,
      status: formState.status,
      description: formState.description || 'Taxonomy classification node.',
      image: formState.image || defaultImg
    }
    
    setCategories([...categories, created])
    setNewModalOpen(false)
  }

  // Update category handler
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCategory || !formState.name || !formState.slug) return

    setCategories(prev =>
      prev.map(cat =>
        cat.id === editingCategory.id
          ? {
              ...cat,
              name: formState.name,
              slug: formState.slug.toLowerCase().replace(/\s+/g, '-'),
              division: formState.division,
              description: formState.description,
              status: formState.status,
              image: formState.image
            }
          : cat
      )
    )
    setEditModalOpen(false)
    setEditingCategory(null)
  }

  // Delete handler
  const handleDelete = (id: string) => {
    if (confirm('Decommission this card from website flow? This action will remove it from the homepage grid.')) {
      setCategories(prev => prev.filter(cat => cat.id !== id))
    }
  }

  // Filter sections
  const garmentsCards = categories.filter(c => c.division === 'Garments')
  const householdCards = categories.filter(c => c.division === 'Households')
  const divisionsCards = categories.filter(c => c.division === 'Divisions')

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto text-white">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-3xl font-bold tracking-tight text-white uppercase">Homepage Layout Manager</h1>
            <span className="bg-gold/10 border border-gold/30 px-3 py-0.5 font-mono text-xs font-bold text-gold rounded-none">
              Live Control
            </span>
          </div>
          <p className="mt-1 font-mono text-xs text-white/50">
            Click edit on any card below to instantly update its title, tagline, slug links, and image on the live website.
          </p>
        </div>
      </div>

      {/* Helpful Quick Guide */}
      <div className="bg-white/5 border border-white/10 p-5 rounded-none flex items-start gap-4">
        <HelpCircle className="h-6 w-6 text-gold shrink-0 mt-0.5" />
        <div className="font-mono text-xs text-white/70 space-y-1 leading-relaxed">
          <p className="font-bold text-white uppercase tracking-wider">How to manage website contents:</p>
          <p>• <strong className="text-gold">Garments Showcase (6 cards)</strong> controls the grid items displayed under the Garments headline.</p>
          <p>• <strong className="text-gold">Household Showcase (4 cards)</strong> controls the 2x2 grid cards under the Household headline.</p>
          <p>• <strong className="text-gold">Strategic Expansion (4 cards)</strong> controls the division blocks on the landing page.</p>
        </div>
      </div>

      {/* Section Selector Tab Buttons */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4 font-mono text-xs">
        <button
          onClick={() => setSelectedSection('all')}
          className={`px-4 py-2 uppercase font-bold transition-all rounded-none border ${
            selectedSection === 'all' ? 'bg-gold border-gold text-black shadow-lg' : 'border-white/10 text-white/60 hover:text-white'
          }`}
        >
          Show All Sections ({categories.length} Cards)
        </button>
        <button
          onClick={() => setSelectedSection('garments')}
          className={`px-4 py-2 uppercase font-bold transition-all rounded-none border ${
            selectedSection === 'garments' ? 'bg-gold border-gold text-black shadow-lg' : 'border-white/10 text-white/60 hover:text-white'
          }`}
        >
          👗 Garments Showcase (6 Cards)
        </button>
        <button
          onClick={() => setSelectedSection('household')}
          className={`px-4 py-2 uppercase font-bold transition-all rounded-none border ${
            selectedSection === 'household' ? 'bg-gold border-gold text-black shadow-lg' : 'border-white/10 text-white/60 hover:text-white'
          }`}
        >
          🏠 Household Showcase (4 Cards)
        </button>
        <button
          onClick={() => setSelectedSection('divisions')}
          className={`px-4 py-2 uppercase font-bold transition-all rounded-none border ${
            selectedSection === 'divisions' ? 'bg-gold border-gold text-black shadow-lg' : 'border-white/10 text-white/60 hover:text-white'
          }`}
        >
          🚀 Strategic Expansion (4 Cards)
        </button>
      </div>

      {/* SECTION 1: GARMENTS GRID */}
      {(selectedSection === 'all' || selectedSection === 'garments') && (
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-l-4 border-gold pl-4">
            <div>
              <h2 className="font-display text-xl font-bold uppercase tracking-wider text-white">
                👗 Section 1: Garments Division Showcase Grid (6 Cards)
              </h2>
              <p className="font-mono text-xs text-white/50 mt-0.5">
                Displays the 6 category blocks under the &quot;Garments Division&quot; grid on the homepage
              </p>
            </div>
            <button
              onClick={() => openNewModal('Garments')}
              className="flex items-center gap-1.5 bg-white/5 border border-white/15 px-3 py-1.5 font-mono text-[10px] font-bold text-white hover:bg-gold hover:text-black transition-all rounded-none"
            >
              <Plus className="h-3 w-3" /> Add Garment Card
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 font-mono">
            {garmentsCards.map((cat, idx) => (
              <div
                key={cat.id}
                className="group relative flex flex-col justify-between rounded-none border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-gold/50 hover:bg-white/10"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-white/40 font-bold uppercase">CARD POSITION {idx + 1}</span>
                    <span className="text-[9px] bg-gold/15 border border-gold/30 px-2 py-0.2 font-bold text-gold rounded-none">
                      {cat.id}
                    </span>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-16 w-16 relative bg-black shrink-0 overflow-hidden border border-white/10 rounded-none">
                      <img src={cat.image} alt={cat.name} className="object-cover w-full h-full animate-fade-in" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-white group-hover:text-gold transition-colors">{cat.name}</h3>
                      <p className="text-[10px] text-white/40 font-mono mt-0.5">Slug: <span className="text-white">/products?category={cat.slug}</span></p>
                    </div>
                  </div>

                  <p className="text-xs text-white/60 leading-relaxed min-h-[2.5rem]">
                    {cat.description}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4 mt-5 flex items-center justify-between">
                  <span className="text-[10px] text-white/40">Moq Value: <strong className="text-white">500+ Units</strong></span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="flex gap-1.5 items-center bg-gold/10 border border-gold/20 px-2.5 py-1.5 text-[10px] font-bold text-gold hover:bg-gold hover:text-black transition-colors rounded-none"
                    >
                      <Edit2 className="h-3 w-3" /> Edit Card
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="flex h-7 w-7 items-center justify-center border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-black transition-colors rounded-none"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: HOUSEHOLD GRID */}
      {(selectedSection === 'all' || selectedSection === 'household') && (
        <div className="space-y-6 pt-10">
          <div className="flex items-center justify-between border-l-4 border-gold pl-4">
            <div>
              <h2 className="font-display text-xl font-bold uppercase tracking-wider text-white">
                🏠 Section 2: Household Showcase Grid (4 Cards)
              </h2>
              <p className="font-mono text-xs text-white/50 mt-0.5">
                Displays the 2x2 architectural category cards under the &quot;Household Items Showcase&quot; section on the homepage
              </p>
            </div>
            <button
              onClick={() => openNewModal('Households')}
              className="flex items-center gap-1.5 bg-white/5 border border-white/15 px-3 py-1.5 font-mono text-[10px] font-bold text-white hover:bg-gold hover:text-black transition-all rounded-none"
            >
              <Plus className="h-3 w-3" /> Add Household Card
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 font-mono">
            {householdCards.map((cat, idx) => (
              <div
                key={cat.id}
                className="group relative flex flex-col justify-between rounded-none border border-white/10 bg-white/5 p-6 shadow-xl transition-all duration-300 hover:border-gold/50 hover:bg-white/10"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-white/40 font-bold uppercase">CARD POSITION {idx + 1} (2x2 Grid)</span>
                    <span className="text-[9px] bg-gold/15 border border-gold/30 px-2 py-0.2 font-bold text-gold rounded-none">
                      {cat.id}
                    </span>
                  </div>

                  <div className="flex gap-5">
                    <div className="h-20 w-32 relative bg-black shrink-0 overflow-hidden border border-white/10 rounded-none animate-fade-in">
                      <img src={cat.image} alt={cat.name} className="object-cover w-full h-full" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-white group-hover:text-gold transition-colors">{cat.name}</h3>
                      <p className="text-[10px] text-white/40 font-mono mt-0.5">Slug: <span className="text-white">/products?category={cat.slug}</span></p>
                      <p className="text-[10px] text-gold/80 font-mono mt-1 font-semibold">Tagline: &quot;{cat.description.slice(0, 45)}...&quot;</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mt-6 flex items-center justify-between">
                  <span className="text-[10px] text-white/40 block">Assigned Section: <strong className="text-white">{cat.division}</strong></span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="flex gap-1.5 items-center bg-gold/10 border border-gold/20 px-3 py-1.5 text-[10px] font-bold text-gold hover:bg-gold hover:text-black transition-colors rounded-none"
                    >
                      <Edit2 className="h-3 w-3" /> Edit Card Info
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="flex h-8 w-8 items-center justify-center border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-black transition-colors rounded-none"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: STRATEGIC EXPANSION */}
      {(selectedSection === 'all' || selectedSection === 'divisions') && (
        <div className="space-y-6 pt-10">
          <div className="flex items-center justify-between border-l-4 border-gold pl-4">
            <div>
              <h2 className="font-display text-xl font-bold uppercase tracking-wider text-white">
                🚀 Section 3: Strategic Expansion Divisions Grid (4 Cards)
              </h2>
              <p className="font-mono text-xs text-white/50 mt-0.5">
                Displays the 4 division blocks (Uniforms, Hospitality, Fragrance, Home Furnishings) featured on the landing page
              </p>
            </div>
            <button
              onClick={() => openNewModal('Divisions')}
              className="flex items-center gap-1.5 bg-white/5 border border-white/15 px-3 py-1.5 font-mono text-[10px] font-bold text-white hover:bg-gold hover:text-black transition-all rounded-none"
            >
              <Plus className="h-3 w-3" /> Add Expansion Division
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 font-mono">
            {divisionsCards.map((cat, idx) => (
              <div
                key={cat.id}
                className="group relative flex flex-col justify-between rounded-none border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-gold/50 hover:bg-white/10"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-white/40 font-bold uppercase font-mono">DIVISION CARD {idx + 1}</span>
                    <span className="text-[9px] bg-blue-500/15 border border-blue-500/30 px-2 py-0.2 font-bold text-blue-400 rounded-none">
                      {cat.id}
                    </span>
                  </div>

                  <div className="h-28 relative bg-black overflow-hidden border border-white/10 rounded-none animate-fade-in">
                    <img src={cat.image} alt={cat.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  </div>

                  <div>
                    <h3 className="font-display text-base font-bold text-white group-hover:text-gold transition-colors">{cat.name}</h3>
                    <p className="text-[10px] text-white/40 mt-0.5">Link: <span className="text-white">/products?division={cat.slug}</span></p>
                  </div>

                  <p className="text-[11px] text-white/60 leading-relaxed min-h-[3rem] font-sans">
                    {cat.description}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4 mt-5 flex items-center justify-between">
                  <span className="text-[10px] text-white/40">Stats: <strong className="text-white">{cat.count} Active</strong></span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="flex h-7 w-7 items-center justify-center border border-gold/30 bg-gold/10 text-gold hover:bg-gold hover:text-black transition-colors rounded-none"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="flex h-7 w-7 items-center justify-center border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-black transition-colors rounded-none"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE NODE MODAL */}
      <AnimatePresence>
        {newModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-mono">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-none border border-white/10 bg-[#0D0D0D] p-8 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center border border-gold bg-gold/10 text-gold rounded-none">
                    <Plus className="h-4 w-4" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white uppercase">Add Grid Card</h3>
                </div>
                <button onClick={() => setNewModalOpen(false)} className="text-white/40 hover:text-white p-1 rounded-none">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4 text-xs">
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-white/40">Card Title / Name *</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={e => setFormState({ ...formState, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                    placeholder="e.g. Formal Shirts / Oud Fragrances"
                    className="w-full rounded-none border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/20 focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-white/40">URL Link Slug *</label>
                  <input
                    type="text"
                    required
                    value={formState.slug}
                    onChange={e => setFormState({ ...formState, slug: e.target.value })}
                    placeholder="formal-shirts"
                    className="w-full rounded-none border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/20 focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-white/40">Section Assignment *</label>
                    <select
                      value={formState.division}
                      onChange={e => setFormState({ ...formState, division: e.target.value as 'Garments' | 'Households' | 'Divisions' })}
                      className="w-full rounded-none border border-white/10 bg-black px-4 py-3 text-white focus:border-gold focus:outline-none"
                    >
                      <option value="Garments">Section 1: Garments Grid (6 cards)</option>
                      <option value="Households">Section 2: Household Grid (4 cards)</option>
                      <option value="Divisions">Section 3: Strategic Expansion (4 cards)</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-white/40">Status Node *</label>
                    <select
                      value={formState.status}
                      onChange={e => setFormState({ ...formState, status: e.target.value as 'Active' | 'Locked' })}
                      className="w-full rounded-none border border-white/10 bg-black px-4 py-3 text-white focus:border-gold focus:outline-none"
                    >
                      <option value="Active">Active &amp; Visible</option>
                      <option value="Locked">Hidden / Locked</option>
                    </select>
                  </div>
                </div>

                {/* PREMIUM DYNAMIC IMAGE UPLOADER PORT */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-medium uppercase tracking-wider text-white/40">Card Image / Banner *</label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setImageInputMethod('upload')}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-none font-mono text-[9px] border transition-all ${
                          imageInputMethod === 'upload' ? 'bg-gold border-gold text-black font-bold' : 'border-white/10 text-white/50'
                        }`}
                      >
                        <Upload className="h-2.5 w-2.5" /> Upload File
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageInputMethod('link')}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-none font-mono text-[9px] border transition-all ${
                          imageInputMethod === 'link' ? 'bg-gold border-gold text-black font-bold' : 'border-white/10 text-white/50'
                        }`}
                      >
                        <LinkIcon className="h-2.5 w-2.5" /> URL Link
                      </button>
                    </div>
                  </div>

                  {imageInputMethod === 'upload' ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border border-dashed border-white/20 hover:border-gold hover:bg-white/5 transition-all p-6 text-center cursor-pointer rounded-none relative group"
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      {formState.image ? (
                        <div className="flex items-center justify-center gap-3">
                          <img src={formState.image} alt="Preview" className="h-10 w-10 object-cover border border-white/10 rounded-none shrink-0" />
                          <div className="text-left font-mono">
                            <p className="text-[10px] text-white font-bold uppercase">Image Attached Successfully</p>
                            <p className="text-[9px] text-gold/80">Click to change or replace file</p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          <Upload className="h-5 w-5 text-white/40 mx-auto group-hover:text-gold transition-colors" />
                          <p className="text-[10px] text-white/60">Drag &amp; drop or click to upload card image</p>
                          <p className="text-[8px] text-white/30 uppercase tracking-widest font-mono">PNG, JPG, WEBP (Ideal: 4:3 or 16:9)</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={formState.image}
                      onChange={e => setFormState({ ...formState, image: e.target.value })}
                      placeholder="e.g. /images/formal-shirts.png"
                      className="w-full rounded-none border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/20 focus:border-gold focus:outline-none"
                    />
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-white/40">Card Subtitle / Description text</label>
                  <textarea
                    rows={3}
                    value={formState.description}
                    onChange={e => setFormState({ ...formState, description: e.target.value })}
                    placeholder="Short summary tagline displayed on the card..."
                    className="w-full rounded-none border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/20 focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setNewModalOpen(false)}
                    className="flex-1 rounded-none border border-white/10 bg-white/5 py-3 font-semibold text-white/70 hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-none bg-gold py-3 font-bold text-black hover:bg-gold-light transition-all shadow-lg shadow-gold/20"
                  >
                    Deploy Node
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EDIT NODE MODAL */}
      <AnimatePresence>
        {editModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-mono">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-none border border-white/10 bg-[#0D0D0D] p-8 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center border border-gold bg-gold/10 text-gold rounded-none">
                    <Edit2 className="h-4 w-4" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white uppercase">Modify Card Info</h3>
                </div>
                <button onClick={() => setEditModalOpen(false)} className="text-white/40 hover:text-white p-1 rounded-none">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4 text-xs">
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-white/40">Card Title / Name *</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={e => setFormState({ ...formState, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                    placeholder="e.g. Formal Shirts"
                    className="w-full rounded-none border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/20 focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-white/40">URL Link Slug *</label>
                  <input
                    type="text"
                    required
                    value={formState.slug}
                    onChange={e => setFormState({ ...formState, slug: e.target.value })}
                    placeholder="formal-shirts"
                    className="w-full rounded-none border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/20 focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-white/40">Section Assignment *</label>
                    <select
                      value={formState.division}
                      onChange={e => setFormState({ ...formState, division: e.target.value as 'Garments' | 'Households' | 'Divisions' })}
                      className="w-full rounded-none border border-white/10 bg-black px-4 py-3 text-white focus:border-gold focus:outline-none"
                    >
                      <option value="Garments">Section 1: Garments Grid (6 cards)</option>
                      <option value="Households">Section 2: Household Grid (4 cards)</option>
                      <option value="Divisions">Section 3: Strategic Expansion (4 cards)</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-white/40">Status Node *</label>
                    <select
                      value={formState.status}
                      onChange={e => setFormState({ ...formState, status: e.target.value as 'Active' | 'Locked' })}
                      className="w-full rounded-none border border-white/10 bg-black px-4 py-3 text-white focus:border-gold focus:outline-none"
                    >
                      <option value="Active">Active &amp; Visible</option>
                      <option value="Locked">Hidden / Locked</option>
                    </select>
                  </div>
                </div>

                {/* PREMIUM DYNAMIC IMAGE UPLOADER PORT */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-medium uppercase tracking-wider text-white/40">Card Image / Banner *</label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setImageInputMethod('upload')}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-none font-mono text-[9px] border transition-all ${
                          imageInputMethod === 'upload' ? 'bg-gold border-gold text-black font-bold' : 'border-white/10 text-white/50'
                        }`}
                      >
                        <Upload className="h-2.5 w-2.5" /> Upload File
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageInputMethod('link')}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-none font-mono text-[9px] border transition-all ${
                          imageInputMethod === 'link' ? 'bg-gold border-gold text-black font-bold' : 'border-white/10 text-white/50'
                        }`}
                      >
                        <LinkIcon className="h-2.5 w-2.5" /> URL Link
                      </button>
                    </div>
                  </div>

                  {imageInputMethod === 'upload' ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border border-dashed border-white/20 hover:border-gold hover:bg-white/5 transition-all p-6 text-center cursor-pointer rounded-none relative group"
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      {formState.image ? (
                        <div className="flex items-center justify-center gap-3">
                          <img src={formState.image} alt="Preview" className="h-10 w-10 object-cover border border-white/10 rounded-none shrink-0" />
                          <div className="text-left font-mono">
                            <p className="text-[10px] text-white font-bold uppercase">Image Attached Successfully</p>
                            <p className="text-[9px] text-gold/80">Click to change or replace file</p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          <Upload className="h-5 w-5 text-white/40 mx-auto group-hover:text-gold transition-colors" />
                          <p className="text-[10px] text-white/60">Drag &amp; drop or click to upload card image</p>
                          <p className="text-[8px] text-white/30 uppercase tracking-widest font-mono">PNG, JPG, WEBP (Ideal: 4:3 or 16:9)</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={formState.image}
                      onChange={e => setFormState({ ...formState, image: e.target.value })}
                      placeholder="e.g. /images/formal-shirts.png"
                      className="w-full rounded-none border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/20 focus:border-gold focus:outline-none"
                    />
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-white/40">Card Subtitle / Description text</label>
                  <textarea
                    rows={3}
                    value={formState.description}
                    onChange={e => setFormState({ ...formState, description: e.target.value })}
                    placeholder="Short summary tagline displayed on the card..."
                    className="w-full rounded-none border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/20 focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditModalOpen(false)}
                    className="flex-1 rounded-none border border-white/10 bg-white/5 py-3 font-semibold text-white/70 hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-none bg-gold py-3 font-bold text-black hover:bg-gold-light transition-all shadow-lg shadow-gold/20"
                  >
                    Save Changes
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
