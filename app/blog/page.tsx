import type { Metadata } from 'next'
import BlogClient from './BlogClient'
import { connectDB } from '@/lib/db'
import Blog from '@/models/Blog'

export const metadata: Metadata = {
  title: 'Blog — Web Development Tips & Insights',
  description: 'Read our latest articles on web development, SEO, e-commerce, and business growth tips. Expert insights from the WebXCrafting team.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog — Web Development Tips & Insights | WebXCrafting',
    description: 'Read our latest articles on web development, SEO, e-commerce, and business growth tips.',
    type: 'website',
  },
}

export default async function BlogPage() {
  try {
    await connectDB()
    // Fetch all published blogs that are not scheduled in the future, sorted by publishDate descending
    const blogsObj = await Blog.find({
      status: 'published',
      publishDate: { $lte: new Date() }
    }).sort({ publishDate: -1 }).lean()

    const initialBlogs = JSON.parse(JSON.stringify(blogsObj))
    return <BlogClient initialBlogs={initialBlogs} />
  } catch (error) {
    console.error('Error fetching blogs server-side:', error)
    return <BlogClient initialBlogs={[]} />
  }
}
