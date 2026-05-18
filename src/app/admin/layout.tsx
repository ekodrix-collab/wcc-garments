// Admin Section Root Layout
'use client'

import { AdminProvider } from '@/context/AdminContext'
import { AdminSidebar } from '@/components/layout/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <div className="flex min-h-screen bg-[#0A0A0A]">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto pt-24 lg:pt-8 px-6 pb-12 lg:px-12">{children}</main>
      </div>
    </AdminProvider>
  )
}
