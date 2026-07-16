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

  const title = `Top Web Development & App Design Company in ${cityInfo.name} | WebXCrafting`
  const description = `${cityInfo.description} We offer premium e-commerce solutions, custom web applications, digital marketing, and local SEO services tailored for businesses in ${cityInfo.name}.`

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

  return <LocationClient cityKey={cityKey} cityInfo={cityInfo} nearbyCities={nearbyCities} />
}
