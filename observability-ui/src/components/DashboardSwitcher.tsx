import React, { useState } from "react";
import {
  LayoutDashboard,
  Globe,
  Gauge,
  AlertTriangle,
  Cpu,
  SquareDashedBottom,
  ChevronDown,
} from "lucide-react";

export type DashboardTemplateType =
  | "full"
  | "api"
  | "performance"
  | "errors"
  | "runtime"
  | "minimal";

export interface DashboardSwitcherProps {
  currentDashboard: DashboardTemplateType;
  onChangeDashboard: (type: DashboardTemplateType) => void;
  endpoint?: string;
}

export const DASHBOARD_TEMPLATES: {
  id: DashboardTemplateType;
  label: string;
  shortDesc: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "full",
    label: "Full Suite",
    shortDesc: "Complete metrics, traffic, latencies, runtime & errors",
    icon: <LayoutDashboard size={15} color="#6366f1" />,
  },
  {
    id: "api",
    label: "API Overview",
    shortDesc: "Traffic volume, HTTP status distribution & endpoints",
    icon: <Globe size={15} color="#38bdf8" />,
  },
  {
    id: "performance",
    label: "Performance",
    shortDesc: "P50/P95/P99 latency gauge & route response times",
    icon: <Gauge size={15} color="#a855f7" />,
  },
  {
    id: "errors",
    label: "Errors & Failures",
    shortDesc: "Aggregated exceptions, breadcrumbs & fingerprints",
    icon: <AlertTriangle size={15} color="#f43f5e" />,
  },
  {
    id: "runtime",
    label: "Node Runtime",
    shortDesc: "CPU load, RSS/Heap memory & event loop lag",
    icon: <Cpu size={15} color="#f59e0b" />,
  },
  {
    id: "minimal",
    label: "Minimal Widget",
    shortDesc: "Compact summary card for existing admin sidebars",
    icon: <SquareDashedBottom size={15} color="#10b981" />,
  },
];

export function DashboardSwitcher({
  currentDashboard,
  onChangeDashboard,
  endpoint,
}: DashboardSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeTemplate =
    DASHBOARD_TEMPLATES.find((t) => t.id === currentDashboard) ||
    DASHBOARD_TEMPLATES[0];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "0.85rem",
        padding: "0.75rem 1.25rem",
        marginBottom: "1.25rem",
        background: "linear-gradient(90deg, #0b1329 0%, #0f172a 100%)",
        border: "1px solid rgba(99, 102, 241, 0.2)",
        borderRadius: "0.75rem",
        boxShadow: "0 4px 20px -5px rgba(0, 0, 0, 0.4)",
      }}
    >
      {/* Selector & Tabs */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#818cf8",
              letterSpacing: "0.06em",
            }}
          >
            Dashboard:
          </span>
        </div>

        {/* Tab Pills for wide screens */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexWrap: "wrap" }}>
          {DASHBOARD_TEMPLATES.map((tmpl) => {
            const isActive = tmpl.id === currentDashboard;
            return (
              <button
                key={tmpl.id}
                onClick={() => onChangeDashboard(tmpl.id)}
                title={tmpl.shortDesc}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.35rem 0.75rem",
                  fontSize: "0.78rem",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "#ffffff" : "#94a3b8",
                  background: isActive
                    ? "linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(79, 70, 229, 0.9) 100%)"
                    : "rgba(255, 255, 255, 0.04)",
                  border: `1px solid ${isActive ? "rgba(129, 140, 248, 0.6)" : "rgba(255, 255, 255, 0.08)"}`,
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  transition: "all 0.15s ease-in-out",
                  boxShadow: isActive ? "0 0 12px rgba(99, 102, 241, 0.35)" : "none",
                }}
              >
                {tmpl.icon}
                <span>{tmpl.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Endpoint Live Indicator */}
      {endpoint && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.72rem",
            color: "#64748b",
            background: "rgba(0, 0, 0, 0.25)",
            padding: "0.25rem 0.65rem",
            borderRadius: "0.375rem",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
              boxShadow: "0 0 8px #10b981",
            }}
          />
          <span>Telemetry:</span>
          <code style={{ color: "#38bdf8", fontWeight: 600 }}>{endpoint}</code>
        </div>
      )}
    </div>
  );
}
