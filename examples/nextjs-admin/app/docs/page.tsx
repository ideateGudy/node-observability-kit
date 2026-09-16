"use client";

import React, { useState } from "react";
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
  Palette,
  Box
} from "lucide-react";

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState<string>("quickstart");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [installPm, setInstallPm] = useState<"cli" | "npm" | "pnpm" | "bun" | "yarn">("cli");
  const [stylingTab, setStylingTab] = useState<"tailwind" | "shadcn" | "aceternity" | "standalone">("standalone");

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
      group: "Frontend & UI Styling",
      items: [
        { id: "ui-dashboard", label: "React & Next.js UI", icon: <Activity size={16} /> },
        { id: "tailwind-shadcn", label: "Tailwind / Shadcn / Aceternity", icon: <Palette size={16} /> },
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

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#090d16", color: "#f1f5f9", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Top Navbar */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.85rem 2rem",
          backgroundColor: "rgba(9, 13, 22, 0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #6366f1, #3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 16px rgba(99, 102, 241, 0.4)",
              }}
            >
              <Activity size={20} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.02em", color: "#ffffff" }}>
                Observability Kit
              </div>
              <div style={{ fontSize: "0.75rem", color: "#818cf8", fontWeight: 600 }}>v0.1.0 Documentation</div>
            </div>
          </div>
          <span
            style={{
              padding: "0.2rem 0.6rem",
              fontSize: "0.7rem",
              borderRadius: "9999px",
              background: "rgba(99, 102, 241, 0.15)",
              color: "#a5b4fc",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              fontWeight: 600,
            }}
          >
            Developer-First Ecosystem
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link
            href="/admin/observability"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.45rem 0.9rem",
              borderRadius: "0.5rem",
              background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
              color: "#ffffff",
              fontSize: "0.85rem",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 2px 10px rgba(79, 70, 229, 0.3)",
            }}
          >
            <Play size={14} /> Live Demo Console
          </Link>
          <a
            href="https://github.com/ideateGudy/ideategudy-observability-toolkit"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.45rem 0.9rem",
              borderRadius: "0.5rem",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#cbd5e1",
              fontSize: "0.85rem",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            <GitBranch size={15} /> GitHub
          </a>
        </div>
      </header>

      {/* Main Documentation Layout */}
      <div style={{ display: "flex", maxWidth: "1600px", margin: "0 auto" }}>
        {/* Left Sticky Sidebar */}
        <aside
          style={{
            width: "290px",
            flexShrink: 0,
            height: "calc(100vh - 65px)",
            position: "sticky",
            top: "65px",
            overflowY: "auto",
            padding: "1.5rem 1rem",
            borderRight: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {navItems.map((group, idx) => (
              <div key={idx}>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#64748b",
                    marginBottom: "0.6rem",
                    paddingLeft: "0.5rem",
                  }}
                >
                  {group.group}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                  {group.items.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveSection(item.id);
                          document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.65rem",
                          padding: "0.55rem 0.75rem",
                          borderRadius: "0.5rem",
                          border: "none",
                          fontSize: "0.85rem",
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? "#ffffff" : "#94a3b8",
                          backgroundColor: isActive ? "rgba(99, 102, 241, 0.15)" : "transparent",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <span style={{ color: isActive ? "#818cf8" : "#64748b" }}>{item.icon}</span>
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Center Content Area */}
        <main style={{ flex: 1, minWidth: 0, padding: "2.5rem 3.5rem", lineHeight: "1.6" }}>
          {/* Section: Overview */}
          <section id="overview" style={{ marginBottom: "4rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.3rem 0.75rem",
                borderRadius: "9999px",
                background: "rgba(59, 130, 246, 0.12)",
                color: "#60a5fa",
                fontSize: "0.8rem",
                fontWeight: 600,
                marginBottom: "1rem",
                border: "1px solid rgba(59, 130, 246, 0.25)",
              }}
            >
              <Sparkles size={14} /> Complete Developer Toolkit
            </div>
            <h1 style={{ fontSize: "2.75rem", fontWeight: 800, margin: "0 0 1rem 0", letterSpacing: "-0.03em" }}>
              Full-Stack Observability & Dashboards
            </h1>
            <p style={{ fontSize: "1.15rem", color: "#94a3b8", maxWidth: "800px", margin: "0 0 2rem 0" }}>
              A developer-first monitoring system for Express and NestJS backends, paired with ready-to-mount React & Next.js admin dashboards. Collect Prometheus metrics, OpenTelemetry traces, and intelligent error fingerprints with zero configuration.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", margin: "2rem 0" }}>
              <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", padding: "1.5rem" }}>
                <div style={{ color: "#818cf8", marginBottom: "0.75rem" }}><Server size={24} /></div>
                <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>Backend Core SDK</h3>
                <p style={{ margin: 0, fontSize: "0.875rem", color: "#94a3b8" }}>
                  One-line middleware setup for Express and NestJS. Exposes <code>/metrics</code> for Prometheus and <code>/api/observability/stats</code>.
                </p>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", padding: "1.5rem" }}>
                <div style={{ color: "#38bdf8", marginBottom: "0.75rem" }}><Activity size={24} /></div>
                <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>React Dashboard UI</h3>
                <p style={{ margin: 0, fontSize: "0.875rem", color: "#94a3b8" }}>
                  6 pre-built dashboard layouts, 6 runtime themes, deep error inspector with stack traces, breadcrumb timelines, and Tailwind compatibility.
                </p>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", padding: "1.5rem" }}>
                <div style={{ color: "#34d399", marginBottom: "0.75rem" }}><Terminal size={24} /></div>
                <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>Zero-Config CLI</h3>
                <p style={{ margin: 0, fontSize: "0.875rem", color: "#94a3b8" }}>
                  Detects Next.js App/Pages Router and Vite. Installs UI routes, initializes configs, and validates connectivity with <code>doctor</code>.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Installation & CLI Options */}
          <section id="installation" style={{ marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 700, margin: "0 0 1rem 0" }}>📦 Installation Options</h2>
            <p style={{ color: "#94a3b8", margin: "0 0 1.25rem 0" }}>
              Choose your preferred installation method. You can use the automated CLI or install packages manually via your favorite package manager:
            </p>

            {/* PM Switcher Tabs */}
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
              {(["cli", "npm", "pnpm", "bun", "yarn"] as const).map((pm) => (
                <button
                  key={pm}
                  onClick={() => setInstallPm(pm)}
                  style={{
                    padding: "0.4rem 0.85rem",
                    borderRadius: "0.375rem",
                    border: "1px solid",
                    borderColor: installPm === pm ? "#6366f1" : "rgba(255, 255, 255, 0.1)",
                    backgroundColor: installPm === pm ? "rgba(99, 102, 241, 0.2)" : "rgba(255, 255, 255, 0.03)",
                    color: installPm === pm ? "#ffffff" : "#94a3b8",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    textTransform: "uppercase",
                  }}
                >
                  {pm === "cli" ? "CLI Auto (Recommended)" : pm}
                </button>
              ))}
            </div>

            {/* Code Box */}
            <div style={{ position: "relative", background: "#020617", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", padding: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b", fontFamily: "monospace" }}>Terminal</span>
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
                  style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem" }}
                >
                  {copiedCode === "install-cmd" ? <Check size={14} color="#10b981" /> : <Copy size={14} />} Copy
                </button>
              </div>

              <pre style={{ margin: 0, color: "#f8fafc", fontFamily: "monospace", fontSize: "0.9rem", overflowX: "auto" }}>
                {installPm === "cli" && `# 1. Scaffold Dashboard Route\nnpx @ideategudy/observability-cli dashboard\n\n# 2. Run Doctor to Validate Connection\nnpx @ideategudy/observability-cli doctor`}
                {installPm === "npm" && `npm install @ideategudy/express-nestjs-observability @ideategudy/observability-ui lucide-react`}
                {installPm === "pnpm" && `pnpm add @ideategudy/express-nestjs-observability @ideategudy/observability-ui lucide-react`}
                {installPm === "bun" && `bun add @ideategudy/express-nestjs-observability @ideategudy/observability-ui lucide-react`}
                {installPm === "yarn" && `yarn add @ideategudy/express-nestjs-observability @ideategudy/observability-ui lucide-react`}
              </pre>
            </div>
          </section>

          {/* Section: Tailwind / Shadcn / Aceternity UI */}
          <section id="tailwind-shadcn" style={{ marginBottom: "4rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.3rem 0.75rem",
                borderRadius: "9999px",
                background: "rgba(168, 85, 247, 0.12)",
                color: "#c084fc",
                fontSize: "0.8rem",
                fontWeight: 600,
                marginBottom: "1rem",
                border: "1px solid rgba(168, 85, 247, 0.25)",
              }}
            >
              <Palette size={14} /> UI Framework Adaptability
            </div>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 700, margin: "0 0 1rem 0" }}>
              Using with Tailwind CSS, Shadcn/UI & Aceternity UI
            </h2>
            <p style={{ color: "#94a3b8", margin: "0 0 1.5rem 0" }}>
              The <code>@ideategudy/observability-ui</code> dashboard is fully encapsulated with zero stylesheet collisions. You can embed it directly inside modern design systems, wrapper cards, or page shells built with Tailwind, Shadcn/UI, or Aceternity UI.
            </p>

            {/* Framework Switcher Tabs */}
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
              {[
                { id: "standalone", label: "Zero-Config Standalone" },
                { id: "tailwind", label: "Tailwind CSS Shell" },
                { id: "shadcn", label: "Shadcn Card / Tabs Shell" },
                { id: "aceternity", label: "Aceternity Lamp & Background" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStylingTab(tab.id as any)}
                  style={{
                    padding: "0.45rem 0.9rem",
                    borderRadius: "0.375rem",
                    border: "1px solid",
                    borderColor: stylingTab === tab.id ? "#a855f7" : "rgba(255, 255, 255, 0.1)",
                    backgroundColor: stylingTab === tab.id ? "rgba(168, 85, 247, 0.2)" : "rgba(255, 255, 255, 0.03)",
                    color: stylingTab === tab.id ? "#ffffff" : "#94a3b8",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Framework Code Box */}
            <div style={{ background: "#020617", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", padding: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b", fontFamily: "monospace" }}>app/admin/observability/page.tsx</span>
                <button
                  onClick={() => {
                    let code = "";
                    if (stylingTab === "standalone") {
                      code = `import { ObservabilityDashboard } from "@ideategudy/observability-ui";\n\nexport default function Page() {\n  return <ObservabilityDashboard defaultDashboard="full" showSwitcher={true} />;\n}`;
                    } else if (stylingTab === "tailwind") {
                      code = `"use client";\nimport { ObservabilityDashboard } from "@ideategudy/observability-ui";\n\nexport default function TailwindObservabilityPage() {\n  return (\n    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">\n      <header className="mb-8 border-b border-slate-800/80 pb-4">\n        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">\n          System Operations Console\n        </h1>\n        <p className="text-sm text-slate-400 mt-1">Live distributed tracing and cluster metrics</p>\n      </header>\n      <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-1 backdrop-blur-xl shadow-2xl shadow-indigo-950/20">\n        <ObservabilityDashboard defaultDashboard="full" showSwitcher={true} />\n      </div>\n    </div>\n  );\n}`;
                    } else if (stylingTab === "shadcn") {
                      code = `"use client";\nimport { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";\nimport { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";\nimport { ObservabilityDashboard, ApiOverviewDashboard, ErrorMonitoringDashboard } from "@ideategudy/observability-ui";\n\nexport default function ShadcnObservabilityPage() {\n  return (\n    <div className="space-y-6 p-8">\n      <Tabs defaultValue="overview" className="w-full space-y-6">\n        <TabsList className="bg-muted/50 p-1">\n          <TabsTrigger value="overview">All Systems</TabsTrigger>\n          <TabsTrigger value="api">API Traffic</TabsTrigger>\n          <TabsTrigger value="errors">Error Inspector</TabsTrigger>\n        </TabsList>\n        <TabsContent value="overview">\n          <ObservabilityDashboard defaultDashboard="full" showSwitcher={false} />\n        </TabsContent>\n        <TabsContent value="api">\n          <ApiOverviewDashboard />\n        </TabsContent>\n        <TabsContent value="errors">\n          <ErrorMonitoringDashboard />\n        </TabsContent>\n      </Tabs>\n    </div>\n  );\n}`;
                    } else if (stylingTab === "aceternity") {
                      code = `"use client";\nimport { LampContainer } from "@/components/ui/lamp";\nimport { ObservabilityDashboard } from "@ideategudy/observability-ui";\n\nexport default function AceternityObservability() {\n  return (\n    <main className="relative min-h-screen bg-black overflow-hidden">\n      <LampContainer>\n        <h1 className="bg-gradient-to-br from-slate-100 to-slate-400 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-6xl">\n          Real-Time Observability\n        </h1>\n      </LampContainer>\n      <div className="relative -mt-40 z-20 max-w-7xl mx-auto px-4 pb-20">\n        <div className="rounded-3xl border border-white/10 bg-black/60 p-2 backdrop-blur-2xl">\n          <ObservabilityDashboard defaultDashboard="full" showSwitcher={true} />\n        </div>\n      </div>\n    </main>\n  );\n}`;
                    }
                    copyToClipboard(code, "styling-code");
                  }}
                  style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem" }}
                >
                  {copiedCode === "styling-code" ? <Check size={14} color="#10b981" /> : <Copy size={14} />} Copy Code
                </button>
              </div>

              <pre style={{ margin: 0, color: "#f8fafc", fontFamily: "monospace", fontSize: "0.85rem", lineHeight: "1.6", overflowX: "auto" }}>
                {stylingTab === "standalone" && `// 1. Zero external CSS required - plug directly into any React / Next.js app\nimport { ObservabilityDashboard } from "@ideategudy/observability-ui";\n\nexport default function AdminPage() {\n  return (\n    <ObservabilityDashboard\n      config={{\n        endpoint: "http://localhost:5000/api/observability/stats",\n        refreshIntervalMs: 5000,\n      }}\n      defaultDashboard="full"\n      showSwitcher={true}\n    />\n  );\n}`}
                {stylingTab === "tailwind" && `"use client";\nimport { ObservabilityDashboard } from "@ideategudy/observability-ui";\n\nexport default function TailwindObservabilityPage() {\n  return (\n    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">\n      <header className="mb-8 border-b border-slate-800/80 pb-4">\n        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">\n          System Operations Console\n        </h1>\n        <p className="text-sm text-slate-400 mt-1">Live distributed tracing and cluster metrics</p>\n      </header>\n      <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-1 backdrop-blur-xl shadow-2xl shadow-indigo-950/20">\n        <ObservabilityDashboard defaultDashboard="full" showSwitcher={true} />\n      </div>\n    </div>\n  );\n}`}
                {stylingTab === "shadcn" && `"use client";\nimport { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";\nimport { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";\nimport { ObservabilityDashboard, ApiOverviewDashboard, ErrorMonitoringDashboard } from "@ideategudy/observability-ui";\n\nexport default function ShadcnObservabilityPage() {\n  return (\n    <div className="space-y-6 p-8">\n      <Tabs defaultValue="overview" className="w-full space-y-6">\n        <TabsList className="bg-muted/50 p-1">\n          <TabsTrigger value="overview">All Systems</TabsTrigger>\n          <TabsTrigger value="api">API Traffic</TabsTrigger>\n          <TabsTrigger value="errors">Error Inspector</TabsTrigger>\n        </TabsList>\n        <TabsContent value="overview">\n          <ObservabilityDashboard defaultDashboard="full" showSwitcher={false} />\n        </TabsContent>\n        <TabsContent value="api">\n          <ApiOverviewDashboard />\n        </TabsContent>\n        <TabsContent value="errors">\n          <ErrorMonitoringDashboard />\n        </TabsContent>\n      </Tabs>\n    </div>\n  );\n}`}
                {stylingTab === "aceternity" && `"use client";\nimport { LampContainer } from "@/components/ui/lamp";\nimport { ObservabilityDashboard } from "@ideategudy/observability-ui";\n\nexport default function AceternityObservability() {\n  return (\n    <main className="relative min-h-screen bg-black overflow-hidden">\n      <LampContainer>\n        <h1 className="bg-gradient-to-br from-slate-100 to-slate-400 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-6xl">\n          Real-Time Observability\n        </h1>\n      </LampContainer>\n      <div className="relative -mt-40 z-20 max-w-7xl mx-auto px-4 pb-20">\n        <div className="rounded-3xl border border-white/10 bg-black/60 p-2 backdrop-blur-2xl">\n          <ObservabilityDashboard defaultDashboard="full" showSwitcher={true} />\n        </div>\n      </div>\n    </main>\n  );\n}`}
              </pre>
            </div>
          </section>

          {/* Section: CLI Commands */}
          <section id="cli-commands" style={{ marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 700, margin: "0 0 1rem 0" }}>💻 Observability CLI Reference</h2>
            <p style={{ color: "#94a3b8", margin: "0 0 1.25rem 0" }}>
              The <code>@ideategudy/observability-cli</code> provides commands to scaffold, inspect, and maintain your telemetry pipeline:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
              <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", padding: "1.25rem" }}>
                <h4 style={{ margin: "0 0 0.5rem 0", color: "#38bdf8" }}>1. dashboard</h4>
                <p style={{ margin: "0 0 0.75rem 0", fontSize: "0.85rem", color: "#94a3b8" }}>
                  Detects framework (Next.js App/Pages or Vite) and generates an admin dashboard route.
                </p>
                <pre style={{ margin: 0, padding: "0.5rem", background: "#020617", borderRadius: "0.375rem", color: "#a5b4fc", fontSize: "0.8rem", overflowX: "auto" }}>
npx @ideategudy/observability-cli dashboard -y
                </pre>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", padding: "1.25rem" }}>
                <h4 style={{ margin: "0 0 0.5rem 0", color: "#34d399" }}>2. doctor / validate</h4>
                <p style={{ margin: "0 0 0.75rem 0", fontSize: "0.85rem", color: "#94a3b8" }}>
                  Validates dependencies, Node.js version, and live reachability of your backend endpoint.
                </p>
                <pre style={{ margin: 0, padding: "0.5rem", background: "#020617", borderRadius: "0.375rem", color: "#a5b4fc", fontSize: "0.8rem", overflowX: "auto" }}>
npx @ideategudy/observability-cli doctor
                </pre>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", padding: "1.25rem" }}>
                <h4 style={{ margin: "0 0 0.5rem 0", color: "#fbbf24" }}>3. init</h4>
                <p style={{ margin: "0 0 0.75rem 0", fontSize: "0.85rem", color: "#94a3b8" }}>
                  Creates an interactive <code>observability.config.ts</code> configuration file.
                </p>
                <pre style={{ margin: 0, padding: "0.5rem", background: "#020617", borderRadius: "0.375rem", color: "#a5b4fc", fontSize: "0.8rem", overflowX: "auto" }}>
npx @ideategudy/observability-cli init
                </pre>
              </div>
            </div>
          </section>

          {/* Section: Express */}
          <section id="express" style={{ marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 700, margin: "0 0 1rem 0" }}>Express Instrumentation</h2>
            <p style={{ color: "#94a3b8", margin: "0 0 1.25rem 0" }}>
              Call <code>setupObservability(app)</code> before declaring your routes. This hooks incoming requests, tracks response status codes, formats JSON logs via Winston, and registers endpoints:
            </p>
            <pre style={{ margin: 0, padding: "1.25rem", backgroundColor: "#020617", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", color: "#f8fafc", fontFamily: "monospace", fontSize: "0.875rem", lineHeight: "1.6", overflowX: "auto" }}>
{`import express from "express";
import { setupObservability } from "@ideategudy/express-nestjs-observability/express";
import { addBreadcrumb } from "@ideategudy/express-nestjs-observability";

const app = express();

// Single call enables /metrics, Winston JSON logging & /api/observability/stats
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
          <section id="nestjs" style={{ marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 700, margin: "0 0 1rem 0" }}>NestJS Module Setup</h2>
            <p style={{ color: "#94a3b8", margin: "0 0 1.25rem 0" }}>
              Import <code>ObservabilityModule.forRoot()</code> in your root <code>AppModule</code>:
            </p>
            <pre style={{ margin: 0, padding: "1.25rem", backgroundColor: "#020617", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", color: "#f8fafc", fontFamily: "monospace", fontSize: "0.875rem", lineHeight: "1.6", overflowX: "auto" }}>
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
          <section id="security" style={{ marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 700, margin: "0 0 1rem 0" }}>🔒 Production Security & Auth</h2>
            <p style={{ color: "#94a3b8", margin: "0 0 1.25rem 0" }}>
              Because live traces and error payloads contain runtime diagnostic context, always protect your dashboard route behind authentication middleware:
            </p>
            <pre style={{ margin: 0, padding: "1.25rem", backgroundColor: "#020617", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "0.75rem", color: "#f8fafc", fontFamily: "monospace", fontSize: "0.875rem", lineHeight: "1.6", overflowX: "auto" }}>
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
    </div>
  );
}
