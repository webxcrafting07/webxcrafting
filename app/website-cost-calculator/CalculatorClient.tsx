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
  FaPhone,
  FaNewspaper,
  FaGraduationCap,
  FaPaintBrush,
  FaPen,
  FaComments,
  FaShareAlt
} from "react-icons/fa";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { LOGO_BASE64 } from "@/lib/logo-base64";

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
    id: "portfolio",
    title: "Portfolio / Resume",
    icon: FaUser,
    basePrice: 4000,
    description: "Personal website to showcase your work, CV, and achievements."
  },
  {
    id: "blog",
    title: "Blog / News Portal",
    icon: FaNewspaper,
    basePrice: 12000,
    description: "Content-heavy site with dynamic CMS, categories, and author profiles."
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
    id: "lms",
    title: "Educational / LMS",
    icon: FaGraduationCap,
    basePrice: 25000,
    description: "Sell courses online with student dashboards, videos, and quizzes."
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
  { id: "branding", label: "Logo & Brand Identity", description: "Professional logo design, color palette, and brand guidelines.", price: 3000 },
  { id: "content", label: "Professional Copywriting", description: "High-converting, SEO-optimized content written by experts.", price: 4000 },
  { id: "payment", label: "Payment Gateway Integration", description: "Razorpay, Stripe, or custom UPI payment link setup.", price: 3000 },
  { id: "chat", label: "Live Chat / WhatsApp Bot", description: "Instant customer support integration directly on the website.", price: 1500 },
  { id: "social", label: "Social Media Integration", description: "Feed embedding and seamless social sharing functionality.", price: 2000 },
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
  const [selectedType, setSelectedType] = useState(WEBSITE_TYPES[0]); // Default to Landing Page
  const [selectedPages, setSelectedPages] = useState(PAGE_COUNTS[0]); // Default to 1 Page
  const [selectedDesign, setSelectedDesign] = useState(DESIGN_LEVELS[0]); // Default to Standard
  const [selectedAddons, setSelectedAddons] = useState<any[]>([]);
  const [selectedSupport, setSelectedSupport] = useState(SUPPORT_PLANS[0]); // Default to 1 month free

  // Lead Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hideSticky, setHideSticky] = useState(false);

  // Auto-scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  // Hide sticky bar when reaching the quote summary
  useEffect(() => {
    const handleScroll = () => {
      const summaryNode = document.getElementById('live-quote-summary-panel');
      if (summaryNode) {
        const rect = summaryNode.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
          setHideSticky(true);
        } else {
          setHideSticky(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initially
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const downloadProposalPDF = (clientName: string, clientEmail: string, clientPhone: string) => {
    try {
      const doc = new jsPDF();
      const charcoal: [number, number, number] = [17, 24, 39]; // Deep Charcoal (#111827)
      const electricBlue: [number, number, number] = [79, 111, 255]; // Accent Blue (#4f6fff)
      const softGray: [number, number, number] = [243, 244, 246];

      // ==========================================
      // PAGE 1: EXECUTIVE COVER PAGE
      // ==========================================
      
      // Midnight charcoal background
      doc.setFillColor(13, 15, 26);
      doc.rect(0, 0, 210, 297, "F");
      
      // Left electric blue accent glow bar
      doc.setFillColor(electricBlue[0], electricBlue[1], electricBlue[2]);
      doc.rect(0, 0, 10, 297, "F");

      // Brand Logo Image centered
      try {
        doc.addImage(LOGO_BASE64, "PNG", 90, 45, 30, 30);
      } catch (e) {
        console.error("Failed to add image to client PDFCover:", e);
        doc.setFillColor(79, 111, 255);
        doc.rect(90, 45, 15, 15, "F");
        doc.setFillColor(162, 89, 255);
        doc.rect(95, 50, 15, 15, "F");
      }

      // Company Brand Name
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(28);
      doc.text("WebXCrafting", 105, 90, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(162, 89, 255);
      doc.text("PREMIUM CUSTOM WEB DEVELOPMENT & SEO", 105, 98, { align: "center" });
      
      doc.setDrawColor(79, 111, 255);
      doc.setLineWidth(0.6);
      doc.line(40, 110, 170, 110);

      // Proposal Subtitle
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("DIGITAL ARCHITECTURE PROPOSAL", 105, 125, { align: "center" });

      doc.setFont("helvetica", "italic");
      doc.setFontSize(11);
      doc.setTextColor(156, 163, 175);
      doc.text("Personalized Project Estimate & Technical Roadmap", 105, 133, { align: "center" });

      // Prepared Client Card
      const cardY = 160;
      doc.setFillColor(22, 28, 45); // Dark blue card background
      doc.rect(30, cardY, 150, 65, "F");
      
      doc.setDrawColor(79, 111, 255);
      doc.setLineWidth(0.3);
      doc.rect(30, cardY, 150, 65, "D");

      doc.setTextColor(162, 89, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text("PREPARED EXCLUSIVELY FOR:", 40, cardY + 12);

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);
      doc.text(clientName, 40, cardY + 22);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(156, 163, 175);
      doc.text(`Email: ${clientEmail}`, 40, cardY + 32);
      doc.text(`WhatsApp: ${clientPhone}`, 40, cardY + 38);

      doc.setTextColor(162, 89, 255);
      doc.setFont("helvetica", "bold");
      doc.text("DOCUMENT CONTROL:", 40, cardY + 48);
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(`Ref: #WXC-${Math.floor(100000 + Math.random() * 900000)}   |   Date: ${new Date().toLocaleDateString("en-IN")}`, 40, cardY + 56);

      // Footer cover
      doc.setTextColor(107, 114, 128);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text(`© ${new Date().getFullYear()} WebXCrafting. All rights reserved. Confidential document.`, 105, 275, { align: "center" });

      // ==========================================
      // PAGE 2: SPECS AND FINANCIAL DETAILS
      // ==========================================
      doc.addPage();

      // Left accent bar
      doc.setFillColor(electricBlue[0], electricBlue[1], electricBlue[2]);
      doc.rect(0, 0, 8, 297, "F");

      // Mini Header Banner
      doc.setFillColor(17, 24, 39);
      doc.rect(8, 0, 202, 35, "F");

      try {
        doc.addImage(LOGO_BASE64, "PNG", 20, 7, 20, 20);
      } catch (e) {}

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("WebXCrafting", 48, 17);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(162, 89, 255);
      doc.text("PREMIUM CUSTOM WEB DEVELOPMENT & SEO", 48, 23);

      // Quote info right aligned mini header
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("PROJECT ESTIMATE", 145, 15);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(156, 163, 175);
      doc.text("Interactive Proposal Breakdown", 145, 21);

      // Header line
      doc.setDrawColor(electricBlue[0], electricBlue[1], electricBlue[2]);
      doc.setLineWidth(0.4);
      doc.line(20, 35, 195, 35);

      // Section Title
      doc.setTextColor(17, 24, 39);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("01. SERVICE SPECIFICATIONS & PRICING", 20, 48);

      const items = [
        ["Website Type Tier", selectedType.title, `INR ${selectedType.basePrice.toLocaleString("en-IN")}`],
        ["Scale & Page Count", selectedPages.label, selectedPages.price === 0 ? "Included" : `INR ${selectedPages.price.toLocaleString("en-IN")}`],
        ["UI/UX Design Level", selectedDesign.label, selectedDesign.price === 0 ? "Included" : `INR ${selectedDesign.price.toLocaleString("en-IN")}`],
        ["Support & SLA Maintenance", selectedSupport.label, selectedSupport.price === 0 ? "Included" : `INR ${selectedSupport.price.toLocaleString("en-IN")}`]
      ];

      if (selectedAddons.length > 0) {
        selectedAddons.forEach(addon => {
          items.push([`Addon Feature: ${addon.label}`, "Advanced Integration", `INR ${addon.price.toLocaleString("en-IN")}`]);
        });
      }

      // Render Table
      autoTable(doc, {
        startY: 53,
        margin: { left: 20, right: 15 },
        head: [["TECHNICAL SPECIFICATION CATEGORY", "SELECTED SOLUTION & SCOPE", "PRICE (INR)"]],
        body: items,
        theme: "grid",
        headStyles: {
          fillColor: [17, 24, 39],
          textColor: [255, 255, 255],
          fontSize: 10,
          fontStyle: "bold",
          halign: "left",
          cellPadding: 6
        },
        columnStyles: {
          0: { cellWidth: 50, fontStyle: "bold" },
          1: { cellWidth: 90 },
          2: { halign: "right", fontStyle: "bold", cellWidth: 35 }
        },
        styles: {
          fontSize: 9,
          font: "helvetica",
          cellPadding: 5.5,
          lineColor: [229, 231, 235],
          lineWidth: 0.1,
          overflow: "linebreak"
        },
        alternateRowStyles: {
          fillColor: [250, 250, 252]
        }
      });

      const finalY = (doc as any).lastAutoTable.finalY + 8;

      // --- GRAND TOTAL ESTIMATE BOX ---
      doc.setFillColor(79, 111, 255);
      doc.rect(20, finalY, 175, 22, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("ESTIMATED BUDGET / INVESTMENT", 25, finalY + 8);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(200, 215, 255);
      doc.text("Estimated Timeline: 7 - 14 Business Days", 25, finalY + 16);
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text(`INR ${totalPrice.toLocaleString("en-IN")}*`, 190, finalY + 14, { align: "right" });

      // 100% NEGOTIABLE Pill Tag Badge
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(150, finalY + 16, 40, 4.5, 1.5, 1.5, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(79, 111, 255);
      doc.text("100% NEGOTIABLE", 170, finalY + 19.5, { align: "center" });


      // --- NEGOTIABLE WARNING BOX (PURPLE BORDER) ---
      const negotiableY = finalY + 34;
      doc.setFillColor(243, 244, 246);
      doc.rect(20, negotiableY, 175, 28, "F");

      doc.setDrawColor(162, 89, 255); // Purple left border for premium accent
      doc.setLineWidth(0.8);
      doc.line(20, negotiableY, 20, negotiableY + 28);

      doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("💡 BUDGET & TIMELINE ARE 100% NEGOTIABLE", 25, negotiableY + 8);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(75, 85, 99);
      doc.text("Please note that this pricing is a preliminary dynamic estimate. We are highly flexible\nand open to customization and negotiations to fit your specific budget targets and technical\nmilestones. Let's connect to finalize a plan that fits your exact goals!", 25, negotiableY + 15);

      // Footer Page 2
      doc.setFillColor(charcoal[0], charcoal[1], charcoal[2]);
      doc.rect(8, 284, 202, 13, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text("WebXCrafting   •   webxcrafting@gmail.com   •   +91 9102615343 | +91 7974579107   •   Page 2", 36, 292);

      // ==========================================
      // PAGE 3: TECHNICAL ROADMAP
      // ==========================================
      doc.addPage();

      // Left accent bar
      doc.setFillColor(electricBlue[0], electricBlue[1], electricBlue[2]);
      doc.rect(0, 0, 8, 297, "F");

      // Mini Header Banner
      doc.setFillColor(17, 24, 39);
      doc.rect(8, 0, 202, 35, "F");

      try {
        doc.addImage(LOGO_BASE64, "PNG", 20, 7, 20, 20);
      } catch (e) {}

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("WebXCrafting", 48, 17);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(162, 89, 255);
      doc.text("PREMIUM CUSTOM WEB DEVELOPMENT & SEO", 48, 23);

      // Quote info right aligned mini header
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("TECHNICAL ROADMAP", 140, 15);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(156, 163, 175);
      doc.text("Engineering Phases & Delivery Timeline", 140, 21);

      // Header line
      doc.setDrawColor(electricBlue[0], electricBlue[1], electricBlue[2]);
      doc.setLineWidth(0.4);
      doc.line(20, 35, 195, 35);

      // Section Title
      doc.setTextColor(17, 24, 39);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("02. ENGINEERING ROADMAP & IMPLEMENTATION PHASES", 20, 48);

      // Draw Vertical Timeline line
      doc.setDrawColor(229, 231, 235);
      doc.setLineWidth(1);
      doc.line(30, 58, 30, 185);

      // Timeline Phase 1
      doc.setFillColor(162, 89, 255); // Purple
      doc.circle(30, 68, 3, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(79, 111, 255);
      doc.text("Phase 1: Discovery, Wireframing & UX Strategy (Days 1 - 3)", 38, 70);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(75, 85, 99);
      doc.text("Conduct a kickoff meeting, draft complete UX wireframes, maps website structures,\nand review client asset integration.", 38, 76);

      // Timeline Phase 2
      doc.setFillColor(79, 111, 255); // Blue
      doc.circle(30, 103, 3, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(79, 111, 255);
      doc.text("Phase 2: High-Fidelity Branding & Responsive Design (Days 4 - 7)", 38, 105);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(75, 85, 99);
      doc.text("Build bespoke modern layouts styled explicitly around your company guidelines.\nCraft full mobile-responsive prototypes with interactive hover states.", 38, 111);

      // Timeline Phase 3
      doc.setFillColor(162, 89, 255); // Purple
      doc.circle(30, 138, 3, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(79, 111, 255);
      doc.text("Phase 3: Full-Stack Production Engineering (Days 8 - 12)", 38, 140);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(75, 85, 99);
      doc.text("Program clean Next.js server components with maximum performance optimizations.\nConfigure secured API routes, MongoDB collection mappings, and control dashboards.", 38, 146);

      // Timeline Phase 4
      doc.setFillColor(79, 111, 255); // Blue
      doc.circle(30, 173, 3, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(79, 111, 255);
      doc.text("Phase 4: Performance Audits, Local SEO Setup & Launch (Days 13 - 15)", 38, 175);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(75, 85, 99);
      doc.text("Conduct strict speed audits (<1s load times), validate Schema.org microdata,\nand register your sitemap with Google Search Console.", 38, 181);

      // --- OFFICIAL SEAL (VECTOR GRAPHICS) ---
      const sealY = 230;
      const sealX = 40;
      doc.setDrawColor(79, 111, 255);
      doc.setLineWidth(0.4);
      doc.circle(sealX, sealY, 14, "D"); // Outer circle
      doc.setDrawColor(162, 89, 255);
      doc.circle(sealX, sealY, 12, "D"); // Inner circle
      
      // Text inside seal
      doc.setTextColor(79, 111, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(5);
      doc.text("OFFICIAL", sealX, sealY - 4, { align: "center" });
      doc.setTextColor(162, 89, 255);
      doc.setFontSize(6);
      doc.text("VERIFIED", sealX, sealY + 1, { align: "center" });
      doc.setTextColor(79, 111, 255);
      doc.setFontSize(4);
      doc.text("BUDGET & QUALITY", sealX, sealY + 5, { align: "center" });
      
      // Signature lines on the right side
      const sigX = 130;
      doc.setDrawColor(209, 213, 219);
      doc.setLineWidth(0.5);
      doc.line(sigX, sealY + 8, sigX + 50, sealY + 8);
      
      doc.setTextColor(17, 24, 39);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text("Authorized Verification Signature", sigX + 25, sealY + 14, { align: "center" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(107, 114, 128);
      doc.text("WebXCrafting Operations Unit", sigX + 25, sealY + 19, { align: "center" });

      // Footer Page 3
      doc.setFillColor(charcoal[0], charcoal[1], charcoal[2]);
      doc.rect(8, 284, 202, 13, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text("WebXCrafting   •   webxcrafting@gmail.com   •   +91 9102615343 | +91 7974579107   •   Page 3", 36, 292);

      doc.save(`WebXCrafting_Proposal_${clientName.replace(/\s+/g, "_")}.pdf`);
      toast.success("PDF Proposal downloaded successfully!");
    } catch (err) {
      console.error("PDF generation failed:", err);
      toast.error("Could not auto-download PDF. Please try again.");
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
        downloadProposalPDF(name, email, phone);
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
                              <div style={{ fontFamily: 'system-ui, sans-serif', fontStyle: 'normal', fontWeight: 700, fontSize: 16, color: isSelected ? "#e8eaf6" : "#b0b8d8" }}>{type.title}</div>
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
                            <div style={{ fontFamily: 'system-ui, sans-serif', fontStyle: 'normal', fontWeight: 700, fontSize: 16, color: isSelected ? "#e8eaf6" : "#b0b8d8" }}>{pages.label}</div>
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
                            <div style={{ fontFamily: 'system-ui, sans-serif', fontStyle: 'normal', fontWeight: 700, fontSize: 16, color: isSelected ? "#e8eaf6" : "#b0b8d8" }}>{design.label}</div>
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
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 16 }}>
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
                              <div style={{ fontFamily: 'system-ui, sans-serif', fontStyle: 'normal', fontWeight: 700, fontSize: 15, color: isSelected ? "#e8eaf6" : "#b0b8d8", marginRight: 8 }}>{addon.label}</div>
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
                            <div style={{ fontFamily: 'system-ui, sans-serif', fontStyle: 'normal', fontWeight: 700, fontSize: 16, color: isSelected ? "#e8eaf6" : "#b0b8d8" }}>{plan.label}</div>
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
                        <button
                          onClick={() => downloadProposalPDF(name, email, phone)}
                          className="btn-primary"
                          style={{ padding: "12px 28px", display: "flex", alignItems: "center", gap: 8 }}
                        >
                          <FaFilePdf /> Download PDF Proposal
                        </button>
                        <Link href="/" className="btn-outline" style={{ padding: "12px 28px", textDecoration: "none", color: "#b0b8d8" }}>
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
            id="live-quote-summary-panel"
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
                <motion.div key={totalPrice} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} style={{ fontSize: 28, fontWeight: 800, background: "linear-gradient(135deg, #4f6fff, #a259ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  ₹{totalPrice.toLocaleString("en-IN")}
                </motion.div>
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

      {/* Mobile Sticky Bottom Bar */}
      <div className={`mobile-only-sticky-bar ${!hideSticky ? 'visible' : ''}`} style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999999,
        background: 'rgba(10,14,28,0.95)', backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(79,111,255,0.3)', padding: '16px 80px 16px 20px',
        display: 'none', justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 -10px 30px rgba(0,0,0,0.5)'
      }}>
        <div>
          <div style={{ fontSize: 10, color: '#7b82a8', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>Estimate</div>
          <motion.div key={totalPrice} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>
            ₹{totalPrice.toLocaleString("en-IN")}
          </motion.div>
        </div>
        <button onClick={step < 6 ? nextStep : () => { window.scrollTo({top:0, behavior:'smooth'}) }} className="btn-primary" style={{ padding: '10px 16px', fontSize: 13, whiteSpace: 'nowrap' }}>
          {step < 6 ? 'Next Step' : 'Get Quote'}
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          .mobile-only-sticky-bar.visible { display: flex !important; }
        }
      `}} />

    </>
  );
}
