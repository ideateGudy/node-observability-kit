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
      <main className="min-h-screen bg-background">
        <div className="p-8 text-slate-500 font-sans">
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
    <main className="min-h-screen bg-transparent">
      {/* Top Demo Banner */}
      <div className="flex justify-between items-center px-3 py-2 sm:px-6 sm:py-2.5 bg-gradient-to-r from-slate-800/95 to-slate-900/95 border-b border-white/10 text-xs sm:text-sm flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-[11px] sm:text-xs border border-indigo-500/30">
            <Sparkles size={11} /> Interactive Demo
          </span>
          <span className="text-slate-400 text-[11px] sm:text-xs">
            Loaded with simulated cluster metrics &amp; failure records
          </span>
        </div>

        <Link
          href="/docs"
          className="text-indigo-400 hover:text-indigo-300 no-underline font-semibold inline-flex items-center gap-1.5 text-[11px] sm:text-xs"
        >
          <ArrowLeft size={13} /> Back to Documentation
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
