import type { Metadata } from 'next'
import DigitalMarketingClient from './DigitalMarketingClient'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import WhatsAppButton from '@/components/WhatsAppButton'
import DotBackground from '@/components/DotBackground'

export const metadata: Metadata = {
  title: 'Affordable Digital Marketing Services & SEO | WebXCrafting',
  description: 'Grow your business with our affordable digital marketing, local SEO, and social media management services. 100% Client Satisfaction Guaranteed.',
  keywords: 'digital marketing services, affordable seo, local seo bhopal, social media marketing, lead generation, google ads management, webxcrafting',
  alternates: {
    canonical: '/services/digital-marketing',
  },
  openGraph: {
    title: 'Affordable Digital Marketing & SEO Services',
    description: 'We treat your business like our own. Transparent, budget-friendly digital marketing to grow your online presence.',
    type: 'website',
  },
}

export default function DigitalMarketingPage() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Digital Marketing & SEO",
    "provider": {
      "@type": "LocalBusiness",
      "name": "WebXCrafting"
    },
    "description": "End-to-end digital marketing and Search Engine Optimization to grow your traffic and leads.",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": "12000",
      "availability": "https://schema.org/InStock",
      "url": "https://www.webxcrafting.in/services/digital-marketing"
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
          <DigitalMarketingClient />
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
