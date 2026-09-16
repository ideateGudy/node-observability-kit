import pkg from "../../../../express-nestjs-observability/package.json";

export interface VersionInfo {
  version: string;
  label: string;
  tag: "latest" | "pre-release";
  isCurrent: boolean;
}

export const CURRENT_PROJECT_VERSION = `v${pkg.version || "0.1.0"}`;

export const AVAILABLE_VERSIONS: VersionInfo[] = [
  {
    version: CURRENT_PROJECT_VERSION,
    label: `${CURRENT_PROJECT_VERSION} (Latest)`,
    tag: "latest",
    isCurrent: true,
  },
];
