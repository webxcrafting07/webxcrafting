import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.webxcrafting.in"),
  title: {
    default: "WebXCrafting — Best Web Development Company in India | Premium Websites",
    template: "%s | WebXCrafting",
  },
  description:
    "Top-rated Web Development Agency in India. We craft premium, high-performance business websites, E-commerce stores, Job Portals, and Custom Web Applications with guaranteed SEO performance and modern design.",
  keywords: [
    "web development company India",
    "best website design agency",
    "premium web development services",
    "ecommerce website development",
    "custom web application development",
    "affordable web design india",
    "next.js development company",
    "react developers india",
    "job portal development services",
    "business website design",
    "startup website development",
    "webxcrafting",
    "web development solutions",
    "professional web designers",
    "high performance websites",
  ],
  authors: [{ name: "WebXCrafting" }],
  creator: "WebXCrafting",
  publisher: "WebXCrafting",
  alternates: {
    languages: {
      'en-IN': '/',
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://webxcrafting.in",
    title: "WebXCrafting — Premium Web Development Agency",
    description:
      "Expert web development solutions to scale your business. We build stunning, high-performance websites that rank and convert.",
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
    title: "WebXCrafting — Premium Web Development Agency",
    description:
      "High-performance websites for businesses, e-commerce, and custom apps.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WebXCrafting",
    "url": "https://www.webxcrafting.in",
    "logo": "https://www.webxcrafting.in/logo-wxc.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91 9102615343",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "Hindi"]
    },
    "sameAs": [
      "https://www.linkedin.com/in/webx-crafting-a1a875402/",
      "https://www.instagram.com/webxcrafting",
      "https://www.facebook.com/profile.php?id=61570712849063"
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
        {children}
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
      </body>
    </html>
  );
}
