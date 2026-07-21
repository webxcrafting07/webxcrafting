"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [offerOffset, setOfferOffset] = useState(0);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 30);
      const offerBar = document.getElementById("wxc-offer-bar");
      if (offerBar) {
        const barHeight = offerBar.offsetHeight;
        const newOffset = Math.max(0, barHeight - window.scrollY);
        setOfferOffset(newOffset);
      } else {
        setOfferOffset(0);
      }
    };
    
    // Initial check
    handler();
    
    window.addEventListener("scroll", handler);
    window.addEventListener("resize", handler);
    
    // Observe DOM mutations in case the OfferBar mounts asynchronously
    const observer = new MutationObserver(handler);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
      observer.disconnect();
    };
  }, []);

  // Close menu on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: offerOffset,
          left: 0,
          right: 0,
          zIndex: 500,
          padding: "14px 32px",
          background: scrolled ? "rgba(3,5,10,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(99,120,255,0.12)" : "none",
          transition: "all 0.35s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          <img
            src="/logo-wxc.png"
            alt="WebXCrafting"
            style={{
              width: 46,
              height: 46,
              objectFit: "contain",
            }}
          />
          <span
            className="nav-logo-text"
            style={{
              fontFamily: "Syne",
              fontWeight: 800,
              fontSize: 20,
              color: "#e8eaf6",
            }}
          >
            WebX<span className="grad-text">Crafting</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div
          className="hide-mobile"
          style={{ display: "flex", alignItems: "center", gap: 4 }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                fontFamily: "Inter",
                fontWeight: 500,
                fontSize: 15,
                textDecoration: "none",
                color: pathname === l.href ? "#e8eaf6" : "#7b82a8",
                background:
                  pathname === l.href ? "rgba(79,111,255,0.1)" : "transparent",
                transition: "all 0.2s",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div
          className="hide-mobile"
          style={{ display: "flex", gap: 12, alignItems: "center" }}
        >
          <Link
            href="/website-cost-calculator"
            className="btn-outline"
            style={{ padding: "9px 18px", fontSize: 14, textDecoration: "none" }}
          >
            Cost Calculator
          </Link>
          <Link
            href="/contact"
            className="btn-primary"
            style={{ padding: "9px 22px", fontSize: 14 }}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="show-mobile"
          style={{
            background: "none",
            border: "none",
            color: "#e8eaf6",
            cursor: "pointer",
            padding: 4,
          }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              inset: 0,
              top: 0,
              background: "rgba(3,5,10,0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              zIndex: 499,
              padding: `${offerOffset + 80}px 24px 28px`,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {navLinks.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={l.href}
                  style={{
                    display: "block",
                    padding: "14px 0",
                    fontFamily: "Syne",
                    fontWeight: 600,
                    fontSize: 22,
                    textDecoration: "none",
                    color: pathname === l.href ? "#4f6fff" : "#e8eaf6",
                    borderBottom: "1px solid rgba(99,120,255,0.08)",
                  }}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navLinks.length * 0.06 }}
            >
              <Link
                href="/website-cost-calculator"
                style={{
                  display: "block",
                  padding: "14px 0",
                  fontFamily: "Syne",
                  fontWeight: 600,
                  fontSize: 22,
                  textDecoration: "none",
                  color: pathname === "/website-cost-calculator" ? "#4f6fff" : "#e8eaf6",
                  borderBottom: "1px solid rgba(99,120,255,0.08)",
                }}
              >
                Cost Calculator
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              style={{ marginTop: 20 }}
            >
              <Link
                href="/contact"
                className="btn-primary"
                style={{ width: "100%", display: "flex" }}
              >
                Get Started →
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
