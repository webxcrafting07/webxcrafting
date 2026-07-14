"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DotBackground from "@/components/DotBackground";
import WhatsAppButton from "@/components/WhatsAppButton";
import { 
  FaGlobe, 
  FaShoppingCart, 
  FaCog, 
  FaBriefcase, 
  FaStar, 
  FaTimes, 
  FaArrowRight,
  FaCheckCircle,
  FaCode,
  FaRocket,
  FaTrophy
} from "react-icons/fa";

const categories = ["All", "Business", "E-commerce", "Job Portal", "Custom"];
const catColors: Record<string, string> = {
  Business: "#4f6fff",
  "E-commerce": "#a259ff",
  Custom: "#00e5ff",
  "Job Portal": "#00e676",
};
const catIcons: Record<string, any> = {
  Business: FaGlobe,
  "E-commerce": FaShoppingCart,
  Custom: FaCog,
  "Job Portal": FaBriefcase,
};

const defaultProjects = [
  {
    _id: "1",
    title: "TechStart Landing",
    subtitle: "Next-Gen SaaS & Business Lead Generation",
    description: "A high-conversion landing page with glassmorphism layout, automated lead capture forms, local database logging, and ultra-fast sub-second LCP loading speed.",
    category: "Business",
    status: "completed",
    liveLink: "https://www.webxcrafting.in",
    techStack: ["Next.js", "React", "Framer Motion", "Tailwind CSS", "Mongoose"],
    impact: "+140% Lead Conversion Boost",
    features: ["Interactive product showcases", "Fully responsive contact channels", "Automated email auto-responders", "Google Core Web Vitals optimization"]
  },
  {
    _id: "2",
    title: "FashionHub Store",
    subtitle: "Luxury Fashion E-Commerce Platform",
    description: "An elegant online fashion catalog processing 10,000+ orders, equipped with dynamic cart systems, Razorpay payment gateway integration, and stock inventory notifications.",
    category: "E-commerce",
    status: "completed",
    liveLink: "https://www.webxcrafting.in/services",
    techStack: ["React.js", "Node.js", "Express", "MongoDB", "Razorpay API"],
    impact: "Processed 10,000+ Local Orders",
    features: ["Multi-step optimized cart flow", "Dynamic product variation selector", "Automated customer invoice builder", "Admin product control dashboards"]
  },
  {
    _id: "3",
    title: "JobsIndia Portal",
    subtitle: "Automated Recruitment & Job Directory",
    description: "Pan-India job directory platform connecting candidate profiles with verified recruiters, equipped with automatic resume upload parsing and customized SMS alert reminders.",
    category: "Job Portal",
    status: "ongoing",
    liveLink: "",
    techStack: ["Next.js", "React", "MongoDB", "Nodemailer SMTP", "JWT Auth"],
    impact: "500+ Daily Candidate Registrations",
    features: ["Recruiter control panels", "Candidate profile resume builders", "Advanced multi-criteria search engines", "Automated job notification triggers"]
  },
  {
    _id: "4",
    title: "HealthCare Pro",
    subtitle: "Dynamic Patient Booking & Scheduling Dashboard",
    description: "Healthcare facility web platform providing seamless patient appointment scheduler systems, automated appointment emailers, doctor schedules, and digital records.",
    category: "Business",
    status: "completed",
    liveLink: "https://www.webxcrafting.in/about",
    techStack: ["Next.js", "React", "Tailwind CSS", "MongoDB", "Twilio SMS"],
    impact: "-45% Patient No-Shows Reduced",
    features: ["Live appointment scheduler grid", "Customized clinic catalog layouts", "Automated doctor vacation schedule blockers", "Patient records security configurations"]
  },
  {
    _id: "5",
    title: "CryptoTrack Dashboard",
    subtitle: "Real-time Crypto Assets & Metrics Tracker",
    description: "A secure Web3 cryptocurrency metrics platform pulling live token API feeds, equipped with interactive price graphs, transaction ledgers, and multi-wallet analytics.",
    category: "Custom",
    status: "ongoing",
    liveLink: "",
    techStack: ["React.js", "CoinGecko Web API", "Chart.js", "Framer Motion"],
    impact: "Top-Rated Lightweight Web3 Utility",
    features: ["Sub-second API price pullers", "Responsive crypto history charts", "Dynamic coin search configurations", "Multi-wallet transaction mockers"]
  },
  {
    _id: "6",
    title: "EduLearn LMS Platform",
    subtitle: "Comprehensive Digital Academy & LMS",
    description: "Enterprise e-learning platform hosting chapter-wise premium course videography, dynamic student quiz systems, Razorpay fee collection, and dynamic PDF certificates.",
    category: "Custom",
    status: "completed",
    liveLink: "https://www.webxcrafting.in/blog",
    techStack: ["React.js", "Node.js", "Express", "MongoDB", "Vimeo Player API"],
    impact: "Educating 15,000+ Active Students",
    features: ["Smart chapter course timelines", "Automated score PDF builders", "Integrated student course progress maps", "Annual membership pricing controls"]
  }
];

