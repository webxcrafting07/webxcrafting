import type { Metadata } from 'next'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  title: "Premium Web Development & Digital Solutions | WebXCrafting",
  description: "WebXCrafting is a leading global web development agency. We deliver high-performance business websites, premium E-commerce stores, and custom software solutions worldwide.",
  alternates: {
    canonical: "/",
  },
}

export default function HomePage() {
  return <HomeClient />
}
