import type { Metadata } from 'next'
import PortfolioClient from './PortfolioClient'
export const metadata: Metadata = {
  title: "Web Development Portfolio | Featured Projects & Case Studies",
  description:
    "Explore our successful web development projects. From premium business websites to complex e-commerce platforms and job portals in India.",
  alternates: {
    canonical: '/portfolio',
  }
};
export default function PortfolioPage() { return <PortfolioClient /> }
