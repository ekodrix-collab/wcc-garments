'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  Layers, Save, Loader2, CheckCircle2, Upload, ToggleLeft, ToggleRight, 
  HelpCircle, Eye, Sliders, Layout, Users, FileText, Settings, ArrowRight,
  TrendingUp, Award, Laptop, Smartphone, Sun, Moon
} from 'lucide-react'
import { contentStore } from '@/lib/content-store'
import { useThemeContext } from '@/context/ThemeContext'
import { api } from '@/lib/api'
import { ResponsiveImageUploader } from '@/components/admin/ResponsiveImageUploader'
import { normalizeImage } from '@/lib/image-utils'
export type { ResponsiveImage } from '@/lib/image-utils'

// Default Static Fallbacks for Initialization
const DEFAULT_BULK_OFFER = {
  enabled: true,
  tagText: "Bulk Garments Order",
  headingStart: "Exclusive Discounts on Bulk Garment",
  headingHighlight: "Orders",
  description: "Large-scale premium clothing production for brands, wholesalers, and businesses with top-quality materials and reliable delivery.",
  discountPercentage: 25,
  discountText: "Flat Discount",
  discountSubText: "On orders above 500 pieces",
  offerEndDate: "June 30, 2026",
  buttonText: "Get Quote",
  slideImages: [
    "/images/bulkoffer/premium_hoodie.png",
    "/images/bulkoffer/premium_jeans.png",
    "/images/bulkoffer/premium_shirt.png",
  ]
}

const DEFAULT_HERO = {
  campaigns: [
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
  ]
}

const DEFAULT_WHO_WE_ARE = {
  heritageLabel: "Corporate Heritage",
  heading: "WCC FASHIONS",
  subHeading: "Established 2001",
  paragraphs: [
    "Western Clothing Company (WCC Fashions LLC) is a premier UAE-based industrial fashion manufacturing group.",
    "Operating out of our advanced Dubai manufacturing infrastructure, we deliver end-to-end commercial solutions—from precision pattern CAD and fabric sourcing to full-scale container export across 50+ nations worldwide.",
    "Our multi-division capabilities bridge high-end fashion garments, heavy-duty industrial workwear, luxury hotel linens, and authentic Arabian fragrances under strict ISO quality benchmarks."
  ],
  mainImage: "/images/about wcc.png",
  floatingBadgeTitle: "Certified Standards",
  floatingBadgeDesc: "ISO 9001:2015 / OEM Export Grade",
  stats: [
    { value: 25, suffix: "+", label: "Years Expertise", desc: "Unrivaled manufacturing history and procurement experience since our Dubai inception." },
    { value: 50, suffix: "+", label: "Export Nations", desc: "Active global distribution networks spanning GCC, Africa, Europe, and the Americas." },
    { value: 10, suffix: "K+", label: "Monthly Capacity", desc: "Industrial-scale output supporting massive tenders and commercial supply chains." }
  ]
}

const DEFAULT_GARMENTS = {
  indicator: "OUR MANUFACTURING DIVISIONS",
  headingStart: "Garments we ",
  headingHighlight: "manufacture",
  description: "High-quality garments, linens, and B2B supplies crafted with precision. While garments remain our absolute core business, we have successfully expanded our industrial capacities to serve major developments in hospitality, home decor, fragrance, and household supply.",
  categories: [
    { name: 'Formal Shirts', slug: 'formal-shirts', tagline: 'Crisp, premium tailored fits', count: '140+ Styles', image: '/images/formal-shirts.png' },
    { name: 'Blazers & Suits', slug: 'blazers-suits', tagline: 'Executive bespoke tailoring', count: '80+ Styles', image: '/images/Blazers and suits.png' },
    { name: 'Jeans & Denims', slug: 'jeans-denims', tagline: 'Durable premium industrial denim', count: '210+ Styles', image: '/images/jeans-denims.png' },
    { name: 'Polo & T-Shirts', slug: 'polo-tshirts', tagline: 'High-comfort mercerized cotton', count: '320+ Styles', image: '/images/polo tshirts.png' },
    { name: 'Trousers & Chinos', slug: 'trousers', tagline: 'Perfect fit corporate trousers', count: '110+ Styles', image: '/images/trousers.png' },
    { name: 'Outerwear & Jackets', slug: 'jackets', tagline: 'All-weather luxury protective outerwear', count: '95+ Styles', image: '/images/jackets.png' },
  ]
}

const DEFAULT_HOUSEHOLDS = {
  indicator: "OUR HOUSEHOLD DIVISION",
  headingStart: "Household & ",
  headingHighlight: "Kitchenware",
  description: "Explore our premium kitchenware, culinary tools, and home essentials. In collaboration with Aanya Homecraft, we offer tri-ply cookware, artisan table serveware, and smart organization solutions for modern home and commercial kitchens.",
  categories: [
    { name: 'Triply Cookware', slug: 'cookware', tagline: 'Professional triply cookware for healthier, faster and even cooking', count: '100+ MOQ', image: '/images/hh-1.png' },
    { name: 'Premium Cutlery', slug: 'cutlery', tagline: 'Elegant stainless steel cutlery for refined everyday dining', count: '250+ MOQ', image: '/images/hh-2.png' },
    { name: 'Table & Serveware', slug: 'table-top', tagline: 'Stylish serveware to elevate presentation for every meal', count: '100+ MOQ', image: '/images/hh-3.png' },
    { name: 'Storage & Organizer', slug: 'utility', tagline: 'Smart storage and organizers to keep your kitchen clutter-free', count: '200+ MOQ', image: '/images/hh-4.png' }
  ]
}

