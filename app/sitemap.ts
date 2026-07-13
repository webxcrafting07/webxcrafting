import { MetadataRoute } from 'next'
import { CITIES_CONFIG } from '@/lib/citiesConfig'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.webxcrafting.in'
  // Remove trailing slash if present
  const baseUrl = envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl

  const routes = [
    '',
    '/about',
    '/contact',
    '/services',
    '/portfolio',
    '/blog',
    '/website-cost-calculator',
    '/privacy-policy',
    '/terms-of-service',
    '/refund-policy',
    '/cookie-policy',
    '/disclaimer',
  ]

  const staticLastMod = new Date('2026-07-01T00:00:00.000Z')

  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: staticLastMod,
    changeFrequency: route === '/blog' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : (route === '/blog' || route === '/services') ? 0.9 : 0.8,
  }))

  // Pre-generate location city routes for maximum index visibility
  const cities = Object.keys(CITIES_CONFIG)
  const locationRoutes: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/locations/web-development-company-in-${city}`,
    lastModified: staticLastMod,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // Fetch published blog slugs for dynamic routes using direct DB connection for robustness
  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    const { connectDB } = await import('@/lib/db')
    const Blog = (await import('@/models/Blog')).default
    
    await connectDB()
    const blogs = await Blog.find({ 
      status: 'published',
      publishDate: { $lte: new Date() }
    }).select('slug updatedAt createdAt').lean()

    if (blogs && blogs.length > 0) {
      blogRoutes = blogs
        .filter((blog: any) => blog.slug && blog.slug.trim() !== '')
        .map((blog: any) => ({
          url: `${baseUrl}/blog/${blog.slug}`,
          lastModified: new Date(blog.updatedAt || blog.createdAt),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }))
    }
  } catch (error) {
    console.error('Sitemap DB fetch error:', error)
  }

  return [...staticRoutes, ...locationRoutes, ...blogRoutes]
}
