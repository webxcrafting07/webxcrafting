import { connectDB } from '@/lib/db'
import Blog from '@/models/Blog'
import BlogPostClient from './BlogPostClient'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params

  try {
    await connectDB()
    const blog = await Blog.findOne({
      slug,
      status: 'published',
      publishDate: { $lte: new Date() }
    }).select('title metaTitle metaDescription excerpt coverImage createdAt updatedAt author').lean()

    if (!blog) {
      return { title: 'Blog Post Not Found' }
    }

    const title = blog.metaTitle || blog.title
    const description = blog.metaDescription || blog.excerpt

    return {
      title,
      description,
      alternates: {
        canonical: `/blog/${slug}`,
      },
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: blog.createdAt,
        modifiedTime: blog.updatedAt,
        authors: [blog.author],
        images: blog.coverImage ? [{ url: blog.coverImage, width: 1200, height: 630 }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
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
  
  await connectDB()
  
  // Find the blog, ensuring it is published and not scheduled in the future
  const blogObj = await Blog.findOne({
    slug,
    status: 'published',
    publishDate: { $lte: new Date() }
  }).lean()

  if (!blogObj) {
    notFound()
  }

  // Convert BSON fields to JSON-serializable types for client component boundary
  const blog = JSON.parse(JSON.stringify(blogObj))

  // Fetch up to 3 related blogs in the same category
  const relatedBlogsObj = await Blog.find({
    status: 'published',
    publishDate: { $lte: new Date() },
    category: blog.category,
    slug: { $ne: slug }
  }).limit(3).lean()

  const relatedBlogs = JSON.parse(JSON.stringify(relatedBlogsObj))

  // Dynamic Article Structured Data Schema for search engines
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": blog.coverImage || `${baseUrl}/logo-wxc.png`,
    "author": {
      "@type": "Person",
      "name": blog.author || "WebXCrafting Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "WebXCrafting",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo-wxc.png`
      }
    },
    "datePublished": blog.publishDate || blog.createdAt,
    "dateModified": blog.updatedAt || blog.createdAt,
    "description": blog.metaDescription || blog.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl
    }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${baseUrl}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": blog.title,
        "item": fullUrl
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, breadcrumbSchema]) }}
      />
      <BlogPostClient blog={blog} relatedBlogs={relatedBlogs} fullUrl={fullUrl} />
    </>
  )
}
