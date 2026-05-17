"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DotBackground from "@/components/DotBackground";
import WhatsAppButton from "@/components/WhatsAppButton";
import { 
  FaLaptopCode, 
  FaStore, 
  FaUserTie, 
  FaDatabase, 
  FaBriefcase,
  FaCheck,
  FaArrowRight,
  FaArrowLeft,
  FaCalculator,
  FaEnvelope,
  FaUser,
  FaFilePdf,
  FaPhone
} from "react-icons/fa";

// Step 1: Website Type Options
const WEBSITE_TYPES = [
  {
    id: "landing",
    title: "Landing Page / Single Page",
    icon: FaLaptopCode,
    basePrice: 5000,
    description: "Ideal for startups, product launches, or basic lead generation."
  },
  {
    id: "business",
    title: "Business Website",
    icon: FaBriefcase,
    basePrice: 8000,
    description: "Professional multi-page website with dynamic page content."
  },
  {
    id: "ecommerce",
    title: "E-commerce Store",
    icon: FaStore,
    basePrice: 20000,
    description: "Full online store with Razorpay/Stripe, inventory, and order tracking."
  },
  {
    id: "portal",
    title: "Job Portal / Directory",
    icon: FaUserTie,
    basePrice: 35000,
    description: "Complex portal with candidate/employer logins and advanced search."
  },
  {
    id: "custom",
    title: "Custom SaaS / Web App",
    icon: FaDatabase,
    basePrice: 45000,
    description: "Tailored SaaS platforms, dashboards, and custom business logic."
  }
];

// Step 2: Page Count Options
const PAGE_COUNTS = [
  { id: "1", label: "1 Page", price: 0 },
  { id: "5", label: "Up to 5 Pages", price: 2000 },
  { id: "10", label: "5 to 10 Pages", price: 4000 },
  { id: "20", label: "10 to 20 Pages", price: 8000 },
  { id: "50", label: "20+ Pages (Custom count)", price: 15000 }
];

// Step 3: Design Complexity Options
const DESIGN_LEVELS = [
  {
    id: "standard",
    label: "Standard Clean Layout",
    description: "Clean, responsive design using established premium components.",
    price: 0
  },
  {
    id: "premium",
    label: "Custom Premium UI/UX",
    description: "Tailored unique design crafted strictly to your brand aesthetic.",
    price: 5000
  },
  {
    id: "luxury",
    label: "Luxury Motion & Animations",
    description: "High-end visual experience with rich 3D-like parallax, hover effects, and micro-interactions.",
    price: 10000
  }
];

// Step 4: Addon Features (Multi-Select)
const ADDON_FEATURES = [
  { id: "seo", label: "Advanced SEO Optimization", description: "Meta setup, Schema markup, search sitemap registration.", price: 1500 },
  { id: "payment", label: "Payment Gateway Integration", description: "Razorpay, Stripe, or custom UPI payment link setup.", price: 3000 },
  { id: "admin", label: "Admin Control Dashboard", description: "Protected panel to manage leads, blogs, and portfolio.", price: 4000 },
  { id: "auth", label: "User Login & Accounts", description: "Secure customer/client authentication portals.", price: 5000 },
  { id: "cms", label: "Blog / CMS Integration", description: "Allows you to write, edit, and schedule blog articles.", price: 2000 },
  { id: "multilang", label: "Multi-lingual Support", description: "Translate website content dynamically for different regions.", price: 2500 }
];

// Step 5: Support & Maintenance
const SUPPORT_PLANS = [
  { id: "1month", label: "1 Month Free Support", description: "Includes post-launch critical bug fixes.", price: 0 },
  { id: "6months", label: "6 Months Priority Support", description: "Monthly backups, minor adjustments, and performance updates.", price: 8000 },
  { id: "12months", label: "1 Year Full Enterprise Management", description: "Complete peace of mind. Regular maintenance, emergency hotfixes, and unlimited minor modifications.", price: 15000 }
];

