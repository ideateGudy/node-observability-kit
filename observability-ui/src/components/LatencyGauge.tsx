import React from "react";
import { Gauge, Zap, TrendingUp } from "lucide-react";
import { useObservability } from "../context.js";

export interface LatencyGaugeProps {
  p50: number;
  p95: number;
  p99: number;
  avg: number;
}

export function LatencyGauge({ p50, p95, p99, avg }: LatencyGaugeProps) {
  const { themeColors } = useObservability();

  const getLatencyColor = (ms: number) => {
    if (ms < 100) return "#10b981";
    if (ms < 300) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div
      style={{
        background: themeColors?.cardBg || "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${themeColors?.cardBorder || "rgba(255, 255, 255, 0.08)"}`,
        borderRadius: "0.875rem",
        padding: "1.25rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: themeColors?.text || "#f8fafc", margin: 0 }}>
          Response Latency Percentiles
        </h3>
        <span style={{ fontSize: "0.8125rem", color: themeColors?.textMuted || "#94a3b8" }}>
          Avg: <strong style={{ color: getLatencyColor(avg) }}>{avg} ms</strong>
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginTop: "0.5rem" }}>
        <div
          style={{
            padding: "0.875rem",
            borderRadius: "0.625rem",
            background: themeColors?.switcherBg || "rgba(255, 255, 255, 0.03)",
            border: `1px solid ${themeColors?.cardBorder || "rgba(255, 255, 255, 0.05)"}`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "0.75rem", color: themeColors?.textMuted || "#94a3b8", fontWeight: 500, marginBottom: "0.25rem" }}>
            P50 (Median)
          </div>
          <div style={{ fontSize: "1.375rem", fontWeight: 700, color: getLatencyColor(p50) }}>
            {p50} <span style={{ fontSize: "0.8125rem", fontWeight: 500 }}>ms</span>
          </div>
        </div>

        <div
          style={{
            padding: "0.875rem",
            borderRadius: "0.625rem",
            background: themeColors?.switcherBg || "rgba(255, 255, 255, 0.03)",
            border: `1px solid ${themeColors?.cardBorder || "rgba(255, 255, 255, 0.05)"}`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "0.75rem", color: themeColors?.textMuted || "#94a3b8", fontWeight: 500, marginBottom: "0.25rem" }}>
            P95 Threshold
          </div>
          <div style={{ fontSize: "1.375rem", fontWeight: 700, color: getLatencyColor(p95) }}>
            {p95} <span style={{ fontSize: "0.8125rem", fontWeight: 500 }}>ms</span>
          </div>
        </div>

        <div
          style={{
            padding: "0.875rem",
            borderRadius: "0.625rem",
            background: themeColors?.switcherBg || "rgba(255, 255, 255, 0.03)",
            border: `1px solid ${themeColors?.cardBorder || "rgba(255, 255, 255, 0.05)"}`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "0.75rem", color: themeColors?.textMuted || "#94a3b8", fontWeight: 500, marginBottom: "0.25rem" }}>
            P99 Spike Limit
          </div>
          <div style={{ fontSize: "1.375rem", fontWeight: 700, color: getLatencyColor(p99) }}>
            {p99} <span style={{ fontSize: "0.8125rem", fontWeight: 500 }}>ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}
