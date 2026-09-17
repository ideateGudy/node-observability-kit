# Stacklenzz

> A developer-first backend observability, monitoring, and logging ecosystem for **Express** and **NestJS**, paired with a zero-configuration, ready-to-install **React & Next.js** dashboard UI and CLI.

---

## ⚡️ The Developer Experience

```
1. Instrument Backend (Express or NestJS)
   npm install @stacklenzz/server

2. Add Dashboard to Frontend (Next.js or React + Vite)
   npx stacklenzz dashboard

3. Open Protected Route
   http://localhost:3000/admin/observability
```

---

## 📦 Monorepo Architecture

This repository contains three standalone, production-ready packages and concrete example applications:

| Package | Directory | Description | Documentation |
|---|---|---|---|
| [`@stacklenzz/server`](./observability-server) | `observability-server/` | Backend SDK for Express & NestJS (OpenTelemetry tracing, Prometheus `/metrics`, Winston logger, rolling error rate windows, and intelligent error fingerprinting) | [Read SDK Guide →](./observability-server/README.md) |
| [`@stacklenzz/ui`](./observability-ui) | `observability-ui/` | Modern React/Next.js dashboard suite powered by Redux Toolkit (`@reduxjs/toolkit`), 6 built-in themes with automatic `localStorage` persistence, interactive template switcher, error inspector with breadcrumbs, and latency gauges | [Read UI Guide →](./observability-ui/README.md) |
| [`@stacklenzz/cli`](./observability-cli) | `observability-cli/` | Zero-configuration CLI detecting frameworks and package managers to scaffold dashboards and run `doctor` connectivity diagnostics | [Read CLI Guide →](./observability-cli/README.md) |

---

## 🚀 Quick Start: Backend Setup

### 1. Express Setup

```typescript
import express from "express";
import { setupObservability, logger, addBreadcrumb } from "@stacklenzz/server";

const app = express();

// Automatically configures /metrics, Winston logging, and /api/observability/stats
setupObservability(app, {
  serviceName: "my-express-api",
  environment: "production",
});

app.get("/api/users", (req, res) => {
  addBreadcrumb({ category: "http", message: "Fetching active users", level: "info" });
  res.json([{ id: 1, name: "Alice" }]);
});

// Fallback for non-existent routes (automatically captured as 404 in dashboard)
app.use((req, res) => {
  res.status(404).json({ statusCode: 404, error: "Not Found", message: `Cannot ${req.method} ${req.url}` });
});

app.listen(5000, () => console.log("Express API on http://localhost:5000"));
```

### 2. NestJS Setup

In `app.module.ts`:
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

In `main.ts` (enable CORS so frontend dashboards can fetch stats):
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

---

## 🖥 Quick Start: Frontend Setup

### Option A: Using the CLI (Fastest)

Run inside your Next.js or React project:
```bash
npx stacklenzz dashboard
```
The CLI detects whether you are using **Next.js (App Router / Pages Router)** or **Vite/React**, installs the dependencies, and generates the dashboard route at `/admin/observability`.

### Option B: Manual Integration

Install the UI package:
```bash
npm install @stacklenzz/ui lucide-react
```

Create your page (e.g., in Next.js App Router `app/admin/observability/page.tsx`):
```tsx
"use client";

import { ObservabilityDashboard } from "@stacklenzz/ui";

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

---

## 🩺 System Health Diagnostics (`doctor`)

Verify your environment, framework, and test your backend telemetry connection at any time:

```bash
npx stacklenzz doctor
```

```
🩺 Stacklenzz CLI - System & Health Doctor

✓ Node.js runtime: v24.10.0 (compatible >= 18)
✓ Package manager: npm
✓ Frontend framework: next-app (TypeScript)
✓ Stacklenzz UI: Installed
✓ Telemetry endpoint reachable! HTTP 200 (69ms)
   Backend service: my-nestjs-api [production]
   Requests recorded: 14,291
```

---

## 🎨 Available Dashboard Templates

`@stacklenzz/ui` includes 6 distinct dashboard views with an interactive switcher:

1. **Full Suite** (`<FullBackendDashboard />`): Key metric cards, HTTP status distribution, latency gauges, runtime resources, top endpoints, and live error inspector.
2. **API Overview** (`<ApiOverviewDashboard />`): High-level traffic rates, status breakdown, and endpoint volume.
3. **Performance** (`<BackendPerformanceDashboard />`): P50, P95, and P99 latency percentiles and route response times.
4. **Errors & Failures** (`<ErrorMonitoringDashboard />`): Incident & error tracking with 4xx/5xx filters, fingerprint aggregation, occurrence count (`x4` ➔ `x2` by window), and event breadcrumbs.
5. **Node Runtime** (`<NodeRuntimeDashboard />`): Process CPU load, RSS/Heap memory usage, and V8 event loop lag.
6. **Minimal Widget** (`<MinimalDashboard />`): Compact card designed to be embedded in an existing admin layout.

---

## 🔒 Security & Admin Authorization

Because the dashboard displays live backend requests, route timings, and error payloads, **ensure this route is protected behind your authentication and authorization layer**.

### Next.js Middleware Example (`middleware.ts`):
```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin/observability")) {
    const token = req.cookies.get("admin_token");
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return NextResponse.next();
}
```

---

## 📁 Working Examples in this Repository

| Example | Directory | Port | Description |
|---|---|---|---|
| **Express API** | [`examples/express-api`](./examples/express-api) | `5000` | Express server instrumented with `setupObservability` |
| **NestJS API** | [`examples/nestjs-api`](./examples/nestjs-api) | `5000` | NestJS app instrumented with `ObservabilityModule` |
| **Next.js Docs & Portal** | [`examples/nextjs-docs`](./examples/nextjs-docs) | `3000` | Next.js 16 App Router interactive documentation & admin portal |
| **React + Vite** | [`examples/react-vite`](./examples/react-vite) | `5173` | React 19 + Vite dashboard application |

---

## 🛠 Building, Testing & Contributing

```bash
# Install root dependencies
npm install

# Run automated tests across all 3 packages
npm test

# Or run tests per package:
npm run test:server   # observability-server (12 unit tests)
npm run test:ui       # observability-ui (13 unit tests)
npm run test:cli      # observability-cli (5 unit tests)

# Build all packages simultaneously
npm run build

# Or build individual packages:
npm run build:server  # observability-server
npm run build:ui      # observability-ui
npm run build:cli     # observability-cli

# Inspect package tarballs before publishing (dry-run mode):
npm run pack:server   # Dry-run tarball for @stacklenzz/server
npm run pack:ui       # Dry-run tarball for @stacklenzz/ui
npm run pack:cli      # Dry-run tarball for @stacklenzz/cli
npm run pack:all      # Dry-run tarball for all 3 packages

# Version management:
npm run version:server patch  # Bump backend server SDK
npm run version:ui patch      # Bump UI package
npm run version:cli patch     # Bump CLI package

# Publish packages individually (runs build & test first):
npm run publish:server       # Build, test, & publish @stacklenzz/server
npm run publish:ui           # Build, test, & publish @stacklenzz/ui
npm run publish:cli          # Build, test, & publish @stacklenzz/cli

# Direct publish without re-building/re-testing:
npm run publish:server:only
npm run publish:ui:only
npm run publish:cli:only

# Safely publish all packages together:
npm run publish:all
```

---

## 📄 License

MIT © Goodnews Azonubi
