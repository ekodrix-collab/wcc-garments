import { NextRequest, NextResponse } from 'next/server'
import { MOCK_PRODUCTS } from '@/lib/constants'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const product = MOCK_PRODUCTS.find((p) => p.slug === slug)

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    const data = {
      id: product.id,
      division_id: product.id,
      category_id: null,
      name: product.name,
      slug: product.slug,
      short_description: product.short_description,
      description: product.short_description,
      specifications: product.specifications,
      moq: product.moq,
      lead_time: product.lead_time,
      custom_branding: true,
      images: product.images,
      video_url: null,
      tags: product.tags,
      suitable_for: product.suitable_for,
      featured: product.featured,
      is_new: product.is_new,
      is_offer: product.is_offer,
      offer_label: product.offer_label,
      published: true,
      view_count: Math.floor(Math.random() * 500),
      enquiry_count: Math.floor(Math.random() * 50),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      division: {
        id: product.id,
        name: product.division,
        slug: product.division_slug,
        accent_color: '#3B82F6',
        tagline: null,
        description: null,
        short_description: null,
        hero_image: null,
        hero_video: null,
        thumbnail: null,
        display_order: 0,
        active: true,
        meta_title: null,
        meta_description: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      category: {
        id: product.id,
        name: product.category,
        slug: product.category.toLowerCase().replace(/\s+/g, '-'),
        division_id: product.id,
        description: null,
        image: null,
        display_order: 0,
        active: true,
      },
    }

    return NextResponse.json(
      { success: true, data },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    )
  } catch (error) {
    console.error('Product detail error:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
}