const DEFAULT_HOSPITALITY = {
  indicator: "HOSPITALITY DIVISION",
  headingStart: "Shop By ",
  headingHighlight: "Products",
  description: "Outfitting the world's finest hospitality with Horeca24h premium barware, commercial cookware, kitchen utensils, elegant table cutlery, and buffet serving solutions.",
  categories: [
    { name: 'Barware Products', slug: 'barware', tagline: 'Premium ice buckets, coolers & shaker tools', count: '100+ MOQ', image: '/images/hos-1.png' },
    { name: 'Cookware Products', slug: 'cookware', tagline: 'Professional triply stainless steel cook pots', count: '50+ MOQ', image: '/images/hos-2.png' },
    { name: 'Serving & Kitchen Tools', slug: 'serving-tools', tagline: 'High-end serving tongs and chef prep utensils', count: '200+ MOQ', image: '/images/hos-3.png' },
    { name: 'Table Cutlery', slug: 'cutlery', tagline: 'Mirror polished hotel-grade cutlery sets', count: '250+ MOQ', image: '/images/hos-4.png' },
    { name: 'Storage & Serving', slug: 'storage-serving', tagline: 'Wire buffet baskets and wood serving trays', count: '150+ MOQ', image: '/images/hos-5.png' }
  ]
}

const DEFAULT_EXPANSION = {
  indicator: "OUR DIVERSIFIED FUTURE",
  headingStart: "Our Strategic",
  headingHighlight: "Expansion",
  description: "While premium garments remain our core business, we have successfully expanded our industrial capacities to serve major developments in uniforms, luxury hospitality textiles, home decor, fragrance, and household supply."
}

const DEFAULT_DUBAI_PIPELINE = {
  indicator: "MANUFACTURING EXCELLENCE",
  headingStart: "The Dubai manufacturing ",
  headingHighlight: "pipeline",
  subHeading: "Five stages from raw textile to global distribution",
  scenes: [
    { step: '01', title: 'Textile Sourcing & Inspection', desc: 'Uncompromising raw material selection from global yarn mills, verified through rigorous tension and density diagnostics.', image: '/images/manufacturing-pipeline/textstyle sorcing.png' },
    { step: '02', title: 'Precision CAD Pattern Cutting', desc: 'Laser automated fabric slicing ensuring millimeter exactness across thousands of stacked textile layers simultaneously.', image: '/images/manufacturing-pipeline/2pipeline img.png' },
    { step: '03', title: 'Industrial Assembly & Stitching', desc: 'High-speed automated and artisan needlecraft producing reinforced seams engineered for extreme commercial endurance.', image: '/images/manufacturing-pipeline/3pipelineimg.png' },
    { step: '04', title: 'Flawless QA & Finishing', desc: 'Multi-stage optical and mechanical stress tests ensuring zero defects before garment pressing and sanitary enclosure.', image: '/images/manufacturing-pipeline/4pipelineimg.png' },
    { step: '05', title: 'Secure Enclosure & Export', desc: 'Containerized logistics departing from Jebel Ali Port, Dubai directly to corporate hubs and distributors in 50+ countries.', image: '/images/factory.jpeg' }
  ]
}

type ActiveSection = 'global' | 'bulk' | 'hero' | 'who' | 'garment' | 'household' | 'hospitality' | 'expansion' | 'pipeline'