export default function CalculatorClient() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(WEBSITE_TYPES[1]); // Default to Business
  const [selectedPages, setSelectedPages] = useState(PAGE_COUNTS[1]); // Default to Up to 5
  const [selectedDesign, setSelectedDesign] = useState(DESIGN_LEVELS[0]); // Default to Standard
  const [selectedAddons, setSelectedAddons] = useState<any[]>([]);
  const [selectedSupport, setSelectedSupport] = useState(SUPPORT_PLANS[0]); // Default to 1 month free

  // Lead Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Auto-scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  // Calculate dynamic pricing
  const basePrice = selectedType.basePrice;
  const pagesPrice = selectedPages.price;
  const designPrice = selectedDesign.price;
  const addonsPrice = selectedAddons.reduce((sum, item) => sum + item.price, 0);
  const supportPrice = selectedSupport.price;
  const totalPrice = basePrice + pagesPrice + designPrice + addonsPrice + supportPrice;

  const toggleAddon = (addon: any) => {
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleLeadSubmit = async () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast.error("Please fill in all contact details.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    // Prepare detailed message of chosen specifications
    const specifications = [
      `- Website Type: ${selectedType.title} (Base: ₹${selectedType.basePrice})`,
      `- Page Count: ${selectedPages.label} (+₹${selectedPages.price})`,
      `- Design Level: ${selectedDesign.label} (+₹${selectedDesign.price})`,
      `- Addon Features: ${selectedAddons.length > 0 ? selectedAddons.map(a => `${a.label} (+₹${a.price})`).join(', ') : 'None'}`,
      `- Support Plan: ${selectedSupport.label} (+₹${selectedSupport.price})`,
      `\nTotal Estimated Price: ₹${totalPrice.toLocaleString("en-IN")}`
    ].join("\n");

    const leadData = {
      name,
      email,
      budget: `₹${totalPrice.toLocaleString("en-IN")} (Calculated)`,
      message: `Client generated instant budget quote via Website Cost Calculator. Details:\n\n${specifications}\n\nClient Phone: ${phone}`
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        toast.success("Proposal request submitted successfully!");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        toast.error(data.message || "Failed to submit request.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper for step navigation
  const nextStep = () => setStep((s) => Math.min(s + 1, 6));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <>
      <DotBackground />
      <Navbar />

      <div
        className="mobile-p-6"
        style={{
          position: "relative",
          zIndex: 10,
          padding: "130px 24px 80px",
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Header section */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="section-label" style={{ margin: "0 auto 20px" }}>
            Cost Estimator
          </div>
          <h1
            style={{
              fontFamily: "Syne",
              fontSize: "clamp(30px,4.5vw,56px)",
              fontWeight: 800,
              fontStyle: "italic",
              marginBottom: 16,
            }}
          >
            Calculate Your <span className="grad-text">Website Cost</span>
          </h1>
          <p style={{ color: "#7b82a8", fontSize: 16, maxWidth: 540, margin: "0 auto" }}>
            Get an instant, transparent estimate for your development project in less than 2 minutes. No hidden fees.
          </p>
        </div>

        {/* Multi-step progress bar */}
        <div style={{ maxWidth: 800, margin: "0 auto 48px", padding: "0 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 13, color: "#7b82a8", fontWeight: 600 }}>
            <span>Step {step} of 6</span>
            <span>
              {step === 1 && "Website Structure"}
              {step === 2 && "Page Capacity"}
              {step === 3 && "UI/UX & Graphics"}
              {step === 4 && "Features & Integrations"}
              {step === 5 && "Support & Support Plans"}
              {step === 6 && "Summary & Free Proposal"}
            </span>
          </div>
          <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
            <motion.div
              layout
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #4f6fff, #a259ff)",
                width: `${(step / 6) * 100}%`
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Main Grid: Options on Left, Live Calculator Summary on Right */}
        <div
          className="mobile-grid-1"
          style={{
            display: "grid",
            gridTemplateColumns: "1.7fr 1fr",
            gap: 40,
            alignItems: "start",
          }}
        >
          {/* Left panel: Interactive Step Panels */}
          <div className="glass" style={{ padding: "clamp(20px, 4vw, 40px)", borderRadius: 24, border: "1px solid rgba(99,120,255,0.15)" }}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 style={{ fontFamily: "Syne", fontSize: 22, fontStyle: "italic", fontWeight: 700, marginBottom: 24 }}>
                    Choose Your Website Structure
                  </h3>
                  <div style={{ display: "grid", gap: 16 }}>
                    {WEBSITE_TYPES.map((type) => {
                      const Icon = type.icon;
                      const isSelected = selectedType.id === type.id;
                      return (
                        <div
                          key={type.id}
                          onClick={() => setSelectedType(type)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 20,
                            padding: "20px 24px",
                            borderRadius: 16,
                            cursor: "pointer",
                            transition: "all 0.25s",
                            background: isSelected ? "rgba(79,111,255,0.08)" : "rgba(255,255,255,0.02)",
                            border: isSelected ? "1px solid rgba(79,111,255,0.5)" : "1px solid rgba(255,255,255,0.05)",
                            boxShadow: isSelected ? "0 8px 24px rgba(79,111,255,0.15)" : "none"
                          }}
                        >
                          <div style={{
                            width: 50,
                            height: 50,
                            borderRadius: 12,
                            background: isSelected ? "rgba(79,111,255,0.15)" : "rgba(255,255,255,0.04)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: isSelected ? "#4f6fff" : "#7b82a8",
                            fontSize: 22
                          }}>
                            <Icon />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                              <h4 style={{ fontWeight: 700, fontSize: 16, color: isSelected ? "#e8eaf6" : "#b0b8d8" }}>{type.title}</h4>
                              <span style={{ fontWeight: 700, fontSize: 15, color: isSelected ? "#4f6fff" : "#7b82a8" }}>
                                Base: ₹{type.basePrice.toLocaleString("en-IN")}
                              </span>
                            </div>
                            <p style={{ color: "#7b82a8", fontSize: 13, lineHeight: 1.4 }}>{type.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 style={{ fontFamily: "Syne", fontSize: 22, fontStyle: "italic", fontWeight: 700, marginBottom: 24 }}>
                    Select Your Page Capacity
                  </h3>
                  <div style={{ display: "grid", gap: 14 }}>
                    {PAGE_COUNTS.map((pages) => {
                      const isSelected = selectedPages.id === pages.id;
                      return (
                        <div
                          key={pages.id}
                          onClick={() => setSelectedPages(pages)}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "20px 24px",
                            borderRadius: 16,
                            cursor: "pointer",
                            transition: "all 0.2s",
                            background: isSelected ? "rgba(79,111,255,0.08)" : "rgba(255,255,255,0.02)",
                            border: isSelected ? "1px solid rgba(79,111,255,0.5)" : "1px solid rgba(255,255,255,0.05)"
                          }}
                        >
                          <div>
                            <h4 style={{ fontWeight: 700, fontSize: 16, color: isSelected ? "#e8eaf6" : "#b0b8d8" }}>{pages.label}</h4>
                            <p style={{ color: "#7b82a8", fontSize: 12, marginTop: 3 }}>
                              {pages.id === "1" && "Single-page layouts."}
                              {pages.id === "5" && "Standard business overview structure."}
                              {pages.id === "10" && "Ideal for detailed services showcases."}
                              {pages.id === "20" && "Perfect for extensive portfolios and listings."}
                              {pages.id === "50" && "Heavy content, dynamic database directories."}
                            </p>
                          </div>
                          <span style={{ fontWeight: 700, fontSize: 15, color: isSelected ? "#4f6fff" : "#7b82a8" }}>
                            {pages.price === 0 ? "Included" : `+₹${pages.price.toLocaleString("en-IN")}`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 style={{ fontFamily: "Syne", fontSize: 22, fontStyle: "italic", fontWeight: 700, marginBottom: 24 }}>
                    Choose Design & Animation Complexity
                  </h3>
                  <div style={{ display: "grid", gap: 16 }}>
                    {DESIGN_LEVELS.map((design) => {
                      const isSelected = selectedDesign.id === design.id;
                      return (
                        <div
                          key={design.id}
                          onClick={() => setSelectedDesign(design)}
                          style={{
                            padding: "22px 24px",
                            borderRadius: 16,
                            cursor: "pointer",
                            transition: "all 0.2s",
                            background: isSelected ? "rgba(79,111,255,0.08)" : "rgba(255,255,255,0.02)",
                            border: isSelected ? "1px solid rgba(79,111,255,0.5)" : "1px solid rgba(255,255,255,0.05)"
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                            <h4 style={{ fontWeight: 700, fontSize: 16, color: isSelected ? "#e8eaf6" : "#b0b8d8" }}>{design.label}</h4>
                            <span style={{ fontWeight: 700, fontSize: 15, color: isSelected ? "#4f6fff" : "#7b82a8" }}>
                              {design.price === 0 ? "Included" : `+₹${design.price.toLocaleString("en-IN")}`}
                            </span>
                          </div>
                          <p style={{ color: "#7b82a8", fontSize: 13, lineHeight: 1.4 }}>{design.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 style={{ fontFamily: "Syne", fontSize: 22, fontStyle: "italic", fontWeight: 700, marginBottom: 24 }}>
                    Integrate Extra Features & Addons
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
                    {ADDON_FEATURES.map((addon) => {
                      const isSelected = selectedAddons.some((a) => a.id === addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon)}
                          style={{
                            padding: "20px",
                            borderRadius: 16,
                            cursor: "pointer",
                            transition: "all 0.2s",
                            background: isSelected ? "rgba(79,111,255,0.08)" : "rgba(255,255,255,0.02)",
                            border: isSelected ? "1px solid rgba(79,111,255,0.4)" : "1px solid rgba(255,255,255,0.05)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            height: "100%",
                            boxSizing: "border-box"
                          }}
                        >
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                              <h4 style={{ fontWeight: 700, fontSize: 15, color: isSelected ? "#e8eaf6" : "#b0b8d8", marginRight: 8 }}>{addon.label}</h4>
                              <div style={{
                                width: 18,
                                height: 18,
                                borderRadius: 4,
                                border: isSelected ? "none" : "1px solid rgba(255,255,255,0.3)",
                                background: isSelected ? "#4f6fff" : "transparent",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 10,
                                color: "#fff",
                                flexShrink: 0
                              }}>
                                {isSelected && <FaCheck />}
                              </div>
                            </div>
                            <p style={{ color: "#7b82a8", fontSize: 12, lineHeight: 1.4, marginBottom: 16 }}>{addon.description}</p>
                          </div>
                          <span style={{ fontWeight: 700, fontSize: 14, color: isSelected ? "#4f6fff" : "#7b82a8" }}>
                            +₹{addon.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 style={{ fontFamily: "Syne", fontSize: 22, fontStyle: "italic", fontWeight: 700, marginBottom: 24 }}>
                    Select Support & Maintenance Period
                  </h3>
                  <div style={{ display: "grid", gap: 16 }}>
                    {SUPPORT_PLANS.map((plan) => {
                      const isSelected = selectedSupport.id === plan.id;
                      return (
                        <div
                          key={plan.id}
                          onClick={() => setSelectedSupport(plan)}
                          style={{
                            padding: "22px 24px",
                            borderRadius: 16,
                            cursor: "pointer",
                            transition: "all 0.2s",
                            background: isSelected ? "rgba(79,111,255,0.08)" : "rgba(255,255,255,0.02)",
                            border: isSelected ? "1px solid rgba(79,111,255,0.5)" : "1px solid rgba(255,255,255,0.05)"
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                            <h4 style={{ fontWeight: 700, fontSize: 16, color: isSelected ? "#e8eaf6" : "#b0b8d8" }}>{plan.label}</h4>
                            <span style={{ fontWeight: 700, fontSize: 15, color: isSelected ? "#4f6fff" : "#7b82a8" }}>
                              {plan.price === 0 ? "Included" : `+₹${plan.price.toLocaleString("en-IN")}`}
                            </span>
                          </div>
                          <p style={{ color: "#7b82a8", fontSize: 13, lineHeight: 1.4 }}>{plan.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 6 && (
                <motion.div
                  key="step6"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {submitted ? (
                    <div style={{ textAlign: "center", padding: "20px 0" }}>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          background: "rgba(0, 230, 118, 0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 24px",
                          color: "#00e676",
                          border: "2px solid rgba(0, 230, 118, 0.3)"
                        }}
                      >
                        <FaCheck size={36} />
                      </motion.div>
                      <h3 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 26, marginBottom: 16, fontStyle: "italic" }}>
                        Proposal Request <span className="grad-text">Received!</span>
                      </h3>
                      <p style={{ color: "#7b82a8", fontSize: 15, lineHeight: 1.65, maxWidth: 500, margin: "0 auto 32px" }}>
                        Thank you, <strong>{name}</strong>! We have saved your website structure estimate of <strong>₹{totalPrice.toLocaleString("en-IN")}</strong>. Our technical head will review your requirements and share a custom PDF proposal and details via <strong>{email}</strong> and WhatsApp within 24 hours.
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                        <Link href="/" className="btn-primary" style={{ padding: "12px 28px", textDecoration: "none" }}>
                          Return Home
                        </Link>
                        <button
                          onClick={() => {
                            setSubmitted(false);
                            setName("");
                            setEmail("");
                            setPhone("");
                            setStep(1);
                          }}
                          className="btn-outline"
                          style={{ padding: "12px 28px" }}
                        >
                          Calculate Another Site
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <div style={{ color: "#4f6fff", background: "rgba(79,111,255,0.1)", padding: 8, borderRadius: 10 }}>
                          <FaFilePdf size={18} />
                        </div>
                        <h3 style={{ fontFamily: "Syne", fontSize: 22, fontStyle: "italic", fontWeight: 700, margin: 0 }}>
                          Get a Formal PDF Proposal
                        </h3>
                      </div>
                      <p style={{ color: "#7b82a8", fontSize: 14, lineHeight: 1.6, marginBottom: 28 }}>
                        We have compiled your estimate. Provide your contact details below to receive a formal comprehensive PDF budget breakdown, development timeline, and tech specs directly via WhatsApp/Email.
                      </p>

                      <div style={{ display: "grid", gap: 20, marginBottom: 32 }}>
                        <div>
                          <label style={{ display: "block", fontSize: 13, color: "#7b82a8", marginBottom: 7, fontWeight: 500 }}>
                            Your Name *
                          </label>
                          <div style={{ position: "relative" }}>
                            <FaUser style={{ position: "absolute", left: 16, top: 16, color: "rgba(255,255,255,0.25)" }} />
                            <input
                              className="form-input"
                              placeholder="e.g. Rahul Sharma"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              style={{ paddingLeft: 44 }}
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: 13, color: "#7b82a8", marginBottom: 7, fontWeight: 500 }}>
                            Email Address *
                          </label>
                          <div style={{ position: "relative" }}>
                            <FaEnvelope style={{ position: "absolute", left: 16, top: 16, color: "rgba(255,255,255,0.25)" }} />
                            <input
                              className="form-input"
                              type="email"
                              placeholder="e.g. rahul@company.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              style={{ paddingLeft: 44 }}
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: 13, color: "#7b82a8", marginBottom: 7, fontWeight: 500 }}>
                            WhatsApp / Mobile Number *
                          </label>
                          <div style={{ position: "relative" }}>
                            <FaPhone style={{ transform: "rotate(90deg)", position: "absolute", left: 16, top: 16, color: "rgba(255,255,255,0.25)" }} />
                            <input
                              className="form-input"
                              type="tel"
                              placeholder="e.g. +91 98765 43210"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              style={{ paddingLeft: 44 }}
                            />
                          </div>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.01, y: -2 }}
                        whileTap={{ scale: 0.99 }}
                        className="btn-primary"
                        style={{ width: "100%", padding: "16px", fontSize: 16, display: "flex", justifyContent: "center", alignItems: "center" }}
                        onClick={handleLeadSubmit}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <div className="spinner" style={{ marginRight: 8 }} />
                            Sending proposal request...
                          </>
                        ) : (
                          <>Request PDF Proposal &rarr;</>
                        )}
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stepper Buttons (Only visible when not submitted) */}
            {(!submitted || step !== 6) && (
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <button
                  onClick={prevStep}
                  disabled={step === 1}
                  className="btn-outline"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 20px",
                    opacity: step === 1 ? 0.3 : 1,
                    cursor: step === 1 ? "default" : "pointer"
                  }}
                >
                  <FaArrowLeft size={11} /> Back
                </button>
                {step < 6 ? (
                  <button
                    onClick={nextStep}
                    className="btn-primary"
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 24px" }}
                  >
                    Continue <FaArrowRight size={11} />
                  </button>
                ) : null}
              </div>
            )}
          </div>

          {/* Right panel: Sticky Live Estimates Box */}
          <div
            style={{
              position: "sticky",
              top: 100,
              display: "grid",
              gap: 20
            }}
          >
            <div
              className="glass-strong"
              style={{
                padding: 30,
                borderRadius: 22,
                border: "1px solid rgba(79,111,255,0.3)",
                background: "linear-gradient(135deg, rgba(10,14,28,0.85), rgba(3,5,10,0.95))",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#4f6fff", marginBottom: 20 }}>
                <FaCalculator size={18} />
                <h4 style={{ fontFamily: "Syne", fontSize: 16, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, margin: 0 }}>
                  Live Quote Summary
                </h4>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 10 }}>
                  <span style={{ fontSize: 13, color: "#7b82a8" }}>Type:</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#e8eaf6", textAlign: "right" }}>{selectedType.title}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 10 }}>
                  <span style={{ fontSize: 13, color: "#7b82a8" }}>Page capacity:</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#e8eaf6" }}>{selectedPages.label}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 10 }}>
                  <span style={{ fontSize: 13, color: "#7b82a8" }}>Design level:</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#e8eaf6", textAlign: "right" }}>{selectedDesign.label}</span>
                </div>

                <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, color: "#7b82a8" }}>Features added:</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#4f6fff" }}>{selectedAddons.length} selected</span>
                  </div>
                  {selectedAddons.length > 0 ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                      {selectedAddons.map((addon) => (
                        <span
                          key={addon.id}
                          style={{
                            padding: "3px 8px",
                            background: "rgba(79,111,255,0.1)",
                            borderRadius: 6,
                            fontSize: 11,
                            color: "#b0b8d8",
                            border: "1px solid rgba(99,120,255,0.15)"
                          }}
                        >
                          {addon.label}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span style={{ fontSize: 12, color: "#545975", fontStyle: "italic" }}>No extra features added yet.</span>
                  )}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 10 }}>
                  <span style={{ fontSize: 13, color: "#7b82a8" }}>Support plan:</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#e8eaf6", textAlign: "right" }}>{selectedSupport.label}</span>
                </div>
              </div>

              {/* Dynamic Price Display */}
              <div style={{ background: "rgba(79,111,255,0.05)", border: "1px solid rgba(79,111,255,0.15)", borderRadius: 14, padding: "18px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 12, color: "#7b82a8", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600, marginBottom: 4 }}>
                  Estimated Price
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, background: "linear-gradient(135deg, #4f6fff, #a259ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  ₹{totalPrice.toLocaleString("en-IN")}
                </div>
                <div style={{ fontSize: 11, color: "#545975", marginTop: 4 }}>
                  *Excludes third-party API / domain / hosting costs.
                </div>
              </div>
            </div>

            {/* Quick Contact Help Box */}
            <div
              className="glass"
              style={{
                padding: "20px 24px",
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                gap: 16
              }}
            >
              <div style={{ fontSize: 24, color: "#25d366" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a13.12 13.12 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#e8eaf6" }}>Need instant human help?</div>
                <a
                  href={`https://wa.me/919102615343?text=Hello%20I%20am%20looking%20for%20a%20website%20quote%20estimate`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 12, color: "#4f6fff", fontWeight: 600, textDecoration: "none" }}
                >
                  Chat with our Technical Lead
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
