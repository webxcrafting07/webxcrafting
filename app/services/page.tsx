import type { Metadata } from 'next'
import ServicesClient from './ServicesClient'
export const metadata: Metadata = {
  title: "Professional Web Design & Development Services | WebXCrafting",
  description:
    "Explore our premium global web development services. From custom e-commerce solutions to enterprise-grade web applications, we build digital products that drive growth.",
  keywords: "web development services, ecommerce website developers, custom software development, react nextjs agency, digital marketing, local business website, affordable web design, UI/UX design, SaaS development",
  alternates: {
    canonical: '/services',
  }
};

export default function ServicesPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Web Development",
    "provider": {
      "@type": "LocalBusiness",
      "name": "WebXCrafting"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Global Web Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Business Website Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-commerce Website Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Web Applications"
          }
        }
      ]
    }
  };

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
        "name": "Services",
        "item": "https://www.webxcrafting.in/services"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, breadcrumbSchema]) }}
      />
      <ServicesClient />
    </>
  );
}
