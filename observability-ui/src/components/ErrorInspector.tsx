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
        backdropFilter: "blur(12px)",
      }}
      className="p-4 sm:p-6 rounded-3xl border backdrop-blur-xl shadow-2xl mt-6 w-full"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-5 w-full">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-500 shrink-0 shadow-sm">
              <AlertCircle size={20} />
            </div>
            <h3
              style={{ color: themeColors?.text || "#f8fafc" }}
              className="text-base sm:text-lg font-extrabold m-0 tracking-tight"
            >
              Recent Exceptions & Failure Logs ({processedErrors.length})
            </h3>
          </div>

          {/* View Mode Switcher: Exceptions (solid red bg ONLY when active) vs Live Breadcrumbs (indigo bg ONLY when active) */}
          <div className="flex items-center bg-slate-900/90 p-1.5 rounded-2xl border border-white/10 text-xs font-bold shrink-0">
            <button
              onClick={() => setViewMode("errors")}
              style={
                viewMode === "errors"
                  ? { backgroundColor: "#dc2626", color: "#ffffff" }
                  : { backgroundColor: "transparent", color: "#94a3b8" }
              }
              className={`px-3.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer font-extrabold ${
                viewMode === "errors"
                  ? "shadow-lg shadow-red-600/50 scale-100"
                  : "hover:text-white hover:bg-white/5"
              }`}
            >
              Exceptions ({processedErrors.length})
            </button>
            <button
              onClick={() => setViewMode("breadcrumbs")}
              style={
                viewMode === "breadcrumbs"
                  ? { backgroundColor: "#4f46e5", color: "#ffffff" }
                  : { backgroundColor: "transparent", color: "#94a3b8" }
              }
              className={`px-3.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer font-bold ${
                viewMode === "breadcrumbs"
                  ? "shadow-lg shadow-indigo-600/50 scale-100"
                  : "hover:text-white hover:bg-white/5"
              }`}
            >
              Live Breadcrumbs ({filteredGlobalBreadcrumbs.length})
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 w-full md:w-auto">
          {viewMode === "errors" && (
            <div className="flex items-center bg-slate-900/90 p-1.5 rounded-2xl border border-white/10 text-xs font-bold">
              <button
                onClick={() => setStatusFilter("all")}
                style={
                  statusFilter === "all"
                    ? { backgroundColor: "#334155", color: "#ffffff" }
                    : { backgroundColor: "transparent", color: "#94a3b8" }
                }
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  statusFilter === "all"
                    ? "shadow-sm"
                    : "hover:text-white hover:bg-white/5"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter("5xx")}
                style={
                  statusFilter === "5xx"
                    ? { backgroundColor: "#dc2626", color: "#ffffff" }
                    : { backgroundColor: "rgba(220, 38, 38, 0.15)", color: "#fca5a5" }
                }
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  statusFilter === "5xx"
                    ? "shadow-md shadow-red-600/40"
                    : "hover:bg-red-600/30"
                }`}
              >
                5xx Server
              </button>
              <button
                onClick={() => setStatusFilter("4xx")}
                style={
                  statusFilter === "4xx"
                    ? { backgroundColor: "#f59e0b", color: "#020617" }
                    : { backgroundColor: "rgba(245, 158, 11, 0.15)", color: "#fde68a" }
                }
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  statusFilter === "4xx"
                    ? "font-black shadow-md shadow-amber-500/30"
                    : "hover:bg-amber-500/30"
                }`}
              >
                4xx Client
              </button>
            </div>
          )}

          {/* Live Stream badge: Green pulsing animation */}
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-extrabold uppercase tracking-wider shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Stream
          </span>
        </div>
      </div>

      {viewMode === "errors" && (
        <div className="flex flex-col gap-2 w-full">
          {processedErrors.map((err) => {
            const isExpanded = expandedId === err.id;
            const timeStr = new Date(err.timestamp).toLocaleTimeString();
            const statusCode = err.statusCode || 500;
            const currentTab = activeTab[err.id] || "breadcrumbs";
            const occurrences = err.windowOccurrences ?? (err.occurrences || 1);

            return (
              <div
                key={err.id}
                className="bg-slate-800/50 border border-white/10 rounded-xl overflow-hidden transition-all duration-200 hover:border-slate-600/80 shadow-sm"
              >
                <div
                  onClick={() => toggleExpand(err.id)}
                  className="flex items-center justify-between p-3 sm:p-4 cursor-pointer select-none gap-2 hover:bg-slate-800/80 transition-colors"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                    <div className="shrink-0 text-slate-400">
                      {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </div>

                    <span
                      style={
                        statusCode >= 500
                          ? { backgroundColor: "rgba(239, 68, 68, 0.2)", color: "#f87171", borderColor: "rgba(239, 68, 68, 0.3)" }
                          : { backgroundColor: "rgba(245, 158, 11, 0.2)", color: "#fbbf24", borderColor: "rgba(245, 158, 11, 0.3)" }
                      }
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded border shrink-0 ${
                        statusCode >= 500
                          ? "bg-red-500/20 text-red-400 border-red-500/30"
                          : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                      }`}
                    >
                      {statusCode}
                    </span>

                    {/* Grouped Occurrences Badge */}
                    {occurrences > 1 && (
                      <span
                        style={{ backgroundColor: "rgba(99, 102, 241, 0.2)", color: "#a5b4fc", borderColor: "rgba(99, 102, 241, 0.3)" }}
                        className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 flex items-center gap-1 shrink-0"
                        title={`Grouped Issue: Occurred ${occurrences} times`}
                      >
                        <Layers size={10} />
                        x{occurrences}
                      </span>
                    )}

                    {err.method && (
                      <span
                        style={{ color: "#94a3b8" }}
                        className="text-xs font-mono font-bold text-slate-400 shrink-0"
                      >
                        {err.method}
                      </span>
                    )}

                    {err.route && (
                      <span
                        style={{ color: "#cbd5e1" }}
                        className="text-xs sm:text-sm font-mono text-slate-300 truncate max-w-[120px] sm:max-w-[200px] md:max-w-none"
                      >
                        {err.route}
                      </span>
                    )}

                    <span
                      style={{ color: "#f87171" }}
                      className="text-xs sm:text-sm font-medium text-red-400 truncate flex-1 min-w-0"
                    >
                      {err.message}
                    </span>
                  </div>

                  <div
                    style={{ color: "#64748b" }}
                    className="flex items-center gap-1.5 text-slate-400 text-xs shrink-0 ml-2"
                  >
                    <Clock size={13} className="hidden sm:inline" />
                    <span className="font-mono text-[11px] sm:text-xs">{timeStr}</span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-3 sm:p-4 border-t border-white/5 bg-slate-950/70">
                    {/* Action Bar with cURL, JSON, and Tab Selector */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2.5">
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          onClick={() => setActiveTab((prev) => ({ ...prev, [err.id]: "breadcrumbs" }))}
                          style={
                            currentTab === "breadcrumbs"
                              ? { backgroundColor: "rgba(79, 70, 229, 0.35)", color: "#e0e7ff", borderColor: "rgba(99, 102, 241, 0.6)" }
                              : { backgroundColor: "rgba(30, 41, 59, 0.8)", color: "#94a3b8", borderColor: "rgba(255, 255, 255, 0.1)" }
                          }
                          className={`text-xs px-2.5 py-1 rounded-md font-medium cursor-pointer transition-all border ${
                            currentTab === "breadcrumbs"
                              ? "shadow-sm"
                              : "hover:bg-slate-700/60 hover:text-white"
                          }`}
                        >
                          Breadcrumbs ({err.filteredBreadcrumbs?.length ?? err.breadcrumbs?.length ?? 0})
                        </button>
                        {err.responseBody && (
                          <button
                            onClick={() => setActiveTab((prev) => ({ ...prev, [err.id]: "response" }))}
                            style={
                              currentTab === "response"
                                ? { backgroundColor: "rgba(220, 38, 38, 0.35)", color: "#fca5a5", borderColor: "rgba(239, 68, 68, 0.6)" }
                                : { backgroundColor: "rgba(30, 41, 59, 0.8)", color: "#94a3b8", borderColor: "rgba(255, 255, 255, 0.1)" }
                            }
                            className={`text-xs px-2.5 py-1 rounded-md font-medium cursor-pointer transition-all border ${
                              currentTab === "response"
                                ? "shadow-sm"
                                : "hover:bg-slate-700/60 hover:text-white"
                            }`}
                          >
                            Response Payload
                          </button>
                        )}
                        {err.stack && (
                          <button
                            onClick={() => setActiveTab((prev) => ({ ...prev, [err.id]: "stack" }))}
                            style={
                              currentTab === "stack"
                                ? { backgroundColor: "#334155", color: "#ffffff", borderColor: "#64748b" }
                                : { backgroundColor: "rgba(30, 41, 59, 0.8)", color: "#94a3b8", borderColor: "rgba(255, 255, 255, 0.1)" }
                            }
                            className={`text-xs px-2.5 py-1 rounded-md font-medium cursor-pointer transition-all border ${
                              currentTab === "stack"
                                ? "shadow-sm"
                                : "hover:bg-slate-700/60 hover:text-white"
                            }`}
                          >
                            Stack Trace
                          </button>
                        )}
                        <button
                          onClick={() => setActiveTab((prev) => ({ ...prev, [err.id]: "context" }))}
                          style={
                            currentTab === "context"
                              ? { backgroundColor: "rgba(5, 150, 105, 0.35)", color: "#a7f3d0", borderColor: "rgba(16, 185, 129, 0.6)" }
                              : { backgroundColor: "rgba(30, 41, 59, 0.8)", color: "#94a3b8", borderColor: "rgba(255, 255, 255, 0.1)" }
                          }
                          className={`text-xs px-2.5 py-1 rounded-md font-medium cursor-pointer transition-all border ${
                            currentTab === "context"
                              ? "shadow-sm"
                              : "hover:bg-slate-700/60 hover:text-white"
                          }`}
                        >
                          Context & Tags
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 self-end sm:self-auto">
                        {err.route && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const curlCmd = `curl -X ${err.method || "GET"} "http://localhost:5000${err.route}"`;
                              copyText(`curl-${err.id}`, curlCmd);
                            }}
                            style={{ backgroundColor: "rgba(30, 41, 59, 0.9)", color: "#cbd5e1", borderColor: "rgba(255, 255, 255, 0.1)" }}
                            className="hover:bg-slate-700 border rounded-md text-[11px] px-2.5 py-1 font-mono flex items-center gap-1.5 cursor-pointer transition-all"
                            title="Copy as cURL command to replay in terminal"
                          >
                            {copiedId === `curl-${err.id}` ? <Check size={12} color="#34d399" /> : <Terminal size={12} />}
                            {copiedId === `curl-${err.id}` ? "Copied cURL" : "Copy cURL"}
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const fullError = JSON.stringify(err, null, 2);
                            copyText(`json-${err.id}`, fullError);
                          }}
                          style={{ backgroundColor: "rgba(30, 41, 59, 0.9)", color: "#cbd5e1", borderColor: "rgba(255, 255, 255, 0.1)" }}
                          className="hover:bg-slate-700 border rounded-md text-[11px] px-2.5 py-1 font-mono flex items-center gap-1.5 cursor-pointer transition-all"
                          title="Copy full error metadata as JSON"
                        >
                          {copiedId === `json-${err.id}` ? <Check size={12} color="#34d399" /> : <Copy size={12} />}
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
                        <div className="mt-3">
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-xs text-slate-400 font-medium">
                              Breadcrumbs Trail ({sortedCrumbs.length} events {timeWindow !== "all" ? `in ${timeWindow}` : "prior to crash"}):
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setBreadcrumbOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
                              }}
                              className="bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-white/10 rounded px-2 py-0.5 text-[11px] font-mono flex items-center gap-1 cursor-pointer transition-all"
                              title="Toggle breadcrumbs sort order"
                            >
                              <ArrowUpDown size={11} className="text-slate-400" />
                              <span>{breadcrumbOrder === "newest" ? "Newest First" : "Oldest First"}</span>
                            </button>
                          </div>

                          {sortedCrumbs.length === 0 ? (
                            <div className="text-xs text-slate-500 py-2 italic">
                              No breadcrumb events were recorded {timeWindow !== "all" ? `within ${timeWindow}` : "prior to this failure"}.
                            </div>
                          ) : (
                            <div className="flex flex-col gap-2">
                              {sortedCrumbs.map((crumb, idx) => {
                                const crumbTime = new Date(crumb.timestamp).toLocaleTimeString();
                                const borderLeftColor = crumb.level === "error" ? "#ef4444" : crumb.level === "warn" ? "#f59e0b" : "#6366f1";
                                return (
                                  <div
                                    key={idx}
                                    style={{
                                      backgroundColor: "rgba(30, 41, 59, 0.5)",
                                      borderColor: "rgba(255, 255, 255, 0.1)",
                                      borderLeftColor: borderLeftColor,
                                    }}
                                    className={`flex items-center gap-3 border rounded-xl p-3 border-l-4 ${
                                      crumb.level === "error"
                                        ? "border-l-red-500"
                                        : crumb.level === "warn"
                                        ? "border-l-amber-500"
                                        : "border-l-indigo-500"
                                    }`}
                                  >
                                    <div className="flex items-center gap-1.5 shrink-0">
                                      {getBreadcrumbIcon(crumb.category)}
                                      <span
                                        style={{ color: "#94a3b8" }}
                                        className="text-[10px] font-mono font-extrabold uppercase text-slate-400"
                                      >
                                        {crumb.category}
                                      </span>
                                    </div>

                                    <span
                                      style={{ color: "#e2e8f0" }}
                                      className="text-xs sm:text-sm font-mono text-slate-200 flex-1 min-w-0 truncate"
                                    >
                                      {crumb.message}
                                    </span>

                                    {crumb.data && (
                                      <span
                                        style={{ backgroundColor: "rgba(15, 23, 42, 0.8)", color: "#94a3b8", borderColor: "rgba(255, 255, 255, 0.05)" }}
                                        className="text-[11px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border truncate max-w-[120px] sm:max-w-[200px] hidden md:inline"
                                      >
                                        {JSON.stringify(crumb.data)}
                                      </span>
                                    )}

                                    <div
                                      style={{ color: "#64748b" }}
                                      className="flex items-center gap-1 text-slate-500 text-xs shrink-0"
                                    >
                                      <Clock size={12} className="hidden sm:inline" />
                                      <span className="font-mono text-[11px] sm:text-xs">{crumbTime}</span>
                                    </div>
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
                      <div className="mt-3">
                        <div className="text-xs text-slate-400 mb-1 font-medium">
                          Returned Response Payload:
                        </div>
                        <pre className="text-xs font-mono text-red-300 bg-slate-950 p-3 rounded-lg overflow-x-auto border border-red-500/20 leading-relaxed">
                          {typeof err.responseBody === "object"
                            ? JSON.stringify(err.responseBody, null, 2)
                            : String(err.responseBody)}
                        </pre>
                      </div>
                    )}

                    {/* TAB 3: Stack Trace */}
                    {currentTab === "stack" && err.stack && (
                      <div className="mt-3">
                        <div className="text-xs text-slate-400 mb-1 font-medium">
                          Stack Trace:
                        </div>
                        <pre className="text-xs font-mono text-slate-300 bg-slate-950 p-3 rounded-lg overflow-x-auto border border-white/10 leading-relaxed">
                          {err.stack}
                        </pre>
                      </div>
                    )}

                    {/* TAB 4: System Context & Tags */}
                    {currentTab === "context" && (
                      <div className="mt-3 flex flex-col gap-3">
                        <div className="text-xs text-slate-400 font-medium">
                          System Context & Environment Tags:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-white/5">
                            <div className="text-[11px] text-slate-400 flex items-center gap-1 mb-0.5">
                              <Server size={11} /> OS & Architecture
                            </div>
                            <div className="text-xs font-mono font-bold text-slate-200 truncate">
                              {err.context?.os || "Node Host"}
                            </div>
                          </div>

                          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-white/5">
                            <div className="text-[11px] text-slate-400 flex items-center gap-1 mb-0.5">
                              <Cpu size={11} /> Node Runtime
                            </div>
                            <div className="text-xs font-mono font-bold text-slate-200 truncate">
                              {err.context?.nodeVersion || "Node.js"}
                            </div>
                          </div>

                          {err.context?.memoryMb !== undefined && (
                            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-white/5">
                              <div className="text-[11px] text-slate-400 mb-0.5">Heap Memory at Crash</div>
                              <div className="text-xs font-mono font-bold text-sky-400">
                                {err.context.memoryMb} MB
                              </div>
                            </div>
                          )}

                          {err.fingerprint && (
                            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-white/5">
                              <div className="text-[11px] text-slate-400 mb-0.5">Fingerprint Hash</div>
                              <div className="text-xs font-mono text-indigo-300 truncate">
                                {err.fingerprint}
                              </div>
                            </div>
                          )}
                        </div>

                        {err.context?.headers && (
                          <div>
                            <div className="text-[11px] text-slate-400 mb-1">
                              Request Headers:
                            </div>
                            <pre className="text-[11px] font-mono text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-white/5 overflow-x-auto">
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
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-400 font-medium">
                Showing {sortedGlobalCrumbs.length} events {timeWindow !== "all" ? `within ${timeWindow}` : "across session"}
              </span>

              <button
                onClick={() => setBreadcrumbOrder((prev) => (prev === "newest" ? "oldest" : "newest"))}
                className="bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-white/10 rounded px-2.5 py-1 text-[11px] font-mono flex items-center gap-1 cursor-pointer transition-all"
                title="Toggle breadcrumb sort order"
              >
                <ArrowUpDown size={11} className="text-slate-400" />
                <span>{breadcrumbOrder === "newest" ? "Newest First" : "Oldest First"}</span>
              </button>
            </div>

            {sortedGlobalCrumbs.length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-xs italic bg-slate-900/50 rounded-xl border border-white/5">
                No breadcrumb events recorded in this time window ({timeWindow}).
              </div>
            ) : (
              sortedGlobalCrumbs.map((crumb, idx) => {
                const crumbTime = new Date(crumb.timestamp).toLocaleTimeString();
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 bg-slate-800/50 border border-white/10 rounded-xl p-3 border-l-4 ${
                      crumb.level === "error"
                        ? "border-red-500"
                        : crumb.level === "warn"
                        ? "border-amber-500"
                        : "border-indigo-500"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 shrink-0">
                      {getBreadcrumbIcon(crumb.category)}
                      <span className="text-[10px] font-mono font-extrabold text-slate-400 uppercase">
                        {crumb.category}
                      </span>
                    </div>

                    <span className="text-xs sm:text-sm font-mono text-slate-200 flex-1 min-w-0 truncate">
                      {crumb.message}
                    </span>

                    {crumb.data && (
                      <span className="text-[11px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-white/5 truncate max-w-[120px] sm:max-w-[200px] hidden md:inline">
                        {JSON.stringify(crumb.data)}
                      </span>
                    )}

                    <div className="flex items-center gap-1 text-slate-500 text-xs shrink-0">
                      <Clock size={12} className="hidden sm:inline" />
                      <span className="font-mono text-[11px] sm:text-xs">{crumbTime}</span>
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

