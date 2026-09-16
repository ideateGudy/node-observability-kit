import React, { useState } from "react";
import { CapturedErrorRecord, Breadcrumb } from "../types.js";
import { useObservability } from "../context.js";
import {
  AlertOctagon,
  ChevronDown,
  ChevronRight,
  Clock,
  AlertCircle,
  Copy,
  Check,
  Terminal,
  Database,
  Globe,
  Key,
  FileText,
  Layers,
  Cpu,
  Server,
  Tag,
  ArrowUpDown,
  ArrowDown,
  ArrowUp,
} from "lucide-react";

export interface ErrorInspectorProps {
  errors?: CapturedErrorRecord[];
  globalBreadcrumbs?: Breadcrumb[];
  timeWindow?: "all" | "1m" | "5m" | "15m" | "30m" | "1h" | "2h" | "24h" | "7d" | "30d";
}

function getWindowMs(window: string): number | null {
  switch (window) {
    case "1m":
      return 60 * 1000;
    case "5m":
      return 5 * 60 * 1000;
    case "15m":
      return 15 * 60 * 1000;
    case "30m":
      return 30 * 60 * 1000;
    case "1h":
      return 60 * 60 * 1000;
    case "2h":
      return 2 * 60 * 60 * 1000;
    case "24h":
      return 24 * 60 * 60 * 1000;
    case "7d":
      return 7 * 24 * 60 * 60 * 1000;
    case "30d":
      return 30 * 24 * 60 * 60 * 1000;
    default:
      return null;
  }
}

function getBreadcrumbIcon(category: Breadcrumb["category"]) {
  switch (category) {
    case "db":
      return <Database size={12} color="#38bdf8" />;
    case "http":
      return <Globe size={12} color="#818cf8" />;
    case "auth":
      return <Key size={12} color="#f59e0b" />;
    case "log":
      return <FileText size={12} color="#94a3b8" />;
    default:
      return <Tag size={12} color="#10b981" />;
  }
}

