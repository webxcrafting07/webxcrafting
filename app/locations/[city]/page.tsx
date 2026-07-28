import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LocationClient from './LocationClient'

import { CITIES_CONFIG } from '@/lib/citiesConfig'

interface PageProps {
  params: Promise<{ city: string }>
}

// Generate static pages at build time for blistering 100/100 speed score
export async function generateStaticParams() {
  return Object.keys(CITIES_CONFIG).map((cityKey) => ({
    city: `web-development-company-in-${cityKey}`
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params
  const cityKey = city.replace('web-development-company-in-', '')
  const cityInfo = CITIES_CONFIG[cityKey]

  if (!cityInfo) {
    return { title: 'Not Found' }
  }

  // Deterministic hashing for programmatic SEO spinning (Metadata)
  const hash = cityInfo.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const titleIndex = hash % 4;
  const descIndex = (hash * 3) % 4;

  const titleVariations = [
    `Top Web Development & App Design Company in ${cityInfo.name} | WebXCrafting`,
    `Premium Web Development Services in ${cityInfo.name} - Hire Expert Developers`,
    `${cityInfo.name}'s Leading Web & E-commerce Development Agency`,
    `Custom Software & Web Development Company in ${cityInfo.name}`
  ];

  const descVariations = [
    `${cityInfo.description} We offer premium e-commerce solutions, custom web applications, digital marketing, and local SEO services tailored for businesses in ${cityInfo.name}.`,
    `Looking for the best web developers in ${cityInfo.name}? WebXCrafting engineers high-performance websites and digital solutions to skyrocket your local business growth.`,
    `Scale your brand with top-tier web design and mobile app development in ${cityInfo.name}. ${cityInfo.description} Request a free quote today!`,
    `WebXCrafting is the premier choice for web development in ${cityInfo.name}. From stunning landing pages to complex SaaS platforms, we deliver perfect digital experiences.`
  ];

  const title = titleVariations[titleIndex];
  const description = descVariations[descIndex];

  // Generate extended LSI keywords based on the city
  const baseKeywords = cityInfo.keywords.split(',').map(k => k.trim())
  const extendedKeywords = [
    `best web design agency in ${cityInfo.name}`,
    `e-commerce website developers in ${cityInfo.name}`,
    `custom software development ${cityInfo.name}`,
    `seo services in ${cityInfo.name}`,
    `mobile app development company ${cityInfo.name}`,
    `react nextjs developers ${cityInfo.name}`,
    `digital marketing agency ${cityInfo.name}`,
    `shopify developers in ${cityInfo.name}`,
    `local business website ${cityInfo.name}`,
    `top it companies in ${cityInfo.name}`,
    `affordable web design ${cityInfo.name}`
  ]

  const allKeywords = Array.from(new Set([...baseKeywords, ...extendedKeywords])).join(', ')

  return {
    title,
    description,
    keywords: allKeywords,
    alternates: {
      canonical: `/locations/web-development-company-in-${cityKey}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
    }
  }
}

export default async function LocationPage({ params }: PageProps) {
  const { city } = await params
  const cityKey = city.replace('web-development-company-in-', '')
  const cityInfo = CITIES_CONFIG[cityKey]

  if (!cityInfo) {
    notFound()
  }

  // Find nearby cities in the same state (up to 6)
  const allCityKeys = Object.keys(CITIES_CONFIG);
  const nearbyCities = allCityKeys
    .filter(k => k !== cityKey && CITIES_CONFIG[k].state === cityInfo.state)
    .slice(0, 6)
    .map(k => ({
      key: k,
      name: CITIES_CONFIG[k].name
    }));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": `WebXCrafting - Web Development Company in ${cityInfo.name}`,
      "image": "https://www.webxcrafting.in/icon.png",
      "description": cityInfo.description,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": cityInfo.name,
        "addressRegion": cityInfo.state,
        "addressCountry": "IN"
      },
      "url": `https://www.webxcrafting.in/locations/web-development-company-in-${cityKey}`,
      "telephone": "+91-9876543210", 
      "priceRange": "$$",
      "areaServed": cityInfo.name,
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "description": cityInfo.name
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Web Development",
      "provider": {
        "@type": "LocalBusiness",
        "name": "WebXCrafting"
      },
      "areaServed": {
        "@type": "City",
        "name": cityInfo.name
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `Web Development Services in ${cityInfo.name}`,
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": `Business Website Development in ${cityInfo.name}`
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": `E-commerce Development in ${cityInfo.name}`
            }
          }
        ]
      }
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocationClient cityKey={cityKey} cityInfo={cityInfo} nearbyCities={nearbyCities} />
    </>
  )
}
