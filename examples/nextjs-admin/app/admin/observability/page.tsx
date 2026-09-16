"use client";

import { useState, useEffect } from "react";
import { ObservabilityDashboard } from "@stacklenzz/ui";

/**
 * Next.js Admin Observability Page
 * Location: app/admin/observability/page.tsx
 *
 * Uses the built-in ObservabilityDashboard component from @ideategudy/observability-ui
 * which includes the interactive Template Switcher to toggle between:
 * - Full Suite
 * - API Overview
 * - Performance
 * - Errors & Failures
 * - Node Runtime
 * - Minimal Widget
 */
export default function AdminObservabilityPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "#090d16" }}>
        <div style={{ padding: "2rem", color: "#64748b", fontFamily: "sans-serif" }}>
          Loading Observability Console...
        </div>
      </main>
    );
  }

  const config = {
    endpoint: process.env.NEXT_PUBLIC_OBSERVABILITY_URL || "http://localhost:5000/api/observability/stats",
    refreshIntervalMs: 5000,
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "transparent" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 1.5rem",
          background: "rgba(15, 23, 42, 0.8)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          fontSize: "0.85rem",
        }}
      >
        <div style={{ color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span>Live Demo Console</span>
          <span style={{ color: "#475569" }}>•</span>
          <span style={{ color: "#10b981", fontWeight: 600 }}>Connected</span>
        </div>
        <a
          href="/docs"
          style={{
            color: "#818cf8",
            textDecoration: "none",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          ← Back to Documentation
        </a>
      </div>
      <ObservabilityDashboard
        config={config}
        defaultDashboard="full"
        showSwitcher={true}
      />
    </main>
  );
}
