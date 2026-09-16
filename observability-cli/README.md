# @ideategudy/observability-cli

A zero-configuration command-line interface to inspect, install, and scaffold `@ideategudy` backend observability dashboards into React, Next.js (App Router & Pages Router), and Vite applications.

---

## Features

- **Automatic Environment Detection**:
  - Automatically identifies active package managers (`pnpm`, `npm`, `yarn`, `bun`).
  - Detects frontend framework (`Next.js App Router`, `Next.js Pages Router`, `Vite/React`).
  - Identifies TypeScript vs JavaScript.
- **Doctor Diagnostic**: Checks Node version, package health, and live reachability of your backend telemetry endpoint.
- **Non-Destructive Scaffolding**: Automatically creates admin observability routes with security warnings without overwriting your existing code.
- **Dry-Run Mode**: Inspect generated files before any changes are written to disk.

---

## Installation

You can run the CLI on-demand via package runners (no permanent installation required):

```bash
# Using npx
npx @ideategudy/observability-cli [command]

# Using pnpm dlx
pnpm dlx @ideategudy/observability-cli [command]

# Using bunx
bunx @ideategudy/observability-cli [command]
```

Or install globally:
```bash
npm install -g @ideategudy/observability-cli
```
Once installed globally, you can invoke all commands directly using the **`obs-cli`** shorthand:
```bash
obs-cli doctor
obs-cli dashboard
obs-cli init
```

---

## Commands & Usage

### 1. `obs-cli doctor` (or `npx @ideategudy/observability-cli doctor`)
Diagnoses your environment, checks for installed dependencies, and verifies that your backend telemetry endpoint (`/api/observability/stats`) is online:

```bash
obs-cli doctor
```

**Options:**
- `-e, --endpoint <url>`: Test a custom backend telemetry URL (e.g., `-e http://api.internal.com:5000/api/observability/stats`).

**Example Output:**
```
🩺 @ideategudy/observability-cli - System & Health Doctor

✓ Node.js runtime: v24.10.0 (compatible >= 18)
✓ Package manager: npm
✓ Frontend framework: next-app (TypeScript)
✓ Observability UI: Installed
✓ Telemetry endpoint reachable! HTTP 200 (69ms)
   Backend service: my-backend-api [production]
   Requests recorded: 14,291

Doctor check finished.
```

---

### 2. `observability dashboard`
Scaffolds an observability dashboard page into your React or Next.js app:

```bash
npx @ideategudy/observability-cli dashboard
```

**Options:**
- `-r, --route <route>`: Destination route path (default: `/admin/observability`).
- `-t, --template <template>`: Template to generate (`FullBackendDashboard`, `ApiOverviewDashboard`, `ErrorMonitoringDashboard`, etc.).
- `-p, --package-manager <pm>`: Force a package manager (`npm`, `pnpm`, `yarn`, `bun`).
- `--dry-run`: Preview file generation in the terminal without modifying any files.
- `-y, --yes`: Skip interactive prompts and accept smart defaults.

**Examples:**
```bash
# Preview what would be created:
npx @ideategudy/observability-cli dashboard --dry-run -y

# Generate a custom route in Next.js:
npx @ideategudy/observability-cli dashboard --route /admin/system-health -y
```

---

### 3. `observability init`
Creates a standardized `observability.config.ts` file in your project root:

```bash
npx @ideategudy/observability-cli init
```

---

## License
MIT © Goodnews Azonubi
