import type { Metadata } from 'next'
import HomeClient from './HomeClient'
import { connectDB } from '@/lib/db'

export const metadata: Metadata = {
  title: "Premium Web Development & Digital Solutions | WebXCrafting",
  description: "WebXCrafting is a leading global web development agency. We deliver high-performance business websites, premium E-commerce stores, and custom software solutions worldwide.",
  keywords: "web development company, top web design agency, ecommerce website developers, custom software development, react nextjs developers, affordable web design, digital marketing agency, shopify developers, UI/UX design agency, website maintenance, webx crafting",
  alternates: {
    canonical: "/",
  },
}

export default async function HomePage() {
  let initialBlogs = []
  try {
    const Blog = (await import('@/models/Blog')).default
    await connectDB()
    const blogsObj = await Blog.find({
      status: 'published',
      publishDate: { $lte: new Date() }
    }).sort({ publishDate: -1 }).limit(3).lean()
    initialBlogs = JSON.parse(JSON.stringify(blogsObj))
  } catch (error) {
    console.error('Error fetching blogs server-side for homepage:', error)
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "WebXCrafting",
    "image": "https://www.webxcrafting.in/logo.png",
    "@id": "https://www.webxcrafting.in/#organization",
    "url": "https://www.webxcrafting.in",
    "telephone": "+91 9102615343",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "HSR Layout",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "postalCode": "560102",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.9141,
      "longitude": 77.6413
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "21:00"
    },
    "sameAs": [
      "https://share.google/VzYfELZuWlsGAhFX0",
      "https://wa.me/919102615343"
    ]
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does a professional website cost in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A basic professional business website starts from ₹8,000. For custom e-commerce or job portals, prices vary based on features, but we offer the most competitive premium pricing in India."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide SEO with website development?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, every website we build is SEO-optimized from the ground up, ensuring fast loading speeds, mobile responsiveness, and clean code structure to help you rank on Google."
        }
      },
      {
        "@type": "Question",
        "name": "Can you build custom e-commerce stores?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. We specialize in high-performance e-commerce solutions with custom dashboards, secure payment integrations, and advanced inventory management."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to build a website?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A standard business website typically takes 7-10 days, while complex platforms like job portals or SaaS web apps may take 3-6 weeks depending on the requirements."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer maintenance and support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide dedicated post-launch support and maintenance to ensure your website remains secure, updated, and performing at its best."
        }
      }
    ]
  }

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusinessSchema, faqSchema, serviceSchema]) }}
      />
      <HomeClient initialBlogs={initialBlogs} />
    </>
  )
}
