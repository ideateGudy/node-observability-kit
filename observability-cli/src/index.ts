import { Command } from "commander";
import { runDashboardCommand } from "./commands/dashboard.js";
import { runDoctorCommand } from "./commands/doctor.js";
import { runInitCommand } from "./commands/init.js";

const program = new Command();

program
  .name("@ideategudy/observability-cli")
  .description("Developer-first backend observability dashboard installer for React & Next.js")
  .version("0.1.0");

program
  .command("dashboard")
  .description("Install or generate a backend observability dashboard in your React or Next.js app")
  .option("-r, --route <route>", "Target route for the dashboard (e.g. /admin/observability)")
  .option("-t, --template <template>", "Dashboard template (FullBackendDashboard, ApiOverviewDashboard, etc.)")
  .option("-p, --package-manager <pm>", "Force package manager (pnpm, npm, yarn, bun)")
  .option("--dry-run", "Simulate generation without writing files")
  .option("-y, --yes", "Skip interactive prompts and use defaults")
  .action(async (options) => {
    await runDashboardCommand(options);
  });

program
  .command("doctor")
  .description("Inspect environment, configuration, and telemetry endpoint reachability")
  .option("-e, --endpoint <url>", "Custom telemetry endpoint to test")
  .action(async (options) => {
    await runDoctorCommand(options);
  });

program
  .command("init")
  .description("Create a default observability.config.ts file")
  .action(async () => {
    await runInitCommand();
  });

program
  .command("validate")
  .description("Alias for doctor")
  .action(async (options) => {
    await runDoctorCommand(options);
  });

program.parse(process.argv);
