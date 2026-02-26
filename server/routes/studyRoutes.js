import express from "express";
import { generateStudyMaterial, getStudyMaterials } from "../controllers/studyController.js";
import { protect } from "../middleware/authMiddleware.js";
import { deleteStudyMaterial } from "../controllers/studyController.js";


const router = express.Router();

// Generate new study material
router.post("/generate", protect, generateStudyMaterial);

// Get all study materials for logged-in user
router.get("/", protect, getStudyMaterials);
router.delete("/:id", protect, deleteStudyMaterial);

export default router;