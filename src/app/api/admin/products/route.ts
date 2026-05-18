import { NextResponse } from 'next/server'
import { MOCK_PRODUCTS } from '@/lib/constants'

export async function GET() {
  const data = MOCK_PRODUCTS.map((p) => ({
    id: p.id, name: p.name, slug: p.slug, division: p.division,
    category: p.category, images: p.images, featured: p.featured,
    is_new: p.is_new, is_offer: p.is_offer, published: true,
    created_at: new Date().toISOString(),
  }))
  return NextResponse.json({ success: true, data })
}

export async function POST() {
  return NextResponse.json({
    success: true,
    message: 'Product created (mock mode)',
    data: { id: crypto.randomUUID() },
  })
}
