"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ObservabilityDashboard } from "@stacklenzz/ui";
import { Sparkles, ArrowLeft, ShieldAlert } from "lucide-react";

/**
 * Documentation Demo Observability Dashboard Page
 * Route: /docs/observability-dashboard
 *
 * Runs strictly in mockMode: true with realistic dummy data
 * showcasing all 6 templates, 500 error traces, breadcrumbs,
 * and time-window analytics without requiring a backend server.
 */
export default function DocsObservabilityDashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "#090d16" }}>
        <div style={{ padding: "2rem", color: "#64748b", fontFamily: "sans-serif" }}>
          Loading Documentation Demo Console...
        </div>
      </main>
    );
  }

  // mockMode: true ensures only dummy data is loaded, completely offline
  const config = {
    mockMode: true,
    refreshIntervalMs: 5000,
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "transparent" }}>
      {/* Top Demo Banner */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.6rem 1.5rem",
          background: "linear-gradient(90deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          fontSize: "0.85rem",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              padding: "0.15rem 0.5rem",
              borderRadius: "9999px",
              background: "rgba(99, 102, 241, 0.2)",
              color: "#a5b4fc",
              fontWeight: 700,
              fontSize: "0.72rem",
              border: "1px solid rgba(99, 102, 241, 0.3)",
            }}
          >
            <Sparkles size={11} /> Interactive Demo
          </span>
          <span style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
            Loaded with simulated cluster metrics &amp; failure records
          </span>
        </div>

        <Link
          href="/docs"
          style={{
            color: "#818cf8",
            textDecoration: "none",
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.8rem",
          }}
        >
          <ArrowLeft size={14} /> Back to Documentation
        </Link>
      </div>

      {/* Render Universal Observability Dashboard with Template Switcher */}
      <ObservabilityDashboard
        config={config}
        defaultDashboard="full"
        showSwitcher={true}
      />
    </main>
  );
}
