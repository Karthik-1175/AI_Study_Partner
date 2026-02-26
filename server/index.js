import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import studyRoutes from "./routes/studyRoutes.js";
import { protect } from "./middleware/authMiddleware.js";

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-study-partner-sable.vercel.app",
    ],
    credentials: true,
  })
);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Protected test
app.get("/api/protected", protect, (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed",
    user: req.user,
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/study", studyRoutes);

// 404 handler (IMPORTANT FIX)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});