export function ErrorInspector({ errors = [], globalBreadcrumbs = [], timeWindow = "all" }: ErrorInspectorProps) {
  const { themeColors } = useObservability();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | "5xx" | "4xx">("all");
  const [viewMode, setViewMode] = useState<"errors" | "breadcrumbs">("errors");
  const [breadcrumbOrder, setBreadcrumbOrder] = useState<"newest" | "oldest">("newest");
  const [activeTab, setActiveTab] = useState<Record<string, "breadcrumbs" | "response" | "stack" | "context">>({});

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    if (!activeTab[id]) {
      setActiveTab((prev) => ({ ...prev, [id]: "breadcrumbs" }));
    }
  };

  const copyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const windowMs = getWindowMs(timeWindow);
  const cutoff = windowMs ? Date.now() - windowMs : 0;

  // Filter errors by time window, calculate window occurrences, and filter internal breadcrumbs
  const processedErrors = errors
    .map((err) => {
      let windowOccurrences = err.occurrences || 1;
      if (cutoff > 0) {
        if (err.timestamps && err.timestamps.length > 0) {
          windowOccurrences = err.timestamps.filter((ts) => ts >= cutoff).length;
        } else {
          windowOccurrences = err.timestamp >= cutoff ? (err.occurrences || 1) : 0;
        }
      }

      // Filter breadcrumbs prior to error that fall within the selected time window
      const windowBreadcrumbs = (err.breadcrumbs || []).filter((b) => {
        if (cutoff > 0 && b.timestamp < cutoff) return false;
        return true;
      });

      return {
        ...err,
        windowOccurrences,
        filteredBreadcrumbs: windowBreadcrumbs,
      };
    })
    .filter((err) => {
      // If a time window is active, hide errors that had 0 occurrences in that window
      if (cutoff > 0 && err.windowOccurrences <= 0) {
        return false;
      }
      const sc = err.statusCode || 500;
      if (statusFilter === "5xx") return sc >= 500;
      if (statusFilter === "4xx") return sc >= 400 && sc < 500;
      return true;
    });

  const filteredGlobalBreadcrumbs = globalBreadcrumbs.filter((b) => {
    if (cutoff > 0 && b.timestamp < cutoff) return false;
    return true;
  });

  return (
    <div
      style={{
        background: themeColors?.cardBg || "rgba(15, 23, 42, 0.75)",
        border: `1px solid ${themeColors?.cardBorder || "rgba(239, 68, 68, 0.2)"}`,
        borderRadius: "0.75rem",
        padding: "1.25rem",
        marginTop: "1.25rem",
        backdropFilter: "blur(12px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <AlertCircle size={18} color="#ef4444" />
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#f8fafc", margin: 0 }}>
              Recent Exceptions & Failure Logs ({processedErrors.length})
            </h3>
          </div>

          {/* View Toggle: Exceptions vs Live Breadcrumb Trail */}
          <div style={{ display: "flex", background: "rgba(30, 41, 59, 0.6)", borderRadius: "0.375rem", padding: "0.15rem", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <button
              onClick={() => setViewMode("errors")}
              style={{
                background: viewMode === "errors" ? "#ef4444" : "transparent",
                border: "none",
                color: "#f8fafc",
                fontSize: "0.75rem",
                padding: "0.2rem 0.55rem",
                borderRadius: "0.25rem",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Exceptions ({processedErrors.length})
            </button>
            <button
              onClick={() => setViewMode("breadcrumbs")}
              style={{
                background: viewMode === "breadcrumbs" ? "#6366f1" : "transparent",
                border: "none",
                color: "#f8fafc",
                fontSize: "0.75rem",
                padding: "0.2rem 0.55rem",
                borderRadius: "0.25rem",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Live Breadcrumbs ({filteredGlobalBreadcrumbs.length})
            </button>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {viewMode === "errors" && (
            <div style={{ display: "flex", background: "rgba(30, 41, 59, 0.6)", borderRadius: "0.375rem", padding: "0.15rem", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <button
                onClick={() => setStatusFilter("all")}
                style={{
                  background: statusFilter === "all" ? "#334155" : "transparent",
                  border: "none",
                  color: statusFilter === "all" ? "#f8fafc" : "#94a3b8",
                  fontSize: "0.75rem",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                }}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter("5xx")}
                style={{
                  background: statusFilter === "5xx" ? "#ef4444" : "transparent",
                  border: "none",
                  color: "#f8fafc",
                  fontSize: "0.75rem",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                }}
              >
                5xx Server
              </button>
              <button
                onClick={() => setStatusFilter("4xx")}
                style={{
                  background: statusFilter === "4xx" ? "#f59e0b" : "transparent",
                  border: "none",
                  color: "#f8fafc",
                  fontSize: "0.75rem",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                }}
              >
                4xx Client
              </button>
            </div>
          )}
          <span
            style={{
              fontSize: "0.75rem",
              padding: "0.2rem 0.6rem",
              borderRadius: "9999px",
              background: "rgba(239, 68, 68, 0.15)",
              color: "#fca5a5",
              fontWeight: 500,
            }}
          >
            Live Stream
          </span>
        </div>
      </div>

      {viewMode === "errors" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {processedErrors.map((err) => {
          const isExpanded = expandedId === err.id;
          const timeStr = new Date(err.timestamp).toLocaleTimeString();
          const statusCode = err.statusCode || 500;
          const currentTab = activeTab[err.id] || "breadcrumbs";
          const occurrences = err.windowOccurrences ?? (err.occurrences || 1);

          return (
            <div
              key={err.id}
              style={{
                background: "rgba(30, 41, 59, 0.5)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "0.5rem",
                overflow: "hidden",
                transition: "all 0.15s ease",
              }}
            >
              <div
                onClick={() => toggleExpand(err.id)}
                style={{
                  padding: "0.75rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1, minWidth: 0 }}>
                  {isExpanded ? <ChevronDown size={16} color="#94a3b8" /> : <ChevronRight size={16} color="#94a3b8" />}
                  
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      fontFamily: "monospace",
                      padding: "0.15rem 0.4rem",
                      borderRadius: "0.25rem",
                      background: statusCode >= 500 ? "rgba(239, 68, 68, 0.2)" : "rgba(245, 158, 11, 0.2)",
                      color: statusCode >= 500 ? "#f87171" : "#fbbf24",
                    }}
                  >
                    {statusCode}
                  </span>

                  {/* Grouped Occurrences Badge */}
                  {occurrences > 1 && (
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        fontFamily: "monospace",
                        padding: "0.15rem 0.45rem",
                        borderRadius: "9999px",
                        background: "rgba(99, 102, 241, 0.25)",
                        border: "1px solid rgba(129, 140, 248, 0.3)",
                        color: "#a5b4fc",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.2rem",
                      }}
                      title={`Grouped Issue: Occurred ${occurrences} times`}
                    >
                      <Layers size={10} />
                      x{occurrences}
                    </span>
                  )}

                  {err.method && (
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        fontFamily: "monospace",
                        color: "#94a3b8",
                      }}
                    >
                      {err.method}
                    </span>
                  )}

                  {err.route && (
                    <span
                      style={{
                        fontSize: "0.8rem",
                        fontFamily: "monospace",
                        color: "#cbd5e1",
                      }}
                    >
                      {err.route}
                    </span>
                  )}

                  <span
                    style={{
                      fontSize: "0.85rem",
                      color: "#f87171",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      flex: 1,
                    }}
                  >
                    {err.message}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#64748b", fontSize: "0.75rem", marginLeft: "1rem" }}>
                  <Clock size={13} />
                  <span>{timeStr}</span>
                </div>
              </div>

              {isExpanded && (
                <div
                  style={{
                    padding: "0.75rem 1rem 1rem 1rem",
                    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                    background: "rgba(10, 15, 26, 0.6)",
                  }}
                >
                  {/* Action Bar with cURL, JSON, and Tab Selector */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                    <div style={{ display: "flex", gap: "0.35rem" }}>
                      <button
                        onClick={() => setActiveTab((prev) => ({ ...prev, [err.id]: "breadcrumbs" }))}
                        style={{
                          background: currentTab === "breadcrumbs" ? "rgba(99, 102, 241, 0.2)" : "rgba(255, 255, 255, 0.04)",
                          border: `1px solid ${currentTab === "breadcrumbs" ? "#6366f1" : "rgba(255, 255, 255, 0.08)"}`,
                          color: currentTab === "breadcrumbs" ? "#e0e7ff" : "#94a3b8",
                          fontSize: "0.75rem",
                          padding: "0.25rem 0.6rem",
                          borderRadius: "0.375rem",
                          cursor: "pointer",
                          fontWeight: 500,
                        }}
                      >
                        Breadcrumbs ({err.filteredBreadcrumbs?.length ?? err.breadcrumbs?.length ?? 0})
                      </button>
                      {err.responseBody && (
                        <button
                          onClick={() => setActiveTab((prev) => ({ ...prev, [err.id]: "response" }))}
                          style={{
                            background: currentTab === "response" ? "rgba(239, 68, 68, 0.2)" : "rgba(255, 255, 255, 0.04)",
                            border: `1px solid ${currentTab === "response" ? "#ef4444" : "rgba(255, 255, 255, 0.08)"}`,
                            color: currentTab === "response" ? "#fca5a5" : "#94a3b8",
                            fontSize: "0.75rem",
                            padding: "0.25rem 0.6rem",
                            borderRadius: "0.375rem",
                            cursor: "pointer",
                            fontWeight: 500,
                          }}
                        >
                          Response Payload
                        </button>
                      )}
                      {err.stack && (
                        <button
                          onClick={() => setActiveTab((prev) => ({ ...prev, [err.id]: "stack" }))}
                          style={{
                            background: currentTab === "stack" ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.04)",
                            border: `1px solid ${currentTab === "stack" ? "#cbd5e1" : "rgba(255, 255, 255, 0.08)"}`,
                            color: currentTab === "stack" ? "#f8fafc" : "#94a3b8",
                            fontSize: "0.75rem",
                            padding: "0.25rem 0.6rem",
                            borderRadius: "0.375rem",
                            cursor: "pointer",
                            fontWeight: 500,
                          }}
                        >
                          Stack Trace
                        </button>
                      )}
                      <button
                        onClick={() => setActiveTab((prev) => ({ ...prev, [err.id]: "context" }))}
                        style={{
                          background: currentTab === "context" ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 255, 255, 0.04)",
                          border: `1px solid ${currentTab === "context" ? "#10b981" : "rgba(255, 255, 255, 0.08)"}`,
                          color: currentTab === "context" ? "#a7f3d0" : "#94a3b8",
                          fontSize: "0.75rem",
                          padding: "0.25rem 0.6rem",
                          borderRadius: "0.375rem",
                          cursor: "pointer",
                          fontWeight: 500,
                        }}
                      >
                        Context & Tags
                      </button>
                    </div>

                    <div style={{ display: "flex", gap: "0.35rem" }}>
                      {err.route && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const curlCmd = `curl -X ${err.method || "GET"} "http://localhost:5000${err.route}"`;
                            copyText(`curl-${err.id}`, curlCmd);
                          }}
                          style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "0.25rem",
                            color: "#cbd5e1",
                            fontSize: "0.7rem",
                            padding: "0.2rem 0.5rem",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.25rem",
                          }}
                          title="Copy as cURL command to replay in terminal"
                        >
                          {copiedId === `curl-${err.id}` ? <Check size={11} color="#10b981" /> : <Terminal size={11} />}
                          {copiedId === `curl-${err.id}` ? "Copied cURL" : "Copy cURL"}
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const fullError = JSON.stringify(err, null, 2);
                          copyText(`json-${err.id}`, fullError);
                        }}
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "0.25rem",
                          color: "#cbd5e1",
                          fontSize: "0.7rem",
                          padding: "0.2rem 0.5rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.25rem",
                        }}
                        title="Copy full error metadata as JSON"
                      >
                        {copiedId === `json-${err.id}` ? <Check size={11} color="#10b981" /> : <Copy size={11} />}
                        {copiedId === `json-${err.id}` ? "Copied JSON" : "Copy JSON"}
                      </button>
                    </div>
                  </div>

                  {/* TAB 1: Breadcrumbs Timeline */}
                  {currentTab === "breadcrumbs" && (() => {
                    const rawCrumbs = err.filteredBreadcrumbs ?? err.breadcrumbs ?? [];
                    const sortedCrumbs = [...rawCrumbs].sort((a, b) => {
                      return breadcrumbOrder === "newest" ? b.timestamp - a.timestamp : a.timestamp - b.timestamp;
                    });

                    return (
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                          <div style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 600 }}>
                            Breadcrumbs Trail ({sortedCrumbs.length} events {timeWindow !== "all" ? `in ${timeWindow}` : "prior to crash"}):
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setBreadcrumbOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
                            }}
                            style={{
                              background: "rgba(255, 255, 255, 0.05)",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                              borderRadius: "0.25rem",
                              color: "#cbd5e1",
                              fontSize: "0.7rem",
                              padding: "0.2rem 0.5rem",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.3rem",
                            }}
                            title="Toggle breadcrumbs sort order"
                          >
                            <ArrowUpDown size={11} color="#94a3b8" />
                            <span>{breadcrumbOrder === "newest" ? "Newest First" : "Oldest First"}</span>
                          </button>
                        </div>

                        {sortedCrumbs.length === 0 ? (
                          <div style={{ fontSize: "0.75rem", color: "#64748b", padding: "0.5rem 0" }}>
                            No breadcrumb events were recorded {timeWindow !== "all" ? `within ${timeWindow}` : "prior to this failure"}.
                          </div>
                        ) : (
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                            {sortedCrumbs.map((crumb, idx) => {
                              const crumbTime = new Date(crumb.timestamp).toLocaleTimeString();
                              return (
                                <div
                                  key={idx}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.6rem",
                                    background: "rgba(15, 23, 42, 0.6)",
                                    padding: "0.4rem 0.75rem",
                                    borderRadius: "0.375rem",
                                    borderLeft: `3px solid ${
                                      crumb.level === "error" ? "#ef4444" : crumb.level === "warn" ? "#f59e0b" : "#6366f1"
                                    }`,
                                  }}
                                >
                                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                    {getBreadcrumbIcon(crumb.category)}
                                    <span
                                      style={{
                                        fontSize: "0.7rem",
                                        fontWeight: 600,
                                        fontFamily: "monospace",
                                        color: "#94a3b8",
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      {crumb.category}
                                    </span>
                                  </div>
                                  <span style={{ fontSize: "0.8rem", color: "#e2e8f0", fontFamily: "monospace", flex: 1 }}>
                                    {crumb.message}
                                  </span>
                                  <span style={{ fontSize: "0.7rem", color: "#64748b" }}>
                                    {crumbTime}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* TAB 2: Returned Response Payload */}
                  {currentTab === "response" && err.responseBody && (
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginBottom: "0.25rem", fontWeight: 600 }}>
                        Returned Response Payload:
                      </div>
                      <pre
                        style={{
                          fontSize: "0.75rem",
                          fontFamily: "monospace",
                          color: "#fca5a5",
                          background: "#0c1322",
                          padding: "0.75rem",
                          borderRadius: "0.375rem",
                          overflowX: "auto",
                          margin: 0,
                          lineHeight: 1.45,
                          border: "1px solid rgba(239, 68, 68, 0.25)",
                        }}
                      >
                        {typeof err.responseBody === "object"
                          ? JSON.stringify(err.responseBody, null, 2)
                          : String(err.responseBody)}
                      </pre>
                    </div>
                  )}

                  {/* TAB 3: Stack Trace */}
                  {currentTab === "stack" && err.stack && (
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginBottom: "0.25rem", fontWeight: 600 }}>
                        Stack Trace:
                      </div>
                      <pre
                        style={{
                          fontSize: "0.75rem",
                          fontFamily: "monospace",
                          color: "#cbd5e1",
                          background: "#050811",
                          padding: "0.75rem",
                          borderRadius: "0.375rem",
                          overflowX: "auto",
                          margin: 0,
                          lineHeight: 1.45,
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                        }}
                      >
                        {err.stack}
                      </pre>
                    </div>
                  )}

                  {/* TAB 4: System Context & Tags */}
                  {currentTab === "context" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      <div style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 600 }}>
                        System Context & Environment Tags:
                      </div>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                          gap: "0.5rem",
                        }}
                      >
                        <div style={{ background: "rgba(15, 23, 42, 0.7)", padding: "0.5rem 0.75rem", borderRadius: "0.375rem", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                          <div style={{ fontSize: "0.7rem", color: "#64748b", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                            <Server size={11} /> OS & Architecture
                          </div>
                          <div style={{ fontSize: "0.8rem", color: "#f8fafc", fontWeight: 600, fontFamily: "monospace" }}>
                            {err.context?.os || "Node Host"}
                          </div>
                        </div>

                        <div style={{ background: "rgba(15, 23, 42, 0.7)", padding: "0.5rem 0.75rem", borderRadius: "0.375rem", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                          <div style={{ fontSize: "0.7rem", color: "#64748b", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                            <Cpu size={11} /> Node Runtime
                          </div>
                          <div style={{ fontSize: "0.8rem", color: "#f8fafc", fontWeight: 600, fontFamily: "monospace" }}>
                            {err.context?.nodeVersion || "Node.js"}
                          </div>
                        </div>

                        {err.context?.memoryMb !== undefined && (
                          <div style={{ background: "rgba(15, 23, 42, 0.7)", padding: "0.5rem 0.75rem", borderRadius: "0.375rem", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                            <div style={{ fontSize: "0.7rem", color: "#64748b" }}>Heap Memory at Crash</div>
                            <div style={{ fontSize: "0.8rem", color: "#38bdf8", fontWeight: 600, fontFamily: "monospace" }}>
                              {err.context.memoryMb} MB
                            </div>
                          </div>
                        )}

                        {err.fingerprint && (
                          <div style={{ background: "rgba(15, 23, 42, 0.7)", padding: "0.5rem 0.75rem", borderRadius: "0.375rem", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                            <div style={{ fontSize: "0.7rem", color: "#64748b" }}>Fingerprint Hash</div>
                            <div style={{ fontSize: "0.75rem", color: "#a5b4fc", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {err.fingerprint}
                            </div>
                          </div>
                        )}
                      </div>

                      {err.context?.headers && (
                        <div>
                          <div style={{ fontSize: "0.7rem", color: "#64748b", marginBottom: "0.25rem" }}>
                            Request Headers:
                          </div>
                          <pre
                            style={{
                              fontSize: "0.7rem",
                              fontFamily: "monospace",
                              color: "#94a3b8",
                              background: "#050811",
                              padding: "0.5rem 0.75rem",
                              borderRadius: "0.375rem",
                              margin: 0,
                            }}
                          >
                            {JSON.stringify(err.context.headers, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      )}

      {/* VIEW MODE 2: Global Live Breadcrumbs Feed */}
      {viewMode === "breadcrumbs" && (() => {
        const sortedGlobalCrumbs = [...filteredGlobalBreadcrumbs].sort((a, b) => {
          return breadcrumbOrder === "newest" ? b.timestamp - a.timestamp : a.timestamp - b.timestamp;
        });

        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.8125rem", color: "#94a3b8" }}>
                Showing {sortedGlobalCrumbs.length} events {timeWindow !== "all" ? `within ${timeWindow}` : "across session"}
              </span>

              <button
                onClick={() => setBreadcrumbOrder((prev) => (prev === "newest" ? "oldest" : "newest"))}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "0.25rem",
                  color: "#cbd5e1",
                  fontSize: "0.7rem",
                  padding: "0.2rem 0.5rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
                title="Toggle breadcrumb sort order"
              >
                <ArrowUpDown size={11} color="#94a3b8" />
                <span>{breadcrumbOrder === "newest" ? "Newest First" : "Oldest First"}</span>
              </button>
            </div>

            {sortedGlobalCrumbs.length === 0 ? (
              <div style={{ padding: "1.5rem", textAlign: "center", color: "#64748b", fontSize: "0.85rem" }}>
                No breadcrumb events recorded in this time window ({timeWindow}).
              </div>
            ) : (
              sortedGlobalCrumbs.map((crumb, idx) => {
              const crumbTime = new Date(crumb.timestamp).toLocaleTimeString();
              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    background: "rgba(30, 41, 59, 0.5)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    borderRadius: "0.5rem",
                    padding: "0.6rem 1rem",
                    borderLeft: `3px solid ${
                      crumb.level === "error" ? "#ef4444" : crumb.level === "warn" ? "#f59e0b" : "#6366f1"
                    }`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    {getBreadcrumbIcon(crumb.category)}
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        fontFamily: "monospace",
                        color: "#94a3b8",
                        textTransform: "uppercase",
                      }}
                    >
                      {crumb.category}
                    </span>
                  </div>

                  <span style={{ fontSize: "0.825rem", color: "#e2e8f0", fontFamily: "monospace", flex: 1 }}>
                    {crumb.message}
                  </span>

                  {crumb.data && (
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontFamily: "monospace",
                        color: "#64748b",
                        background: "rgba(15, 23, 42, 0.6)",
                        padding: "0.1rem 0.4rem",
                        borderRadius: "0.25rem",
                      }}
                    >
                      {JSON.stringify(crumb.data)}
                    </span>
                  )}

                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "#64748b", fontSize: "0.75rem" }}>
                    <Clock size={12} />
                    <span>{crumbTime}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
        );
      })()}
    </div>
  );
}
