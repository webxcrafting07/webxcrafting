import { MetadataRoute } from 'next'

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
    '/privacy-policy',
    '/terms-of-service',
    '/refund-policy',
    '/cookie-policy',
    '/disclaimer',
  ]

  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/blog' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : (route === '/blog' || route === '/services') ? 0.9 : 0.8,
  }))

  // Fetch published blog slugs for dynamic routes
  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    const res = await fetch(`${baseUrl}/api/blogs?status=published`, { cache: 'no-store' })
    const data = await res.json()
    if (data.success && data.data) {
      blogRoutes = data.data
        .filter((blog: any) => blog.slug && blog.slug.trim() !== '')
        .map((blog: any) => ({
          url: `${baseUrl}/blog/${blog.slug}`,
          lastModified: new Date(blog.updatedAt || blog.createdAt),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }))
    }
  } catch (error) {
    console.error('Sitemap fetch error:', error)
    // If fetch fails (e.g., during build), just skip blog routes
  }

  return [...staticRoutes, ...blogRoutes]
}
