import StudyMaterial from "../models/StudyMaterial.js";
import { getGroqClient } from "../utils/groqClient.js";

/* ============================
   GENERATE STUDY MATERIAL
============================ */
export const generateStudyMaterial = async (req, res) => {
  try {
    const { topic, difficulty } = req.body;

    if (!topic || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "Topic and difficulty are required",
      });
    }

    const groq = getGroqClient();

   const completion = await groq.chat.completions.create({
  model: "llama-3.1-8b-instant",
  messages: [
    {
      role: "user",
      content: `Generate structured study material for "${topic}" at "${difficulty}" level.

Write:
- Detailed notes (400–600 words)
- 8 flashcards
- 8 quiz questions

Return JSON in this format:

{
  "notes": "string",
  "flashcards": [
    { "question": "string", "answer": "string" }
  ],
  "quiz": [
    {
      "question": "string",
      "options": ["A", "B", "C", "D"],
      "answer": "string"
    }
  ]
}`
    }
  ],
  temperature: 0.4,
  max_tokens: 1400,
  response_format: { type: "json_object" } // 🔥 THIS FIXES EVERYTHING
});

    if (!completion?.choices?.length) {
      return res.status(500).json({
        success: false,
        message: "AI did not return any response",
      });
    }

    let text = completion.choices[0]?.message?.content;

    if (!text || typeof text !== "string") {
      return res.status(500).json({
        success: false,
        message: "AI returned empty response",
      });
    }

    // Remove markdown formatting
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    // Extract JSON safely
    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1) {
      console.error("No JSON braces found:", text);
      return res.status(500).json({
        success: false,
        message: "AI did not return valid JSON",
      });
    }

    const jsonString = text.substring(firstBrace, lastBrace + 1);

    let parsedData;

    try {
      parsedData = JSON.parse(jsonString);
    } catch (err) {
      console.error("JSON Parse Failed:", jsonString);
      return res.status(500).json({
        success: false,
        message: "AI returned malformed JSON",
      });
    }

    /* ===== STRUCTURE SAFETY ===== */

    if (!parsedData.notes) {
      parsedData.notes = "No notes generated.";
    }

    if (typeof parsedData.notes !== "string") {
      parsedData.notes = JSON.stringify(parsedData.notes);
    }

    if (!Array.isArray(parsedData.flashcards)) {
      parsedData.flashcards = [];
    }

    parsedData.flashcards = parsedData.flashcards.map((card) => ({
      question: String(card.question || ""),
      answer: String(card.answer || ""),
    }));

    if (!Array.isArray(parsedData.quiz)) {
      parsedData.quiz = [];
    }

    parsedData.quiz = parsedData.quiz.map((q) => ({
      question: String(q.question || ""),
      options: Array.isArray(q.options)
        ? q.options.map((opt) => String(opt))
        : [],
      answer: String(q.answer || ""),
    }));

    const newMaterial = await StudyMaterial.create({
      user: req.user._id,
      topic,
      difficulty,
      notes: parsedData.notes,
      flashcards: parsedData.flashcards,
      quiz: parsedData.quiz,
    });

    return res.status(201).json({
      success: true,
      message: "Study material generated",
      data: newMaterial,
    });

  } catch (error) {
    console.error("FINAL BACKEND ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while generating material",
    });
  }
};


/* ============================
   GET ALL MATERIALS
============================ */
export const getStudyMaterials = async (req, res) => {
  try {
    const materials = await StudyMaterial
      .find({ user: req.user._id })
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: materials,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch study materials",
    });
  }
};


/* ============================
   DELETE MATERIAL
============================ */
export const deleteStudyMaterial = async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id);

    if (!material) {
      return res.status(404).json({ message: "Not found" });
    }

    if (material.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await material.deleteOne();

    return res.json({
      success: true,
      message: "Deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};