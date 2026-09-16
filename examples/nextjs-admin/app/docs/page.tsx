"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Activity,
  Layers,
  Terminal,
  Cpu,
  Server,
  Code,
  Shield,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Zap,
  Gauge,
  AlertTriangle,
  Play,
  GitBranch,
  ChevronDown,
  CheckCircle2,
  Menu,
  X,
  Search,
  PanelLeftClose,
  PanelLeft,
  ArrowRight,
  CornerDownLeft,
} from "lucide-react";
import { CURRENT_PROJECT_VERSION, AVAILABLE_VERSIONS } from "./version";

export default function DocumentationPage() {
  const [selectedVersion, setSelectedVersion] = useState<string>(CURRENT_PROJECT_VERSION);
  const [isVersionDropdownOpen, setIsVersionDropdownOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSection, setActiveSection] = useState<string>("quickstart");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [installPm, setInstallPm] = useState<"cli" | "npm" | "pnpm" | "bun" | "yarn">("cli");

  // Keyboard shortcut listener for Ctrl+K / Cmd+K and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const navItems = [
    {
      group: "Getting Started",
      items: [
        { id: "overview", label: "Overview & Architecture", icon: <Layers size={16} /> },
        { id: "quickstart", label: "Quick Start Guide", icon: <Zap size={16} /> },
        { id: "installation", label: "Installation & CLI Options", icon: <Terminal size={16} /> },
      ],
    },
    {
      group: "Frontend & UI Dashboards",
      items: [
        { id: "ui-dashboard", label: "React & Next.js UI", icon: <Activity size={16} /> },
        { id: "dashboard-themes", label: "6 Runtime Themes", icon: <Sparkles size={16} /> },
        { id: "cli-commands", label: "CLI Commands Reference", icon: <Code size={16} /> },
      ],
    },
    {
      group: "Backend SDK",
      items: [
        { id: "express", label: "Express Instrumentation", icon: <Server size={16} /> },
        { id: "nestjs", label: "NestJS Module Setup", icon: <Cpu size={16} /> },
        { id: "metrics-tracing", label: "Metrics & OpenTelemetry", icon: <Gauge size={16} /> },
        { id: "error-intel", label: "Error Intelligence & Breadcrumbs", icon: <AlertTriangle size={16} /> },
      ],
    },
    {
      group: "Production & Deploy",
      items: [
        { id: "security", label: "Auth & Middleware Security", icon: <Shield size={16} /> },
        { id: "deployment", label: "Hosting Live on Vercel / Cloud", icon: <ExternalLink size={16} /> },
      ],
    },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    const container = document.getElementById("docs-main-scroll-container");
    if (target && container) {
      const topPos = target.offsetTop - container.offsetTop;
      container.scrollTo({ top: topPos - 20, behavior: "smooth" });
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        maxHeight: "100vh",
        width: "100vw",
        maxWidth: "100vw",
        overflow: "hidden",
        backgroundColor: "#090d16",
        color: "#f1f5f9",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Navbar: Fixed / Static */}
      <header
        style={{
          position: "relative",
          zIndex: 50,
          flexShrink: 0,
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.25rem",
          backgroundColor: "rgba(9, 13, 22, 0.96)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Desktop Sidebar Expand/Collapse Toggle */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "0.4rem",
              padding: "0.45rem",
              color: sidebarCollapsed ? "#818cf8" : "#94a3b8",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            className="desktop-sidebar-toggle"
            title={sidebarCollapsed ? "Expand Sidebar" : "Collapse to Icons Only"}
            aria-label="Toggle Sidebar Width"
          >
            {sidebarCollapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
          </button>

          {/* Mobile menu hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "0.375rem",
              padding: "0.4rem",
              color: "#ffffff",
              cursor: "pointer",
            }}
            className="mobile-nav-toggle"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #6366f1, #3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 16px rgba(99, 102, 241, 0.4)",
                flexShrink: 0,
              }}
            >
              <Activity size={18} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.02em", color: "#ffffff" }}>
                Observability Kit
              </div>
              <div style={{ position: "relative", display: "inline-block" }}>
                <button
                  onClick={() => setIsVersionDropdownOpen(!isVersionDropdownOpen)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    background: "rgba(99, 102, 241, 0.12)",
                    border: "1px solid rgba(99, 102, 241, 0.25)",
                    borderRadius: "0.375rem",
                    padding: "0.15rem 0.45rem",
                    color: "#818cf8",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  <span>{selectedVersion}</span>
                  <ChevronDown size={11} style={{ transform: isVersionDropdownOpen ? "rotate(180deg)" : "none" }} />
                </button>

                {isVersionDropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 6px)",
                      left: 0,
                      zIndex: 100,
                      minWidth: "170px",
                      background: "#0f172a",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "0.5rem",
                      padding: "0.35rem",
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", color: "#64748b", padding: "0.35rem 0.5rem 0.2rem" }}>
                      Select Version
                    </div>
                    {AVAILABLE_VERSIONS.map((item) => (
                      <button
                        key={item.version}
                        onClick={() => {
                          setSelectedVersion(item.version);
                          setIsVersionDropdownOpen(false);
                        }}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0.4rem 0.5rem",
                          borderRadius: "0.375rem",
                          border: "none",
                          background: selectedVersion === item.version ? "rgba(99, 102, 241, 0.2)" : "transparent",
                          color: selectedVersion === item.version ? "#ffffff" : "#94a3b8",
                          fontSize: "0.75rem",
                          fontWeight: selectedVersion === item.version ? 600 : 400,
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        <span>{item.label}</span>
                        {selectedVersion === item.version && <CheckCircle2 size={12} color="#818cf8" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Center: Search Button (trigger for modal or direct search) */}
        <div style={{ flex: 1, maxWidth: "420px", margin: "0 1rem" }} className="docs-search-wrapper">
          <button
            onClick={() => setIsSearchOpen(true)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.09)",
              borderRadius: "0.5rem",
              padding: "0.45rem 0.75rem",
              color: "#94a3b8",
              fontSize: "0.82rem",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Search size={15} color="#818cf8" />
              <span>Search docs...</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.2rem",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "0.25rem",
                padding: "0.15rem 0.4rem",
                fontSize: "0.68rem",
                fontWeight: 600,
                color: "#cbd5e1",
              }}
            >
              <span>Ctrl</span>
              <span>K</span>
            </div>
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Link
            href="/docs/observability-dashboard"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.4rem 0.85rem",
              borderRadius: "0.5rem",
              background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
              color: "#ffffff",
              fontSize: "0.8rem",
              fontWeight: 600,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            <Play size={13} /> Demo Console
          </Link>
          <a
            href="https://github.com/ideateGudy/node-observability-kit"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.4rem 0.75rem",
              borderRadius: "0.5rem",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#cbd5e1",
              fontSize: "0.8rem",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            <GitBranch size={14} /> GitHub
          </a>
        </div>
      </header>

      {/* Main Documentation Layout: Takes remaining viewport height with independent Main Scroll */}
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "1600px",
          margin: "0 auto",
          flex: 1,
          height: "calc(100vh - 60px)",
          maxHeight: "calc(100vh - 60px)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Sidebar Navigation: Static / Non-scrolling with the page - Expandable / Collapsible */}
        <aside
          style={{
            width: sidebarCollapsed ? "68px" : "260px",
            flexShrink: 0,
            height: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            padding: sidebarCollapsed ? "1.25rem 0.5rem" : "1.5rem 1rem",
            borderRight: "1px solid rgba(255, 255, 255, 0.06)",
            boxSizing: "border-box",
            transition: "width 0.2s cubic-bezier(0.4, 0, 0.2, 1), padding 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          className={`docs-sidebar ${sidebarCollapsed ? "collapsed" : ""} ${mobileMenuOpen ? "open" : ""}`}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: sidebarCollapsed ? "1rem" : "1.5rem" }}>
            {navItems.map((group, idx) => (
              <div key={idx}>
                {!sidebarCollapsed ? (
                  <div
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "#64748b",
                      marginBottom: "0.5rem",
                      paddingLeft: "0.5rem",
                    }}
                  >
                    {group.group}
                  </div>
                ) : (
                  <div
                    style={{
                      height: "1px",
                      background: "rgba(255, 255, 255, 0.06)",
                      margin: "0.4rem 0.2rem 0.6rem",
                    }}
                    title={group.group}
                  />
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  {group.items.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        title={sidebarCollapsed ? item.label : undefined}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: sidebarCollapsed ? "center" : "flex-start",
                          gap: "0.6rem",
                          padding: sidebarCollapsed ? "0.6rem" : "0.5rem 0.75rem",
                          borderRadius: "0.5rem",
                          border: "none",
                          fontSize: "0.83rem",
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? "#ffffff" : "#94a3b8",
                          backgroundColor: isActive ? "rgba(99, 102, 241, 0.15)" : "transparent",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "all 0.15s ease",
                          width: "100%",
                        }}
                      >
                        <span style={{ color: isActive ? "#818cf8" : "#64748b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {item.icon}
                        </span>
                        {!sidebarCollapsed && (
                          <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {item.label}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Center Content Area: The ONLY area that scrolls down */}
        <main
          id="docs-main-scroll-container"
          style={{
            flex: 1,
            minWidth: 0,
            width: "100%",
            maxWidth: "100%",
            height: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            padding: "2.5rem 2.5rem 6rem",
            boxSizing: "border-box",
            lineHeight: "1.6",
          }}
          className="docs-main-content"
        >
          {/* Section: Overview */}
          <section id="overview" style={{ marginBottom: "3.5rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.25rem 0.65rem",
                borderRadius: "9999px",
                background: "rgba(59, 130, 246, 0.12)",
                color: "#60a5fa",
                fontSize: "0.75rem",
                fontWeight: 600,
                marginBottom: "0.75rem",
                border: "1px solid rgba(59, 130, 246, 0.25)",
              }}
            >
              <Sparkles size={13} /> Complete Observability Pipeline
            </div>
            <h1 style={{ fontSize: "2.2rem", fontWeight: 800, margin: "0 0 0.75rem 0", letterSpacing: "-0.03em" }}>
              Developer-First Observability
            </h1>
            <p style={{ fontSize: "1.05rem", color: "#94a3b8", margin: "0 0 1.5rem 0" }}>
              A turnkey monitoring system for Express and NestJS backends, paired with ready-to-mount React & Next.js admin dashboards. Collect Prometheus metrics, OpenTelemetry traces, and intelligent error fingerprints with zero external framework lock-in.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", margin: "1.5rem 0" }}>
              <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", padding: "1.25rem" }}>
                <div style={{ color: "#818cf8", marginBottom: "0.5rem" }}><Server size={22} /></div>
                <h3 style={{ margin: "0 0 0.4rem 0", fontSize: "1rem" }}>Backend Core SDK</h3>
                <p style={{ margin: 0, fontSize: "0.82rem", color: "#94a3b8" }}>
                  One-line middleware setup for Express and NestJS. Exposes <code>/metrics</code> for Prometheus and <code>/api/observability/stats</code>.
                </p>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", padding: "1.25rem" }}>
                <div style={{ color: "#38bdf8", marginBottom: "0.5rem" }}><Activity size={22} /></div>
                <h3 style={{ margin: "0 0 0.4rem 0", fontSize: "1rem" }}>React Dashboard UI</h3>
                <p style={{ margin: 0, fontSize: "0.82rem", color: "#94a3b8" }}>
                  6 pre-built dashboard layouts, 6 runtime color themes, deep error inspector with stack traces and breadcrumb timelines.
                </p>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", padding: "1.25rem" }}>
                <div style={{ color: "#34d399", marginBottom: "0.5rem" }}><Terminal size={22} /></div>
                <h3 style={{ margin: "0 0 0.4rem 0", fontSize: "1rem" }}>Zero-Config CLI</h3>
                <p style={{ margin: 0, fontSize: "0.82rem", color: "#94a3b8" }}>
                  Detects Next.js App/Pages Router and Vite. Installs UI routes, initializes configs, and validates connectivity with <code>doctor</code>.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Quick Start */}
          <section id="quickstart" style={{ marginBottom: "3.5rem" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 700, margin: "0 0 1rem 0" }}>⚡️ Quick Start in 3 Steps</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ background: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", padding: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, fontSize: "0.95rem" }}>
                    <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem" }}>1</span>
                    Instrument Your Backend
                  </div>
                  <button
                    onClick={() => copyToClipboard("npm install @ideategudy/express-nestjs-observability", "code-step1")}
                    style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem" }}
                  >
                    {copiedCode === "code-step1" ? <Check size={14} color="#10b981" /> : <Copy size={14} />} Copy
                  </button>
                </div>
                <pre style={{ margin: 0, padding: "0.75rem 1rem", backgroundColor: "#020617", borderRadius: "0.5rem", color: "#e2e8f0", fontFamily: "monospace", fontSize: "0.82rem" }}>
                  npm install @ideategudy/express-nestjs-observability
                </pre>
              </div>

              <div style={{ background: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", padding: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, fontSize: "0.95rem" }}>
                    <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem" }}>2</span>
                    Scaffold Frontend Dashboard
                  </div>
                  <button
                    onClick={() => copyToClipboard("npx @ideategudy/observability-cli dashboard", "code-step2")}
                    style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem" }}
                  >
                    {copiedCode === "code-step2" ? <Check size={14} color="#10b981" /> : <Copy size={14} />} Copy
                  </button>
                </div>
                <pre style={{ margin: 0, padding: "0.75rem 1rem", backgroundColor: "#020617", borderRadius: "0.5rem", color: "#e2e8f0", fontFamily: "monospace", fontSize: "0.82rem" }}>
                  npx @ideategudy/observability-cli dashboard
                </pre>
              </div>

              <div style={{ background: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", padding: "1.25rem" }}>
                <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.4rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#059669", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem" }}>3</span>
                  View Live Protected Route
                </div>
                <p style={{ margin: "0 0 0.75rem 0", color: "#94a3b8", fontSize: "0.85rem" }}>
                  Navigate to your frontend application to inspect live traffic, latencies, and errors in real-time:
                </p>
                <div>
                  <Link
                    href="/docs/observability-dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.5rem",
                      backgroundColor: "#4f46e5",
                      color: "#ffffff",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Open Live Demo Console <ExternalLink size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Installation */}
          <section id="installation" style={{ marginBottom: "3.5rem" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 700, margin: "0 0 1rem 0" }}>📦 Installation Options</h2>
            <p style={{ color: "#94a3b8", margin: "0 0 1rem 0", fontSize: "0.9rem" }}>
              Choose your preferred installation method:
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.75rem" }}>
              {(["cli", "npm", "pnpm", "bun", "yarn"] as const).map((pm) => (
                <button
                  key={pm}
                  onClick={() => setInstallPm(pm)}
                  style={{
                    padding: "0.35rem 0.75rem",
                    borderRadius: "0.375rem",
                    border: "1px solid",
                    borderColor: installPm === pm ? "#6366f1" : "rgba(255, 255, 255, 0.1)",
                    backgroundColor: installPm === pm ? "rgba(99, 102, 241, 0.2)" : "rgba(255, 255, 255, 0.03)",
                    color: installPm === pm ? "#ffffff" : "#94a3b8",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    textTransform: "uppercase",
                  }}
                >
                  {pm === "cli" ? "CLI Auto (Recommended)" : pm}
                </button>
              ))}
            </div>

            <div style={{ background: "#020617", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", padding: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                <span style={{ fontSize: "0.72rem", color: "#64748b", fontFamily: "monospace" }}>Terminal</span>
                <button
                  onClick={() => {
                    const cmd =
                      installPm === "cli"
                        ? "npx @ideategudy/observability-cli dashboard"
                        : installPm === "pnpm"
                        ? "pnpm add @ideategudy/express-nestjs-observability @ideategudy/observability-ui lucide-react"
                        : installPm === "bun"
                        ? "bun add @ideategudy/express-nestjs-observability @ideategudy/observability-ui lucide-react"
                        : installPm === "yarn"
                        ? "yarn add @ideategudy/express-nestjs-observability @ideategudy/observability-ui lucide-react"
                        : "npm install @ideategudy/express-nestjs-observability @ideategudy/observability-ui lucide-react";
                    copyToClipboard(cmd, "install-cmd");
                  }}
                  style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.72rem" }}
                >
                  {copiedCode === "install-cmd" ? <Check size={13} color="#10b981" /> : <Copy size={13} />} Copy
                </button>
              </div>

              <pre style={{ margin: 0, color: "#f8fafc", fontFamily: "monospace", fontSize: "0.85rem" }}>
                {installPm === "cli" && `# 1. Scaffold Dashboard Route\nnpx @ideategudy/observability-cli dashboard\n\n# 2. Run Doctor to Validate Connection\nnpx @ideategudy/observability-cli doctor`}
                {installPm === "npm" && `npm install @ideategudy/express-nestjs-observability @ideategudy/observability-ui lucide-react`}
                {installPm === "pnpm" && `pnpm add @ideategudy/express-nestjs-observability @ideategudy/observability-ui lucide-react`}
                {installPm === "bun" && `bun add @ideategudy/express-nestjs-observability @ideategudy/observability-ui lucide-react`}
                {installPm === "yarn" && `yarn add @ideategudy/express-nestjs-observability @ideategudy/observability-ui lucide-react`}
              </pre>
            </div>
          </section>

          {/* Section: UI Dashboard */}
          <section id="ui-dashboard" style={{ marginBottom: "3.5rem" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 700, margin: "0 0 0.75rem 0" }}>React & Next.js UI Dashboard</h2>
            <p style={{ color: "#94a3b8", margin: "0 0 1rem 0", fontSize: "0.9rem" }}>
              Render the unified <code>&lt;ObservabilityDashboard /&gt;</code> inside any client component:
            </p>
            <pre style={{ margin: 0, padding: "1rem", backgroundColor: "#020617", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", color: "#f8fafc", fontFamily: "monospace", fontSize: "0.82rem", lineHeight: "1.5" }}>
{`"use client";

import { ObservabilityDashboard } from "@ideategudy/observability-ui";

export default function AdminObservabilityPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#090d16" }}>
      <ObservabilityDashboard
        config={{
          endpoint: "http://localhost:5000/api/observability/stats",
          refreshIntervalMs: 5000,
        }}
        defaultDashboard="full"
        showSwitcher={true}
      />
    </main>
  );
}`}
            </pre>
          </section>

          {/* Section: Dashboard Themes */}
          <section id="dashboard-themes" style={{ marginBottom: "3.5rem" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 700, margin: "0 0 0.75rem 0" }}>6 Built-in Runtime Themes</h2>
            <p style={{ color: "#94a3b8", margin: "0 0 1rem 0", fontSize: "0.9rem" }}>
              Switch themes live on the UI or configure your preferred default aesthetic:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.75rem" }}>
              {[
                { name: "Tokyo Night", id: "tokyo-night", color: "#7aa2f7", desc: "Deep indigo & neon cyan" },
                { name: "Nord", id: "nord", color: "#88c0d0", desc: "Arctic cool frost blues" },
                { name: "Dracula", id: "dracula", color: "#bd93f9", desc: "Vibrant purple & pink accents" },
                { name: "Catppuccin Mocha", id: "catppuccin", color: "#cba6f7", desc: "Soothing pastel dark palette" },
                { name: "Emerald Terminal", id: "emerald-terminal", color: "#10b981", desc: "Monochrome hacker terminal" },
                { name: "Cyberpunk", id: "cyberpunk", color: "#f43f5e", desc: "High-contrast neon pink" },
              ].map((t) => (
                <div key={t.id} style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: "0.5rem", padding: "0.85rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: t.color }}></span>
                    <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>{t.name}</span>
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{t.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: CLI Commands */}
          <section id="cli-commands" style={{ marginBottom: "3.5rem" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 700, margin: "0 0 1rem 0" }}>💻 Observability CLI Reference</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
              <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", padding: "1.25rem" }}>
                <h4 style={{ margin: "0 0 0.4rem 0", color: "#38bdf8", fontSize: "0.95rem" }}>1. dashboard</h4>
                <p style={{ margin: "0 0 0.75rem 0", fontSize: "0.8rem", color: "#94a3b8" }}>
                  Auto-detects framework and generates an admin dashboard route.
                </p>
                <code style={{ display: "block", padding: "0.5rem", background: "#020617", borderRadius: "0.375rem", color: "#a5b4fc", fontSize: "0.75rem", wordBreak: "break-all" }}>
                  obs-cli dashboard -y
                </code>
                <span style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "0.3rem", display: "block" }}>
                  Or with npx: <code>npx obs-cli dashboard -y</code>
                </span>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", padding: "1.25rem" }}>
                <h4 style={{ margin: "0 0 0.4rem 0", color: "#34d399", fontSize: "0.95rem" }}>2. doctor</h4>
                <p style={{ margin: "0 0 0.75rem 0", fontSize: "0.8rem", color: "#94a3b8" }}>
                  Validates dependencies and tests live telemetry reachability.
                </p>
                <code style={{ display: "block", padding: "0.5rem", background: "#020617", borderRadius: "0.375rem", color: "#a5b4fc", fontSize: "0.75rem", wordBreak: "break-all" }}>
                  obs-cli doctor
                </code>
                <span style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "0.3rem", display: "block" }}>
                  Or with npx: <code>npx obs-cli doctor</code>
                </span>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", padding: "1.25rem" }}>
                <h4 style={{ margin: "0 0 0.4rem 0", color: "#fbbf24", fontSize: "0.95rem" }}>3. init</h4>
                <p style={{ margin: "0 0 0.75rem 0", fontSize: "0.8rem", color: "#94a3b8" }}>
                  Creates an interactive <code>observability.config.ts</code> configuration.
                </p>
                <code style={{ display: "block", padding: "0.5rem", background: "#020617", borderRadius: "0.375rem", color: "#a5b4fc", fontSize: "0.75rem", wordBreak: "break-all" }}>
                  obs-cli init
                </code>
                <span style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "0.3rem", display: "block" }}>
                  Or with npx: <code>npx obs-cli init</code>
                </span>
              </div>
            </div>
          </section>

          {/* Section: Express */}
          <section id="express" style={{ marginBottom: "3.5rem" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 700, margin: "0 0 0.75rem 0" }}>Express Instrumentation</h2>
            <p style={{ color: "#94a3b8", margin: "0 0 1rem 0", fontSize: "0.9rem" }}>
              Call <code>setupObservability(app)</code> before declaring your routes:
            </p>
            <pre style={{ margin: 0, padding: "1rem", backgroundColor: "#020617", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", color: "#f8fafc", fontFamily: "monospace", fontSize: "0.82rem", lineHeight: "1.5" }}>
{`import express from "express";
import { setupObservability } from "@ideategudy/express-nestjs-observability/express";
import { addBreadcrumb } from "@ideategudy/express-nestjs-observability";

const app = express();

// Enables /metrics, Winston JSON logging & /api/observability/stats
setupObservability(app, {
  serviceName: "billing-service",
  environment: "production",
});

app.get("/api/checkout", (req, res) => {
  addBreadcrumb({ category: "cart", message: "Processing card payment", level: "info" });
  res.json({ status: "success" });
});

// Fallback for non-existent routes (captured as 404 in dashboard)
app.use((req, res) => {
  res.status(404).json({ statusCode: 404, error: "Not Found", message: \`Cannot \${req.method} \${req.url}\` });
});

app.listen(5000, () => console.log("Server listening on port 5000"));`}
            </pre>
          </section>

          {/* Section: NestJS */}
          <section id="nestjs" style={{ marginBottom: "3.5rem" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 700, margin: "0 0 0.75rem 0" }}>NestJS Module Setup</h2>
            <p style={{ color: "#94a3b8", margin: "0 0 1rem 0", fontSize: "0.9rem" }}>
              Import <code>ObservabilityModule.forRoot()</code> in your root <code>AppModule</code>:
            </p>
            <pre style={{ margin: 0, padding: "1rem", backgroundColor: "#020617", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", color: "#f8fafc", fontFamily: "monospace", fontSize: "0.82rem", lineHeight: "1.5" }}>
{`import { Module } from "@nestjs/common";
import { ObservabilityModule } from "@ideategudy/express-nestjs-observability/nestjs";

@Module({
  imports: [
    ObservabilityModule.forRoot({
      serviceName: "auth-service",
      environment: process.env.NODE_ENV || "production",
    }),
  ],
})
export class AppModule {}`}
            </pre>
          </section>

          {/* Section: Security */}
          <section id="security" style={{ marginBottom: "3.5rem" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 700, margin: "0 0 0.75rem 0" }}>🔒 Production Security & Auth</h2>
            <p style={{ color: "#94a3b8", margin: "0 0 1rem 0", fontSize: "0.9rem" }}>
              Protect your dashboard route behind authentication middleware:
            </p>
            <pre style={{ margin: 0, padding: "1rem", backgroundColor: "#020617", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", color: "#f8fafc", fontFamily: "monospace", fontSize: "0.82rem", lineHeight: "1.5" }}>
{`// middleware.ts (Next.js)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin/observability")) {
    const adminToken = req.cookies.get("admin_session");
    if (!adminToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return NextResponse.next();
}`}
            </pre>
          </section>
        </main>
      </div>

      {/* Search Dialog Modal (Triggered by Ctrl+K / Cmd+K or clicking search in nav) */}
      {isSearchOpen && (
        <div
          onClick={() => setIsSearchOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(3, 7, 18, 0.75)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: "12vh",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            animation: "fadeIn 0.15s ease-out",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "580px",
              backgroundColor: "#0f172a",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "0.85rem",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 35px rgba(99, 102, 241, 0.15)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Search Input Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.85rem 1.1rem",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                backgroundColor: "rgba(255, 255, 255, 0.02)",
              }}
            >
              <Search size={18} color="#818cf8" />
              <input
                type="text"
                autoFocus
                placeholder="Search documentation, topics, SDK setup..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#f8fafc",
                  fontSize: "0.95rem",
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#64748b",
                    cursor: "pointer",
                    padding: "0.2rem",
                  }}
                >
                  <X size={15} />
                </button>
              )}
              <div
                style={{
                  fontSize: "0.68rem",
                  padding: "0.2rem 0.45rem",
                  background: "rgba(255, 255, 255, 0.06)",
                  borderRadius: "0.25rem",
                  color: "#94a3b8",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                ESC
              </div>
            </div>

            {/* Search Results List */}
            <div
              style={{
                maxHeight: "380px",
                overflowY: "auto",
                padding: "0.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
              }}
            >
              {(() => {
                const query = searchQuery.trim().toLowerCase();
                const allItems = navItems.flatMap((g) =>
                  g.items.map((it) => ({ ...it, groupName: g.group }))
                );
                const filtered = query
                  ? allItems.filter(
                      (item) =>
                        item.label.toLowerCase().includes(query) ||
                        item.groupName.toLowerCase().includes(query) ||
                        item.id.toLowerCase().includes(query)
                    )
                  : allItems;

                if (filtered.length === 0) {
                  return (
                    <div style={{ padding: "2rem 1rem", textAlign: "center", color: "#64748b", fontSize: "0.85rem" }}>
                      No documentation matching &ldquo;<span style={{ color: "#f1f5f9" }}>{searchQuery}</span>&rdquo;
                    </div>
                  );
                }

                return filtered.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                      handleNavClick(item.id);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.65rem 0.85rem",
                      borderRadius: "0.5rem",
                      border: "none",
                      backgroundColor: "transparent",
                      color: "#e2e8f0",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background-color 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(99, 102, 241, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "6px",
                          background: "rgba(99, 102, 241, 0.12)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#818cf8",
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 500, color: "#f8fafc" }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "#64748b" }}>
                          {item.groupName}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "#64748b", fontSize: "0.75rem" }}>
                      <span>Jump</span>
                      <CornerDownLeft size={13} />
                    </div>
                  </button>
                ));
              })()}
            </div>

            {/* Modal Footer */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.6rem 1.1rem",
                borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                fontSize: "0.7rem",
                color: "#64748b",
                backgroundColor: "rgba(2, 6, 23, 0.5)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                <span><kbd style={{ background: "rgba(255,255,255,0.08)", padding: "0.1rem 0.3rem", borderRadius: "3px" }}>↵</kbd> to select</span>
                <span><kbd style={{ background: "rgba(255,255,255,0.08)", padding: "0.1rem 0.3rem", borderRadius: "3px" }}>ESC</kbd> to close</span>
              </div>
              <span style={{ color: "#818cf8" }}>Observability Docs</span>
            </div>
          </div>
        </div>
      )}

      {/* Global CSS for Responsiveness, Search Bar & Drawer */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @media (max-width: 900px) {
          .desktop-sidebar-toggle {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: flex !important;
          }
          .docs-sidebar {
            position: fixed !important;
            top: 60px !important;
            left: -300px !important;
            z-index: 40 !important;
            background: rgba(9, 13, 22, 0.98) !important;
            width: 280px !important;
            height: calc(100vh - 60px) !important;
            transition: left 0.25s ease-in-out !important;
            box-shadow: 10px 0 25px rgba(0, 0, 0, 0.8) !important;
          }
          .docs-sidebar.open {
            left: 0 !important;
          }
          .docs-main-content {
            padding: 1.5rem 1rem 4rem !important;
          }
          .docs-search-wrapper {
            max-width: 180px !important;
          }
        }
        @media (min-width: 901px) {
          .mobile-nav-toggle {
            display: none !important;
          }
          .desktop-sidebar-toggle {
            display: flex !important;
          }
        }
        @media (max-width: 640px) {
          .docs-search-wrapper {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
