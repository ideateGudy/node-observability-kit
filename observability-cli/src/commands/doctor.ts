import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import https from "node:https";
import pc from "picocolors";
import { detectProject } from "../utils/detect.js";

export interface DoctorCommandOptions {
  endpoint?: string;
}

export async function runDoctorCommand(options: DoctorCommandOptions) {
  const cwd = process.cwd();
  console.log(pc.bold(pc.cyan("\n🩺 Stacklenzz CLI - System & Health Doctor\n")));

  const ctx = detectProject(cwd);

  // 1. Node.js check
  const nodeVer = process.version;
  const major = parseInt(nodeVer.replace("v", "").split(".")[0], 10);
  if (major >= 18) {
    console.log(`${pc.green("✓")} Node.js runtime: ${nodeVer} (compatible >= 18)`);
  } else {
    console.log(`${pc.red("✗")} Node.js runtime: ${nodeVer} (Requires Node.js >= 18)`);
  }

  // 2. Package manager
  console.log(`${pc.green("✓")} Package manager: ${pc.bold(ctx.packageManager)}`);

  // 3. Framework
  if (ctx.framework !== "unknown") {
    console.log(`${pc.green("✓")} Frontend framework: ${pc.bold(ctx.framework)} (${ctx.isTypeScript ? "TypeScript" : "JavaScript"})`);
  } else {
    console.log(`${pc.yellow("!")} Frontend framework: Generic/React (${ctx.isTypeScript ? "TypeScript" : "JavaScript"})`);
  }

  // 4. Observability UI dependency
  const allDeps = {
    ...ctx.packageJson.dependencies,
    ...ctx.packageJson.devDependencies,
  };

  if (allDeps["@stacklenzz/ui"]) {
    console.log(`${pc.green("✓")} Stacklenzz UI: Installed (${allDeps["@stacklenzz/ui"]})`);
  } else {
    console.log(`${pc.yellow("!")} Stacklenzz UI: Not found in package.json. Run: ${pc.bold(`${ctx.packageManager} add @stacklenzz/ui`)}`);
  }

  // 5. Config file
  const configPath = fs.existsSync(path.join(cwd, "observability.config.ts"))
    ? path.join(cwd, "observability.config.ts")
    : fs.existsSync(path.join(cwd, "observability.config.js"))
    ? path.join(cwd, "observability.config.js")
    : null;

  if (configPath) {
    console.log(`${pc.green("✓")} Observability config found: ${path.basename(configPath)}`);
  } else {
    console.log(`${pc.dim("-")} Observability config file: Not created yet (defaults will be used)`);
  }

  // 6. Test backend telemetry endpoint ping
  const targetEndpoint = options.endpoint || process.env.OBSERVABILITY_API_URL || "http://localhost:5000/api/observability/stats";
  console.log(`\nTesting connection to telemetry endpoint: ${pc.cyan(targetEndpoint)} ...`);

  const pingResult = await pingEndpoint(targetEndpoint);
  if (pingResult.ok) {
    console.log(`${pc.green("✓")} Telemetry endpoint reachable! HTTP ${pingResult.statusCode} (${pingResult.latencyMs}ms)`);
    if (pingResult.body && pingResult.body.service) {
      console.log(`   Backend service: ${pc.bold(pingResult.body.service.name)} [${pingResult.body.service.environment}]`);
      console.log(`   Requests recorded: ${pingResult.body.summary?.totalRequests ?? 0}`);
    }
  } else {
    console.log(`${pc.red("✗")} Telemetry endpoint unreachable: ${pingResult.error}`);
    console.log(`   ${pc.yellow("Suggestion:")} Ensure your Express or NestJS backend is running and instrumented with ${pc.bold("@stacklenzz/server")}.`);
  }

  console.log("\n" + pc.dim("Doctor check finished.") + "\n");
}

function pingEndpoint(urlStr: string): Promise<{ ok: boolean; statusCode?: number; latencyMs?: number; error?: string; body?: any }> {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(urlStr);
      const client = parsed.protocol === "https:" ? https : http;
      const startTime = Date.now();

      const req = client.get(urlStr, { timeout: 3000 }, (res) => {
        let rawData = "";
        res.on("data", (chunk) => { rawData += chunk; });
        res.on("end", () => {
          const latencyMs = Date.now() - startTime;
          try {
            const body = JSON.parse(rawData);
            resolve({ ok: res.statusCode === 200, statusCode: res.statusCode, latencyMs, body });
          } catch {
            resolve({ ok: res.statusCode === 200, statusCode: res.statusCode, latencyMs });
          }
        });
      });

      req.on("error", (err) => {
        resolve({ ok: false, error: err.message });
      });

      req.on("timeout", () => {
        req.destroy();
        resolve({ ok: false, error: "Connection timed out after 3000ms" });
      });
    } catch (err: any) {
      resolve({ ok: false, error: err.message });
    }
  });
}
