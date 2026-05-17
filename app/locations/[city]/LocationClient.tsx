"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
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
  FaCheck
} from "react-icons/fa";

interface LocationClientProps {
  cityKey: string;
  cityInfo: {
    name: string;
    state: string;
    description: string;
  };
}

export default function LocationClient({ cityKey, cityInfo }: LocationClientProps) {
  const { name, state } = cityInfo;
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Predefined local FAQs
  const faqs = [
    {
      q: `What is the cost of website development in ${name}?`,
      a: `Website development costs in ${name} vary depending on features, page count, and complexity. A basic single-page landing page starts around ₹5,000, multi-page business sites range from ₹8,000 to ₹15,000, and full-scale e-commerce stores or dynamic custom web applications start from ₹20,000. You can get an instant, customized quote using our interactive Website Cost Calculator!`
    },
    {
      q: `Why should our ${name}-based business choose WebXCrafting over local template designers?`,
      a: `Unlike average agencies in ${name} that sell bloated, slow WordPress templates, WebXCrafting builds custom hand-coded websites using React and Next.js. This guarantees 100/100 performance scores, instant page loads, premium customized motion design, and robust automated SEO, ensuring you stand out and rank #1 locally.`
    },
    {
      q: `How long does it take to deliver a custom website in ${name}?`,
      a: `A landing page or small business website is typically completed in 5 to 7 days. More advanced custom platforms, LMS directories, or e-commerce shops take 2 to 4 weeks depending on the complexity of dynamic logic. We follow a strict agile development pipeline and provide you with live staging preview links throughout the process.`
    },
    {
      q: `Do you provide post-launch support and local SEO services in ${name}?`,
      a: `Yes! Every website we launch in ${name} includes 1 month of free premium support, schema markup integrations, sitemap configurations, and search console setup. We also offer extended priority maintenance plans to keep your platform updated, fast, and continuously optimized for high-volume local searches.`
    }
  ];

  // Dynamic LocalBusiness Structured Schema
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.webxcrafting.in";
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `WebXCrafting - Web Development Company in ${name}`,
    "image": `${baseUrl}/logo-wxc.png`,
    "@id": `${baseUrl}/locations/web-development-company-in-${cityKey}`,
    "url": `${baseUrl}/locations/web-development-company-in-${cityKey}`,
    "telephone": "+91 9102615343",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": name,
      "addressRegion": state,
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": name === "Bangalore" ? "12.9716" : name === "Mumbai" ? "19.0760" : name === "Delhi NCR" ? "28.7041" : name === "Pune" ? "18.5204" : name === "Hyderabad" ? "17.3850" : "23.0225",
      "longitude": name === "Bangalore" ? "77.5946" : name === "Mumbai" ? "72.8777" : name === "Delhi NCR" ? "77.1025" : name === "Pune" ? "73.8567" : name === "Hyderabad" ? "78.4867" : "72.5714"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://www.instagram.com/webxcrafting",
      "https://www.linkedin.com/in/webx-crafting-a1a875402/"
    ]
  };

  return (
    <>
      {/* Inject Structured Local Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
          Web Development <br />
          Company In <span className="grad-text">{name}</span>
        </h1>
        <p style={{ color: "#7b82a8", fontSize: "clamp(15px, 2vw, 18px)", lineHeight: 1.6, maxWidth: 720, margin: "0 auto 36px" }}>
          We craft ultra-fast, premium hand-coded React & Next.js websites specifically engineered to help startups and local businesses in {name} dominate search results and capture hot sales leads.
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
        <div
          className="glass"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 24,
            padding: "24px 30px",
            borderRadius: 20,
            textAlign: "center",
            border: "1px solid rgba(255,255,255,0.04)"
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "center", gap: 3, color: "#ffb300", marginBottom: 6 }}>
              {[...Array(5)].map((_, i) => <FaStar key={i} size={13} />)}
            </div>
            <div style={{ fontWeight: 700, color: "#e8eaf6", fontSize: 15 }}>100% Client Satisfaction</div>
            <div style={{ color: "#7b82a8", fontSize: 12, marginTop: 2 }}>Highly Rated in {name}</div>
          </div>
          <div style={{ borderLeft: "1px solid rgba(255,255,255,0.06)", borderRight: "1px solid rgba(255,255,255,0.06)" }} className="hide-mobile">
            <div style={{ fontSize: 22, fontWeight: 800, color: "#4f6fff", fontFamily: "Syne", fontStyle: "italic", marginBottom: 3 }}>Next.js / React</div>
            <div style={{ fontWeight: 700, color: "#e8eaf6", fontSize: 15 }}>High Performance Tech</div>
            <div style={{ color: "#7b82a8", fontSize: 12, marginTop: 2 }}>Sub-second Loading Speed</div>
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#a259ff", fontFamily: "Syne", fontStyle: "italic", marginBottom: 3 }}>100% Google LCP</div>
            <div style={{ fontWeight: 700, color: "#e8eaf6", fontSize: 15 }}>SEO Engineered Coding</div>
            <div style={{ color: "#7b82a8", fontSize: 12, marginTop: 2 }}>Guaranteed Search Boost</div>
          </div>
        </div>
      </section>

      {/* Core Local Service Focus */}
      <section className="mobile-p-6" style={{ position: "relative", zIndex: 10, padding: "60px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 30 }}>
          <div
            className="glass"
            style={{
              padding: 36,
              borderRadius: 22,
              border: "1px solid rgba(255,255,255,0.04)"
            }}
          >
            <div style={{ width: 48, height: 48, borderRadius: 10, background: "rgba(79,111,255,0.1)", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", color: "#4f6fff", fontSize: 20, marginBottom: 24 }}>
              <FaLaptopCode />
            </div>
            <h3 style={{ fontFamily: "Syne", fontSize: 20, fontWeight: 700, marginBottom: 14 }}>Premium Custom Coding</h3>
            <p style={{ color: "#7b82a8", fontSize: 14, lineHeight: 1.6 }}>
              We write clean, efficient JavaScript without using templates. Every business in {name} deserves a tailored layout optimized specifically for their industry and clients.
            </p>
          </div>

          <div
            className="glass"
            style={{
              padding: 36,
              borderRadius: 22,
              border: "1px solid rgba(255,255,255,0.04)"
            }}
          >
            <div style={{ width: 48, height: 48, borderRadius: 10, background: "rgba(162,89,255,0.1)", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", color: "#a259ff", fontSize: 20, marginBottom: 24 }}>
              <FaRocket />
            </div>
            <h3 style={{ fontFamily: "Syne", fontSize: 20, fontWeight: 700, marginBottom: 14 }}>Blazing Dynamic Speed</h3>
            <p style={{ color: "#7b82a8", fontSize: 14, lineHeight: 1.6 }}>
              Page speed determines conversion rates. Next.js server-rendered code delivers instant paint results, reducing user bounce rates to virtually zero in high-speed markets like {name}.
            </p>
          </div>

          <div
            className="glass"
            style={{
              padding: 36,
              borderRadius: 22,
              border: "1px solid rgba(255,255,255,0.04)"
            }}
          >
            <div style={{ width: 48, height: 48, borderRadius: 10, background: "rgba(0,229,255,0.1)", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", color: "#00e5ff", fontSize: 20, marginBottom: 24 }}>
              <FaShieldAlt />
            </div>
            <h3 style={{ fontFamily: "Syne", fontSize: 20, fontWeight: 700, marginBottom: 14 }}>Integrated Local Authority</h3>
            <p style={{ color: "#7b82a8", fontSize: 14, lineHeight: 1.6 }}>
              Your page is structured with dynamic LocalBusiness schemas, structured JSON breadcrumbs, and keyword-rich tags, giving your brand immediate local map presence.
            </p>
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

      <Footer />
      <WhatsAppButton />
    </>
  );
}
