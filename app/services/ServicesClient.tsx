"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DotBackground from "@/components/DotBackground";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  FaCheck,
  FaMoneyBillWave,
  FaClipboardList,
  FaInfoCircle,
  FaRocket,
  FaLaptopCode,
  FaStore,
  FaUserTie,
  FaDatabase,
  FaSearch,
  FaPalette,
  FaCode,
  FaChevronDown,
  FaQuestionCircle
} from "react-icons/fa";
import { getServiceIcon } from "@/lib/icons";

const FadeUp = ({ children, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const defaultServices = [
  {
    _id: "1",
    icon: "FaLaptopCode",
    title: "Business Website",
    description: "Professional multi-page website with SEO, contact forms, and responsive design.",
    price: 8000,
    originalPrice: 12000,
    popular: false,
    features: ["5 Dynamic Pages", "SEO Optimization", "Mobile Responsive", "Contact Forms", "1 Month Free Support"],
    paymentTerms: "50% Advance Payment",
    additionalCharges: "Domain & Hosting are not included in this price",
    requirements: ["Company Logo", "Business Content", "Professional Images", "Social Media Links"],
    detailedDescription: "The Business Website package is designed for professionals and small businesses looking to establish a strong online presence. We include high-quality design, mobile-first responsiveness, and basic SEO to help you get found on Google. The package includes 5 essential pages: Home, About, Services, Gallery, and Contact Us."
  },
  {
    _id: "2",
    icon: "FaStore",
    title: "E-commerce Website",
    description: "Full-featured online store with payments, inventory, and order tracking.",
    price: 25000,
    originalPrice: 35000,
    popular: true,
    features: ["Unlimited Products", "Payment Gateway", "Order Management", "Inventory System", "3 Month Support"],
    paymentTerms: "40% Advance, 30% after Design, 30% before Launch",
    additionalCharges: "SMS/Email gateway charges & Hosting separate",
    requirements: ["Product Details", "Pricing Strategy", "Payment Gateway Credentials", "Shipping Policy"],
    detailedDescription: "Launch your online business with our robust E-commerce solution. We integrate secure payment gateways (Razorpay/Stripe), automated invoice generation, and a powerful admin panel to manage your sales and stock. This is a complete 'Business in a Box' solution for online sellers."
  },
  {
    _id: "3",
    icon: "FaUserTie",
    title: "Job Portal / Directory",
    description: "Complete hiring platform with employer/candidate dashboards and AI matching.",
    price: 45000,
    originalPrice: 60000,
    popular: false,
    features: ["Employer Dashboard", "Candidate Portal", "Application Tracking", "Search & Filters", "6 Month Support"],
    paymentTerms: "30% Advance, 40% after Development, 30% on Final Launch",
    additionalCharges: "Cloud Server Hosting recommended (additional cost)",
    requirements: ["Portal Rules", "Category List", "Logo & Branding", "Membership Tiers"],
    detailedDescription: "A highly complex Job Portal or Business Directory with distinct user roles. Employers can post jobs and track applications, while candidates can build profiles and apply. Includes advanced search filters, notification systems, and an integrated blog for SEO growth."
  },
  {
    _id: "4",
    icon: "FaDatabase",
    title: "Custom SaaS / Web App",
    description: "Tailored web apps, SaaS platforms, and dashboards built to your spec.",
    price: 60000,
    originalPrice: 80000,
    popular: false,
    features: ["Custom UI/UX Design", "API Integration", "Advanced Admin Panel", "Cloud Deployment", "1 Year Support"],
    paymentTerms: "Milestone-based Payments (5-6 stages)",
    additionalCharges: "Hosting and third-party API costs are separate",
    requirements: ["Detailed Feature List", "Workflow/Flowchart", "API Documentation (if any)", "Reference Projects"],
    detailedDescription: "For unique business ideas that don't fit into standard boxes. Whether you're building a SaaS platform, a custom CRM, or a unique marketplace, our team uses the latest MERN/Next.js stack to build scalable, high-performance web applications that grow with your business."
  },
  {
    _id: "5",
    icon: "FaLaptopCode",
    title: "School Management System",
    description: "Complete digital solution for schools with student, fee, and exam management.",
    price: 35000,
    originalPrice: 50000,
    popular: false,
    features: ["Student & Staff Profiles", "Attendance Tracking", "Fee Management", "Exam Result Portal", "Parent-Teacher App"],
    paymentTerms: "40% Advance, 30% after Demo, 30% on Final Setup",
    additionalCharges: "Server hosting & SMS gateway separate",
    requirements: ["School Logo", "Student Data", "Fee Structure", "Staff Details"],
    detailedDescription: "A comprehensive management system for educational institutions. Automate your school's daily operations, from attendance tracking to digital result generation and secure fee processing. Includes a robust database and user-friendly dashboards for admins and parents."
  },
  {
    _id: "6",
    icon: "FaStore",
    title: "Inventory & POS System",
    description: "Advanced stock tracking and point-of-sale system for retail shops and stores.",
    price: 15000,
    originalPrice: 22000,
    popular: false,
    features: ["Stock Tracking", "Sales Reporting", "Barcode Integration", "Supplier Management", "Low Stock Alerts"],
    paymentTerms: "50% Advance, 50% on Delivery",
    additionalCharges: "POS Hardware & Hosting separate",
    requirements: ["Product List", "Category Data", "Supplier Info", "Tax Configuration"],
    detailedDescription: "Take control of your shop's inventory with our premium POS solution. Track every sale, monitor stock levels in real-time, and generate daily/monthly sales reports to grow your business efficiently. Designed for speed and accuracy in retail environments."
  },
  {
    _id: "7",
    icon: "FaSearch",
    title: "Digital Marketing & SEO",
    description: "End-to-end digital marketing and Search Engine Optimization to grow your traffic and leads.",
    price: 12000,
    originalPrice: 18000,
    popular: true,
    features: ["On-Page & Off-Page SEO", "Social Media Marketing", "Google & Meta Ads", "Content Strategy", "Monthly Performance Reports"],
    paymentTerms: "Monthly Retainer",
    additionalCharges: "Ad budgets (Google Ads, Meta Ads) are separate",
    requirements: ["Website Access", "Google Analytics Access", "Social Media Accounts"],
    detailedDescription: "Boost your online visibility and drive targeted traffic to your business. Our affordable digital marketing strategies cover everything from technical SEO and keyword optimization to engaging social media campaigns. We treat your marketing budget like our own — zero hidden fees, complete transparency, and monthly ROI reports.",
    customLink: "/services/digital-marketing"
  },
  {
    _id: "8",
    icon: "FaStore",
    title: "Google My Business (GMB) Setup",
    description: "Complete setup and optimization of your Google Business Profile for local visibility.",
    price: 3500,
    originalPrice: 5000,
    popular: false,
    features: ["Profile Creation", "Keyword Optimization", "Map Verification", "Service/Product Listing", "Review Strategy"],
    paymentTerms: "100% Advance Payment",
    additionalCharges: "None",
    requirements: ["Business Details", "Logo & Photos", "Verification OTP/Video"],
    detailedDescription: "Dominate local search results. We will create, verify, and fully optimize your Google My Business profile so local customers can easily find you on Google Search and Maps when they need your services."
  },
  {
    _id: "9",
    icon: "FaLaptopCode",
    title: "Mobile App Development",
    description: "Custom iOS and Android apps built with React Native and Flutter.",
    price: 30000,
    originalPrice: 45000,
    popular: true,
    features: ["Custom iOS & Android Apps", "React Native / Flutter", "UI/UX Design", "API Integration", "App Store Deployment"],
    customLink: "/services/mobile-app-development"
  },
  {
    _id: "10",
    icon: "FaDatabase",
    title: "Premium Web Hosting",
    description: "Blazing fast, secure, and scalable cloud hosting solutions.",
    price: 499,
    originalPrice: 999,
    popular: false,
    features: ["99.9% Uptime Guarantee", "Free SSL Certificate", "Daily Backups", "NVMe SSD Storage", "24/7 Support"],
    customLink: "/services/web-hosting"
  },
  {
    _id: "11",
    icon: "FaVideo",
    title: "Video Ads Creation",
    description: "High-converting, affordable video ads for Instagram, Facebook, and YouTube.",
    price: 5000,
    originalPrice: 8000,
    popular: true,
    features: ["15-30 Second Video Ad", "Professional Scriptwriting", "Engaging Subtitles & Captions", "Premium Stock Footage & Music", "2 Rounds of Revisions"],
    paymentTerms: "100% Advance Payment",
    additionalCharges: "None",
    requirements: ["Brand Logo", "Product/Service Details", "Target Audience Info", "Reference Videos (optional)"],
    detailedDescription: "Stop scrolling and start selling! We create scroll-stopping video ads optimized for Instagram Reels, Facebook Feed, and YouTube Shorts. Each video is professionally scripted, edited with premium effects, and designed to convert viewers into paying customers — all at the most affordable price in the industry.",
    customLink: "/services/video-ads"
  }
];

export default function ServicesClient() {
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const faqs = [
    { q: "How long does it take to build a website?", a: "A standard business website takes 7-14 days. Complex e-commerce or SaaS apps can take 4-8 weeks depending on requirements." },
    { q: "Do you provide domain and hosting?", a: "Yes, we can handle domain registration and premium cloud hosting for you. These are usually billed separately based on your traffic needs." },
    { q: "Will my website be mobile-friendly and SEO optimized?", a: "Absolutely. All our websites are 100% responsive and built with technical SEO best practices (schema, meta tags, fast LCP)." },
    { q: "What is your payment structure?", a: "We typically require a 50% advance for smaller projects. For larger custom applications, we break it into milestone-based payments." }
  ];

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((d) => {
        let loadedServices = defaultServices;
        if (d.success && d.data.length) {
          const apiServices = d.data;
          // Append any defaultServices with customLink that aren't already in API data
          const customLinkServices = defaultServices.filter(
            (ds: any) => ds.customLink && !apiServices.some((api: any) => api.title === ds.title)
          );
          loadedServices = [...apiServices, ...customLinkServices];
        }
        setServices(loadedServices);

        if (typeof window !== "undefined") {
          const params = new URLSearchParams(window.location.search);
          const serviceQuery = params.get('service');
          if (serviceQuery) {
            const found = loadedServices.find((s:any) => s.title.toLowerCase().includes(serviceQuery.toLowerCase()));
            if (found) setSelectedService(found);
          }
        }
      })
      .catch(() => { setServices(defaultServices); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedService])

  return (
    <>
      <DotBackground />
      <Navbar />
      <div
        className="mobile-p-6"
        style={{
          position: "relative",
          zIndex: 10,
          padding: "130px 32px 80px",
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          overflow: "hidden"
        }}
      >
        {/* HERO SECTION */}
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: 100 }}>
            <div className="section-label" style={{ margin: "0 auto 20px" }}>
              Our Services
            </div>
            <h1
              style={{
                fontFamily: "Syne",
                fontSize: "clamp(24px, 8vw, 72px)",
                fontWeight: 800,
                fontStyle: "italic",
                marginBottom: 24,
                lineHeight: 1.1,
                letterSpacing: "-1px"
              }}
            >
              We Build Digital <br /><span className="grad-text">Masterpieces</span>
            </h1>
            <p
              style={{
                color: "#7b82a8",
                fontSize: "clamp(16px, 2vw, 18px)",
                maxWidth: 650,
                margin: "0 auto",
                lineHeight: 1.6
              }}
            >
              From stunning portfolio websites to complex SaaS applications, we engineer ultra-fast, high-converting digital solutions tailored to your business needs.
            </p>
          </div>
        </FadeUp>
      </div>

      {/* STATS MARQUEE */}
      <FadeUp delay={0.05}>
        <div style={{ 
          marginBottom: 100, 
          overflow: "hidden", 
          padding: "20px 0", 
          background: "rgba(79,111,255,0.05)", 
          borderTop: "1px solid rgba(79,111,255,0.1)", 
          borderBottom: "1px solid rgba(79,111,255,0.1)", 
          width: "100%",
          position: "relative"
        }}>
            <motion.div
              animate={{ x: [0, -1035] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
              style={{ display: "flex", gap: 64, alignItems: "center", width: "max-content" }}
            >
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{ display: "flex", gap: 64, alignItems: "center" }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#4f6fff", fontFamily: "Syne", fontStyle: "italic", whiteSpace: "nowrap" }}>✦ 100% Client Satisfaction</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#e8eaf6", fontFamily: "Syne", fontStyle: "italic", whiteSpace: "nowrap" }}>✦ Next.js Performance</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#a259ff", fontFamily: "Syne", fontStyle: "italic", whiteSpace: "nowrap" }}>✦ Zero Template Code</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#00e676", fontFamily: "Syne", fontStyle: "italic", whiteSpace: "nowrap" }}>✦ Sub-Second Load Speeds</span>
                </div>
              ))}
            </motion.div>
          </div>
        </FadeUp>

      <div
        className="mobile-p-6"
        style={{
          position: "relative",
          zIndex: 10,
          padding: "0 32px 80px",
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          overflow: "hidden"
        }}
      >
        {/* PROCESS SECTION */}
        <FadeUp delay={0.1}>
          <div style={{ marginBottom: 100 }}>
            <div style={{ textAlign: "center", marginBottom: 50 }}>
              <h2 style={{ fontFamily: "Syne", fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, fontStyle: "italic" }}>
                Our <span className="grad-text">Process</span>
              </h2>
            </div>
            <style>{`
              .process-grid-services {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 24px;
              }
              @media (max-width: 1024px) {
                .process-grid-services {
                  grid-template-columns: repeat(2, 1fr);
                }
              }
              @media (max-width: 600px) {
                .process-grid-services {
                  grid-template-columns: 1fr;
                }
              }
            `}</style>
            <div className="process-grid-services">
              {[
                { step: "01", title: "Discovery", desc: "We understand your goals, target audience, and specific business needs.", icon: FaSearch, color: "#4f6fff" },
                { step: "02", title: "Design", desc: "We craft stunning, premium UI/UX mockups for your approval.", icon: FaPalette, color: "#a259ff" },
                { step: "03", title: "Develop", desc: "We code using Next.js/React ensuring blazing fast load speeds.", icon: FaCode, color: "#00e5ff" },
                { step: "04", title: "Launch", desc: "We deploy, test, and hand over the complete optimized product.", icon: FaRocket, color: "#00e676" }
              ].map((p, i) => (
                <div key={i} className="glass" style={{ padding: 32, borderRadius: 24, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: -20, right: -10, fontSize: 100, fontWeight: 900, color: "rgba(255,255,255,0.03)", fontFamily: "Syne", fontStyle: "italic" }}>
                    {p.step}
                  </div>
                  <div style={{ width: 50, height: 50, borderRadius: 12, background: `rgba(${p.color === "#4f6fff" ? "79,111,255" : p.color === "#a259ff" ? "162,89,255" : p.color === "#00e5ff" ? "0,229,255" : "0,230,118"}, 0.1)`, display: "flex", alignItems: "center", justifyContent: "center", color: p.color, fontSize: 22, marginBottom: 20 }}>
                    <p.icon />
                  </div>
                  <h3 style={{ fontFamily: "Syne", fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{p.title}</h3>
                  <p style={{ color: "#7b82a8", fontSize: 14, lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* PRICING SECTION */}
        <FadeUp delay={0.2}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-label" style={{ margin: "0 auto 20px" }}>
              Pricing
            </div>
            <h2
              style={{
                fontFamily: "Syne",
                fontSize: "clamp(28px,5vw,48px)",
                fontWeight: 800,
                fontStyle: "italic",
                marginBottom: 16,
              }}
            >
              Transparent <span className="grad-text">Pricing Plans</span>
            </h2>
            <p
              style={{
                color: "#7b82a8",
                fontSize: 17,
                maxWidth: 500,
                margin: "0 auto",
              }}
            >
              No hidden fees. No surprises. Just great work at fair prices.
            </p>
          </div>
        </FadeUp>

        <style>{`
          .services-cards-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            margin-bottom: 64px;
          }
          @media (max-width: 1024px) {
            .services-cards-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 768px) {
            .services-cards-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
        {loading ? (
          <div style={{ textAlign: "center", padding: 80, color: "#7b82a8" }}>
            <div className="spinner" style={{ margin: "0 auto 16px" }} />
            Loading premium services...
          </div>
        ) : (
          <div className="services-cards-grid">
            {services.map((s: any, i) => (
              <FadeUp key={s._id || i} delay={i * 0.09}>
                <motion.div
                onClick={() => {
                  if (s.customLink) {
                    window.location.href = s.customLink;
                  } else {
                    setSelectedService(s);
                  }
                }}
                whileHover={{ y: -8, boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  borderRadius: 22,
                  padding: 32,
                  height: "100%",
                  cursor: "pointer",
                  background: s.popular
                    ? "linear-gradient(135deg,rgba(79,111,255,.18),rgba(162,89,255,.14))"
                    : "rgba(10,14,28,0.65)",
                  backdropFilter: "blur(20px)",
                  border: s.popular
                    ? "1px solid rgba(79,111,255,.42)"
                    : "1px solid rgba(99,120,255,.15)",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {s.popular && (
                  <div
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      background: "linear-gradient(135deg,#4f6fff,#a259ff)",
                      borderRadius: 20,
                      padding: "4px 14px",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    POPULAR
                  </div>
                )}
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 14,
                    background: 'rgba(79,111,255,0.05)',
                    border: '1px solid rgba(79,111,255,0.15)',
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                    marginBottom: 20,
                    color: '#4f6fff',
                    boxShadow: 'inset 0 0 12px rgba(79,111,255,0.1)'
                  }}
                >
                  {getServiceIcon(s.icon, 26)}
                </div>
                <h3
                  style={{
                    fontFamily: "Syne",
                    fontWeight: 700,
                    fontSize: 21,
                    fontStyle: "italic",
                    marginBottom: 10,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    color: "#7b82a8",
                    fontSize: 14,
                    lineHeight: 1.75,
                    marginBottom: 24,
                    flex: 1,
                  }}
                >
                  {s.description}
                </p>

                {s.features && s.features.length > 0 && (
                  <ul style={{ listStyle: "none", marginBottom: 24 }}>
                    {s.features.map((f: string) => (
                      <li
                        key={f}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          color: "#b0b8d8",
                          fontSize: 14,
                          marginBottom: 8,
                        }}
                      >
                        <span style={{ color: "#00e676" }}>
                          <FaCheck size={13} />
                        </span>{" "}
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                <div style={{ fontFamily: "Syne", marginBottom: 20 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 10,
                      flexWrap: "wrap",
                    }}
                  >
                    {s.originalPrice && s.originalPrice > s.price && (
                      <span
                        style={{
                          fontSize: 18,
                          fontWeight: 400,
                          color: "#7b82a8",
                          textDecoration: "line-through",
                          marginRight: 4,
                        }}
                      >
                        ₹{Number(s.originalPrice).toLocaleString("en-IN")}
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: 34,
                        fontWeight: 800,
                        ...(s.popular
                          ? {
                            background:
                              "linear-gradient(135deg,#4f6fff,#a259ff)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }
                          : { color: "#e8eaf6" }),
                      }}
                    >
                      ₹{Number(s.price).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div
                  className={s.popular ? "btn-primary" : "btn-outline"}
                  style={{ width: "100%", display: "flex", justifyContent: "center", padding: "14px 20px" }}
                >
                  {s.customLink ? "View Details →" : "Get Started →"}
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
        )}

        {selectedService && (
          <div
            className="animate-fade-in"
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(3,5,10,0.9)",
              backdropFilter: "blur(20px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "100px 20px 40px",
              overflowY: "auto",
            }}
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="glass-strong"
              style={{
                width: "100%",
                maxWidth: 800,
                maxHeight: "92vh",
                overflowY: "auto",
                padding: "0",
                position: "relative",
                borderRadius: 24,
                border: '1px solid rgba(79,111,255,0.3)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.6)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image/Background */}
              <div style={{ 
                height: 160, 
                background: 'linear-gradient(135deg, rgba(79,111,255,0.2), rgba(162,89,255,0.15))',
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '0 40px',
                marginBottom: 60
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: -40,
                  width: 100,
                  height: 100,
                  borderRadius: 24,
                  background: 'rgba(79,111,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 44,
                  color: '#4f6fff',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
                  border: '2px solid rgba(79,111,255,0.3)'
                }}>
                  {getServiceIcon(selectedService.icon, 44)}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1, background: "rgba(255,255,255,0.15)", rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedService(null)}
                  style={{
                    position: "absolute",
                    top: 24,
                    right: 24,
                    background: "rgba(0,0,0,0.3)",
                    backdropFilter: 'blur(10px)',
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                    transition: "all 0.2s"
                  }}
                >
                  ✕
                </motion.button>
              </div>

              <div style={{ padding: 'clamp(20px, 5vw, 40px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20, marginBottom: 32 }}>
                  <div>
                    <h2 style={{ fontFamily: "Syne", fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 800, fontStyle: "italic", marginBottom: 8, letterSpacing: -1 }}>
                      {selectedService.title}
                    </h2>
                    <p style={{ color: '#7b82a8', fontSize: "clamp(14px, 2vw, 16px)", maxWidth: 500 }}>{selectedService.description}</p>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: "clamp(30px, 6vw, 40px)", fontWeight: 800, background: 'linear-gradient(135deg,#4f6fff,#a259ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>
                      ₹{Number(selectedService.price).toLocaleString("en-IN")}
                    </div>
                    {selectedService.originalPrice && (
                      <div style={{ color: "#7b82a8", textDecoration: "line-through", fontSize: "clamp(14px, 3vw, 18px)", marginTop: 4 }}>
                        ₹{Number(selectedService.originalPrice).toLocaleString("en-IN")}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "clamp(20px, 5vw, 40px)" }}>
                  {/* Left Column */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                      <div style={{ color: '#4f6fff', background: 'rgba(79,111,255,0.1)', padding: 8, borderRadius: 10 }}><FaRocket size={18} /></div>
                      <h4 style={{ fontFamily: "Syne", fontSize: 18, fontWeight: 700, color: "#e8eaf6" }}>Package Includes</h4>
                    </div>
                    <ul style={{ listStyle: "none", display: "grid", gap: 14 }}>
                      {(selectedService.features || []).map((f: string, idx: number) => (
                        <li key={idx} style={{ display: "flex", alignItems: 'flex-start', gap: 12, color: "#b0b8d8", fontSize: 15, lineHeight: 1.4 }}>
                          <FaCheck size={14} style={{ color: "#00e676", marginTop: 4 }} /> {f}
                        </li>
                      ))}
                    </ul>

                    {selectedService.detailedDescription && (
                      <div style={{ marginTop: 40 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                          <div style={{ color: '#4f6fff', background: 'rgba(79,111,255,0.1)', padding: 8, borderRadius: 10 }}><FaInfoCircle size={18} /></div>
                          <h4 style={{ fontFamily: "Syne", fontSize: 18, fontWeight: 700, color: "#e8eaf6" }}>Detailed Breakdown</h4>
                        </div>
                        <p style={{ color: "#7b82a8", fontSize: 15, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
                          {selectedService.detailedDescription}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Column */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                      <div style={{ color: '#4f6fff', background: 'rgba(79,111,255,0.1)', padding: 8, borderRadius: 10 }}><FaMoneyBillWave size={18} /></div>
                      <h4 style={{ fontFamily: "Syne", fontSize: 18, fontWeight: 700, color: "#e8eaf6" }}>Payment & Terms</h4>
                    </div>
                    <div style={{ padding: 24, borderRadius: 16, background: "rgba(79,111,255,0.06)", border: "1px solid rgba(79,111,255,0.12)", marginBottom: 32 }}>
                      <div style={{ marginBottom: 16 }}>
                        <p style={{ color: "#7b82a8", fontSize: 12, textTransform: 'uppercase', fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>Advance Payment</p>
                        <p style={{ color: "#e8eaf6", fontSize: 17, fontWeight: 600 }}>{selectedService.paymentTerms || "50% Advance"}</p>
                      </div>
                      <div>
                        <p style={{ color: "#7b82a8", fontSize: 12, textTransform: 'uppercase', fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>Notes</p>
                        <p style={{ color: "#e8eaf6", fontSize: 15 }}>{selectedService.additionalCharges || "Domain/Hosting charges are separate"}</p>
                      </div>
                    </div>

                    {selectedService.requirements?.length > 0 && (
                      <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                          <div style={{ color: '#4f6fff', background: 'rgba(79,111,255,0.1)', padding: 8, borderRadius: 10 }}><FaClipboardList size={18} /></div>
                          <h4 style={{ fontFamily: "Syne", fontSize: 18, fontWeight: 700, color: "#e8eaf6" }}>Requirements</h4>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                          {selectedService.requirements.map((r: string, idx: number) => (
                            <span key={idx} style={{ padding: '8px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', color: '#b0b8d8', fontSize: 14, border: '1px solid rgba(255,255,255,0.08)' }}>
                              {r}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 16, marginTop: 56, flexWrap: 'wrap' }}>
                  <Link href="/contact" className="btn-primary" style={{ flex: 2, minWidth: 200, height: 56 }}>
                    Book This Package →
                  </Link>
                  <a
                    href={`https://wa.me/919102615343?text=Hello%20I%20am%20interested%20in%20the%20${encodeURIComponent(selectedService.title)}%20package`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                    style={{ flex: 1, minWidth: 200, height: 56, borderColor: "rgba(37,211,102,.4)", color: "#25d366" }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#25d366" style={{ marginRight: 8 }}>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a13.12 13.12 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg> WhatsApp Us
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* TECH STACK SECTION */}
        <FadeUp delay={0.15}>
          <div style={{ marginBottom: 100, textAlign: "center" }}>
            <h2 style={{ fontFamily: "Syne", fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, fontStyle: "italic", marginBottom: 20 }}>
              Powered By <span className="grad-text">Premium Tech</span>
            </h2>
            <p style={{ color: "#7b82a8", fontSize: 16, maxWidth: 600, margin: "0 auto 40px" }}>
              We don't use slow WordPress templates. We code your platform from scratch using industry-leading technologies.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20, maxWidth: 800, margin: "0 auto" }}>
              {[
                { name: "React", color: "#61DAFB" },
                { name: "Next.js", color: "#FFFFFF" },
                { name: "TypeScript", color: "#3178C6" },
                { name: "Tailwind CSS", color: "#38B2AC" },
                { name: "Node.js", color: "#339933" },
                { name: "MongoDB", color: "#47A248" }
              ].map((tech) => (
                <div key={tech.name} className="glass" style={{ padding: "16px 32px", borderRadius: 100, border: `1px solid rgba(255,255,255,0.05)`, color: tech.color, fontWeight: 700, fontSize: 16 }}>
                  {tech.name}
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* FAQ SECTION */}
        <FadeUp delay={0.2}>
          <div style={{ maxWidth: 800, margin: "0 auto 100px" }}>
            <div style={{ textAlign: "center", marginBottom: 50 }}>
              <h2 style={{ fontFamily: "Syne", fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, fontStyle: "italic", display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                <FaQuestionCircle style={{ color: "#4f6fff" }} /> Service <span className="grad-text">FAQs</span>
              </h2>
            </div>
            <div style={{ display: "grid", gap: 16 }}>
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div key={index} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, overflow: "hidden" }}>
                    <button onClick={() => setActiveFaq(isOpen ? null : index)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px", background: "none", border: "none", color: "#e8eaf6", textAlign: "left", cursor: "pointer" }}>
                      <span style={{ fontWeight: 700, fontSize: 16, paddingRight: 20 }}>{faq.q}</span>
                      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ color: "#4f6fff" }}>
                        <FaChevronDown size={14} />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
                          <div style={{ padding: "0 24px 24px", color: "#7b82a8", fontSize: 15, lineHeight: 1.6, borderTop: "1px solid rgba(255,255,255,0.02)" }}>
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeUp>

        {/* Custom CTA */}
        <FadeUp delay={0.3}>
          <div
            className="glass mobile-p-6"
            style={{
              padding: "40px 48px",
              borderRadius: 20,
              textAlign: "center",
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            <h3
              style={{
                fontFamily: "Syne",
                fontWeight: 700,
                fontSize: 24,
                fontStyle: "italic",
                marginBottom: 12,
              }}
            >
              Need something custom?
            </h3>
            <p style={{ color: "#7b82a8", marginBottom: 28, fontSize: 15 }}>
              Every project is unique. Tell us about yours and we will craft a
              tailored quote.
            </p>
            <div
              style={{
                display: "flex",
                gap: 14,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link href="/contact" className="btn-primary">
                Get Custom Quote
              </Link>
              <a
                href="https://wa.me/919102615343?text=Hello%20I%20need%20a%20custom%20website%20quote"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ borderColor: "rgba(37,211,102,.4)", color: "#25d366" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#25d366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a13.12 13.12 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg> WhatsApp
              </a>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* ─── SEO POPULAR SEARCHES (Visually Hidden for SEO) ──────────────────────── */}
      <section style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", border: 0 }}>
        <h3>Popular Searches</h3>
        <div>
          {[
            "Best Web Development Agency", "Top E-commerce Website Developers", "Custom Software Development Services", 
            "Responsive Website Design Company", "SEO and Digital Marketing Agency", "Mobile App Development Experts", 
            "React & Next.js Developers", "Shopify Store Development", "WordPress Website Redesign", 
            "SaaS Application Development", "Enterprise Web Portals", "Real Estate Website Development", 
            "Hospital & Healthcare Web Design", "Restaurant & Food Delivery App Development", "Travel & Booking Website Developers", 
            "Custom CRM/ERP Solutions", "Local SEO Optimization Services", "UI/UX Design Agency", 
            "Affordable Business Websites", "Website Maintenance & Support", "High-Performance Web Apps", 
            "B2B Website Development", "Landing Page Design & Optimization"
          ].map((keyword, i) => (
            <span key={i}>{keyword}, </span>
          ))}
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
