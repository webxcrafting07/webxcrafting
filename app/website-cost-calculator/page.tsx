import type { Metadata } from 'next'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = {
  title: 'Interactive Website Cost Calculator India | WebXCrafting',
  description: 'Calculate the cost of your website development instantly. Use our transparent calculator to get a price estimate for business, e-commerce, and custom websites in India.',
  alternates: {
    canonical: '/website-cost-calculator',
  },
  openGraph: {
    title: 'Interactive Website Cost Calculator India | WebXCrafting',
    description: 'Calculate the cost of your website development instantly. Transparent, no-BS pricing estimation in INR.',
    type: 'website',
  },
}

export default function CalculatorPage() {
  return <CalculatorClient />
}
