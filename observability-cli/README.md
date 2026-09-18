<p align="center">
  <img src="./assets/logo.svg" alt="Stacklenzz Logo" width="80" height="80" />
</p>

<h1 align="center">@stacklenzz/cli</h1>

<p align="center">
  A zero-configuration command-line interface to inspect, install, and scaffold <b>Stacklenzz</b> backend observability dashboards into React, Next.js (App Router & Pages Router), and Vite applications.
</p>

<p align="center">
  <a href="https://stacklenzz.vercel.app/"><b>📖 Full Documentation & Interactive Portal: https://stacklenzz.vercel.app/</b></a>
</p>

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
# Using npx (scoped package or alias)
npx @stacklenzz/cli [command]

# Or with short command runner
npx stacklenzz [command]
```

Or install globally:
```bash
npm install -g @stacklenzz/cli
```
Once installed globally, you can invoke all commands directly using **`stacklenzz`**:
```bash
stacklenzz doctor
stacklenzz dashboard
stacklenzz init
```

---

## Commands & Usage

### 1. `stacklenzz doctor` (or `npx stacklenzz doctor`)
Diagnoses your environment, checks for installed dependencies, and verifies that your backend telemetry endpoint (`/api/observability/stats`) is online:

```bash
stacklenzz doctor
```

**Options:**
- `-e, --endpoint <url>`: Test a custom backend telemetry URL (e.g., `-e http://api.internal.com:5000/api/observability/stats`).

**Example Output:**
```
🩺 @stacklenzz/cli - System & Health Doctor

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

### 2. `stacklenzz dashboard`
Scaffolds an observability dashboard page into your React or Next.js app:

```bash
npx stacklenzz dashboard
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
npx stacklenzz dashboard --dry-run -y

# Generate a custom route in Next.js:
npx stacklenzz dashboard --route /admin/system-health -y
```

---

### 3. `stacklenzz init`
Creates a standardized `observability.config.ts` file in your project root:

```bash
npx stacklenzz init
```

---

## 🤝 Contributing & Documentation

Contributions are welcome! Please visit the official **[Stacklenzz Documentation Portal](https://stacklenzz.vercel.app/)** for full CLI command guides, framework setup tutorials, and troubleshooting tips.

To report bugs or contribute code:
1. Open an issue or Pull Request on GitHub.
2. Ensure unit tests pass (`npm run test:cli`).

---

## License
MIT © Goodnews Azonubi
