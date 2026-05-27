import { notFound, redirect } from 'next/navigation'

interface PageProps {
  params: Promise<{
    brand: string        // Corresponds to the first dynamic segment (e.g., 'core')
    legacyBrand: string  // Corresponds to the second dynamic segment (e.g., 'treasure')
  }>
}

const VALID_SEGMENTS = new Set(['core', 'incentives'])

export default async function LegacyGarmentsBrandSegmentPage({ params }: PageProps) {
  const { brand, legacyBrand } = await params

  if (!VALID_SEGMENTS.has(brand)) {
    notFound()
  }

  redirect(`/products/garments/${legacyBrand}`)
}
