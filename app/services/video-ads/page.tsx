import type { Metadata } from 'next'
import VideoAdsClient from './VideoAdsClient'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import WhatsAppButton from '@/components/WhatsAppButton'
import DotBackground from '@/components/DotBackground'

export const metadata: Metadata = {
  title: 'Affordable Video Ads Creation Service | WebXCrafting',
  description: 'High-quality, affordable video ads for Instagram, Facebook, and YouTube. Boost your sales with engaging video content designed for conversions.',
  keywords: 'video ads creation, affordable video editing, instagram reel ads, facebook video ads, youtube ad creation, promotional video maker',
  alternates: {
    canonical: '/services/video-ads',
  },
  openGraph: {
    title: 'Affordable & High-Converting Video Ads',
    description: 'Stop scrolling and start selling. We create stunning video ads at the most affordable prices to help your business grow.',
    type: 'website',
  },
}

export default function VideoAdsPage() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Video Ads Creation",
    "provider": {
      "@type": "LocalBusiness",
      "name": "WebXCrafting"
    },
    "description": "High-quality, engaging video ad creation for social media platforms like Instagram, Facebook, and YouTube.",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": "5000",
      "availability": "https://schema.org/InStock",
      "url": "https://www.webxcrafting.in/services/video-ads"
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
          <VideoAdsClient />
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
