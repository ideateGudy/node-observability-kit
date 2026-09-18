import fs from "node:fs";
import path from "node:path";
import pc from "picocolors";
import prompts from "prompts";
import { detectProject } from "../utils/detect.js";

export async function runInitCommand() {
  const cwd = process.cwd();
  const ctx = detectProject(cwd);

  const configFile = path.join(cwd, ctx.isTypeScript ? "observability.config.ts" : "observability.config.js");
  if (fs.existsSync(configFile)) {
    console.log(`${pc.yellow("!")} Configuration file already exists at ${pc.bold(path.basename(configFile))}`);
    return;
  }

  const response = await prompts([
    {
      type: "text",
      name: "serviceName",
      message: "Backend Service Name:",
      initial: "my-backend-service",
    },
    {
      type: "text",
      name: "endpoint",
      message: "Backend Telemetry URL:",
      initial: "http://localhost:5000/api/observability/stats",
    },
    {
      type: "number",
      name: "refreshIntervalMs",
      message: "Dashboard auto-refresh interval in milliseconds:",
      initial: 5000,
    },
  ], {
    onCancel: () => {
      console.log(pc.red("\n✖ Operation cancelled by user"));
      process.exit(1);
    }
  });

  const content = `// @stacklenzz Observability Configuration
export default {
  service: {
    name: "${response.serviceName || "my-backend-service"}",
    environment: process.env.NODE_ENV || "development",
  },
  endpoint: process.env.OBSERVABILITY_API_URL || "${response.endpoint || "http://localhost:5000/api/observability/stats"}",
  refreshIntervalMs: ${response.refreshIntervalMs || 5000},
  mockMode: false,
};
`;

  fs.writeFileSync(configFile, content, "utf-8");
  console.log(`${pc.green("✓")} Created ${pc.bold(path.basename(configFile))}`);
}
