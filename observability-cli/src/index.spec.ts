import { describe, it, expect } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { detectPackageManager, detectProject } from "../src/utils/detect.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cliRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(cliRoot, "..");

describe("Observability CLI Detect Utilities Test Suite", () => {
  it("should detect package manager override", () => {
    const pm = detectPackageManager(repoRoot, "pnpm");
    expect(pm).toBe("pnpm");
  });

  it("should fallback to npm when no override or lockfile found", () => {
    const pm = detectPackageManager("C:\\non-existent-dir-for-testing");
    expect(pm).toBe("npm");
  });

  it("should detect project context correctly for repository root", () => {
    const ctx = detectProject(repoRoot);
    expect(ctx.packageManager).toBeDefined();
    expect(ctx.packageJson).toBeDefined();
    expect(typeof ctx.isTypeScript).toBe("boolean");
  });

  it("should detect Next.js App Router project correctly", () => {
    const nextAdminDir = path.resolve(repoRoot, "examples/nextjs-admin");
    const ctx = detectProject(nextAdminDir);
    expect(ctx.framework).toBe("next-app");
    expect(ctx.isTypeScript).toBe(true);
  });

  it("should detect React + Vite project correctly", () => {
    const viteDir = path.resolve(repoRoot, "examples/react-vite");
    const ctx = detectProject(viteDir);
    expect(ctx.framework).toBe("react-vite");
    expect(ctx.isTypeScript).toBe(true);
  });
});
