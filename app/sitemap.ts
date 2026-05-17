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
    '/website-cost-calculator',
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

  // Pre-generate location city routes for maximum index visibility
  const cities = [
    'bangalore', 'mumbai', 'delhi-ncr', 'pune', 'hyderabad', 'ahmedabad',
    'chennai', 'kolkata', 'jaipur', 'lucknow', 'surat', 'nagpur',
    'indore', 'chandigarh', 'patna', 'bhopal', 'vadodara', 'ludhiana',
    'agra', 'nashik', 'kochi', 'thiruvananthapuram', 'visakhapatnam',
    'coimbatore', 'kanpur', 'guwahati', 'gurgaon', 'noida', 'dehradun',
    'bhubaneswar', 'ranchi', 'rajkot', 'jodhpur', 'mysore', 'madurai',
    'mangalore', 'udaipur', 'jalandhar', 'amritsar', 'faridabad',
    'ghaziabad', 'navi-mumbai', 'thane', 'raipur', 'gwalior', 'jabalpur'
  ]
  const locationRoutes: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/locations/web-development-company-in-${city}`,
    lastModified: new Date(),
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