export default function AdminSectionsPage() {
  const [activeTab, setActiveTab] = useState<ActiveSection>('hero')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  // Local State representing entire Website Contents
  const [siteConfig, setSiteConfig] = useState<any>({ name: '', fullName: '', tagline: '', description: '', phone: '', email: '', whatsapp: '', address: '', founded: '', countries: '', products: '', years: '' })
  const [bulkOffer, setBulkOffer] = useState<any>(DEFAULT_BULK_OFFER)
  const [hero, setHero] = useState<any>(DEFAULT_HERO)
  const [whoWeAre, setWhoWeAre] = useState<any>(DEFAULT_WHO_WE_ARE)
  const [garments, setGarments] = useState<any>(DEFAULT_GARMENTS)
  const [households, setHouseholds] = useState<any>(DEFAULT_HOUSEHOLDS)
  const [hospitality, setHospitality] = useState<any>(DEFAULT_HOSPITALITY)
  const [expansion, setExpansion] = useState<any>(DEFAULT_EXPANSION)
  const [dubaiPipeline, setDubaiPipeline] = useState<any>(DEFAULT_DUBAI_PIPELINE)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem('wcc-admin-token') || ''
        const { data } = await api.admin.getContent(token)
        
        const getSec = (id: string, def: any) => {
          if (!data) return def
          const row = data.find((d: any) => (d.key === id || d.section_id === id))
          return row && row.content ? row.content : def
        }

        setSiteConfig(getSec('site_config', contentStore.getSiteConfig()))
        setBulkOffer(getSec('bulk-offer', DEFAULT_BULK_OFFER))
        setHero(getSec('hero', DEFAULT_HERO))
        setWhoWeAre(getSec('who-we-are', DEFAULT_WHO_WE_ARE))
        setGarments(getSec('garments-showcase', DEFAULT_GARMENTS))
        setHouseholds(getSec('households-showcase-v2', DEFAULT_HOUSEHOLDS))
        setHospitality(getSec('hospitality-showcase-v2', DEFAULT_HOSPITALITY))
        setExpansion(getSec('strategic-expansion', DEFAULT_EXPANSION))
        setDubaiPipeline(getSec('dubai-pipeline', DEFAULT_DUBAI_PIPELINE))
      } catch (err) {
        console.error('Failed to load content from Supabase', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, onComplete: (base64: string) => void) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onComplete(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem('wcc-admin-token') || ''
      await Promise.all([
        api.admin.updateContent(token, 'site_config', siteConfig),
        api.admin.updateContent(token, 'bulk-offer', bulkOffer),
        api.admin.updateContent(token, 'hero', hero),
        api.admin.updateContent(token, 'who-we-are', whoWeAre),
        api.admin.updateContent(token, 'garments-showcase', garments),
        api.admin.updateContent(token, 'households-showcase-v2', households),
        api.admin.updateContent(token, 'hospitality-showcase-v2', hospitality),
        api.admin.updateContent(token, 'strategic-expansion', expansion),
        api.admin.updateContent(token, 'dubai-pipeline', dubaiPipeline)
      ])
      
      // Also save site config to local store for components that haven't been migrated
      contentStore.saveSiteConfig(siteConfig)
      
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error('Failed to save to Supabase', err)
      alert('Failed to save changes. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const { isDark, toggleTheme } = useThemeContext()

  // Dynamic Theme Classes
  const themeText = isDark ? 'text-white' : 'text-gray-900'
  const themeTextSub = isDark ? 'text-white/50' : 'text-gray-500'
  const themeTextMuted = isDark ? 'text-white/30' : 'text-gray-400'
  const themeBorder = isDark ? 'border-white/10' : 'border-gray-200'
  const themeBorderSub = isDark ? 'border-white/5' : 'border-gray-100'
  const themeBgCard = isDark ? 'bg-[#0C0C0C]' : 'bg-white'
  const themeBgSidebar = isDark ? 'bg-white/5' : 'bg-white shadow-sm'
  const themeBgOverlay = isDark ? 'bg-black/40' : 'bg-gray-50'

  const tabClass = (tab: ActiveSection) => `
    flex items-center gap-3 w-full px-4 py-3.5 text-xs font-mono font-semibold uppercase tracking-wider text-left border-l-2 transition-all rounded-none
    ${activeTab === tab 
      ? 'bg-gold/10 text-gold border-gold font-bold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]' 
      : isDark
        ? 'text-white/60 border-transparent hover:bg-white/5 hover:text-white'
        : 'text-gray-600 border-transparent hover:bg-gray-100 hover:text-gray-900'
    }
  `

  const inputClass = `w-full rounded-xl border px-4 py-3 text-xs transition-all font-mono focus:border-gold focus:outline-none ${
    isDark 
      ? 'border-white/10 bg-black/60 text-white placeholder-white/20 focus:bg-black' 
      : 'border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:bg-gray-50'
  }`

  const labelClass = `mb-1.5 block text-[10px] font-bold uppercase tracking-wider font-mono ${
    isDark ? 'text-white/50' : 'text-gray-500'
  }`

  return (
    <div className={`space-y-8 max-w-[1600px] mx-auto font-mono ${themeText}`}>
      {/* Title Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 font-sans ${themeBorder}`}>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-3xl font-bold tracking-tight uppercase">Website Sections Editor</h1>
            <span className="bg-gold/10 border border-gold/30 px-3 py-0.5 font-mono text-xs font-bold text-gold rounded-none">
              Live Contents
            </span>
          </div>
          <p className={`mt-1 font-mono text-xs ${themeTextSub}`}>
            Control the typography, images, layouts, and toggles across all home sections in real-time
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            type="button"
            className={`flex items-center gap-2 rounded-none border px-4 py-3.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              isDark 
                ? 'border-white/10 bg-white/5 text-white hover:bg-white/10' 
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
            }`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <>
                <Sun className="h-4 w-4 text-gold" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-blue-600" />
                <span>Dark Mode</span>
              </>
            )}
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2.5 rounded-none bg-gold px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-gold-light shadow-md disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span>{saving ? 'Syncing...' : 'Sync Elementary'}</span>
          </button>
        </div>
      </div>

      {success && (
        <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 p-4 text-emerald-400 rounded-none animate-fade-in font-sans">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <div className="text-xs">
            <strong className="font-bold">Sync Completed Successfully!</strong> All website components have been updated and hydrated with dynamic content.
          </div>
        </div>
      )}

      {/* Main Sections Grid layout */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left column sidebar for sections */}
        <div className={`lg:col-span-3 border p-3 space-y-1 rounded-none ${themeBorder} ${themeBgSidebar}`}>
          <span className={`px-3 font-mono text-[9px] font-bold uppercase tracking-[0.2em] block mb-2 ${themeTextMuted}`}>
            Section Nav Matrix
          </span>
          <button onClick={() => setActiveTab('hero')} className={tabClass('hero')}>
            <Layout className="h-4 w-4 shrink-0" />
            <span>1. Hero Section</span>
          </button>
          <button onClick={() => setActiveTab('who')} className={tabClass('who')}>
            <Users className="h-4 w-4 shrink-0" />
            <span>2. About Section (Who We Are)</span>
          </button>
          <button onClick={() => setActiveTab('garment')} className={tabClass('garment')}>
            <Layers className="h-4 w-4 shrink-0" />
            <span>3. Garments Categories (6 Cards)</span>
          </button>
          <button onClick={() => setActiveTab('hospitality')} className={tabClass('hospitality')}>
            <Layers className="h-4 w-4 shrink-0" />
            <span>4. Hospitality Showcase (Horeca24h)</span>
          </button>
          <button onClick={() => setActiveTab('household')} className={tabClass('household')}>
            <Layers className="h-4 w-4 shrink-0" />
            <span>5. Household Showcase (Aanya Homecraft)</span>
          </button>
          <button onClick={() => setActiveTab('bulk')} className={tabClass('bulk')}>
            <Sliders className="h-4 w-4 shrink-0" />
            <span>6. Bulk Offer Banner</span>
          </button>
          <button onClick={() => setActiveTab('global')} className={tabClass('global')}>
            <Settings className="h-4 w-4 shrink-0" />
            <span>7. Contact & General Details</span>
          </button>
          <button onClick={() => setActiveTab('expansion')} className={tabClass('expansion')}>
            <TrendingUp className="h-4 w-4 shrink-0" />
            <span>8. Future Expansion</span>
          </button>
          <button onClick={() => setActiveTab('pipeline')} className={tabClass('pipeline')}>
            <FileText className="h-4 w-4 shrink-0" />
            <span>9. Dubai Pipeline (5 Stages)</span>
          </button>
        </div>

        {/* Right column form panels */}
        <div className={`lg:col-span-9 border p-6 lg:p-8 rounded-none shadow-xl space-y-6 ${themeBorder} ${themeBgCard}`}>
          
          {/* TAB 1: Global Site Config */}
          {activeTab === 'global' && (
            <div className="space-y-6 font-sans">
              <div className={`border-b pb-4 ${themeBorder}`}>
                <h3 className={`text-lg font-bold uppercase flex items-center gap-2 ${themeText}`}>
                  <Settings className="h-5 w-5 text-gold" />
                  <span>1. Global Corporate Profile</span>
                </h3>
                <p className={`text-xs mt-1 ${themeTextSub}`}>Configure central B2B identity metrics, phone numbers, WhatsApp, and addresses</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>B2B Brand Tag *</label>
                  <input
                    type="text"
                    required
                    value={siteConfig.name || ''}
                    onChange={e => setSiteConfig({ ...siteConfig, name: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Company Full Name *</label>
                  <input
                    type="text"
                    required
                    value={siteConfig.fullName || ''}
                    onChange={e => setSiteConfig({ ...siteConfig, fullName: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Tagline Descriptor *</label>
                <input
                  type="text"
                  required
                  value={siteConfig.tagline || ''}
                  onChange={e => setSiteConfig({ ...siteConfig, tagline: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Comprehensive B2B Bio Summary *</label>
                <textarea
                  rows={3}
                  required
                  value={siteConfig.description || ''}
                  onChange={e => setSiteConfig({ ...siteConfig, description: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className={labelClass}>Direct Phone Line *</label>
                  <input
                    type="text"
                    required
                    value={siteConfig.phone || ''}
                    onChange={e => setSiteConfig({ ...siteConfig, phone: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Company Email *</label>
                  <input
                    type="text"
                    required
                    value={siteConfig.email || ''}
                    onChange={e => setSiteConfig({ ...siteConfig, email: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>WhatsApp Number (Include Country Code) *</label>
                  <input
                    type="text"
                    required
                    value={siteConfig.whatsapp || ''}
                    onChange={e => setSiteConfig({ ...siteConfig, whatsapp: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Physical Address *</label>
                <input
                  type="text"
                  required
                  value={siteConfig.address || ''}
                  onChange={e => setSiteConfig({ ...siteConfig, address: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className={`grid gap-4 sm:grid-cols-4 pt-4 border-t ${themeBorderSub}`}>
                <div>
                  <label className={labelClass}>Year Founded</label>
                  <input
                    type="text"
                    value={siteConfig.founded || ''}
                    onChange={e => setSiteConfig({ ...siteConfig, founded: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Countries Active</label>
                  <input
                    type="text"
                    value={siteConfig.countries || ''}
                    onChange={e => setSiteConfig({ ...siteConfig, countries: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Products Listed</label>
                  <input
                    type="text"
                    value={siteConfig.products || ''}
                    onChange={e => setSiteConfig({ ...siteConfig, products: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Years Experience</label>
                  <input
                    type="text"
                    value={siteConfig.years || ''}
                    onChange={e => setSiteConfig({ ...siteConfig, years: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Bulk Offer Banner Option */}
          {activeTab === 'bulk' && (
            <div className="space-y-6 font-sans">
              <div className={`border-b pb-4 flex items-center justify-between ${themeBorder}`}>
                <div>
                  <h3 className={`text-lg font-bold uppercase flex items-center gap-2 ${themeText}`}>
                    <Sliders className="h-5 w-5 text-gold" />
                    <span>2. Bulk Offer Banner Option</span>
                  </h3>
                  <p className={`text-xs mt-1 ${themeTextSub}`}>Configure active clearance events, discount values, and on/off visibility</p>
                </div>
                {/* On/Off Switch Button */}
                <button
                  type="button"
                  onClick={() => setBulkOffer({ ...bulkOffer, enabled: !bulkOffer.enabled })}
                  className={`flex items-center gap-2 px-4 py-2 border transition-all rounded-none ${
                    isDark 
                      ? 'border-white/10 bg-white/5 hover:bg-white/10' 
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {bulkOffer.enabled ? (
                    <>
                      <ToggleRight className="h-5 w-5 text-gold" />
                      <span className="text-gold font-bold text-xs uppercase tracking-wider">ACTIVE (ON)</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="h-5 w-5 text-white/30" />
                      <span className={`${isDark ? 'text-white/40' : 'text-gray-400'} font-bold text-xs uppercase tracking-wider`}>DEACTIVATED (OFF)</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Promo Tag text</label>
                  <input
                    type="text"
                    value={bulkOffer.tagText}
                    onChange={e => setBulkOffer({ ...bulkOffer, tagText: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Call-to-Action Button Text</label>
                  <input
                    type="text"
                    value={bulkOffer.buttonText}
                    onChange={e => setBulkOffer({ ...bulkOffer, buttonText: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Heading Line Start</label>
                  <input
                    type="text"
                    value={bulkOffer.headingStart}
                    onChange={e => setBulkOffer({ ...bulkOffer, headingStart: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Heading Line Highlight (Gold Text)</label>
                  <input
                    type="text"
                    value={bulkOffer.headingHighlight}
                    onChange={e => setBulkOffer({ ...bulkOffer, headingHighlight: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Promo Description *</label>
                <textarea
                  rows={2}
                  value={bulkOffer.description}
                  onChange={e => setBulkOffer({ ...bulkOffer, description: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className={`grid gap-4 sm:grid-cols-4 pt-4 border-t ${themeBorderSub}`}>
                <div>
                  <label className={labelClass}>Discount Percent *</label>
                  <input
                    type="number"
                    value={bulkOffer.discountPercentage}
                    onChange={e => setBulkOffer({ ...bulkOffer, discountPercentage: parseInt(e.target.value) || 0 })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Discount Tag Label</label>
                  <input
                    type="text"
                    value={bulkOffer.discountText}
                    onChange={e => setBulkOffer({ ...bulkOffer, discountText: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Discount Minimum terms</label>
                  <input
                    type="text"
                    value={bulkOffer.discountSubText}
                    onChange={e => setBulkOffer({ ...bulkOffer, discountSubText: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Offer End Date</label>
                  <input
                    type="text"
                    value={bulkOffer.offerEndDate}
                    onChange={e => setBulkOffer({ ...bulkOffer, offerEndDate: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Slide Images Uploads (3 Slots) */}
              <div className={`pt-6 border-t ${themeBorderSub}`}>
                <span className={labelClass}>Promo Carousel Slide Images</span>
                <div className="grid gap-6 mt-3">
                  {bulkOffer.slideImages.map((img: any, idx: number) => (
                    <ResponsiveImageUploader
                      key={idx}
                      label={`Slide 0${idx + 1}`}
                      value={img}
                      onChange={(val) => {
                        const updated = [...bulkOffer.slideImages]
                        updated[idx] = val
                        setBulkOffer({ ...bulkOffer, slideImages: updated })
                      }}
                      aspectRatioHint="Suggested: 16:9 for Desktop, 4:5 for Mobile"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Hero Carousel campaigns */}
          {activeTab === 'hero' && (
            <div className="space-y-6 font-sans">
              <div className={`border-b pb-4 ${themeBorder}`}>
                <h3 className={`text-lg font-bold uppercase flex items-center gap-2 ${themeText}`}>
                  <Layout className="h-5 w-5 text-gold" />
                  <span>3. Hero Section Carousel Campaigns</span>
                </h3>
                <p className={`text-xs mt-1 ${themeTextSub}`}>Configure active B2B campaign sets representing your signature brands</p>
              </div>

              {hero.campaigns.map((camp: any, cIdx: number) => (
                <div key={camp.id} className={`border p-6 space-y-4 rounded-none ${themeBorder} ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <div className={`flex justify-between items-center border-b pb-3 ${themeBorder}`}>
                    <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider">Campaign Slot 0{cIdx + 1}</span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Campaign Title</label>
                      <input
                        type="text"
                        value={camp.title}
                        onChange={e => {
                          const updated = [...hero.campaigns]
                          updated[cIdx].title = e.target.value
                          setHero({ ...hero, campaigns: updated })
                        }}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Campaign Tag</label>
                      <input
                        type="text"
                        value={camp.tag}
                        onChange={e => {
                          const updated = [...hero.campaigns]
                          updated[cIdx].tag = e.target.value
                          setHero({ ...hero, campaigns: updated })
                        }}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* 3 Images separated (Left, Center, Right) */}
                  <div className="grid gap-6 pt-3">
                    <ResponsiveImageUploader
                      label="Left Image (Emblem)"
                      value={camp.left}
                      onChange={(val) => {
                        const updated = [...hero.campaigns]
                        updated[cIdx].left = val
                        setHero({ ...hero, campaigns: updated })
                      }}
                      aspectRatioHint="Suggested: 3:4 Portrait"
                    />
                    <ResponsiveImageUploader
                      label="Center Image (Signature)"
                      value={camp.center}
                      onChange={(val) => {
                        const updated = [...hero.campaigns]
                        updated[cIdx].center = val
                        setHero({ ...hero, campaigns: updated })
                      }}
                      aspectRatioHint="Suggested: 16:9 Landscape"
                    />
                    <ResponsiveImageUploader
                      label="Right Image (Detail)"
                      value={camp.right}
                      onChange={(val) => {
                        const updated = [...hero.campaigns]
                        updated[cIdx].right = val
                        setHero({ ...hero, campaigns: updated })
                      }}
                      aspectRatioHint="Suggested: 3:4 Portrait"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: Who We Are */}
          {activeTab === 'who' && (
            <div className="space-y-6 font-sans">
              <div className={`border-b pb-4 ${themeBorder}`}>
                <h3 className={`text-lg font-bold uppercase flex items-center gap-2 ${themeText}`}>
                  <Users className="h-5 w-5 text-gold" />
                  <span>4. Who We Are Section</span>
                </h3>
                <p className={`text-xs mt-1 ${themeTextSub}`}>Configure company legacy story, stats, achievements, and editorial images</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Heritage Tagline Label</label>
                  <input
                    type="text"
                    value={whoWeAre.heritageLabel}
                    onChange={e => setWhoWeAre({ ...whoWeAre, heritageLabel: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Main Editorial Heading</label>
                  <input
                    type="text"
                    value={whoWeAre.heading}
                    onChange={e => setWhoWeAre({ ...whoWeAre, heading: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Established Label Subtitle</label>
                  <input
                    type="text"
                    value={whoWeAre.subHeading}
                    onChange={e => setWhoWeAre({ ...whoWeAre, subHeading: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Floating Glass Badge Title</label>
                  <input
                    type="text"
                    value={whoWeAre.floatingBadgeTitle}
                    onChange={e => setWhoWeAre({ ...whoWeAre, floatingBadgeTitle: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Floating Glass Badge Description</label>
                <input
                  type="text"
                  value={whoWeAre.floatingBadgeDesc}
                  onChange={e => setWhoWeAre({ ...whoWeAre, floatingBadgeDesc: e.target.value })}
                  className={inputClass}
                />
              </div>

              {/* 3 Paragraphs fields */}
              <div className="space-y-3">
                <span className={labelClass}>Editorial Paragraphs (Legibility & Structure)</span>
                {whoWeAre.paragraphs.map((pText: string, pIdx: number) => (
                  <div key={pIdx}>
                    <label className={`text-[9px] block mb-1 ${themeTextSub}`}>Paragraph 0{pIdx + 1}</label>
                    <textarea
                      rows={2}
                      value={pText}
                      onChange={e => {
                        const updated = [...whoWeAre.paragraphs]
                        updated[pIdx] = e.target.value
                        setWhoWeAre({ ...whoWeAre, paragraphs: updated })
                      }}
                      className={inputClass}
                    />
                  </div>
                ))}
              </div>

              {/* Stats edit */}
              <div className={`pt-4 border-t space-y-4 ${themeBorderSub}`}>
                <span className={labelClass}>Authority Stats Matrix</span>
                <div className="grid gap-4 sm:grid-cols-3">
                  {whoWeAre.stats.map((stat: any, sIdx: number) => (
                    <div key={sIdx} className={`border p-4 space-y-3 ${themeBorder} ${isDark ? 'bg-black/40' : 'bg-gray-50'}`}>
                      <span className="text-[9px] font-mono font-bold text-gold uppercase block">Stat Slot 0{sIdx + 1}</span>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className={`text-[9px] block ${themeTextSub}`}>Number</label>
                          <input
                            type="number"
                            value={stat.value}
                            onChange={e => {
                              const updated = [...whoWeAre.stats]
                              updated[sIdx].value = parseInt(e.target.value) || 0
                              setWhoWeAre({ ...whoWeAre, stats: updated })
                            }}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={`text-[9px] block ${themeTextSub}`}>Suffix</label>
                          <input
                            type="text"
                            value={stat.suffix}
                            onChange={e => {
                              const updated = [...whoWeAre.stats]
                              updated[sIdx].suffix = e.target.value
                              setWhoWeAre({ ...whoWeAre, stats: updated })
                            }}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={`text-[9px] block ${themeTextSub}`}>Label Tag</label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={e => {
                            const updated = [...whoWeAre.stats]
                            updated[sIdx].label = e.target.value
                            setWhoWeAre({ ...whoWeAre, stats: updated })
                          }}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={`text-[9px] block ${themeTextSub}`}>Short Description</label>
                        <textarea
                          rows={2}
                          value={stat.desc}
                          onChange={e => {
                            const updated = [...whoWeAre.stats]
                            updated[sIdx].desc = e.target.value
                            setWhoWeAre({ ...whoWeAre, stats: updated })
                          }}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main editorial Image upload */}
              <div className={`pt-6 border-t ${themeBorderSub}`}>
                <ResponsiveImageUploader
                  label="Main Editorial Image (Vibrant & Sharp)"
                  value={whoWeAre.mainImage}
                  onChange={(val) => {
                    setWhoWeAre({ ...whoWeAre, mainImage: val })
                  }}
                  aspectRatioHint="Suggested: 16:9 for Desktop, 4:5 for Mobile"
                />
              </div>
            </div>
          )}

          {/* TAB 5: Garment Showcase */}
          {activeTab === 'garment' && (
            <div className="space-y-6 font-sans">
              <div className={`border-b pb-4 ${themeBorder}`}>
                <h3 className={`text-lg font-bold uppercase flex items-center gap-2 ${themeText}`}>
                  <Layers className="h-5 w-5 text-gold" />
                  <span>5. Garment Manufacturing Showcase</span>
                </h3>
                <p className={`text-xs mt-1 ${themeTextSub}`}>Configure active garment categories, descriptions, styles, and card cover images</p>
              </div>

              <div>
                <label className={labelClass}>Section Upper Indicator</label>
                <input
                  type="text"
                  value={garments.indicator}
                  onChange={e => setGarments({ ...garments, indicator: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Heading Line Start</label>
                  <input
                    type="text"
                    value={garments.headingStart}
                    onChange={e => setGarments({ ...garments, headingStart: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Heading Line Highlight (Gold Text)</label>
                  <input
                    type="text"
                    value={garments.headingHighlight}
                    onChange={e => setGarments({ ...garments, headingHighlight: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Section Description Paragraph *</label>
                <textarea
                  rows={2}
                  value={garments.description}
                  onChange={e => setGarments({ ...garments, description: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className={`pt-4 border-t space-y-4 ${themeBorderSub}`}>
                <span className={labelClass}>Garment Categories Matrix (6 Symmetrical Cards)</span>
                <div className="grid gap-4 sm:grid-cols-2">
                  {garments.categories.map((cat: any, cIdx: number) => (
                    <div key={cat.slug} className={`border p-4 space-y-3 rounded-none ${themeBorder} ${isDark ? 'bg-black/40' : 'bg-gray-50'}`}>
                      <span className="text-[9px] font-mono font-bold text-gold uppercase block">Card Slot 0{cIdx + 1} ({cat.name})</span>
                      
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className={`text-[9px] block ${themeTextSub}`}>Category name</label>
                          <input
                            type="text"
                            value={cat.name}
                            onChange={e => {
                              const updated = [...garments.categories]
                              updated[cIdx].name = e.target.value
                              setGarments({ ...garments, categories: updated })
                            }}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={`text-[9px] block ${themeTextSub}`}>Styles Count Tag</label>
                          <input
                            type="text"
                            value={cat.count}
                            onChange={e => {
                              const updated = [...garments.categories]
                              updated[cIdx].count = e.target.value
                              setGarments({ ...garments, categories: updated })
                            }}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={`text-[9px] block ${themeTextSub}`}>Short Tagline Description</label>
                        <input
                          type="text"
                          value={cat.tagline}
                          onChange={e => {
                            const updated = [...garments.categories]
                            updated[cIdx].tagline = e.target.value
                            setGarments({ ...garments, categories: updated })
                          }}
                          className={inputClass}
                        />
                      </div>

                      {/* Image Preview & Upload */}
                      <div className="pt-2">
                        <ResponsiveImageUploader
                          label="Category Card Image"
                          value={cat.image}
                          onChange={(val) => {
                            const updated = [...garments.categories]
                            updated[cIdx].image = val
                            setGarments({ ...garments, categories: updated })
                          }}
                          aspectRatioHint="Suggested: 16:9 or 3:4"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Household Showcase */}
          {activeTab === 'household' && (
            <div className="space-y-6 font-sans">
              <div className={`border-b pb-4 ${themeBorder}`}>
                <h3 className={`text-lg font-bold uppercase flex items-center gap-2 ${themeText}`}>
                  <Layers className="h-5 w-5 text-gold" />
                  <span>6. Household Manufacturing Showcase</span>
                </h3>
                <p className={`text-xs mt-1 ${themeTextSub}`}>Configure active household items, description parameters, MOQ values, and card images</p>
              </div>

              <div>
                <label className={labelClass}>Section Upper Indicator</label>
                <input
                  type="text"
                  value={households.indicator}
                  onChange={e => setHouseholds({ ...households, indicator: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Heading Line Start</label>
                  <input
                    type="text"
                    value={households.headingStart}
                    onChange={e => setHouseholds({ ...households, headingStart: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Heading Line Highlight (Gold Text)</label>
                  <input
                    type="text"
                    value={households.headingHighlight}
                    onChange={e => setHouseholds({ ...households, headingHighlight: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Section Description Paragraph *</label>
                <textarea
                  rows={2}
                  value={households.description}
                  onChange={e => setHouseholds({ ...households, description: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className={`pt-4 border-t space-y-4 ${themeBorderSub}`}>
                <span className={labelClass}>Household Categories Matrix (4 Cinematic Cards)</span>
                <div className="grid gap-4 sm:grid-cols-2">
                  {households.categories.map((cat: any, cIdx: number) => (
                    <div key={cat.slug} className={`border p-4 space-y-3 rounded-none ${themeBorder} ${isDark ? 'bg-black/40' : 'bg-gray-50'}`}>
                      <span className="text-[9px] font-mono font-bold text-gold uppercase block">Card Slot 0{cIdx + 1} ({cat.name})</span>
                      
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className={`text-[9px] block ${themeTextSub}`}>Category name</label>
                          <input
                            type="text"
                            value={cat.name}
                            onChange={e => {
                              const updated = [...households.categories]
                              updated[cIdx].name = e.target.value
                              setHouseholds({ ...households, categories: updated })
                            }}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={`text-[9px] block ${themeTextSub}`}>MOQ Value Tag</label>
                          <input
                            type="text"
                            value={cat.count}
                            onChange={e => {
                              const updated = [...households.categories]
                              updated[cIdx].count = e.target.value
                              setHouseholds({ ...households, categories: updated })
                            }}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={`text-[9px] block ${themeTextSub}`}>Short Tagline Description</label>
                        <input
                          type="text"
                          value={cat.tagline}
                          onChange={e => {
                            const updated = [...households.categories]
                            updated[cIdx].tagline = e.target.value
                            setHouseholds({ ...households, categories: updated })
                          }}
                          className={inputClass}
                        />
                      </div>

                      {/* Image Preview & Upload */}
                      <div className="pt-2">
                        <ResponsiveImageUploader
                          label="Category Card Image"
                          value={cat.image}
                          onChange={(val) => {
                            const updated = [...households.categories]
                            updated[cIdx].image = val
                            setHouseholds({ ...households, categories: updated })
                          }}
                          aspectRatioHint="Suggested: 1:1 or 4:3"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6.5: Hospitality Showcase */}
          {activeTab === 'hospitality' && (
            <div className="space-y-6 font-sans">
              <div className={`border-b pb-4 ${themeBorder}`}>
                <h3 className={`text-lg font-bold uppercase flex items-center gap-2 ${themeText}`}>
                  <Layers className="h-5 w-5 text-gold" />
                  <span>6.5 Hospitality Manufacturing Showcase</span>
                </h3>
                <p className={`text-xs mt-1 ${themeTextSub}`}>Configure active hospitality items, description parameters, MOQ values, and card images</p>
              </div>

              <div>
                <label className={labelClass}>Section Upper Indicator</label>
                <input
                  type="text"
                  value={hospitality.indicator}
                  onChange={e => setHospitality({ ...hospitality, indicator: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Heading Line Start</label>
                  <input
                    type="text"
                    value={hospitality.headingStart}
                    onChange={e => setHospitality({ ...hospitality, headingStart: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Heading Line Highlight (Gold Text)</label>
                  <input
                    type="text"
                    value={hospitality.headingHighlight}
                    onChange={e => setHospitality({ ...hospitality, headingHighlight: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Section Description Paragraph *</label>
                <textarea
                  rows={2}
                  value={hospitality.description}
                  onChange={e => setHospitality({ ...hospitality, description: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className={`pt-4 border-t space-y-4 ${themeBorderSub}`}>
                <span className={labelClass}>Hospitality Categories Matrix (5 Portrait Cards)</span>
                <div className="grid gap-4 sm:grid-cols-2">
                  {hospitality.categories.map((cat: any, cIdx: number) => (
                    <div key={cat.slug} className={`border p-4 space-y-3 rounded-none ${themeBorder} ${isDark ? 'bg-black/40' : 'bg-gray-50'}`}>
                      <span className="text-[9px] font-mono font-bold text-gold uppercase block">Card Slot 0{cIdx + 1} ({cat.name})</span>
                      
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className={`text-[9px] block ${themeTextSub}`}>Category name</label>
                          <input
                            type="text"
                            value={cat.name}
                            onChange={e => {
                              const updated = [...hospitality.categories]
                              updated[cIdx].name = e.target.value
                              setHospitality({ ...hospitality, categories: updated })
                            }}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={`text-[9px] block ${themeTextSub}`}>MOQ Value Tag</label>
                          <input
                            type="text"
                            value={cat.count}
                            onChange={e => {
                              const updated = [...hospitality.categories]
                              updated[cIdx].count = e.target.value
                              setHospitality({ ...hospitality, categories: updated })
                            }}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={`text-[9px] block ${themeTextSub}`}>Short Tagline Description</label>
                        <input
                          type="text"
                          value={cat.tagline}
                          onChange={e => {
                            const updated = [...hospitality.categories]
                            updated[cIdx].tagline = e.target.value
                            setHospitality({ ...hospitality, categories: updated })
                          }}
                          className={inputClass}
                        />
                      </div>

                      {/* Image Preview & Upload */}
                      <div className="pt-2">
                        <ResponsiveImageUploader
                          label="Category Card Image"
                          value={cat.image}
                          onChange={(val) => {
                            const updated = [...hospitality.categories]
                            updated[cIdx].image = val
                            setHospitality({ ...hospitality, categories: updated })
                          }}
                          aspectRatioHint="Suggested: 3:4 Portrait"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: Strategic Expansion */}
          {activeTab === 'expansion' && (
            <div className="space-y-6 font-sans">
              <div className={`border-b pb-4 ${themeBorder}`}>
                <h3 className={`text-lg font-bold uppercase flex items-center gap-2 ${themeText}`}>
                  <TrendingUp className="h-5 w-5 text-gold" />
                  <span>7. Strategic Diversification &amp; Expansion</span>
                </h3>
                <p className={`text-xs mt-1 ${themeTextSub}`}>Configure active B2B statements, tags, and status descriptions for non-core sectors</p>
              </div>

              <div>
                <label className={labelClass}>Diversification Tag Label</label>
                <input
                  type="text"
                  value={expansion.indicator}
                  onChange={e => setExpansion({ ...expansion, indicator: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Heading Line Start</label>
                  <input
                    type="text"
                    value={expansion.headingStart}
                    onChange={e => setExpansion({ ...expansion, headingStart: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Heading Line Highlight (Gold Text)</label>
                  <input
                    type="text"
                    value={expansion.headingHighlight}
                    onChange={e => setExpansion({ ...expansion, headingHighlight: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Comprehensive Expansion Statement descriptor *</label>
                <textarea
                  rows={4}
                  value={expansion.description}
                  onChange={e => setExpansion({ ...expansion, description: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {/* TAB 8: Dubai Pipeline Story */}
          {activeTab === 'pipeline' && (
            <div className="space-y-6 font-sans">
              <div className={`border-b pb-4 ${themeBorder}`}>
                <h3 className={`text-lg font-bold uppercase flex items-center gap-2 ${themeText}`}>
                  <FileText className="h-5 w-5 text-gold" />
                  <span>8. Dubai Manufacturing Pipeline Steps</span>
                </h3>
                <p className={`text-xs mt-1 ${themeTextSub}`}>Configure step descriptions, step indicators, sequence cards, and images representing quality gates</p>
              </div>

              <div>
                <label className={labelClass}>Pipeline Tag Indicator</label>
                <input
                  type="text"
                  value={dubaiPipeline.indicator}
                  onChange={e => setDubaiPipeline({ ...dubaiPipeline, indicator: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Heading Line Start</label>
                  <input
                    type="text"
                    value={dubaiPipeline.headingStart}
                    onChange={e => setDubaiPipeline({ ...dubaiPipeline, headingStart: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Heading Line Highlight (Gold Text)</label>
                  <input
                    type="text"
                    value={dubaiPipeline.headingHighlight}
                    onChange={e => setDubaiPipeline({ ...dubaiPipeline, headingHighlight: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Pipeline Subtitle Line Descriptor</label>
                <input
                  type="text"
                  value={dubaiPipeline.subHeading}
                  onChange={e => setDubaiPipeline({ ...dubaiPipeline, subHeading: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className={`pt-4 border-t space-y-6 ${themeBorderSub}`}>
                <span className={labelClass}>Dubai Manufacturing Stages Matrix (5 Consecutive Stages)</span>
                
                {dubaiPipeline.scenes.map((scene: any, sIdx: number) => (
                  <div key={scene.step} className={`border p-5 space-y-4 rounded-none ${themeBorder} ${isDark ? 'bg-black/40' : 'bg-gray-50'}`}>
                    <div className={`flex justify-between items-center border-b pb-2 ${themeBorder}`}>
                      <span className="text-[10px] font-mono font-bold text-gold uppercase tracking-wider">Pipeline Stage {scene.step}</span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className={`text-[9px] block ${themeTextSub}`}>Stage Title *</label>
                        <input
                          type="text"
                          value={scene.title}
                          onChange={e => {
                            const updated = [...dubaiPipeline.scenes]
                            updated[sIdx].title = e.target.value
                            setDubaiPipeline({ ...dubaiPipeline, scenes: updated })
                          }}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={`text-[9px] block ${themeTextSub}`}>Step Number *</label>
                        <input
                          type="text"
                          value={scene.step}
                          onChange={e => {
                            const updated = [...dubaiPipeline.scenes]
                            updated[sIdx].step = e.target.value
                            setDubaiPipeline({ ...dubaiPipeline, scenes: updated })
                          }}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`text-[9px] block ${themeTextSub}`}>Comprehensive Description *</label>
                      <textarea
                        rows={2}
                        value={scene.desc}
                        onChange={e => {
                          const updated = [...dubaiPipeline.scenes]
                          updated[sIdx].desc = e.target.value
                          setDubaiPipeline({ ...dubaiPipeline, scenes: updated })
                        }}
                        className={inputClass}
                      />
                    </div>

                    {/* Image Preview & Device File Picker */}
                    <div className="pt-2">
                      <ResponsiveImageUploader
                        label="Pipeline Stage Image"
                        value={scene.image}
                        onChange={(val) => {
                          const updated = [...dubaiPipeline.scenes]
                          updated[sIdx].image = val
                          setDubaiPipeline({ ...dubaiPipeline, scenes: updated })
                        }}
                        aspectRatioHint="Suggested: 16:9 Landscape"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
