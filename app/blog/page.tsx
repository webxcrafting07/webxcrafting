import type { Metadata } from 'next'
import BlogClient from './BlogClient'

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

export default function BlogPage() {
  return <BlogClient />
}
