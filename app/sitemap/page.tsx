import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DotBackground from '@/components/DotBackground'
import { CITIES_CONFIG } from '@/lib/citiesConfig'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HTML Sitemap | WebXCrafting',
  description: 'A complete map of WebXCrafting pages, services, locations, and blog posts.',
  alternates: {
    canonical: '/sitemap',
  },
}

export default function HTMLSitemap() {
  const corePages = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Blog', path: '/blog' },
    { label: 'Website Cost Calculator', path: '/website-cost-calculator' },
  ]

  const legalPages = [
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms of Service', path: '/terms-of-service' },
    { label: 'Cookie Policy', path: '/cookie-policy' },
    { label: 'Refund Policy', path: '/refund-policy' },
    { label: 'Disclaimer', path: '/disclaimer' },
  ]

  const cities = Object.keys(CITIES_CONFIG).sort()

  return (
    <>
      <DotBackground />
      <Navbar />

      <main className="min-h-screen pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white font-syne">
              HTML <span className="grad-text">Sitemap</span>
            </h1>
            <p className="text-[#7b82a8] text-lg max-w-2xl mx-auto">
              A comprehensive guide to all pages on WebXCrafting. Use this directory to navigate our services, locations, and resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="bg-[rgba(15,20,35,0.4)] border border-[rgba(99,120,255,0.15)] rounded-2xl p-8 backdrop-blur-sm shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-6 font-syne border-b border-[rgba(255,255,255,0.05)] pb-4">Core Pages</h2>
              <ul className="space-y-4">
                {corePages.map(page => (
                  <li key={page.path}>
                    <Link href={page.path} className="text-[#a2b0e8] hover:text-white transition-colors flex items-center gap-2">
                      <span className="text-[#4f6fff] text-xs">▶</span> {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[rgba(15,20,35,0.4)] border border-[rgba(99,120,255,0.15)] rounded-2xl p-8 backdrop-blur-sm shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-6 font-syne border-b border-[rgba(255,255,255,0.05)] pb-4">Legal & Policies</h2>
              <ul className="space-y-4">
                {legalPages.map(page => (
                  <li key={page.path}>
                    <Link href={page.path} className="text-[#a2b0e8] hover:text-white transition-colors flex items-center gap-2">
                      <span className="text-[#4f6fff] text-xs">▶</span> {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-[rgba(15,20,35,0.4)] border border-[rgba(99,120,255,0.15)] rounded-2xl p-8 backdrop-blur-sm shadow-lg">
            <div className="flex justify-between items-center mb-6 border-b border-[rgba(255,255,255,0.05)] pb-4">
              <h2 className="text-2xl font-bold text-white font-syne">All Service Locations</h2>
              <Link href="/locations" className="text-sm text-[#4f6fff] hover:text-white transition-colors">View Organized Directory →</Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cities.map((cityKey) => {
                const city = CITIES_CONFIG[cityKey]
                return (
                  <Link 
                    key={cityKey}
                    href={`/locations/web-development-company-in-${cityKey}`}
                    className="text-sm text-[#7b82a8] hover:text-[#00e5ff] transition-colors truncate"
                    title={`Web Development Company in ${city.name}`}
                  >
                    {city.name}
                  </Link>
                )
              })}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}
