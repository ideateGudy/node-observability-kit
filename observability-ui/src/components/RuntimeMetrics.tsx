import React from "react";
import { Cpu, HardDrive, Zap, Box } from "lucide-react";
import { useObservability } from "../context.js";

export interface RuntimeMetricsProps {
  cpuPercent: number;
  memoryRssMb: number;
  heapUsedMb: number;
  heapTotalMb: number;
  eventLoopLagMs: number;
  nodeVersion: string;
}

export function RuntimeMetrics({
  cpuPercent,
  memoryRssMb,
  heapUsedMb,
  heapTotalMb,
  eventLoopLagMs,
  nodeVersion,
}: RuntimeMetricsProps) {
  const { themeColors } = useObservability();
  const heapPercent = heapTotalMb > 0 ? ((heapUsedMb / heapTotalMb) * 100).toFixed(0) : "0";

  return (
    <div
      style={{
        background: themeColors?.cardBg || "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${themeColors?.cardBorder || "rgba(255, 255, 255, 0.08)"}`,
        borderRadius: "0.875rem",
        padding: "1.25rem",
        marginBottom: "1.5rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: themeColors?.text || "#f8fafc", margin: 0 }}>
          Node.js Runtime & Resource Utilization
        </h3>
        <span style={{ fontSize: "0.8125rem", color: themeColors?.textMuted || "#94a3b8" }}>
          Node {nodeVersion}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        {/* CPU */}
        <div
          style={{
            padding: "1rem",
            borderRadius: "0.75rem",
            background: themeColors?.surfaceSubtle || "rgba(255, 255, 255, 0.03)",
            border: `1px solid ${themeColors?.borderSubtle || "rgba(255, 255, 255, 0.05)"}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: themeColors?.accent || "#38bdf8", marginBottom: "0.5rem" }}>
            <Cpu size={16} />
            <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: themeColors?.textMuted || "#94a3b8" }}>Process CPU</span>
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: themeColors?.text || "#f8fafc" }}>
            {cpuPercent} %
          </div>
          <div style={{ width: "100%", height: "4px", background: "rgba(255, 255, 255, 0.1)", borderRadius: "9999px", marginTop: "0.5rem", overflow: "hidden" }}>
            <div style={{ width: `${Math.min(100, cpuPercent)}%`, height: "100%", background: cpuPercent > 80 ? "#ef4444" : themeColors?.accent || "#38bdf8" }} />
          </div>
        </div>

        {/* Memory RSS */}
        <div
          style={{
            padding: "1rem",
            borderRadius: "0.75rem",
            background: themeColors?.surfaceSubtle || "rgba(255, 255, 255, 0.03)",
            border: `1px solid ${themeColors?.borderSubtle || "rgba(255, 255, 255, 0.05)"}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: themeColors?.accentSecondary || "#a855f7", marginBottom: "0.5rem" }}>
            <HardDrive size={16} />
            <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: themeColors?.textMuted || "#94a3b8" }}>Resident Memory (RSS)</span>
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: themeColors?.text || "#f8fafc" }}>
            {memoryRssMb} <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>MB</span>
          </div>
          <div style={{ fontSize: "0.75rem", color: themeColors?.textMuted || "#64748b", marginTop: "0.5rem" }}>
            Total process allocation
          </div>
        </div>

        {/* Heap Usage */}
        <div
          style={{
            padding: "1rem",
            borderRadius: "0.75rem",
            background: themeColors?.surfaceSubtle || "rgba(255, 255, 255, 0.03)",
            border: `1px solid ${themeColors?.borderSubtle || "rgba(255, 255, 255, 0.05)"}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#10b981", marginBottom: "0.5rem" }}>
            <Box size={16} />
            <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: themeColors?.textMuted || "#94a3b8" }}>V8 Heap Used / Total</span>
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: themeColors?.text || "#f8fafc" }}>
            {heapUsedMb} <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>/ {heapTotalMb} MB</span>
          </div>
          <div style={{ width: "100%", height: "4px", background: "rgba(255, 255, 255, 0.1)", borderRadius: "9999px", marginTop: "0.5rem", overflow: "hidden" }}>
            <div style={{ width: `${heapPercent}%`, height: "100%", background: "#10b981" }} />
          </div>
        </div>

        {/* Event Loop */}
        <div
          style={{
            padding: "1rem",
            borderRadius: "0.75rem",
            background: themeColors?.surfaceSubtle || "rgba(255, 255, 255, 0.03)",
            border: `1px solid ${themeColors?.borderSubtle || "rgba(255, 255, 255, 0.05)"}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#f59e0b", marginBottom: "0.5rem" }}>
            <Zap size={16} />
            <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: themeColors?.textMuted || "#94a3b8" }}>Event Loop Lag</span>
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: themeColors?.text || "#f8fafc" }}>
            {eventLoopLagMs} <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>ms</span>
          </div>
          <div style={{ fontSize: "0.75rem", color: "#10b981", marginTop: "0.5rem" }}>
            ● Normal execution pace
          </div>
        </div>
      </div>
    </div>
  );
}