export default function PortfolioClient() {
  const [projects, setProjects] = useState(defaultProjects);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data.length) {
          // Merge API data with extra local spec fields for premium display
          const merged = d.data.map((proj: any, idx: number) => {
            const defaultMatch = defaultProjects.find(p => p.title === proj.title) || defaultProjects[idx % 6];
            return {
              ...defaultMatch,
              ...proj
            };
          });
          setProjects(merged);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p: any) => p.category === filter);

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
          boxSizing: "border-box"
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <div className="section-label" style={{ margin: "0 auto 20px" }}>
            Portfolio Showcase
          </div>
          <h1
            style={{
              fontFamily: "Syne",
              fontSize: "clamp(32px,5vw,64px)",
              fontWeight: 800,
              fontStyle: "italic",
              marginBottom: 16,
              letterSpacing: "-0.5px"
            }}
          >
            Our <span className="grad-text">Digital Craftsmanship</span>
          </h1>
          <p
            style={{
              color: "#7b82a8",
              fontSize: 17,
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            Enterprise solutions, stunning motion layouts, and premium code systems built with precision.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 48,
          }}
        >
          {categories.map((c) => (
            <motion.button
              key={c}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setFilter(c)}
              style={{
                padding: "8px 22px",
                borderRadius: 22,
                border: "none",
                cursor: "pointer",
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: 14,
                transition: "all 0.2s",
                background:
                  filter === c
                    ? "linear-gradient(135deg,#4f6fff,#a259ff)"
                    : "rgba(10,14,28,0.65)",
                color: filter === c ? "#fff" : "#7b82a8",
                boxShadow:
                  filter === c ? "0 8px 24px rgba(79,111,255,.35)" : "none",
                outline:
                  filter === c ? "none" : "1px solid rgba(99,120,255,.15)",
              }}
            >
              {c}
            </motion.button>
          ))}
        </div>

        {/* Dynamic Showcase Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: 80, color: "#7b82a8" }}>
            <div className="spinner" style={{ margin: "0 auto 16px" }} />
            Loading dynamic showcase...
          </div>
        ) : (
          <motion.div
            layout
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 30,
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project: any) => {
                const isOngoing = project.status !== "completed";
                return (
                  <motion.div
                    key={project._id}
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setSelectedProject(project)}
                    style={{
                      borderRadius: 22,
                      overflow: "hidden",
                      background: "rgba(10,14,28,0.65)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(99,120,255,.12)",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                      boxSizing: "border-box"
                    }}
                  >
                    <div>
                      {/* Project Cover Block */}
                      <div
                        style={{
                          aspectRatio: "16/9",
                          width: "100%",
                          background: project.image 
                            ? `url("${project.image}") center/cover no-repeat` 
                            : `linear-gradient(135deg,${catColors[project.category] || "#4f6fff"}22,${catColors[project.category] || "#a259ff"}44)`,
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                          color: catColors[project.category] || "#4f6fff",
                        }}
                      >
                        {!project.image && (() => {
                          const Icon = catIcons[project.category] || FaGlobe;
                          return <Icon size={52} />;
                        })()}
                        {/* Hover Overlay */}
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(180deg, transparent 40%, rgba(3,5,10,0.95))",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: 16,
                            left: 20,
                            right: 20,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                          }}
                        >
                          <span
                            className="tag"
                            style={{
                              fontSize: 11,
                              padding: "3px 10px",
                              background: `${catColors[project.category] || "#4f6fff"}18`,
                              color: catColors[project.category] || "#4f6fff",
                              borderColor: `${catColors[project.category] || "#4f6fff"}35`,
                            }}
                          >
                            {project.category}
                          </span>
                          <span
                            className={`tag ${!isOngoing ? "tag-green" : "tag-orange"}`}
                            style={{ fontSize: 11, padding: "3px 10px" }}
                          >
                            {!isOngoing ? "✓ Completed" : "⟳ Ongoing"}
                          </span>
                        </div>
                      </div>

                      {/* Content block */}
                      <div style={{ padding: 24 }}>
                        <h3
                          style={{
                            fontFamily: "Syne",
                            fontWeight: 700,
                            fontSize: 19,
                            fontStyle: "italic",
                            marginBottom: 8,
                            color: "#e8eaf6"
                          }}
                        >
                          {project.title}
                        </h3>
                        <p style={{ color: "#7b82a8", fontSize: 13.5, lineHeight: 1.6, marginBottom: 20 }}>
                          {project.subtitle || project.description.slice(0, 75) + "..."}
                        </p>

                        {/* Tech Tags preview */}
                        {project.techStack && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {project.techStack.slice(0, 3).map((tech: string) => (
                              <span
                                key={tech}
                                style={{
                                  fontSize: 11,
                                  color: "#7b82a8",
                                  background: "rgba(255,255,255,0.03)",
                                  padding: "3px 8px",
                                  borderRadius: 6,
                                  border: "1px solid rgba(255,255,255,0.05)"
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                            {project.techStack.length > 3 && (
                              <span style={{ fontSize: 11, color: "#4f6fff", alignSelf: "center", fontWeight: 600 }}>
                                +{project.techStack.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ padding: "0 24px 24px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 16 }}>
                        <span style={{ fontSize: 12, color: "#545975", fontWeight: 600 }}>Click to explore</span>
                        <div style={{ color: "#4f6fff", display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700 }}>
                          Details <FaArrowRight size={10} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 80, color: "#7b82a8" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p>No projects in this category yet.</p>
          </div>
        )}
      </div>

      {/* LUXURY SLIDE-IN MODAL FOR PROJECT DETAIL PREVIEW */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999,
              background: "rgba(3,5,10,0.85)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
              boxSizing: "border-box"
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong"
              style={{
                width: "100%",
                maxWidth: 820,
                maxHeight: "90vh",
                overflowY: "auto",
                borderRadius: 28,
                border: "1px solid rgba(99,120,255,0.25)",
                background: "linear-gradient(135deg, rgba(12,18,36,0.95), rgba(5,7,15,0.98))",
                boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
                boxSizing: "border-box"
              }}
            >
              {/* Cover Image in Modal */}
              <div
                style={{
                  aspectRatio: "16/9",
                  width: "100%",
                  maxHeight: 400,
                  background: selectedProject.image 
                    ? `url("${selectedProject.image}") center/cover no-repeat` 
                    : `linear-gradient(135deg, ${catColors[selectedProject.category]}15, ${catColors[selectedProject.category]}30)`,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: catColors[selectedProject.category],
                }}
              >
                {!selectedProject.image && (() => {
                  const Icon = catIcons[selectedProject.category] || FaGlobe;
                  return <Icon size={70} />;
                })()}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(360deg, rgba(5,7,15,0.98) 10%, transparent 80%)" }} />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "none",
                    background: "rgba(0,0,0,0.5)",
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    cursor: "pointer",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.5)"}
                >
                  <FaTimes size={14} />
                </button>

                {/* Subtitle details */}
                <div style={{ position: "absolute", bottom: 20, left: 30, right: 30 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: catColors[selectedProject.category],
                      letterSpacing: 0.8,
                      background: `${catColors[selectedProject.category]}15`,
                      padding: "4px 10px",
                      borderRadius: 6,
                      border: `1px solid ${catColors[selectedProject.category]}30`,
                      marginBottom: 10,
                      display: "inline-block"
                    }}
                  >
                    {selectedProject.category}
                  </span>
                  <h2 style={{ fontFamily: "Syne", fontSize: "clamp(22px, 3.5vw, 32px)", fontStyle: "italic", fontWeight: 800, color: "#fff", margin: "6px 0 0" }}>
                    {selectedProject.title}
                  </h2>
                </div>
              </div>

              {/* Modal Body Container */}
              <div style={{ padding: "clamp(24px, 4vw, 40px)" }}>
                
                {/* Impact Highlight Badge */}
                {selectedProject.impact && (
                  <div
                    style={{
                      background: "linear-gradient(90deg, rgba(79,111,255,0.12), rgba(162,89,255,0.06))",
                      border: "1px solid rgba(79,111,255,0.25)",
                      borderRadius: 14,
                      padding: "16px 20px",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      marginBottom: 30
                    }}
                  >
                    <div style={{ color: "#ffb300", fontSize: 20, display: "flex" }}>
                      <FaTrophy />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "#7b82a8", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>
                        Key Business Impact
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#e8eaf6", marginTop: 2 }}>
                        {selectedProject.impact}
                      </div>
                    </div>
                  </div>
                )}

                {/* Subtitle description */}
                {selectedProject.subtitle && (
                  <h4 style={{ color: "#4f6fff", fontSize: 16, fontWeight: 700, marginBottom: 12 }}>
                    {selectedProject.subtitle}
                  </h4>
                )}
                <p style={{ color: "#7b82a8", fontSize: 14.5, lineHeight: 1.7, marginBottom: 30 }}>
                  {selectedProject.description}
                </p>

                {/* Grid info: Tech stack & Features developed */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 30, marginBottom: 40 }}>
                  
                  {/* Tech stack list */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#e8eaf6", fontWeight: 700, marginBottom: 16 }}>
                      <FaCode size={13} style={{ color: "#4f6fff" }} /> Tech Stack Used
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {selectedProject.techStack?.map((tech: string) => (
                        <span
                          key={tech}
                          style={{
                            fontSize: 12,
                            color: "#b0b8d8",
                            background: "rgba(79,111,255,0.06)",
                            padding: "6px 12px",
                            borderRadius: 8,
                            border: "1px solid rgba(79,111,255,0.15)",
                            fontWeight: 500
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Core Features developed */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#e8eaf6", fontWeight: 700, marginBottom: 16 }}>
                      <FaRocket size={13} style={{ color: "#a259ff" }} /> Deliverables & Features
                    </div>
                    <div style={{ display: "grid", gap: 10 }}>
                      {selectedProject.features?.map((feat: string, idx: number) => (
                        <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#7b82a8" }}>
                          <span style={{ color: "#00e676", marginTop: 2, display: "flex" }}>
                            <FaCheckCircle size={12} />
                          </span>
                          <span style={{ lineHeight: 1.4 }}>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Call to Actions in Modal */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 16,
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: 30
                  }}
                >
                  {selectedProject.liveLink && selectedProject.liveLink !== "#" ? (
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ padding: "12px 28px", fontSize: 14, textDecoration: "none" }}
                    >
                      Visit Live Project Website ↗
                    </a>
                  ) : (
                    <span
                      style={{
                        padding: "12px 24px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        borderRadius: 10,
                        fontSize: 13,
                        color: "#545975",
                        fontWeight: 600
                      }}
                    >
                      {selectedProject.status === "ongoing" ? "⚡ Under Development Staging" : "🔒 Confidential Intranet App"}
                    </span>
                  )}

                  <Link
                    href={`/website-cost-calculator`}
                    onClick={() => setSelectedProject(null)}
                    className="btn-outline"
                    style={{
                      padding: "12px 28px",
                      fontSize: 14,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8
                    }}
                  >
                    Request a Website Like This <FaArrowRight size={10} />
                  </Link>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
