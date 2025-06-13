import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { HTTPException } from "hono/http-exception";

import { logger } from "hono/logger";
import { errorHandler } from "@/pkg/middleware/error";
import { webhookRoutes } from "@/modules/webhooks/webhook.routes";
import { prettyJSON } from "hono/pretty-json";

const app = new Hono();

app.use("*", logger());

app.use(
  "*",
  cors({
    origin: ["http://localhost:3000"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.use("*", prettyJSON());

app.get("/health", (c) => c.json({ status: "ok" }));

app.onError(errorHandler);

const apiRoutes = app
  .basePath("/api")
  .route("/webhooks", webhookRoutes);

export default {
  port: 3004,
  fetch: apiRoutes.fetch,
  idleTimeout: 30,
};
