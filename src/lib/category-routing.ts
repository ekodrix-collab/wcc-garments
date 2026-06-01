import { DIVISIONS } from '@/lib/constants'

const CATEGORY_ALIASES: Record<string, Record<string, string>> = {
  households: {
    microfiber: 'microfiber-cleaning',
    industrialmicrofiber: 'microfiber-cleaning',
    microfibercleaning: 'microfiber-cleaning',
    cleaningproducts: 'microfiber-cleaning',
    cleaningsupplies: 'microfiber-cleaning',
    liquids: 'bulk-liquids-sanitizers',
    bulkliquidssanitizers: 'bulk-liquids-sanitizers',
    kitchenlinens: 'institutional-linens',
    institutionallinens: 'institutional-linens',
    oemessentials: 'oem-custom-essentials',
    oemcustomessentials: 'oem-custom-essentials',
  },
}

export function normalizeCategoryValue(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '')
}

export function resolveDivisionCategorySlug(
  divisionSlug: string,
  value?: string | null
) {
  if (!value) return null

  const division = DIVISIONS.find((item) => item.slug === divisionSlug)
  if (!division) return null

  const normalizedValue = normalizeCategoryValue(value)
  const aliasedSlug = CATEGORY_ALIASES[divisionSlug]?.[normalizedValue]
  if (aliasedSlug) {
    return aliasedSlug
  }

  const matchedCategory = division.categories.find((category) => {
    const normalizedName = normalizeCategoryValue(category.name)
    const normalizedSlug = normalizeCategoryValue(category.slug)

    return (
      category.slug === value ||
      normalizedSlug === normalizedValue ||
      normalizedName === normalizedValue
    )
  })

  return matchedCategory?.slug ?? null
}

export function getDivisionCategoryHref(
  divisionSlug: string,
  value?: string | null
) {
  const resolvedSlug = resolveDivisionCategorySlug(divisionSlug, value)

  if (!resolvedSlug || resolvedSlug === 'all') {
    return `/products/${divisionSlug}`
  }

  return `/products/${divisionSlug}/${resolvedSlug}`
}

export function getProductHref(divisionSlug: string, productSlug: string) {
  return `/products/${divisionSlug}/details/${productSlug}`
}

export function categoryMatchesSelection({
  divisionSlug,
  productCategoryName,
  productCategorySlug,
  selectedCategory,
  targetCategoryName,
}: {
  divisionSlug: string
  productCategoryName: string
  productCategorySlug?: string | null
  selectedCategory: string
  targetCategoryName: string
}) {
  if (selectedCategory === 'all') {
    return true
  }

  if (productCategorySlug === selectedCategory) {
    return true
  }

  const resolvedProductSlug =
    resolveDivisionCategorySlug(divisionSlug, productCategorySlug) ??
    resolveDivisionCategorySlug(divisionSlug, productCategoryName)

  if (resolvedProductSlug === selectedCategory) {
    return true
  }

  const normalizedProductCategory = normalizeCategoryValue(productCategoryName)
  const normalizedTargetCategory = normalizeCategoryValue(targetCategoryName)

  return (
    normalizedProductCategory.includes(normalizedTargetCategory) ||
    normalizedTargetCategory.includes(normalizedProductCategory)
  )
}
