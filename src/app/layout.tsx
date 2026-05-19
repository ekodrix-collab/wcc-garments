import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/context/ThemeContext'
import { SmoothScroll } from '@/components/ui/SmoothScroll'
import { GrainOverlay } from '@/components/ui/GrainOverlay'
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
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.fullName,
    alternateName: SITE_CONFIG.name,
    url: SITE_CONFIG.url || 'https://www.wccgarments.com',
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
    foundingDate: SITE_CONFIG.founded,
    description:
      'B2B manufacturing and wholesale supplier for garments, uniforms, hospitality textiles, home furnishings, fragrance, and household products.',
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url || 'https://www.wccgarments.com',
    description: `${SITE_CONFIG.description} No public pricing; quotes are provided based on order scope.`,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.url || 'https://www.wccgarments.com'}/products?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const saved = localStorage.getItem('wcc-theme');
                  const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const theme = saved || preferred;
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-body">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <div
          dangerouslySetInnerHTML={{
            __html: `
              <div id="global-preloader" style="
                position: fixed;
                inset: 0;
                z-index: 99999;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-color: #050505;
                transition: opacity 0.8s cubic-bezier(0.76, 0, 0.24, 1), transform 0.8s cubic-bezier(0.76, 0, 0.24, 1);
              ">
                <!-- Brand logo with CSS pulse -->
                <div style="
                  position: relative;
                  margin-bottom: 24px;
                  width: 112px;
                  height: 112px;
                  animation: preloader-pulse 2s infinite ease-in-out;
                ">
                  <img src="/images/wcc-logo.png" alt="WCC Logo" style="width: 100%; height: 100%; object-fit: contain;" />
                </div>

                <!-- Brand Text -->
                <div style="text-align: center; color: white; font-family: sans-serif;">
                  <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;">
                    WCC <span style="font-weight: 300; color: #3B82F6;">GARMENTS</span>
                  </h1>
                  <p style="margin: 6px 0 0 0; font-size: 10px; font-weight: 700; letter-spacing: 0.4em; text-transform: uppercase; color: rgba(255,255,255,0.4); font-family: monospace;">
                    Western Clothing Co. · Est. 2010
                  </p>
                </div>

                <!-- Loading Bar Container -->
                <div style="
                  margin-top: 48px;
                  width: 240px;
                  height: 2px;
                  background-color: rgba(255,255,255,0.1);
                  border-radius: 999px;
                  overflow: hidden;
                  position: relative;
                ">
                  <!-- Sliding CSS Loading Line -->
                  <div style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 100%;
                    background: linear-gradient(90deg, transparent, #3B82F6, transparent);
                    animation: preloader-loading 1.8s infinite ease-in-out;
                  "></div>
                </div>
              </div>

              <style>
                @keyframes preloader-pulse {
                  0%, 100% { transform: scale(0.95); opacity: 0.8; filter: drop-shadow(0 0 10px rgba(59,130,246,0.1)); }
                  50% { transform: scale(1); opacity: 1; filter: drop-shadow(0 0 30px rgba(59,130,246,0.4)); }
                }
                @keyframes preloader-loading {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(100%); }
                }
              </style>

              <script>
                (function() {
                  function hidePreloader() {
                    const preloader = document.getElementById('global-preloader');
                    if (preloader && !preloader.classList.contains('loaded')) {
                      preloader.classList.add('loaded');
                      preloader.style.opacity = '0';
                      preloader.style.transform = 'translateY(-100vh)';
                      setTimeout(function() {
                        preloader.remove();
                      }, 800);
                    }
                  }
                  window.addEventListener('load', hidePreloader);
                  setTimeout(hidePreloader, 2500);
                })();
              </script>
            `,
          }}
        />
        <ThemeProvider>
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
