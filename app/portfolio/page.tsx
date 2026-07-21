import type { Metadata } from 'next'
import PortfolioClient from './PortfolioClient'
export const metadata: Metadata = {
  title: "Web Development Portfolio | Premium Global Projects & Case Studies",
  description:
    "Discover our portfolio of high-performance web solutions. We showcase premium business websites, scalable e-commerce platforms, and custom software delivered worldwide.",
  keywords: "web development portfolio, custom software projects, e-commerce case studies, website design examples, nextjs portfolio",
  alternates: {
    canonical: '/portfolio',
  }
};
export default function PortfolioPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.webxcrafting.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Portfolio",
        "item": "https://www.webxcrafting.in/portfolio"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PortfolioClient />
    </>
  )
}
