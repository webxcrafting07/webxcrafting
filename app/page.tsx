import type { Metadata } from 'next'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  title: "Best Web Development Company in India | WebXCrafting",
  description: "WebXCrafting is India's premier web development agency. We deliver high-ranking, premium business websites, e-commerce platforms, and custom web apps pan-India.",
}

export default function HomePage() {
  return <HomeClient />
}
