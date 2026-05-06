import BlogPostClient from './BlogPostClient'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.webxcrafting.in'

  try {
    const res = await fetch(`${baseUrl}/api/blogs/${slug}`, { cache: 'no-store' })
    const data = await res.json()

    if (!data.success || !data.data) {
      return { title: 'Blog Post Not Found' }
    }

    const blog = data.data
    return {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      alternates: {
        canonical: `/blog/${slug}`,
      },
      openGraph: {
        title: blog.metaTitle || blog.title,
        description: blog.metaDescription || blog.excerpt,
        type: 'article',
        publishedTime: blog.createdAt,
        modifiedTime: blog.updatedAt,
        authors: [blog.author],
        images: blog.coverImage ? [{ url: blog.coverImage, width: 1200, height: 630 }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: blog.metaTitle || blog.title,
        description: blog.metaDescription || blog.excerpt,
        images: blog.coverImage ? [blog.coverImage] : [],
      },
    }
  } catch {
    return { title: 'Blog | WebXCrafting' }
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.webxcrafting.in'
  const fullUrl = `${baseUrl}/blog/${slug}`
  
  return <BlogPostClient slug={slug} fullUrl={fullUrl} />
}
