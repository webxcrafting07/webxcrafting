import { CITIES_CONFIG } from '@/lib/citiesConfig'
import Link from 'next/link'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Our Service Locations | WebXCrafting',
  description: 'WebXCrafting provides premium web development, e-commerce, and custom software services in over 200 cities across India. Find a web development agency near you.',
  keywords: 'web development company locations, web design agency india, local web developers, e-commerce development near me, custom software agency',
  alternates: {
    canonical: '/locations',
  }
}

export default function LocationsDirectoryPage() {
  // Group cities by state
  const citiesByState: Record<string, typeof CITIES_CONFIG[string][]> = {}
  
  Object.keys(CITIES_CONFIG).forEach((key) => {
    const city = CITIES_CONFIG[key]
    if (!citiesByState[city.state]) {
      citiesByState[city.state] = []
    }
    // Add the key so we can generate the URL
    citiesByState[city.state].push({ ...city, key } as any)
  })

  // Sort states alphabetically
  const sortedStates = Object.keys(citiesByState).sort()

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.webxcrafting.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Locations",
        "item": "https://www.webxcrafting.in/locations"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white font-syne">
              Our Service <span className="grad-text">Locations</span>
            </h1>
            <p className="text-[#7b82a8] text-lg max-w-2xl mx-auto">
              WebXCrafting is proud to serve businesses across India. Find your city below and discover how our premium web development services can accelerate your digital growth.
            </p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
            {sortedStates.map((state) => {
              // Sort cities alphabetically within the state
              const cities = citiesByState[state].sort((a, b) => a.name.localeCompare(b.name))
              
              return (
                <div 
                  key={state} 
                  className="break-inside-avoid inline-block w-full mb-8 bg-[rgba(15,20,35,0.4)] border border-[rgba(99,120,255,0.15)] rounded-2xl p-6 backdrop-blur-sm hover:border-[rgba(99,120,255,0.3)] transition-colors shadow-lg"
                >
                  <h2 className="text-xl font-bold text-white mb-6 pb-4 border-b border-[rgba(255,255,255,0.05)] font-syne">
                    {state}
                  </h2>
                  <ul className="space-y-3">
                    {cities.map((city: any) => (
                      <li key={city.key}>
                        <Link 
                          href={`/locations/web-development-company-in-${city.key}`}
                          className="text-[#7b82a8] hover:text-[#4f6fff] transition-colors text-sm font-medium block"
                        >
                          Web Development Company in {city.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
