export function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/5] bg-[var(--bg-subtle)]" />
      <div className="border-t border-[var(--border)] p-4">
        <div className="h-2 w-16 bg-[var(--bg-subtle)]" />
        <div className="mt-2 h-3 w-3/4 bg-[var(--bg-subtle)]" />
        <div className="mt-1 h-2 w-1/2 bg-[var(--bg-subtle)]" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  )
}
