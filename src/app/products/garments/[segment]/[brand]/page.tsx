import { notFound, redirect } from 'next/navigation'

interface PageProps {
  params: Promise<{
    segment: string
    brand: string
  }>
}

const VALID_SEGMENTS = new Set(['core', 'incentives'])

export default async function LegacyGarmentsBrandSegmentPage({ params }: PageProps) {
  const { segment, brand } = await params

  if (!VALID_SEGMENTS.has(segment)) {
    notFound()
  }

  redirect(`/products/garments/${brand}`)
}
