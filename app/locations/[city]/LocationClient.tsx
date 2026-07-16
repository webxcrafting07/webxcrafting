"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DotBackground from "@/components/DotBackground";
import WhatsAppButton from "@/components/WhatsAppButton";
import { 
  FaLaptopCode, 
  FaRocket, 
  FaShieldAlt, 
  FaChevronDown, 
  FaCalculator, 
  FaMapMarkerAlt, 
  FaArrowRight, 
  FaStar,
  FaCheck,
  FaPhone,
  FaBullhorn,
  FaMapMarkedAlt
} from "react-icons/fa";

interface LocationClientProps {
  cityKey: string;
  cityInfo: {
    name: string;
    state: string;
    description: string;
  };
  nearbyCities?: { key: string, name: string }[];
}

export default function LocationClient({ cityKey, cityInfo, nearbyCities = [] }: LocationClientProps) {
  const router = useRouter();
  const { name, state } = cityInfo;
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Lead form states
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Advanced deterministic hashing for programmatic SEO (Spintax)
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const heroIndex = hash % 5; 
  const serviceIndex = (hash * 3) % 5;
  const faqIndex = (hash * 7) % 5;
  const layoutStyleIndex = hash % 3; // For future visual layout permutations

  // Hero Descriptions (5 Variations)
  const heroDescriptions = [
    `We craft ultra-fast, premium hand-coded React & Next.js websites specifically engineered to help startups and local businesses in ${name} dominate search results and capture hot sales leads.`,
    `Looking for top-tier digital growth in ${name}? Our expert team builds high-performance, visually stunning web applications and e-commerce stores designed to scale your local brand.`,
    `Elevate your online presence in ${name} with our custom web development services. We focus on lightning-fast speeds, SEO-driven architecture, and conversion-optimized designs.`,
    `Transform your ${name} business with a cutting-edge digital platform. We specialize in creating high-converting, fully customized websites that outshine local competitors.`,
    `As a leading web agency serving ${name}, we engineer bespoke digital solutions. From striking landing pages to complex SaaS architectures, we deliver exceptional quality and speed.`
  ];

  // Service Subtitles (5 Variations)
  const serviceSubtitles = [
    `From simple landing pages to complex e-commerce ecosystems, we provide end-to-end digital solutions to help your business dominate the ${name} market.`,
    `Whether you need a sleek business portfolio or a massive online store, our tailored web services in ${name} are built for ultimate performance and security.`,
    `Explore our comprehensive digital solutions in ${name}. We engineer everything from fast local landing pages to robust SaaS platforms tailored to your specific needs.`,
    `Our tech stack guarantees superiority. Discover how our specialized web development services can empower your ${name} brand to attract and convert more local clients.`,
    `We don't just build websites; we build digital assets. See how our targeted web solutions can drive measurable growth for your operations in ${name}.`
  ];

  // FAQ Sets (5 Variations)
  const faqSets = [
    // Set 1
    [
      { q: `What is the cost of website development in ${name}?`, a: `Website development costs in ${name} vary depending on features, page count, and complexity. A basic single-page landing page starts around ₹5,000, multi-page business sites range from ₹8,000 to ₹15,000, and full-scale e-commerce stores or dynamic custom web applications start from ₹20,000. You can get an instant, customized quote using our interactive Website Cost Calculator!` },
      { q: `Why should our ${name}-based business choose WebXCrafting over local template designers?`, a: `Unlike average agencies in ${name} that sell bloated, slow WordPress templates, WebXCrafting builds custom hand-coded websites using React and Next.js. This guarantees 100/100 performance scores, instant page loads, premium customized motion design, and robust automated SEO, ensuring you stand out and rank #1 locally.` },
      { q: `How long does it take to deliver a custom website in ${name}?`, a: `A landing page or small business website is typically completed in 5 to 7 days. More advanced custom platforms, LMS directories, or e-commerce shops take 2 to 4 weeks depending on the complexity of dynamic logic. We follow a strict agile development pipeline and provide you with live staging preview links throughout the process.` },
      { q: `Do you provide post-launch support and local SEO services in ${name}?`, a: `Yes! Every website we launch in ${name} includes 1 month of free premium support, schema markup integrations, sitemap configurations, and search console setup. We also offer extended priority maintenance plans to keep your platform updated, fast, and continuously optimized for high-volume local searches.` }
    ],
    // Set 2
    [
      { q: `How much should I budget for a new website in ${name}?`, a: `In ${name}, prices scale based on functionality. Simple lead-generation sites begin at ₹5,000, standard company portfolios average ₹8,000 to ₹15,000, while complex digital stores or web apps start at ₹20,000. Use our online pricing tool for a precise quote.` },
      { q: `What makes your web design agency stand out in ${name}?`, a: `We skip the slow, generic templates used by many local freelancers. Instead, we code lightning-fast Next.js applications that achieve perfect Core Web Vitals, driving more traffic and keeping your ${name} customers engaged longer.` },
      { q: `What is the typical timeline for web development in ${name}?`, a: `Basic sites can be live in just a week! Larger e-commerce builds or custom SaaS dashboards generally require 2 to 4 weeks. Our transparent workflow keeps you in the loop with live previews every step of the way.` },
      { q: `Will you help rank my business locally in ${name}?`, a: `Absolutely. Technical SEO is baked into our code. We configure all meta tags, schema data, and submit your site to Google so your ${name} business gets the visibility it deserves, backed by 1 month of free maintenance.` }
    ],
    // Set 3
    [
      { q: `Are web design services expensive in ${name}?`, a: `Our rates for ${name} clients are highly competitive. You can expect to invest about ₹5,000 for a starter landing page, up to ₹15,000 for a corporate site, and ₹20,000+ for robust e-commerce solutions. Check out our cost calculator for an exact figure.` },
      { q: `Why are custom-coded sites better for my ${name} business?`, a: `Custom React/Next.js code ensures your site loads instantly, is highly secure, and is tailored exactly to your brand. Typical template-based sites used by other ${name} designers suffer from plugin bloat and slow speeds.` },
      { q: `Can you build my ${name} website quickly?`, a: `Yes! Depending on your exact needs, rapid landing pages are deployed in 5-7 days. Comprehensive digital platforms or job directories may take up to a month, ensuring top-tier quality and rigorous testing.` },
      { q: `Do you offer ongoing website maintenance in ${name}?`, a: `We provide a full month of premium support post-launch for all our ${name} clients. This covers essential SEO indexing, bug fixes, and minor updates to guarantee a flawless launch experience.` }
    ],
    // Set 4
    [
      { q: `What is the average price for web development in ${name}?`, a: `Pricing in ${name} depends on your requirements. Single landing pages are around ₹5,000. Full corporate websites range from ₹8k-₹15k, and e-commerce/custom portals start around ₹20,000. We recommend using our instant cost calculator to get a clear picture.` },
      { q: `Why hire you instead of a local ${name} freelancer?`, a: `Freelancers often rely on templates that are slow and vulnerable to hacking. We deliver enterprise-grade React architectures that load in under a second, giving your ${name} business an undeniable edge in both user experience and SEO.` },
      { q: `How fast can you launch my project in ${name}?`, a: `For standard business websites, we typically launch within a week. Highly complex applications or stores can take 2-4 weeks. We prioritize speed without sacrificing quality for our ${name} clients.` },
      { q: `Is SEO included for businesses in ${name}?`, a: `Yes. Core technical SEO, including sitemap generation and schema tagging, is included standard. We ensure your new site is perfectly readable by search engines so you can start attracting local ${name} traffic immediately.` }
    ],
    // Set 5
    [
      { q: `Can I afford a custom website in ${name}?`, a: `Yes, we offer high-end solutions at accessible rates for ${name} businesses. Starter packages begin at just ₹5,000, scaling up for complex e-commerce setups. Use our calculator for transparent, instant pricing.` },
      { q: `What tech do you use for ${name} clients?`, a: `We exclusively use Next.js and React—the same technology powering the world's biggest brands. This ensures your ${name} website is incredibly fast, secure, and future-proof, leaving competitors behind.` },
      { q: `What is the process for building a site in ${name}?`, a: `We start with a strategy call, followed by UI/UX design, development, and a strict QA phase. You'll have staging access throughout the 1-4 week timeline, ensuring the final product perfectly aligns with your ${name} business goals.` },
      { q: `Do you manage the website after it goes live in ${name}?`, a: `We offer 30 days of complementary post-launch support for peace of mind. After that, ${name} clients can opt into our affordable maintenance packages for continuous optimization and updates.` }
    ]
  ];

  const heroDesc = heroDescriptions[heroIndex];
  const serviceSub = serviceSubtitles[serviceIndex];
  const faqs = faqSets[faqIndex];

  // Dynamic LSI Keywords for On-Page SEO
  const baseKeywords = cityInfo.description ? cityInfo.description.toLowerCase().split(' ').filter(w => w.length > 5).slice(0, 5) : [];
  const seoKeywords = [
    `Best Web Development Agency in ${name}`,
    `Top E-commerce Website Developers ${name}`,
    `Custom Software Development Services ${name}`,
    `Responsive Website Design Company ${name}`,
    `SEO and Digital Marketing Agency ${name}`,
    `Mobile App Development Experts ${name}`,
    `React & Next.js Developers ${name}`,
    `Shopify Store Development ${name}`,
    `WordPress Website Redesign ${name}`,
    `SaaS Application Development ${name}`,
    `Enterprise Web Portals ${name}`,
    `Real Estate Website Development ${name}`,
    `Hospital & Healthcare Web Design ${name}`,
    `Restaurant & Food Delivery App Development ${name}`,
    `Travel & Booking Website Developers ${name}`,
    `Custom CRM/ERP Solutions ${name}`,
    `Local SEO Optimization Services ${name}`,
    `UI/UX Design Agency ${name}`,
    `Affordable Business Websites ${name}`,
    `Website Maintenance & Support ${name}`,
    `High-Performance Web Apps ${name}`,
    `B2B Website Development ${name}`,
    `Landing Page Design & Optimization ${name}`
  ];

  // Dynamic LocalBusiness Structured Schema
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.webxcrafting.in";
  const locationUrl = `${baseUrl}/locations/web-development-company-in-${cityKey}`;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `WebXCrafting - Web Development Company in ${name}`,
    "image": `${baseUrl}/logo-wxc.png`,
    "@id": locationUrl,
    "url": locationUrl,
    "telephone": "+91 9102615343",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": name,
      "addressRegion": state,
      "addressCountry": "IN"
    },
    "areaServed": {
      "@type": "City",
      "name": name
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "19:00"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": name === "Bangalore" ? "124" : name === "Mumbai" ? "98" : name === "Delhi NCR" ? "112" : "85"
    },
    "sameAs": [
      "https://share.google/VzYfELZuWlsGAhFX0",
      "https://www.instagram.com/webxcrafting",
      "https://www.facebook.com/profile.php?id=61589165532607",
      "https://www.linkedin.com/in/webx-crafting-a1a875402/"
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Locations",
        "item": `${baseUrl}/locations`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `Web Development in ${name}`,
        "item": locationUrl
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Web Development",
    "provider": {
      "@type": "LocalBusiness",
      "name": `WebXCrafting - Web Development Company in ${name}`
    },
    "areaServed": {
      "@type": "City",
      "name": name
    },
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
      {/* Inject Structured Local Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusinessSchema, breadcrumbSchema, faqSchema, serviceSchema]) }}
      />

      <DotBackground />
      <Navbar />

      {/* Hero Section */}
      <section
        className="mobile-p-6"
        style={{
          position: "relative",
          zIndex: 10,
          padding: "160px 24px 80px",
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
          textAlign: "center"
        }}
      >
        <nav style={{ fontSize: 13, color: "#7b82a8", marginBottom: 30, display: "flex", justifyContent: "center", gap: 8 }}>
          <Link href="/" style={{ color: "#7b82a8", textDecoration: "none" }} className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/locations" style={{ color: "#7b82a8", textDecoration: "none" }} className="hover:text-white transition-colors">Locations</Link>
          <span>/</span>
          <span style={{ color: "#e8eaf6" }}>Web Development in {name}</span>
        </nav>

        <div className="section-label" style={{ margin: "0 auto 20px", display: "flex", alignItems: "center", gap: 8, width: "fit-content" }}>
          <FaMapMarkerAlt size={12} style={{ color: "#4f6fff" }} />
          Local SEO Hub: {name}, {state}
        </div>
        <h1
          style={{
            fontFamily: "Syne",
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 800,
            fontStyle: "italic",
            lineHeight: 1.1,
            marginBottom: 20,
            letterSpacing: "-0.5px"
          }}
        >
          {layoutStyleIndex === 0 && (
            <>Web Development <br /> Company In <span className="grad-text">{name}</span></>
          )}
          {layoutStyleIndex === 1 && (
            <><span className="grad-text">Top</span> Web Development <br /> Agency In {name}</>
          )}
          {layoutStyleIndex === 2 && (
            <>Expert Web Development <br /> Services In <span className="grad-text">{name}</span></>
          )}
        </h1>
        <p style={{ color: "#7b82a8", fontSize: "clamp(15px, 2vw, 18px)", lineHeight: 1.6, maxWidth: 720, margin: "0 auto 36px" }}>
          {heroDesc}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
          <Link href="/contact" className="btn-primary" style={{ padding: "14px 32px", fontSize: 15, textDecoration: "none" }}>
            Let's Talk Project
          </Link>
          <Link
            href="/website-cost-calculator"
            className="btn-outline"
            style={{ padding: "14px 32px", fontSize: 15, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}
          >
            <FaCalculator /> Calculate Cost
          </Link>
        </div>
      </section>

      {/* Trust Badges */}
      <section style={{ position: "relative", zIndex: 10, padding: "0 24px 60px", maxWidth: 1000, margin: "0 auto" }}>
        <style>{`
          .trust-badges-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            padding: 24px;
            border-radius: 24px;
            text-align: center;
            background: rgba(10, 14, 28, 0.4);
            border: 1px solid rgba(255,255,255,0.05);
            backdrop-filter: blur(20px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          }
          .trust-badge-item {
            padding: 24px;
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.03);
            transition: all 0.3s ease;
          }
          .trust-badge-item:hover {
            transform: translateY(-5px);
            background: rgba(255, 255, 255, 0.04);
            border-color: rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          }
          @media (max-width: 768px) {
            .trust-badges-grid {
              grid-template-columns: 1fr;
              gap: 16px;
              padding: 20px;
            }
          }
        `}</style>
        <div className="trust-badges-grid">
          <div className="trust-badge-item">
            <div style={{ display: "flex", justifyContent: "center", gap: 4, color: "#ffb300", marginBottom: 12 }}>
              {[...Array(5)].map((_, i) => <FaStar key={i} size={18} />)}
            </div>
            <div style={{ fontWeight: 800, color: "#ffffff", fontSize: 18, marginBottom: 4 }}>100% Satisfaction</div>
            <div style={{ color: "#a0a8cc", fontSize: 13, lineHeight: 1.5 }}>Trusted & Highly Rated by businesses in {name}</div>
          </div>
          <div className="trust-badge-item" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, background: 'radial-gradient(circle, rgba(79,111,255,0.2) 0%, transparent 70%)' }}></div>
            <div style={{ fontSize: 24, fontWeight: 800, fontFamily: "Syne", fontStyle: "italic", marginBottom: 8, background: 'linear-gradient(135deg, #4f6fff, #00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Next.js / React</div>
            <div style={{ fontWeight: 800, color: "#ffffff", fontSize: 18, marginBottom: 4 }}>High Performance</div>
            <div style={{ color: "#a0a8cc", fontSize: 13, lineHeight: 1.5 }}>Sub-second loading speed for better conversions</div>
          </div>
          <div className="trust-badge-item" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -20, left: -20, width: 80, height: 80, background: 'radial-gradient(circle, rgba(162,89,255,0.2) 0%, transparent 70%)' }}></div>
            <div style={{ fontSize: 24, fontWeight: 800, fontFamily: "Syne", fontStyle: "italic", marginBottom: 8, background: 'linear-gradient(135deg, #a259ff, #ff5252)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>100% Google LCP</div>
            <div style={{ fontWeight: 800, color: "#ffffff", fontSize: 18, marginBottom: 4 }}>SEO Engineered</div>
            <div style={{ color: "#a0a8cc", fontSize: 13, lineHeight: 1.5 }}>Guaranteed search ranking boost & visibility</div>
          </div>
        </div>
      </section>

      {/* Expanded Services Section for Lead Gen */}
      <section className="mobile-p-6" style={{ position: "relative", zIndex: 10, padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <div className="section-label" style={{ margin: "0 auto 16px" }}>Our Services</div>
          <h2 style={{ fontFamily: "Syne", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, fontStyle: "italic", marginBottom: 16 }}>
            What We Offer In <span className="grad-text">{name}</span>
          </h2>
          <p style={{ color: "#7b82a8", fontSize: 16, maxWidth: 600, margin: "0 auto" }}>
            {serviceSub}
          </p>
        </div>
        <style>{`
          @keyframes scrollRightToLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .service-marquee-container {
            overflow: hidden;
            width: 100%;
            padding: 20px 0;
            display: flex;
          }
          .service-marquee-track {
            display: flex;
            width: max-content;
            animation: scrollRightToLeft 25s linear infinite;
          }
          .service-marquee-track:hover {
            animation-play-state: paused;
          }
          .marquee-card {
            width: 350px;
            margin: 0 15px;
            flex-shrink: 0;
            white-space: normal;
          }
          @media (max-width: 768px) {
            .marquee-card {
              width: 300px;
              margin: 0 10px;
            }
          }
        `}</style>
        
        <div className="service-marquee-container">
          <div className="service-marquee-track">
            {/* We duplicate the array 2 times to create a seamless infinite loop effect */}
            {[...Array(2)].map((_, loopIdx) => (
              <React.Fragment key={loopIdx}>
                {/* Service 1 */}
                <div
                  className="glass marquee-card"
                  style={{ padding: 40, borderRadius: 24, border: "1px solid rgba(255,255,255,0.04)", transition: "transform 0.3s", cursor: "pointer" }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                  onClick={() => router.push("/services?service=Business Website")}
                >
                  <div style={{ width: 54, height: 54, borderRadius: 12, background: "rgba(79,111,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#4f6fff", fontSize: 24, marginBottom: 24 }}>
                    <FaLaptopCode />
                  </div>
                  <h3 style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 700, marginBottom: 14 }}>Business Websites</h3>
                  <p style={{ color: "#7b82a8", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                    Professional, ultra-fast websites designed to build trust and capture local leads in {name}. Perfect for agencies, clinics, and local services.
                  </p>
                  <ul style={{ color: "#e8eaf6", fontSize: 13, display: "grid", gap: 10 }}>
                    <li style={{ display: "flex", alignItems: "center", gap: 8 }}><FaCheck color="#00e676" size={12}/> Responsive Design</li>
                    <li style={{ display: "flex", alignItems: "center", gap: 8 }}><FaCheck color="#00e676" size={12}/> SEO Optimized</li>
                    <li style={{ display: "flex", alignItems: "center", gap: 8 }}><FaCheck color="#00e676" size={12}/> Lead Capture Forms</li>
                  </ul>
                </div>

                {/* Service 2 */}
                <div
                  className="glass marquee-card"
                  style={{ padding: 40, borderRadius: 24, border: "1px solid rgba(255,255,255,0.04)", transition: "transform 0.3s", cursor: "pointer" }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                  onClick={() => router.push("/services?service=E-Commerce")}
                >
                  <div style={{ width: 54, height: 54, borderRadius: 12, background: "rgba(162,89,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#a259ff", fontSize: 24, marginBottom: 24 }}>
                    <FaRocket />
                  </div>
                  <h3 style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 700, marginBottom: 14 }}>E-Commerce Stores</h3>
                  <p style={{ color: "#7b82a8", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                    Sell your products online 24/7. We build robust e-commerce platforms with secure payment gateways and easy inventory management.
                  </p>
                  <ul style={{ color: "#e8eaf6", fontSize: 13, display: "grid", gap: 10 }}>
                    <li style={{ display: "flex", alignItems: "center", gap: 8 }}><FaCheck color="#00e676" size={12}/> Payment Gateway Setup</li>
                    <li style={{ display: "flex", alignItems: "center", gap: 8 }}><FaCheck color="#00e676" size={12}/> Product Management</li>
                    <li style={{ display: "flex", alignItems: "center", gap: 8 }}><FaCheck color="#00e676" size={12}/> Order Tracking</li>
                  </ul>
                </div>

                {/* Service 3 */}
                <div
                  className="glass marquee-card"
                  style={{ padding: 40, borderRadius: 24, border: "1px solid rgba(255,255,255,0.04)", transition: "transform 0.3s", cursor: "pointer" }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                  onClick={() => router.push("/services?service=Custom")}
                >
                  <div style={{ width: 54, height: 54, borderRadius: 12, background: "rgba(0,229,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#00e5ff", fontSize: 24, marginBottom: 24 }}>
                    <FaShieldAlt />
                  </div>
                  <h3 style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 700, marginBottom: 14 }}>Custom Web Apps</h3>
                  <p style={{ color: "#7b82a8", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                    Need something unique? We develop complex web applications, booking systems, CRMs, and LMS platforms tailored to your business logic.
                  </p>
                  <ul style={{ color: "#e8eaf6", fontSize: 13, display: "grid", gap: 10 }}>
                    <li style={{ display: "flex", alignItems: "center", gap: 8 }}><FaCheck color="#00e676" size={12}/> Custom Databases</li>
                    <li style={{ display: "flex", alignItems: "center", gap: 8 }}><FaCheck color="#00e676" size={12}/> API Integrations</li>
                    <li style={{ display: "flex", alignItems: "center", gap: 8 }}><FaCheck color="#00e676" size={12}/> User Dashboards</li>
                  </ul>
                </div>

                {/* Service 4: Digital Marketing */}
                <div
                  className="glass marquee-card"
                  style={{ padding: 40, borderRadius: 24, border: "1px solid rgba(255,255,255,0.04)", transition: "transform 0.3s", cursor: "pointer" }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                  onClick={() => router.push("/services?service=Digital Marketing")}
                >
                  <div style={{ width: 54, height: 54, borderRadius: 12, background: "rgba(255,179,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffb300", fontSize: 24, marginBottom: 24 }}>
                    <FaBullhorn />
                  </div>
                  <h3 style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 700, marginBottom: 14 }}>Digital Marketing</h3>
                  <p style={{ color: "#7b82a8", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                    Boost your online visibility and drive targeted traffic to your business. We cover everything from technical SEO to social media campaigns.
                  </p>
                  <ul style={{ color: "#e8eaf6", fontSize: 13, display: "grid", gap: 10 }}>
                    <li style={{ display: "flex", alignItems: "center", gap: 8 }}><FaCheck color="#00e676" size={12}/> On-Page & Off-Page SEO</li>
                    <li style={{ display: "flex", alignItems: "center", gap: 8 }}><FaCheck color="#00e676" size={12}/> Social Media Marketing</li>
                    <li style={{ display: "flex", alignItems: "center", gap: 8 }}><FaCheck color="#00e676" size={12}/> Monthly Reports</li>
                  </ul>
                </div>

                {/* Service 5: GMB Setup */}
                <div
                  className="glass marquee-card"
                  style={{ padding: 40, borderRadius: 24, border: "1px solid rgba(255,255,255,0.04)", transition: "transform 0.3s", cursor: "pointer" }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                  onClick={() => router.push("/services?service=Google My Business")}
                >
                  <div style={{ width: 54, height: 54, borderRadius: 12, background: "rgba(255,82,82,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ff5252", fontSize: 24, marginBottom: 24 }}>
                    <FaMapMarkedAlt />
                  </div>
                  <h3 style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 700, marginBottom: 14 }}>GMB Setup & Local SEO</h3>
                  <p style={{ color: "#7b82a8", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                    Dominate local search results. We will create, verify, and fully optimize your Google My Business profile so local customers can easily find you.
                  </p>
                  <ul style={{ color: "#e8eaf6", fontSize: 13, display: "grid", gap: 10 }}>
                    <li style={{ display: "flex", alignItems: "center", gap: 8 }}><FaCheck color="#00e676" size={12}/> Profile Creation & Verification</li>
                    <li style={{ display: "flex", alignItems: "center", gap: 8 }}><FaCheck color="#00e676" size={12}/> Map Ranking Strategy</li>
                    <li style={{ display: "flex", alignItems: "center", gap: 8 }}><FaCheck color="#00e676" size={12}/> Review Management</li>
                  </ul>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link href="/services" className="btn-outline" style={{ display: "inline-flex", padding: "12px 30px", fontSize: 15, textDecoration: "none" }}>
            View All Services
          </Link>
        </div>
      </section>

      {/* Direct Lead Form Section */}
      <section className="mobile-p-6" style={{ position: "relative", zIndex: 10, padding: "20px 24px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <div 
          className="glass-strong mobile-grid-1"
          style={{
            borderRadius: 30,
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            border: "1px solid rgba(99,120,255,0.2)"
          }}
        >
          <div style={{ padding: "clamp(40px, 5vw, 60px)", background: "linear-gradient(135deg, rgba(79,111,255,0.1), rgba(10,14,28,0))" }}>
            <h2 style={{ fontFamily: "Syne", fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 800, fontStyle: "italic", marginBottom: 20 }}>
              Ready to Grow Your Business in {name}?
            </h2>
            <p style={{ color: "#7b82a8", fontSize: 16, lineHeight: 1.6, marginBottom: 36 }}>
              Don't let your competitors steal your local customers. Get a high-converting website today. Fill out the form or contact us directly for a free consultation and project estimate.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(79,111,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#4f6fff" }}>
                  <FaPhone size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 13, color: "#7b82a8", marginBottom: 4 }}>Call Us Directly</div>
                  <a href="tel:+919102615343" style={{ fontSize: 18, fontWeight: 700, color: "#e8eaf6", textDecoration: "none" }}>+91 9102615343</a>
                </div>
              </div>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(0,230,118,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#00e676" }}>
                  <FaMapMarkerAlt size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 13, color: "#7b82a8", marginBottom: 4 }}>Service Area</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#e8eaf6" }}>{name}, {state}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ padding: "clamp(30px, 4vw, 50px)", background: "rgba(3,5,10,0.5)" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(0,230,118,0.1)", color: "#00e676", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <FaCheck size={32} />
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12, fontFamily: "Syne", fontStyle: "italic" }}>Request Sent!</h3>
                <p style={{ color: "#7b82a8", fontSize: 15, lineHeight: 1.6 }}>Thank you for reaching out from {name}. Our team will review your request and get back to you shortly.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, fontFamily: "Syne", fontStyle: "italic" }}>Request a Free Quote</h3>
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget);
                    const nameInput = fd.get('name') as string;
                    const emailInput = fd.get('email') as string;
                    const phoneInput = fd.get('phone') as string;
                    const reqInput = fd.get('req') as string;
                    
                    if (!nameInput || !emailInput || !phoneInput) {
                      toast.error("Please fill in all required fields.");
                      return;
                    }

                    setLoading(true);
                    try {
                      // Submit to API
                      const res = await fetch("/api/leads", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          name: nameInput,
                          email: emailInput,
                          budget: reqInput,
                          message: `City: ${name}\nPhone: ${phoneInput}\nThey are looking for a ${reqInput}.`
                        }),
                      });
                      const data = await res.json();
                      if (data.success) {
                        setSubmitted(true);
                        // Also open WhatsApp as requested originally
                        const text = `Hi WebXCrafting, I need a website in ${name}.\nName: ${nameInput}\nPhone: ${phoneInput}\nRequirement: ${reqInput}`;
                        window.open(`https://wa.me/919102615343?text=${encodeURIComponent(text)}`, '_blank');
                      } else {
                        toast.error(data.message || "Failed to submit.");
                      }
                    } catch (err) {
                      toast.error("Network error. Try again.");
                    } finally {
                      setLoading(false);
                    }
                  }}
                  style={{ display: "flex", flexDirection: "column", gap: 18 }}
                >
                  <div>
                    <label style={{ display: "block", fontSize: 13, color: "#8892b0", marginBottom: 8, fontWeight: 500 }}>Your Name *</label>
                    <input required name="name" type="text" placeholder="John Doe" style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", padding: "14px 16px", borderRadius: 12, color: "#fff", outline: "none" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 13, color: "#8892b0", marginBottom: 8, fontWeight: 500 }}>Email Address *</label>
                    <input required name="email" type="email" placeholder="john@example.com" style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", padding: "14px 16px", borderRadius: 12, color: "#fff", outline: "none" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 13, color: "#8892b0", marginBottom: 8, fontWeight: 500 }}>Phone Number *</label>
                    <input required name="phone" type="tel" placeholder="+91 XXXXX XXXXX" style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", padding: "14px 16px", borderRadius: 12, color: "#fff", outline: "none" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 13, color: "#8892b0", marginBottom: 8, fontWeight: 500 }}>What do you need?</label>
                    <select required name="req" style={{ width: "100%", background: "rgba(20,25,40,0.9)", border: "1px solid rgba(255,255,255,0.1)", padding: "14px 16px", borderRadius: 12, color: "#fff", outline: "none" }}>
                      <option value="Business Website">Business Website</option>
                      <option value="E-Commerce Store">E-Commerce Store</option>
                      <option value="Custom Web App">Custom Web App</option>
                      <option value="Landing Page">Landing Page</option>
                      <option value="Other">Other / Unsure</option>
                    </select>
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary" style={{ padding: "16px", fontSize: 16, marginTop: 10, width: "100%", fontWeight: 600, opacity: loading ? 0.7 : 1 }}>
                    {loading ? "Sending..." : "Send Request & Connect"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Website Cost Calculator Promo Section */}
      <section className="mobile-p-6" style={{ position: "relative", zIndex: 10, padding: "60px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div
          className="glass-strong mobile-grid-1"
          style={{
            background: "linear-gradient(135deg, rgba(79,111,255,0.08), rgba(162,89,255,0.04))",
            border: "1px solid rgba(79,111,255,0.25)",
            borderRadius: 28,
            padding: "clamp(30px, 6vw, 60px)",
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 40,
            alignItems: "center"
          }}
        >
          <div>
            <div className="section-label" style={{ marginBottom: 16 }}>Calculator Tool</div>
            <h2 style={{ fontFamily: "Syne", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 800, fontStyle: "italic", lineHeight: 1.1, marginBottom: 16 }}>
              Calculate {name} Website Cost Instantly!
            </h2>
            <p style={{ color: "#7b82a8", fontSize: 15, lineHeight: 1.65, marginBottom: 28 }}>
              Tired of waiting days for website agencies to send arbitrary quotes? Use our custom built interactive pricing tool to dynamically design your website structure, addons, and support plans, and get an estimate in INR instantly.
            </p>
            <Link
              href="/website-cost-calculator"
              className="btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 30px",
                fontSize: 15,
                textDecoration: "none"
              }}
            >
              Start Calculating Cost <FaArrowRight size={12} />
            </Link>
          </div>
          <div
            style={{
              background: "rgba(10,14,28,0.7)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 20,
              padding: 28,
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
            }}
          >
            <h4 style={{ fontFamily: "Syne", fontSize: 16, fontWeight: 700, marginBottom: 20, color: "#e8eaf6" }}>Estimate Samples:</h4>
            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontSize: 13, color: "#7b82a8" }}>5-Page Startup Site</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#4f6fff" }}>₹10,000</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontSize: 13, color: "#7b82a8" }}>E-commerce Store (Razorpay)</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#4f6fff" }}>₹23,000</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontSize: 13, color: "#7b82a8" }}>Custom SAAS Dashboard</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#4f6fff" }}>₹54,000</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#00e676", fontSize: 11, fontWeight: 600, marginTop: 20, justifyContent: "center" }}>
              <FaCheck size={9} /> Includes 1 Month Post-Launch Support
            </div>
          </div>
        </div>
      </section>

      {/* Local FAQ Section */}
      <section className="mobile-p-6" style={{ position: "relative", zIndex: 10, padding: "60px 24px 100px", maxWidth: 850, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div className="section-label" style={{ margin: "0 auto 16px" }}>FAQs</div>
          <h2 style={{ fontFamily: "Syne", fontSize: 32, fontStyle: "italic", fontWeight: 800 }}>
            Got Questions? We Have Answers.
          </h2>
        </div>

        <div style={{ display: "grid", gap: 16 }}>
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: 16,
                  overflow: "hidden"
                }}
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 24px",
                    background: "none",
                    border: "none",
                    color: "#e8eaf6",
                    textAlign: "left",
                    cursor: "pointer"
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{faq.q}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ color: "#4f6fff" }}
                  >
                    <FaChevronDown size={12} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ padding: "0 24px 24px", color: "#7b82a8", fontSize: 14, lineHeight: 1.6, borderTop: "1px solid rgba(255,255,255,0.02)" }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── SEO POPULAR SEARCHES (Visually Hidden for SEO) ──────────────────────── */}
      <section style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", border: 0 }}>
        <h3>Popular Searches in {name}</h3>
        <div>
          {seoKeywords.map((keyword, i) => (
            <span key={i}>{keyword}, </span>
          ))}
        </div>
      </section>

      {/* Nearby Locations */}
      {nearbyCities && nearbyCities.length > 0 && (
        <section className="mobile-p-6" style={{ position: "relative", zIndex: 10, padding: "0 24px 80px", maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <h3 style={{ fontFamily: "Syne", fontSize: 24, fontStyle: "italic", fontWeight: 700 }}>
              Nearby Service Areas in {state}
            </h3>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            {nearbyCities.map((c) => (
              <Link 
                key={c.key} 
                href={`/locations/web-development-company-in-${c.key}`}
                className="glass"
                style={{
                  padding: "10px 20px",
                  borderRadius: 100,
                  fontSize: 14,
                  color: "#e8eaf6",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.05)",
                  transition: "all 0.2s"
                }}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppButton />
    </>
  );
}
