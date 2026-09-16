import fs from "node:fs";
import path from "node:path";

export type PackageManager = "pnpm" | "bun" | "yarn" | "npm";

export interface ProjectContext {
  packageManager: PackageManager;
  framework: "next-app" | "next-pages" | "react-vite" | "unknown";
  isTypeScript: boolean;
  packageJson: Record<string, any>;
  hasObservabilityConfig: boolean;
  rootDir: string;
}

/**
 * Detects the package manager deterministically by checking lockfiles and user options.
 */
export function detectPackageManager(cwd: string, override?: string): PackageManager {
  if (override && ["pnpm", "bun", "yarn", "npm"].includes(override)) {
    return override as PackageManager;
  }

  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "bun.lockb")) || fs.existsSync(path.join(cwd, "bun.lock"))) return "bun";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  if (fs.existsSync(path.join(cwd, "package-lock.json"))) return "npm";

  // Check npm_config_user_agent
  const userAgent = process.env.npm_config_user_agent || "";
  if (userAgent.startsWith("pnpm")) return "pnpm";
  if (userAgent.startsWith("bun")) return "bun";
  if (userAgent.startsWith("yarn")) return "yarn";

  return "npm";
}

/**
 * Inspects directory and package.json to detect framework, router type, and TypeScript.
 */
export function detectProject(cwd: string, pmOverride?: string): ProjectContext {
  const pkgPath = path.join(cwd, "package.json");
  let packageJson: Record<string, any> = {};

  if (fs.existsSync(pkgPath)) {
    try {
      packageJson = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    } catch {
      packageJson = {};
    }
  }

  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  const isTypeScript =
    fs.existsSync(path.join(cwd, "tsconfig.json")) ||
    Boolean(allDeps.typescript);

  let framework: "next-app" | "next-pages" | "react-vite" | "unknown" = "unknown";

  if (allDeps.next) {
    if (
      fs.existsSync(path.join(cwd, "app")) ||
      fs.existsSync(path.join(cwd, "src", "app"))
    ) {
      framework = "next-app";
    } else {
      framework = "next-pages";
    }
  } else if (allDeps.vite || fs.existsSync(path.join(cwd, "vite.config.ts")) || fs.existsSync(path.join(cwd, "vite.config.js"))) {
    framework = "react-vite";
  }

  const hasObservabilityConfig =
    fs.existsSync(path.join(cwd, "observability.config.ts")) ||
    fs.existsSync(path.join(cwd, "observability.config.js"));

  return {
    packageManager: detectPackageManager(cwd, pmOverride),
    framework,
    isTypeScript,
    packageJson,
    hasObservabilityConfig,
    rootDir: cwd,
  };
}
