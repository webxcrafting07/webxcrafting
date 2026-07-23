import type { Metadata } from 'next'
import MobileAppClient from './MobileAppClient'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import WhatsAppButton from '@/components/WhatsAppButton'
import DotBackground from '@/components/DotBackground'

export const metadata: Metadata = {
  title: 'Mobile App Development Services | iOS & Android Apps',
  description: 'Top-rated mobile app development services. We build custom, high-performance iOS and Android applications using React Native and Flutter. Get a free quote today.',
  keywords: 'mobile app development, ios app development, android app developers, react native app development, flutter app development, custom mobile apps',
  alternates: {
    canonical: '/services/mobile-app-development',
  },
  openGraph: {
    title: 'Mobile App Development Services | Custom iOS & Android Apps',
    description: 'We build high-performance, scalable mobile applications for iOS and Android.',
    type: 'website',
  },
}

export default function MobileAppPage() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Mobile App Development",
    "provider": {
      "@type": "LocalBusiness",
      "name": "WebXCrafting"
    },
    "description": "Custom mobile application development services for iOS and Android platforms.",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": "30000",
      "availability": "https://schema.org/InStock",
      "url": "https://www.webxcrafting.in/services/mobile-app-development"
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
          <MobileAppClient />
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
