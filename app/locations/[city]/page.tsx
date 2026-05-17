import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LocationClient from './LocationClient'

// Supported cities config
export const CITIES_CONFIG: Record<string, { name: string; state: string; description: string; keywords: string }> = {
  'bangalore': {
    name: 'Bangalore',
    state: 'Karnataka',
    description: 'Looking for the best web development company in Bangalore? WebXCrafting builds high-performance, premium, and SEO-optimized business websites & e-commerce stores for Bangalore startups and enterprises.',
    keywords: 'web development company in bangalore, website design agency bangalore, web developers bangalore, software development bangalore'
  },
  'mumbai': {
    name: 'Mumbai',
    state: 'Maharashtra',
    description: 'Top web development company in Mumbai. WebXCrafting delivers premium website design, e-commerce portals, and custom SaaS software to accelerate business growth for brands in Mumbai.',
    keywords: 'web development company in mumbai, website developers mumbai, ecommerce website design mumbai, web design agency mumbai'
  },
  'delhi-ncr': {
    name: 'Delhi NCR',
    state: 'Delhi',
    description: 'Empower your brand with the leading website development company in Delhi NCR, Noida, and Gurgaon. We craft luxury websites, custom portals, and high-converting landing pages.',
    keywords: 'web development company in delhi ncr, web design agency noida, website developers gurgaon, delhi web development agency'
  },
  'pune': {
    name: 'Pune',
    state: 'Maharashtra',
    description: 'Top website design & development company in Pune. We develop fast, premium, secure corporate websites and custom software solutions designed for high conversion and scale.',
    keywords: 'web development company in pune, website design agency pune, website developers in pune, corporate web design pune'
  },
  'hyderabad': {
    name: 'Hyderabad',
    state: 'Telangana',
    description: 'Build your digital presence with Hyderabad\'s premier web development company. WebXCrafting crafts ultra-fast React/Next.js corporate sites and custom portals.',
    keywords: 'web development company in hyderabad, web designers hyderabad, top website developers hyderabad, nextjs developers hyderabad'
  },
  'ahmedabad': {
    name: 'Ahmedabad',
    state: 'Gujarat',
    description: 'Premium website design and development services in Ahmedabad. Transform your local business with automated sales pipelines, high-end UI/UX, and robust search presence.',
    keywords: 'web development company in ahmedabad, website designer ahmedabad, ecommerce development ahmedabad, web design gujarat'
  }
}

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

  const title = `Best Web Development Company in ${cityInfo.name} | WebXCrafting`
  const description = cityInfo.description

  return {
    title,
    description,
    keywords: cityInfo.keywords,
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

  return <LocationClient cityKey={cityKey} cityInfo={cityInfo} />
}
