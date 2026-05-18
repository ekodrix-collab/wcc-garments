import { NextRequest, NextResponse } from 'next/server'

const MOCK_CATEGORIES = [
  { id: '1', division_id: '1', name: 'Formal Shirts', slug: 'formal-shirts', description: null, image: null, display_order: 1, active: true, created_at: new Date().toISOString() },
  { id: '2', division_id: '1', name: 'Polo Shirts', slug: 'polo-shirts', description: null, image: null, display_order: 2, active: true, created_at: new Date().toISOString() },
  { id: '3', division_id: '1', name: 'T-Shirts', slug: 't-shirts', description: null, image: null, display_order: 3, active: true, created_at: new Date().toISOString() },
  { id: '4', division_id: '2', name: 'Workwear', slug: 'workwear', description: null, image: null, display_order: 1, active: true, created_at: new Date().toISOString() },
  { id: '5', division_id: '2', name: 'Safety Wear', slug: 'safety-wear', description: null, image: null, display_order: 2, active: true, created_at: new Date().toISOString() },
  { id: '6', division_id: '3', name: 'Chef Uniforms', slug: 'chef-uniforms', description: null, image: null, display_order: 1, active: true, created_at: new Date().toISOString() },
  { id: '7', division_id: '3', name: 'Bed Linen', slug: 'bed-linen', description: null, image: null, display_order: 2, active: true, created_at: new Date().toISOString() },
  { id: '8', division_id: '4', name: 'Bath Textiles', slug: 'bath-textiles', description: null, image: null, display_order: 1, active: true, created_at: new Date().toISOString() },
  { id: '9', division_id: '4', name: 'Bed Sheets', slug: 'bed-sheets', description: null, image: null, display_order: 2, active: true, created_at: new Date().toISOString() },
  { id: '10', division_id: '5', name: 'Premium Fragrances', slug: 'premium-fragrances', description: null, image: null, display_order: 1, active: true, created_at: new Date().toISOString() },
  { id: '11', division_id: '6', name: 'Cleaning Products', slug: 'cleaning-products', description: null, image: null, display_order: 1, active: true, created_at: new Date().toISOString() },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const division = searchParams.get('division')

    let data = [...MOCK_CATEGORIES]

    if (division) {
      const divisionMap: Record<string, string> = {
        garments: '1', uniforms: '2', hospitality: '3',
        home: '4', fragrance: '5', households: '6',
      }
      const divId = divisionMap[division]
      if (divId) {
        data = data.filter((c) => c.division_id === divId)
      }
    }

    return NextResponse.json(
      { success: true, data },
      { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200' } }
    )
  } catch (error) {
    console.error('Categories error:', error)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
