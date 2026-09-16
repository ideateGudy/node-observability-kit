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
import { addBreadcrumb } from "@ideategudy/express-nestjs-observability";

addBreadcrumb({
  category: "db",
  message: "Query executed on users table",
  level: "info",
  data: { queryTimeMs: 4.2 },
});
```

### 2. Structured Logging with Trace IDs
Logs automatically correlate with active OpenTelemetry spans and are captured into the recent error stream if level is `error`:

```typescript
import { logger } from "@ideategudy/express-nestjs-observability";

logger.error("Payment authorization failed", {
  route: "/api/checkout",
  statusCode: 502,
  responseBody: { reason: "Gateway timeout" },
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
  serviceName?: string;       // default: "express-nestjs-service"
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
