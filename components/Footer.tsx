"use client";
import Link from "next/link";
import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaMapMarkerAlt,
  FaGoogle,
} from "react-icons/fa";
import GoogleReviewBadge from "./GoogleReviewBadge";

const services = [
  "Business Website Development",
  "E-commerce Stores",
  "Custom Web Applications",
  "React & Next.js Development",
  "SEO & Digital Marketing",
  "Website Redesign",
  "UI/UX Design",
  "SaaS Development",
];
const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Locations", href: "/locations" },
  { label: "Blog", href: "/blog" },
  { label: "Cost Calculator", href: "/website-cost-calculator" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "HTML Sitemap", href: "/sitemap" },
];

const topCities = [
  { label: "Bhopal", href: "/locations/web-development-company-in-bhopal" },
  { label: "Kanpur", href: "/locations/web-development-company-in-kanpur" },
  { label: "Indore", href: "/locations/web-development-company-in-indore" },
  { label: "Jaipur", href: "/locations/web-development-company-in-jaipur" },
  { label: "Bangalore", href: "/locations/web-development-company-in-bangalore" },
  { label: "Mumbai", href: "/locations/web-development-company-in-mumbai" },
];

const socials = [
  {
    icon: FaFacebook,
    href: "https://www.facebook.com/profile.php?id=61589165532607",
    label: "Facebook",
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/webx-crafting-a1a875402/",
    label: "LinkedIn",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/webxcrafting",
    label: "Instagram",
  },
  {
    icon: FaGoogle,
    href: "https://share.google/3PHsoNPOUsACUGdHH",
    label: "Google Profile",
  },
];

