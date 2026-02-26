import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import studyRoutes from "./routes/studyRoutes.js";

const app = express();

/* =============================
   BULLETPROOF CORS CONFIG
============================= */

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (mobile apps, postman)
      if (!origin) return callback(null, true);

      // allow all vercel preview deployments
      if (origin.includes("vercel.app")) {
        return callback(null, true);
      }

      // allow localhost
      if (origin.includes("localhost")) {
        return callback(null, true);
      }

      return callback(null, true); // allow everything for now
    },
    credentials: true,
  })
);

// handle preflight properly
app.options("*", cors());

/* =============================
   MIDDLEWARE
============================= */

app.use(express.json());

/* =============================
   ROUTES
============================= */

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

app.use("/api/auth", authRoutes);
app.use("/api/study", studyRoutes);

/* =============================
   SERVER START
============================= */

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});