export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-[var(--bg)] pt-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-12 py-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="aspect-[4/5] animate-pulse bg-[var(--bg-subtle)]" />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <div className="h-6 w-24 animate-pulse bg-[var(--bg-subtle)]" />
            <div className="h-10 w-3/4 animate-pulse bg-[var(--bg-subtle)]" />
            <div className="h-20 w-full animate-pulse bg-[var(--bg-subtle)]" />
          </div>
        </div>
      </div>
    </div>
  )
}
