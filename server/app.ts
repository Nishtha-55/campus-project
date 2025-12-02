import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import passport from "passport";
import { initializePassport } from "./config/passport";
import { errorHandler, AppError } from "./middleware/errorHandler";

// Import routes
import authRoutes from "./routes/auth.routes";
import lostRoutes from "./routes/lost.routes";
import foundRoutes from "./routes/found.routes";
import claimRoutes from "./routes/claim.routes";
import adminRoutes from "./routes/admin.routes";

export function createAPIServer() {
  const app = express();

  // Middleware
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || "*",
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Initialize Passport
  initializePassport();
  app.use(passport.initialize());

  // Health check endpoint
  app.get("/health", (_req, res) => {
    res.status(200).json({ message: "API server is running" });
  });

  // API Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/lost", lostRoutes);
  app.use("/api/found", foundRoutes);
  app.use("/api/claims", claimRoutes);
  app.use("/api/admin", adminRoutes);

  // 404 handler
  app.use("*", (req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: `Route not found: ${req.originalUrl}`,
    });
  });

  // Error handler (must be last)
  app.use(errorHandler);

  return app;
}
