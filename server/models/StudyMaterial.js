import mongoose from "mongoose";

const studyMaterialSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    topic: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },

    // 🔥 IMPORTANT FIX
    notes: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    flashcards: [
      {
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],

    quiz: [
      {
        question: {
          type: String,
          required: true,
        },
        options: {
          type: [String],
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const StudyMaterial = mongoose.model("StudyMaterial", studyMaterialSchema);

export default StudyMaterial;