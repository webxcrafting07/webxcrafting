import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import TawkChat from "@/components/TawkChat";
import OfferBar from "@/components/OfferBar";
import SeoAuditWidget from "@/components/SeoAuditWidget";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.webxcrafting.in"),
  title: {
    default: "WebXCrafting — Global Web Development & Digital Solutions Agency",
    template: "%s | WebXCrafting",
  },
  description:
    "WebXCrafting is a premier global web development agency. We craft high-performance business websites, E-commerce stores, Job Portals, and Custom Web Applications with cutting-edge tech and SEO excellence.",
  keywords: [
    "global web development agency",
    "best website design company",
    "premium web development services",
    "ecommerce development experts",
    "custom web application development",
    "next.js development company",
    "react developers worldwide",
    "job portal development",
    "business website design",
    "SaaS application development",
    "webxcrafting",
    "webx crafting",
    "full stack development services",
    "professional web designers",
    "high performance websites",
    "SEO optimized web development",
  ],
  authors: [{ name: "WebXCrafting" }],
  creator: "WebXCrafting",
  publisher: "WebXCrafting",
  alternates: {
    languages: {
      'en-US': '/',
      'en-IN': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.webxcrafting.in",
    title: "WebXCrafting — Premium Global Web Development Agency",
    description:
      "Expert web development solutions to scale your business globally. We build stunning, high-performance websites that rank and convert.",
    siteName: "WebXCrafting",
    images: [
      {
        url: "/logo-wxc.png",
        width: 1200,
        height: 630,
        alt: "WebXCrafting Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebXCrafting — Premium Global Web Development Agency",
    description:
      "High-performance websites for businesses, e-commerce, and custom apps worldwide.",
    images: ["/logo-wxc.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/logo-wxc.png",
    shortcut: "/logo-wxc.png",
    apple: "/logo-wxc.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.webxcrafting.in/#organization",
        "name": "WebXCrafting",
        "alternateName": "WebX Crafting",
        "url": "https://www.webxcrafting.in",
        "logo": "https://www.webxcrafting.in/logo-wxc.png",
        "description": "Global premium web development agency specializing in Next.js, React, and high-performance digital solutions.",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91 9102615343",
          "contactType": "customer service",
          "areaServed": "Worldwide",
          "availableLanguage": ["en", "Hindi"]
        },
        "sameAs": [
          "https://www.linkedin.com/in/webx-crafting-a1a875402/",
          "https://www.instagram.com/webxcrafting",
          "https://www.facebook.com/profile.php?id=61589165532607"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.webxcrafting.in/#website",
        "url": "https://www.webxcrafting.in",
        "name": "WebXCrafting",
        "publisher": { "@id": "https://www.webxcrafting.in/#organization" },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.webxcrafting.in/blog?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Service",
        "serviceType": "Web Development",
        "provider": { "@id": "https://www.webxcrafting.in/#organization" },
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Web Development Services",
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
                "name": "E-commerce Development"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Custom SaaS & Web Apps"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "School Management Systems"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Inventory & POS Systems"
              }
            }
          ]
        }
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo-wxc.png" />
        <meta name="theme-color" content="#03050a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div style={{ overflowX: "hidden", width: "100%", position: "relative", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <OfferBar />
          <TawkChat />
          {children}
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "rgba(10, 14, 28, 0.95)",
              color: "#e8eaf6",
              border: "1px solid rgba(99, 120, 255, 0.25)",
              backdropFilter: "blur(20px)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              borderRadius: "12px",
              padding: "12px 18px",
            },
            success: {
              iconTheme: { primary: "#00e676", secondary: "#03050a" },
              style: {
                border: "1px solid rgba(0, 230, 118, 0.3)",
              },
            },
            error: {
              iconTheme: { primary: "#ff5252", secondary: "#03050a" },
              style: {
                border: "1px solid rgba(255, 82, 82, 0.3)",
              },
            },
          }}
        />
        <SeoAuditWidget />
      </body>
    </html>
  );
}
