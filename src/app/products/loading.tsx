import { ProductGridSkeleton } from '@/components/products/ProductSkeleton'

export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="border-b border-[var(--border)] bg-[var(--bg-surface)] pt-32 pb-12">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="h-4 w-32 animate-pulse bg-[var(--bg-subtle)]" />
          <div className="mt-6 h-10 w-64 animate-pulse bg-[var(--bg-subtle)]" />
          <div className="mt-2 h-4 w-96 animate-pulse bg-[var(--bg-subtle)]" />
        </div>
      </div>
      <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-12">
        <ProductGridSkeleton count={6} />
      </div>
    </div>
  )
}
