import type { Metadata } from 'next'
import PortfolioClient from './PortfolioClient'
export const metadata: Metadata = {
  title: "Web Development Portfolio | Premium Global Projects & Case Studies",
  description:
    "Discover our portfolio of high-performance web solutions. We showcase premium business websites, scalable e-commerce platforms, and custom software delivered worldwide.",
  alternates: {
    canonical: '/portfolio',
  }
};
export default function PortfolioPage() { return <PortfolioClient /> }
