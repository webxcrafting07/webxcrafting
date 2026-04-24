"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

const defaultServices = [
  {
    _id: "1",
    icon: "FaGlobe",
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
    icon: "FaShoppingCart",
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
    icon: "FaBriefcase",
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
    icon: "FaCog",
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
];

export default function ServicesClient() {
  const [services, setServices] = useState(defaultServices);
  const [selectedService, setSelectedService] = useState<any>(null);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data.length) setServices(d.data);
      })
      .catch(() => { });
  }, []);

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
        }}
      >
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-label" style={{ margin: "0 auto 20px" }}>
              Pricing
            </div>
            <h1
              style={{
                fontFamily: "Syne",
                fontSize: "clamp(32px,5vw,64px)",
                fontWeight: 800,
                fontStyle: "italic",
                marginBottom: 16,
              }}
            >
              Transparent <span className="grad-text">Pricing Plans</span>
            </h1>
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: 24,
            marginBottom: 64,
          }}
        >
          {services.map((s: any, i) => (
            <FadeUp key={s._id || i} delay={i * 0.09}>
              <motion.div
                onClick={() => setSelectedService(s)}
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
                    background: s.popular
                      ? "linear-gradient(135deg,#4f6fff,#a259ff)"
                      : "rgba(79,111,255,0.06)",
                    border: s.popular
                      ? "none"
                      : "1px solid rgba(79,111,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                    marginBottom: 20,
                    color: s.popular ? "#fff" : "#4f6fff",
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

                <Link
                  href="/contact"
                  className={s.popular ? "btn-primary" : "btn-outline"}
                  style={{ width: "100%", display: "flex" }}
                >
                  Get Started →
                </Link>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        {selectedService && (
          <div
            className="animate-fade-in"
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(3,5,10,0.92)",
              backdropFilter: "blur(20px)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
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
                  background: 'linear-gradient(135deg,#4f6fff,#a259ff)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 44,
                  color: '#fff',
                  boxShadow: '0 12px 32px rgba(79,111,255,0.4)',
                  border: '4px solid #03050a'
                }}>
                  {typeof selectedService.icon === "function" ? selectedService.icon() : getServiceIcon(selectedService.icon, 44)}
                </div>
                
                <button
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
                    zIndex: 10
                  }}
                >
                  ✕
                </button>
              </div>

              <div style={{ padding: '0 40px 40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20, marginBottom: 32 }}>
                  <div>
                    <h2 style={{ fontFamily: "Syne", fontSize: 36, fontWeight: 800, fontStyle: "italic", marginBottom: 8, letterSpacing: -1 }}>
                      {selectedService.title}
                    </h2>
                    <p style={{ color: '#7b82a8', fontSize: 16, maxWidth: 500 }}>{selectedService.description}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 40, fontWeight: 800, background: 'linear-gradient(135deg,#4f6fff,#a259ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>
                      ₹{Number(selectedService.price).toLocaleString("en-IN")}
                    </div>
                    {selectedService.originalPrice && (
                      <div style={{ color: "#7b82a8", textDecoration: "line-through", fontSize: 18, marginTop: 4 }}>
                        ₹{Number(selectedService.originalPrice).toLocaleString("en-IN")}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40 }}>
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
      <Footer />
      <WhatsAppButton />
    </>
  );
}
