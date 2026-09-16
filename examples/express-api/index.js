import express from "express";
import { setupObservability, logger, addBreadcrumb } from "@stacklenzz/server";

const app = express();
const PORT = process.env.PORT || 5000;

const products = [
  {
    id: 1,
    name: "Cloud Server Pro",
    price: 49,
    category: "Infrastructure",
    description: "High-performance cloud server for demanding applications.",
  },
  {
    id: 2,
    name: "Managed Database",
    price: 99,
    category: "Infrastructure",
    description: "High-performance cloud server for demanding applications.",
  },
  {
    id: 3,
    name: "Cloud Server Pro",
    price: 49,
    category: "Infrastructure",
    description: "High-performance cloud server for demanding applications.",
  },
  {
    id: 4,
    name: "Managed Database",
    price: 99,
    category: "Infrastructure",
    description: "High-performance cloud server for demanding applications.",
  },
  {
    id: 5,
    name: "Cloud Server Pro",
    price: 49,
    category: "Infrastructure",
    description: "High-performance cloud server for demanding applications.",
  },
  {
    id: 6,
    name: "Managed Database",
    price: 99,
    category: "Infrastructure",
    description: "High-performance cloud server for demanding applications.",
  },
];

// One-liner attaches:
// 1. Request latency & throughput monitoring
// 2. Prometheus metrics at /metrics
// 3. Telemetry JSON snapshot at /api/observability/stats for the UI dashboard
setupObservability(app, {
  serviceName: "bookme-express-api",
  environment: "development",
  autoInitTracing: false,
});

app.use(express.json());

// Sample business routes
app.get("/api/users", (_req, res) => {
  logger.info("Users fetched successfully");
  res.json([
    { id: 1, name: "Alice Developer", role: "admin" },
    { id: 2, name: "Bob Engineer", role: "member" },
  ]);
});

app.post("/api/login", (req, res) => {
  const { username } = req.body || {};
  logger.info("User login attempt", { username });
  res.json({ success: true, token: "demo-jwt-token" });
});

app.get("/api/products", (_req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === Number(id));
  if (!product) {
    logger.error("Product not found", {
      route: "/api/products/:id",
      method: "GET",
      statusCode: 404,
      productId: id,
    });
    return res.status(404).json({ message: "Product not found" });
  }
  res.json({
    ...product,
  });
});

app.post("/api/orders", (req, res) => {
  const isError = Math.random() < 0.2;
  if (isError) {
    logger.error("Payment processing error occurred", {
      route: "/api/orders",
      method: "POST",
      statusCode: 500,
    });
    return res.status(500).json({ error: "Payment processor unavailable" });
  }
  res.status(201).json({ orderId: "ORD-9821", status: "completed" });
});

// Dedicated endpoints to trigger and test Recent Exceptions & Failures:

// 1. Trigger simulated database failure with stack trace
app.get("/api/simulate-error", (_req, res) => {
  addBreadcrumb({ category: "auth", message: "User session authenticated: uid_4812", level: "info" });
  addBreadcrumb({ category: "db", message: "Attempting query: SELECT * FROM `users` WHERE active = true", level: "info" });
  addBreadcrumb({ category: "db", message: "Database connection pool timeout warning (limit: 10 connections)", level: "warn" });

  try {
    throw new Error("DatabaseConnectionTimeout: Connection pool exhausted after 3000ms while querying `users` table");
  } catch (err) {
    logger.error(err.message, {
      stack: err.stack,
      route: "/api/simulate-error",
      method: "GET",
      status: 500,
    });
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
      hint: "Inspect this failure live in the Observability Dashboard under 'Recent Exceptions & Failures'!",
    });
  }
});

// 2. Trigger simulated payment gateway 502 Bad Gateway
app.post("/api/simulate-crash", (req, res) => {
  addBreadcrumb({ category: "auth", message: "User checkout initiated (cart_id: crt_8820)", level: "info" });
  addBreadcrumb({ category: "http", message: "Outbound POST https://api.stripe.com/v1/payment_intents", level: "info" });
  addBreadcrumb({ category: "log", message: "Stripe connection socket reset by peer (ECONNRESET)", level: "error" });

  const customErr = new Error("UpstreamGatewayUnavailable: Stripe charge API returned HTTP 502 Bad Gateway");
  logger.error(customErr.message, {
    stack: customErr.stack,
    route: "/api/simulate-crash",
    method: "POST",
    status: 502,
    req,
  });
  res.status(502).json({
    gateway: "stripe-v1",
  });
});

// Fallback for non-existent routes (404 Not Found)
app.use((req, res) => {
  res.status(404).json({
    statusCode: 404,
    error: "Not Found",
    message: `Cannot ${req.method} ${req.originalUrl || req.url}`,
  });
});

app.listen(PORT, () => {
  console.log(`[Express API] Running on http://localhost:${PORT}`);
  console.log(`[Observability UI Stats] Available at http://localhost:${PORT}/api/observability/stats`);
  console.log(`[Prometheus Metrics] Available at http://localhost:${PORT}/metrics`);
  console.log(`[Test Error Endpoint] Trigger error at http://localhost:${PORT}/api/simulate-error`);
});
