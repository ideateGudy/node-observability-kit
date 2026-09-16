import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { Resource } from "@opentelemetry/resources";
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import { ObservabilityConfig, getDefaultConfig } from "./config.js";

let sdkInstance: NodeSDK | null = null;

/**
 * Initializes and starts the OpenTelemetry NodeSDK for distributed tracing.
 * Call this as early as possible before loading any HTTP/database libraries.
 */
export function initTracing(
  configOverrides?: Partial<ObservabilityConfig>
): NodeSDK | null {
  if (sdkInstance) {
    return sdkInstance;
  }

  const config = getDefaultConfig(configOverrides);

  if (!config.enableTracing) {
    return null;
  }

  try {
    const traceExporter = new OTLPTraceExporter({
      url: `${config.otlpEndpoint}/v1/traces`,
    });

    const resourceAttributes: Record<string, string> = {
      [ATTR_SERVICE_NAME]: config.serviceName,
      "deployment.environment": config.environment,
      "host.id": config.instanceId,
    };

    if (config.serviceVersion) {
      resourceAttributes[ATTR_SERVICE_VERSION] = config.serviceVersion;
    }

    sdkInstance = new NodeSDK({
      resource: new Resource(resourceAttributes),
      traceExporter,
      instrumentations: [
        getNodeAutoInstrumentations({
          "@opentelemetry/instrumentation-fs": { enabled: false },
          "@opentelemetry/instrumentation-dns": { enabled: false },
        }),
      ],
    });

    sdkInstance.start();

    process.on("SIGTERM", async () => {
      try {
        await sdkInstance?.shutdown();
      } catch (err) {
        console.error("[Observability] Error shutting down OpenTelemetry SDK:", err);
      }
    });

    return sdkInstance;
  } catch (err) {
    console.error("[Observability] Failed to start OpenTelemetry SDK:", err);
    return null;
  }
}

export function getTracingSDK(): NodeSDK | null {
  return sdkInstance;
}
