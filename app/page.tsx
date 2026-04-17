import type { Metadata } from 'next'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  title: 'WebXCrafting — Premium Websites at Affordable Prices',
  description: 'We build stunning, fast, and conversion-optimized websites for businesses, e-commerce stores, job portals, and custom web apps.',
}

export default function HomePage() {
  return <HomeClient />
}
