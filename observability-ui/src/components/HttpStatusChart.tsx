import React from "react";
import { CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";
import { useObservability } from "../context.js";

export interface HttpStatusChartProps {
  breakdown: {
    status2xx: number;
    status3xx: number;
    status4xx: number;
    status5xx: number;
  };
}

export function HttpStatusChart({ breakdown }: HttpStatusChartProps) {
  const { themeColors } = useObservability();
  const total =
    breakdown.status2xx +
    breakdown.status3xx +
    breakdown.status4xx +
    breakdown.status5xx;

  const pct = (val: number) =>
    total > 0 ? ((val / total) * 100).toFixed(1) : "0.0";

  const pct2xx = parseFloat(pct(breakdown.status2xx));
  const pct3xx = parseFloat(pct(breakdown.status3xx));
  const pct4xx = parseFloat(pct(breakdown.status4xx));
  const pct5xx = parseFloat(pct(breakdown.status5xx));

  return (
    <div
      style={{
        background: themeColors?.cardBg || "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${themeColors?.cardBorder || "rgba(255, 255, 255, 0.08)"}`,
        borderRadius: "0.875rem",
        padding: "1.25rem",
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: themeColors?.text || "#f8fafc", margin: 0 }}>
          HTTP Status Distribution
        </h3>
        <span style={{ fontSize: "0.8125rem", color: themeColors?.textMuted || "#94a3b8" }}>
          {total.toLocaleString()} total
        </span>
      </div>

      {/* Segmented progress bar */}
      <div
        style={{
          width: "100%",
          height: "0.75rem",
          borderRadius: "9999px",
          background: "rgba(255, 255, 255, 0.05)",
          overflow: "hidden",
          display: "flex",
          marginBottom: "1.25rem",
        }}
      >
        <div style={{ width: `${pct2xx}%`, background: "#10b981", transition: "width 0.4s ease" }} title={`2xx: ${pct2xx}%`} />
        <div style={{ width: `${pct3xx}%`, background: "#3b82f6", transition: "width 0.4s ease" }} title={`3xx: ${pct3xx}%`} />
        <div style={{ width: `${pct4xx}%`, background: "#f59e0b", transition: "width 0.4s ease" }} title={`4xx: ${pct4xx}%`} />
        <div style={{ width: `${pct5xx}%`, background: "#ef4444", transition: "width 0.4s ease" }} title={`5xx: ${pct5xx}%`} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))", gap: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <CheckCircle2 size={16} color="#10b981" />
          <div style={{ fontSize: "0.8125rem" }}>
            <span style={{ color: themeColors?.textMuted || "#94a3b8" }}>2xx Success: </span>
            <strong style={{ color: themeColors?.text || "#f1f5f9" }}>{breakdown.status2xx.toLocaleString()}</strong> ({pct2xx}%)
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Info size={16} color="#3b82f6" />
          <div style={{ fontSize: "0.8125rem" }}>
            <span style={{ color: themeColors?.textMuted || "#94a3b8" }}>3xx Redirect: </span>
            <strong style={{ color: themeColors?.text || "#f1f5f9" }}>{breakdown.status3xx.toLocaleString()}</strong> ({pct3xx}%)
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <AlertTriangle size={16} color="#f59e0b" />
          <div style={{ fontSize: "0.8125rem" }}>
            <span style={{ color: themeColors?.textMuted || "#94a3b8" }}>4xx Client Error: </span>
            <strong style={{ color: themeColors?.text || "#f1f5f9" }}>{breakdown.status4xx.toLocaleString()}</strong> ({pct4xx}%)
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <XCircle size={16} color="#ef4444" />
          <div style={{ fontSize: "0.8125rem" }}>
            <span style={{ color: themeColors?.textMuted || "#94a3b8" }}>5xx Server Error: </span>
            <strong style={{ color: themeColors?.text || "#f1f5f9" }}>{breakdown.status5xx.toLocaleString()}</strong> ({pct5xx}%)
          </div>
        </div>
      </div>
    </div>
  );
}
