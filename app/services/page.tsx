import type { Metadata } from 'next'
import ServicesClient from './ServicesClient'

export const metadata: Metadata = {
  title: "Affordable Web Development, Digital Marketing & Video Ads Services India",
  description:
    "Get premium website development, SEO, digital marketing, video ads creation, mobile app development, and web hosting at the most affordable prices in India. 100% client satisfaction guaranteed. Friendly support & trusted results.",
  keywords: [
    "affordable web development services india",
    "website development company",
    "digital marketing services",
    "video ads creation",
    "ecommerce website developers",
    "mobile app development",
    "web hosting services",
    "local seo services",
    "social media marketing",
    "google my business setup",
    "custom web application development",
    "school management system",
    "inventory pos system",
    "job portal development",
    "saas development",
    "affordable seo agency",
    "website design company in bhopal",
    "low cost web design india",
    "webxcrafting",
  ].join(", "),
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: "Affordable Web Development, Marketing & Video Ads | WebXCrafting",
    description: "Premium quality at budget-friendly prices. Business websites from ₹8,000, Digital Marketing from ₹12,000/mo, Video Ads from ₹5,000. 100% Client Satisfaction.",
    type: "website",
    url: "https://www.webxcrafting.in/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Affordable Web Development & Digital Marketing Services | WebXCrafting",
    description: "Business websites from ₹8,000. Digital Marketing from ₹12,000/mo. Video Ads from ₹5,000. Trusted by 50+ businesses.",
  },
};

export default function ServicesPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Web Development & Digital Marketing",
    "provider": {
      "@type": "LocalBusiness",
      "name": "WebXCrafting",
      "url": "https://www.webxcrafting.in",
      "telephone": "+91 9102615343",
      "priceRange": "₹₹"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Development & Digital Marketing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Business Website Development" },
          "priceCurrency": "INR",
          "price": "8000"
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "E-commerce Website Development" },
          "priceCurrency": "INR",
          "price": "25000"
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Job Portal / Directory" },
          "priceCurrency": "INR",
          "price": "45000"
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Custom SaaS / Web App" },
          "priceCurrency": "INR",
          "price": "60000"
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "School Management System" },
          "priceCurrency": "INR",
          "price": "35000"
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Inventory & POS System" },
          "priceCurrency": "INR",
          "price": "15000"
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Digital Marketing & SEO" },
          "priceCurrency": "INR",
          "price": "12000"
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Google My Business (GMB) Setup" },
          "priceCurrency": "INR",
          "price": "3500"
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Mobile App Development" },
          "priceCurrency": "INR",
          "price": "30000"
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Premium Web Hosting" },
          "priceCurrency": "INR",
          "price": "299"
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Video Ads Creation" },
          "priceCurrency": "INR",
          "price": "5000"
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does a website cost in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A professional business website starts from just ₹8,000. E-commerce stores start from ₹25,000 and custom web applications from ₹60,000. We offer the most affordable pricing with premium quality."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide digital marketing and SEO services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our digital marketing retainer starts from ₹12,000/month covering On-Page SEO, Off-Page SEO, Social Media Marketing, Google Ads, and monthly performance reports."
        }
      },
      {
        "@type": "Question",
        "name": "Can you create video ads for my business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! We create high-converting video ads for Instagram, Facebook, and YouTube starting from just ₹5,000 per video. Includes professional scriptwriting, subtitles, and premium effects."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, breadcrumbSchema, faqSchema]) }}
      />
      <ServicesClient />
    </>
  );
}

