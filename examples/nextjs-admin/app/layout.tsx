import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Observability Admin Portal",
  description: "Next.js Observability Admin Portal for Express & NestJS Telemetry",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ margin: 0, padding: 0, backgroundColor: "#090d16" }} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
