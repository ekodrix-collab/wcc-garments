import type { Metadata } from 'next'

import { DivisionCatalogPage } from '@/components/products/DivisionCatalogPage'
import { DIVISIONS, SITE_CONFIG } from '@/lib/constants'

export function generateStaticParams() {
  return DIVISIONS.map((division) => ({ division: division.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ division: string }>
}): Promise<Metadata> {
  const { division: divisionSlug } = await params
  const division = DIVISIONS.find((item) => item.slug === divisionSlug)

  if (!division) return {}

  return {
    title: division.metaTitle,
    description: division.metaDescription,
    keywords: division.keywords,
    openGraph: {
      title: division.metaTitle,
      description: division.metaDescription,
      type: 'website',
      url: `${SITE_CONFIG.url}/products/${division.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: division.metaTitle,
      description: division.metaDescription,
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/products/${division.slug}`,
    },
  }
}

export default async function DivisionCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ division: string }>
  searchParams: Promise<{ category?: string; brand?: string }>
}) {
  const { division: divisionSlug } = await params
  const { category, brand } = await searchParams

  return (
    <DivisionCatalogPage
      divisionSlug={divisionSlug}
      initialCategorySlug={category}
      initialBrandSlug={brand}
    />
  )
}
