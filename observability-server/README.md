# @stacklenzz/server

A comprehensive, production-ready observability and monitoring package for **Node.js**, **Express**, and **NestJS** applications with full **TypeScript** support.

It provides:
- **Zero-Config Telemetry Endpoint** (`/api/observability/stats`) feeding real-time operations into frontend dashboards.
- **Built-in Error Intelligence**:
  - Automatic 4xx & 5xx error capture with stack traces and request context (OS, Node version, memory, IP, user-agent, query params).
  - Deterministic fingerprinting to automatically group recurring issues and track occurrences.
  - Event breadcrumbs (`addBreadcrumb`, `getBreadcrumbs`) recording HTTP requests, DB queries, and logs leading up to an error.
- **Sliding Window Error Rates & Counters**: Rolling time windows (`last1m`, `last5m`, `last15m`, `last30m`, `last1h`, `last2h`, `last24h`, `last7d`, `last30d`).
- **Prometheus Metrics**: Standard Node.js runtime metrics (CPU, RSS, Heap, Event Loop lag) + HTTP request counters, histograms, and active request gauges via `prom-client` on `/metrics`.
- **OpenTelemetry Distributed Tracing**: Auto-instrumentations + OTLP trace exporter with Winston trace correlation (`trace_id` and `span_id`).
- **Clean Subpath Exports**:
  - `@stacklenzz/server` (core)
  - `@stacklenzz/server/express`
  - `@stacklenzz/server/nestjs`

---

## Installation

```bash
npm install @stacklenzz/server
# or
pnpm add @stacklenzz/server
```

### Peer Dependencies:
- **Express**: `npm install express`
- **NestJS**: `npm install @nestjs/common @nestjs/core @nestjs/platform-express rxjs reflect-metadata`

---

## Quick Start: Express

Instrument your Express app with one function:

```typescript
import express from "express";
import { setupObservability, logger, addBreadcrumb } from "@stacklenzz/server";

const app = express();

// Automatically attaches Prometheus /metrics, Winston logging, and /api/observability/stats
setupObservability(app, {
  serviceName: "my-express-api",
  environment: "production",
});

app.get("/api/users", (req, res) => {
  // Add breadcrumbs for key operations
  addBreadcrumb({ category: "auth", message: "User authenticated", level: "info" });
  res.json([{ id: 1, name: "Alice" }]);
});

// Fallback for non-existent routes (automatically tracked as 404 in dashboard)
app.use((req, res) => {
  res.status(404).json({ statusCode: 404, error: "Not Found", message: `Cannot ${req.method} ${req.url}` });
});

app.listen(5000, () => console.log("API running on port 5000"));
```

---

## Quick Start: NestJS

In your root module (`app.module.ts`):

```typescript
import { Module } from "@nestjs/common";
import { ObservabilityModule } from "@stacklenzz/server/nestjs";

@Module({
  imports: [
    ObservabilityModule.forRoot({
      serviceName: "my-nestjs-api",
      environment: "production",
      autoInitTracing: false,
    }),
  ],
})
export class AppModule {}
```

In your `main.ts`, enable CORS so your frontend dashboard can read telemetry:

```typescript
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: "*" });
  await app.listen(5000);
}
bootstrap();
```

> **Note**: `ObservabilityModule.forRoot()` automatically registers both `ObservabilityInterceptor` (for request metrics and timing) and `ObservabilityExceptionFilter` (for global 404, 4xx, and 5xx error captures).

---

## Telemetry & Incident Intelligence Features

### 1. Adding Breadcrumbs
Trace operations leading up to unexpected errors:

```typescript
import { addBreadcrumb } from "@stacklenzz/server";

addBreadcrumb({
  category: "db",
  message: "Query executed on users table",
  level: "info",
  data: { queryTimeMs: 4.2 },
});
```

### 2. Structured & Automatic Error Logging
Logs automatically correlate with active OpenTelemetry spans and are captured into the recent error stream if level is `error`.

#### Automatic Error Logging (`logger.error(err)`):
You **do not** need to manually pass `route`, `method`, `status`, or `stack`. Passing the `Error` instance directly extracts `message` and `stack` while request metadata is captured automatically:

```typescript
import { logger } from "@stacklenzz/server";

try {
  throw new Error("Payment gateway connection reset");
} catch (err) {
  // Automatically captures error message and full stack trace!
  logger.error(err);
}
```

#### Manual Additional Context:
You can also pass custom metadata or response payloads:

```typescript
logger.error("Payment authorization failed", {
  responseBody: { reason: "Gateway timeout" },
});
```

---

## Advanced SDK Utilities

### 1. Programmatic Telemetry Snapshot (`getObservabilitySnapshot`)
Generate an operational JSON snapshot directly in your backend code without an HTTP request:

```typescript
import { getObservabilitySnapshot } from "@stacklenzz/server";

const snapshot = await getObservabilitySnapshot();
console.log("Current Error Rate:", snapshot.summary.errorRate);
console.log("Top Endpoints:", snapshot.http.topEndpoints);
```

### 2. Custom Prometheus Metrics (`Counter`, `Gauge`, `register`)
Register custom business metrics directly on the `/metrics` endpoint:

```typescript
import { Counter, register } from "@stacklenzz/server";

const ordersCounter = new Counter({
  name: "orders_processed_total",
  help: "Total processed checkout orders",
  registers: [register],
});

ordersCounter.inc();
```

### 3. OpenTelemetry API Re-exports (`trace`, `context`)
Access OpenTelemetry tracing primitives directly without installing `@opentelemetry/api`:

```typescript
import { trace, context } from "@stacklenzz/server";

const activeSpan = trace.getSpan(context.active());
if (activeSpan) {
  console.log("Trace ID:", activeSpan.spanContext().traceId);
}
```

### 4. Test Metric Resets (`resetMetrics`)
Clear sliding window buffers and Prometheus counters between test suite runs:

```typescript
import { resetMetrics } from "@stacklenzz/server";

beforeEach(() => {
  resetMetrics();
});
```

---

## Exposed Endpoints

| Endpoint | Method | Format | Purpose |
|---|---|---|---|
| `/api/observability/stats` | `GET` | JSON | Feeds real-time operational state, rolling error rates, runtime health, and error lists to the UI |
| `/metrics` | `GET` | Plaintext | Standard Prometheus scraper endpoint |

---

## Configuration Options

```typescript
interface ObservabilityConfig {
  serviceName?: string;       // default: "stacklenzz-server"
  environment?: string;       // default: "development"
  instanceId?: string;        // default: "local"
  metricsPath?: string;       // default: "/metrics"
  logLevel?: string;          // default: "info"
  autoInitTracing?: boolean;  // default: true
  ignoredPaths?: string[];    // default: ["/metrics", "/healthz", "/health"]
}
```

---

## License
MIT © Goodnews Azonubi
