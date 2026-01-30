import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

// Create a promise that resolves when the server is ready
let isReady = false;
let resolveReady: () => void = () => { };
const readyPromise = new Promise<void>((resolve) => {
  resolveReady = resolve;
});


// Middleware to wait for the server to be ready (important for Vercel)
// This MUST be added before any routes are registered
app.use(async (_req, _res, next) => {
  if (!isReady) {
    log("Waiting for server to be ready...");
    await readyPromise;
  }
  next();
});

// Start server initialization in the background
(async () => {
  try {
    log("Starting server initialization...");
    await registerRoutes(httpServer, app);

    app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      console.error("Internal Server Error:", err);
      if (res.headersSent) return next(err);
      return res.status(status).json({ message });
    });

    if (app.get("env") === "development") {
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
    } else if (process.env.VERCEL !== "1") {
      serveStatic(app);
    }

    if (process.env.VERCEL !== "1") {
      const port = parseInt(process.env.PORT || "5000", 10);
      httpServer.listen({ port, host: "0.0.0.0" }, () => {
        log(`serving on port ${port}`);
      });
    }

    isReady = true;
    resolveReady();
    log("Server initialization complete.");
  } catch (err) {
    console.error("Server initialization failed:", err);
    process.exit(1);
  }
})();



app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

// Export the app for Vercel
export default app;
