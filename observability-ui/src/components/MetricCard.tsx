import React from "react";
import { ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { useObservability } from "../context.js";

export interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  statusColor?: "green" | "emerald" | "amber" | "rose" | "blue" | "indigo";
}

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  rightElement,
  statusColor = "emerald",
}: MetricCardProps) {
  const { themeColors } = useObservability();

  const glowColors: Record<string, string> = {
    emerald: "from-emerald-500/10 to-transparent border-emerald-500/20",
    green: "from-green-500/10 to-transparent border-green-500/20",
    amber: "from-amber-500/10 to-transparent border-amber-500/20",
    rose: "from-rose-500/10 to-transparent border-rose-500/20",
    blue: "from-blue-500/10 to-transparent border-blue-500/20",
    indigo: "from-indigo-500/10 to-transparent border-indigo-500/20",
  };

  const borderGlow = glowColors[statusColor] || glowColors.emerald;

  return (
    <div
      style={{
        background: themeColors?.cardBg || "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: `1px solid ${themeColors?.cardBorder || "rgba(255, 255, 255, 0.08)"}`,
        borderRadius: "0.875rem",
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.4)",
        transition: "all 0.2s ease-in-out",
      }}
      className="hover:border-slate-600/50"
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: themeColors?.textMuted || "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {title}
          </span>
          <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#f8fafc", marginTop: "0.375rem", letterSpacing: "-0.025em" }}>
            {value}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {rightElement}
          {icon && (
            <div
              style={{
                padding: "0.625rem",
                borderRadius: "0.625rem",
                background: "rgba(255, 255, 255, 0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon}
            </div>
          )}
        </div>
      </div>

      {(subtitle || trend) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "1rem",
            paddingTop: "0.75rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            fontSize: "0.8125rem",
            color: "#64748b",
          }}
        >
          {trend && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontWeight: 600,
                marginRight: "0.5rem",
                color: trend.isPositive ? "#10b981" : "#f43f5e",
              }}
            >
              {trend.isPositive ? <ArrowUpRight size={14} style={{ marginRight: 2 }} /> : <ArrowDownRight size={14} style={{ marginRight: 2 }} />}
              {trend.value}
            </span>
          )}
          {subtitle && <span>{subtitle}</span>}
        </div>
      )}
    </div>
  );
}

export function MetricGrid({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "1rem",
        marginBottom: "1.5rem",
      }}
    >
      {children}
    </div>
  );
}
