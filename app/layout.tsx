import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: {
    default: 'WebXCrafting — Premium Websites at Affordable Prices',
    template: '%s | WebXCrafting',
  },
  description:
    'WebXCrafting builds stunning, high-performance websites for businesses, e-commerce, job portals, and custom web apps — at prices that make sense.',
  keywords: [
    'web development', 'website design', 'Next.js', 'React', 'affordable websites',
    'e-commerce', 'business website', 'India', 'freelance developer',
  ],
  authors: [{ name: 'WebXCrafting' }],
  creator: 'WebXCrafting',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: 'WebXCrafting — Premium Websites at Affordable Prices',
    description: 'We build stunning, high-performance websites that grow your business.',
    siteName: 'WebXCrafting',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebXCrafting — Premium Websites at Affordable Prices',
    description: 'We build stunning, high-performance websites that grow your business.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#03050a" />
      </head>
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(10, 14, 28, 0.95)',
              color: '#e8eaf6',
              border: '1px solid rgba(99, 120, 255, 0.25)',
              backdropFilter: 'blur(20px)',
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              borderRadius: '12px',
              padding: '12px 18px',
            },
            success: {
              iconTheme: { primary: '#00e676', secondary: '#03050a' },
              style: {
                border: '1px solid rgba(0, 230, 118, 0.3)',
              },
            },
            error: {
              iconTheme: { primary: '#ff5252', secondary: '#03050a' },
              style: {
                border: '1px solid rgba(255, 82, 82, 0.3)',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
