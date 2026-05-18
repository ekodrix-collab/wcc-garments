import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/context/ThemeContext'
import { SmoothScroll } from '@/components/ui/SmoothScroll'
import { GrainOverlay } from '@/components/ui/GrainOverlay'
import { PreLoader } from '@/components/ui/PreLoader'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SITE_CONFIG } from '@/lib/constants'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'wholesale garments UAE',
    'B2B garment manufacturer',
    'uniform supplier Dubai',
    'hospitality textiles UAE',
    'bulk clothing manufacturer',
    'home linen wholesale',
    'fragrance manufacturer UAE',
    'WCC Garments',
    'Western Clothing Company',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A0A',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body">
        <ThemeProvider>
          <PreLoader />
          <SmoothScroll>
            <GrainOverlay />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
