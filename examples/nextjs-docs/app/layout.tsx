import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css"

export const metadata: Metadata = {
  title: "Stacklenzz - Developer-First Node.js & React Observability",
  description: "Production-ready backend telemetry, Prometheus metrics, Winston logs, and React admin dashboards for Express and NestJS",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-indigo-500/30" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
