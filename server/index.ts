import "dotenv/config";
import express from "express";
import { createAPIServer } from "./app";
import { connectDB } from "./config/db";

let dbConnected = false;

export async function createServer() {
  const app = express();

  // Connect to MongoDB
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
    }
  }

  // Create API server with all routes
  const apiServer = createAPIServer();

  // Mount API server under /api
  app.use("/api", apiServer);

  // Health check at root
  app.get("/health", (_req, res) => {
    res.status(200).json({ message: "Server is running" });
  });

  return app;
}
