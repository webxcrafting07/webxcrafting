import type { Metadata } from 'next'
import WebHostingClient from './WebHostingClient'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import WhatsAppButton from '@/components/WhatsAppButton'
import DotBackground from '@/components/DotBackground'

export const metadata: Metadata = {
  title: 'Premium Web Hosting Services | Fast, Secure & Reliable',
  description: 'Top-tier web hosting services optimized for speed and security. Get 99.9% uptime, free SSL, and 24/7 expert support for your business or e-commerce website.',
  keywords: 'web hosting, fast web hosting, secure hosting, cloud hosting, dedicated servers, e-commerce hosting, best web hosting india',
  alternates: {
    canonical: '/services/web-hosting',
  },
  openGraph: {
    title: 'Premium Web Hosting Services | Fast & Secure',
    description: 'Ensure your website is always online and lightning-fast with our premium web hosting solutions.',
    type: 'website',
  },
}

export default function WebHostingPage() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Web Hosting",
    "provider": {
      "@type": "LocalBusiness",
      "name": "WebXCrafting"
    },
    "description": "High-performance, secure cloud and dedicated web hosting solutions.",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": "299",
      "availability": "https://schema.org/InStock",
      "url": "https://www.webxcrafting.in/services/web-hosting"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg)' }}>
        <DotBackground />
        <Navbar />
        
        <div style={{ position: 'relative', zIndex: 50, paddingTop: '100px' }}>
          <WebHostingClient />
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
