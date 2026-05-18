import { NextRequest, NextResponse } from 'next/server'
import { MOCK_PRODUCTS } from '@/lib/constants'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const division = searchParams.get('division')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const is_new = searchParams.get('is_new')
    const is_offer = searchParams.get('is_offer')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '12')
    const offset = parseInt(searchParams.get('offset') || '0')

    let filtered = [...MOCK_PRODUCTS]

    if (division) {
      filtered = filtered.filter((p) => p.division_slug === division)
    }
    if (category) {
      filtered = filtered.filter((p) =>
        p.category.toLowerCase().includes(category.toLowerCase())
      )
    }
    if (featured === 'true') {
      filtered = filtered.filter((p) => p.featured)
    }
    if (is_new === 'true') {
      filtered = filtered.filter((p) => p.is_new)
    }
    if (is_offer === 'true') {
      filtered = filtered.filter((p) => p.is_offer)
    }
    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    const total = filtered.length
    const paginated = filtered.slice(offset, offset + limit)

    const data = paginated.map((p) => ({
      id: p.id,
      division_id: p.id,
      category_id: null,
      name: p.name,
      slug: p.slug,
      short_description: p.short_description,
      description: p.short_description,
      specifications: p.specifications,
      moq: p.moq,
      lead_time: p.lead_time,
      custom_branding: true,
      images: p.images,
      video_url: null,
      tags: p.tags,
      suitable_for: p.suitable_for,
      featured: p.featured,
      is_new: p.is_new,
      is_offer: p.is_offer,
      offer_label: p.offer_label,
      published: true,
      view_count: Math.floor(Math.random() * 500),
      enquiry_count: Math.floor(Math.random() * 50),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      division: {
        id: p.id,
        name: p.division,
        slug: p.division_slug,
        accent_color: '#C9A84C',
      },
      category: {
        id: p.id,
        name: p.category,
        slug: p.category.toLowerCase().replace(/\s+/g, '-'),
      },
    }))

    return NextResponse.json(
      { success: true, data, total, limit, offset },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    )
  } catch (error) {
    console.error('Products route error:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
}
