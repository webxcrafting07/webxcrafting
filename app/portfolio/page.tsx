import type { Metadata } from 'next'
import PortfolioClient from './PortfolioClient'
export const metadata: Metadata = { title: 'Portfolio', description: 'View our completed and ongoing web development projects — business sites, e-commerce, job portals, and custom apps.' }
export default function PortfolioPage() { return <PortfolioClient /> }
