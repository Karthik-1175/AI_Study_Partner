import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import studyRoutes from "./routes/studyRoutes.js";

const app = express();

console.log("GROQ KEY:", process.env.GROQ_API_KEY);

// ✅ CORS CONFIG (IMPORTANT)
const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-study-partner-sable.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

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

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});