export default function Footer() {
  const headerStyle: React.CSSProperties = {
    fontWeight: 700,
    marginBottom: 24,
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    color: "#fff",
    opacity: 0.9,
  };

  const linkStyle: React.CSSProperties = {
    display: "block",
    color: "#8892b0",
    textDecoration: "none",
    fontSize: 14,
    marginBottom: 16,
    transition: "all 0.3s ease",
    position: "relative",
  };

  const linkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "#ffffff";
    e.currentTarget.style.transform = "translateX(5px)";
  };

  const linkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "#8892b0";
    e.currentTarget.style.transform = "translateX(0)";
  };

  return (
    <footer
      className="mobile-p-6"
      style={{
        borderTop: "1px solid rgba(99,120,255,0.15)",
        background: "linear-gradient(180deg, rgba(3,5,10,0) 0%, rgba(10,14,28,0.8) 100%)",
        padding: "80px 4% 40px",
        position: "relative",
        zIndex: 10,
        marginTop: 60,
      }}
    >
      {/* Decorative top glow */}
      <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 1, background: "linear-gradient(90deg, transparent, rgba(99,120,255,0.5), transparent)", boxShadow: "0 0 20px rgba(99,120,255,0.3)" }} />

      <div style={{ maxWidth: 1350, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 40,
            marginBottom: 60,
          }}
        >
          {/* Brand */}
          <div
            className="mobile-center"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Link
              href="/"
              className="mobile-center"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                textDecoration: "none",
                marginBottom: 20,
                flexWrap: "wrap",
                whiteSpace: "nowrap",
                width: "fit-content",
              }}
            >
              <img
                src="/logo-wxc.png"
                alt="WebXCrafting"
                style={{
                  width: 46,
                  height: 46,
                  objectFit: "contain",
                  filter: "drop-shadow(0px 0px 8px rgba(99,120,255,0.4))",
                }}
              />
              <span
                style={{
                  fontFamily: "Syne",
                  fontWeight: 800,
                  fontSize: 18,
                  color: "#e8eaf6",
                }}
              >
                WebX<span className="grad-text">Crafting</span>
              </span>
            </Link>
            <p
              style={{
                color: "#8892b0",
                fontSize: 14,
                lineHeight: 1.8,
                marginBottom: 24,
                maxWidth: 260,
              }}
            >
              Building premium, high-performance websites at affordable prices. Proudly serving clients globally.
            </p>
            <div style={{ marginBottom: 24 }}>
              <GoogleReviewBadge />
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "1px solid rgba(99,120,255,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#8892b0",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    background: "rgba(10,14,28,0.5)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(79,111,255,0.8)";
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.background = "rgba(79,111,255,0.15)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 5px 15px rgba(79,111,255,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(99,120,255,0.25)";
                    e.currentTarget.style.color = "#8892b0";
                    e.currentTarget.style.background = "rgba(10,14,28,0.5)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="mobile-center">
            <h4 style={headerStyle}>Quick Links</h4>
            {quickLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={linkStyle}
                onMouseEnter={linkHover}
                onMouseLeave={linkLeave}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Services */}
          <div className="mobile-center">
            <h4 style={headerStyle}>Services</h4>
            {services.map((s) => (
              <Link
                key={s}
                href="/services"
                style={linkStyle}
                onMouseEnter={linkHover}
                onMouseLeave={linkLeave}
              >
                {s}
              </Link>
            ))}
          </div>

          {/* Top Cities */}
          <div className="mobile-center">
            <h4 style={headerStyle}>Top Cities</h4>
            {topCities.map((city) => (
              <Link
                key={city.label}
                href={city.href}
                style={linkStyle}
                onMouseEnter={linkHover}
                onMouseLeave={linkLeave}
              >
                {city.label}
              </Link>
            ))}
            <Link
              href="/locations"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "#6378ff",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 600,
                marginTop: 10,
                padding: "8px 16px",
                borderRadius: 20,
                background: "rgba(99,120,255,0.1)",
                border: "1px solid rgba(99,120,255,0.2)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(99,120,255,0.2)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(99,120,255,0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              View All 700+ Locations →
            </Link>
          </div>

          {/* Contact */}
          <div className="mobile-center">
            <h4 style={headerStyle}>Contact</h4>
            {[
              { icon: FaEnvelope, text: "webxcrafting@gmail.com", href: "mailto:webxcrafting@gmail.com" },
              { icon: FaPhone, text: "+91 9102615343\n+91 7974579107", href: "tel:+919102615343" },
              { icon: FaClock, text: "Mon–Sat, 9AM–7PM IST" },
              { icon: FaMapMarkerAlt, text: "India (Remote Worldwide)" },
            ].map(({ icon: Icon, text, href }) => {
              const Tag = href ? "a" : "div";
              return (
                <Tag
                  key={href || text}
                  href={href}
                  className="mobile-center"
                  style={{
                    display: "flex",
                    gap: 12,
                    marginBottom: 16,
                    alignItems: "flex-start",
                    textDecoration: "none",
                    cursor: href ? "pointer" : "default",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (href) e.currentTarget.style.transform = "translateX(5px)";
                  }}
                  onMouseLeave={(e) => {
                    if (href) e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <span style={{ fontSize: 14, minWidth: 20, color: "#6378ff", marginTop: 2 }}>
                    <Icon size={14} />
                  </span>
                  <span style={{ color: "#8892b0", fontSize: 14, whiteSpace: "pre-line", textAlign: "left", lineHeight: 1.5 }}>{text}</span>
                </Tag>
              );
            })}
          </div>

          {/* Legal */}
          <div className="mobile-center">
            <h4 style={headerStyle}>Legal</h4>
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={linkStyle}
                onMouseEnter={linkHover}
                onMouseLeave={linkLeave}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mobile-stack"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: 32,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#8892b0",
              fontSize: 13,
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <span>
              © {new Date().getFullYear()} WebXCrafting. Crafted with precision
              for a seamless digital experience
              <Link
                href="/admin/login"
                style={{
                  color: "#8892b0",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8892b0")}
              >
                .
              </Link>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
