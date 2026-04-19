import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.webxcrafting.in'

  const routes = [
    '',
    '/about',
    '/contact',
    '/services',
    '/portfolio',
    '/privacy-policy',
    '/terms-of-service',
    '/refund-policy',
    '/cookie-policy',
    '/disclaimer',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}
