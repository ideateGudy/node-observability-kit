# @ideategudy/observability-ui

A stunning, developer-first React & Next.js dashboard UI ecosystem for backend observability, monitoring, and error tracking.

Built with Vanilla CSS & zero heavy UI framework lock-in, featuring glassmorphism, curated dark mode aesthetics, and micro-interactions.

---

## Features

- **6 Pre-Composed Dashboard Templates**:
  - `<ObservabilityDashboard />`: All-in-one suite with a built-in interactive template switcher.
  - `<FullBackendDashboard />`: Complete view with overview cards, HTTP breakdown charts, latency gauge, runtime health, and live error inspector.
  - `<ApiOverviewDashboard />`: High-level traffic, status codes, top endpoints overview.
  - `<BackendPerformanceDashboard />`: Latencies (P50, P95, P99), response time breakdown, and endpoint timings.
  - `<ErrorMonitoringDashboard />`: Live error tracker, 4xx/5xx streams, occurrences counter, and breadcrumbs.
  - `<NodeRuntimeDashboard />`: Node.js process health (CPU, RSS, Heap memory, Event loop lag).
  - `<MinimalDashboard />`: Compact status widget suitable for embedding in existing admin sidebars or headers.
- **Deep Error Inspector**:
  - Detailed modal inspector with stack traces, context tags (OS, Node version, memory, IP, user-agent), and request payload responses.
  - Dynamic occurrence recalculation based on sliding time windows (`x4` ➔ `x2`).
  - Breadcrumbs timeline with newest-first / oldest-first sorting toggles.
- **Customizable Rolling Windows**: Interactive selector for error rates and counts across `1m`, `5m`, `15m`, `30m`, `1h`, `2h`, `24h`, `7d`, and `30d`.

---

## Installation

```bash
npm install @ideategudy/observability-ui lucide-react
# or
pnpm add @ideategudy/observability-ui lucide-react
```

### Peer Dependencies:
- `react`: `>=18.0.0`
- `react-dom`: `>=18.0.0`
- `lucide-react`: `>=0.263.0`

---

## Usage

### 1. Unified Dashboard with Template Switcher (Recommended)

```tsx
"use client";

import { ObservabilityDashboard } from "@ideategudy/observability-ui";

export default function AdminObservabilityPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#090d16" }}>
      <ObservabilityDashboard
        config={{
          endpoint: process.env.NEXT_PUBLIC_OBSERVABILITY_URL || "http://localhost:5000/api/observability/stats",
          refreshIntervalMs: 5000,
        }}
        defaultDashboard="full"
        showSwitcher={true}
      />
    </main>
  );
}
```

### 2. Standalone Dashboard Templates

You can import any individual template directly without the top switcher:

```tsx
import {
  FullBackendDashboard,
  ApiOverviewDashboard,
  BackendPerformanceDashboard,
  ErrorMonitoringDashboard,
  NodeRuntimeDashboard,
  MinimalDashboard,
} from "@ideategudy/observability-ui";

// Example: Embedding just Error Monitoring
<ErrorMonitoringDashboard config={{ endpoint: "http://localhost:5000/api/observability/stats" }} />
```

### 3. Custom Composability with Low-Level Components

You can build your own custom dashboard layout using the atomic components:

```tsx
import {
  ObservabilityProvider,
  useObservability,
  MetricGrid,
  MetricCard,
  HttpStatusChart,
  LatencyGauge,
  EndpointTable,
  RuntimeMetrics,
  ErrorInspector,
} from "@ideategudy/observability-ui";

function MyCustomView() {
  const { snapshot, isLoading, refresh } = useObservability();
  if (!snapshot) return null;

  return (
    <div>
      <HttpStatusChart breakdown={snapshot.http.statusBreakdown} />
      <ErrorInspector errors={snapshot.recentErrors} globalBreadcrumbs={snapshot.breadcrumbs} />
    </div>
  );
}

export function CustomDashboard() {
  return (
    <ObservabilityProvider config={{ endpoint: "http://localhost:5000/api/observability/stats" }}>
      <MyCustomView />
    </ObservabilityProvider>
  );
}
```

---

## Next.js Configuration (`next.config.mjs`)

When importing `@ideategudy/observability-ui` in Next.js:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@ideategudy/observability-ui"],
};

export default nextConfig;
```

---

## License
MIT © Goodnews Azonubi
