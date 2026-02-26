import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useStudy } from "../context/StudyContext";

function Dashboard() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const { setCurrentStudy } = useStudy();

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      setErrorMsg("Please enter a topic.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      // ✅ FIXED: Added await
      const { data } = await API.post("/api/study/generate", {
        topic,
        difficulty,
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      // Save study data in context
      setCurrentStudy(data.data);

      // Navigate to notes page
      navigate("notes");

    } catch (error) {
      console.error("Generate Error:", error);

      setErrorMsg(
        error.response?.data?.message ||
        error.message ||
        "Error generating study material"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "25px" }}>Generate Study Material</h1>

      <form onSubmit={handleGenerate} style={formStyle}>
        <input
          type="text"
          placeholder="Enter Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={inputStyle}
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          style={inputStyle}
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {errorMsg && (
        <p style={{ color: "#f87171", marginTop: "15px" }}>{errorMsg}</p>
      )}

      <div style={navContainer}>
        <button style={navButton} onClick={() => navigate("notes")}>
          📘 View Notes
        </button>

        <button style={navButton} onClick={() => navigate("flashcards")}>
          🧠 View Flashcards
        </button>

        <button style={navButton} onClick={() => navigate("quiz")}>
          📝 Take Quiz
        </button>
      </div>
    </div>
  );
}

/* ================== STYLES ================== */

const containerStyle = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "40px",
  textAlign: "center",
};

const formStyle = {
  display: "flex",
  gap: "10px",
  justifyContent: "center",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #444",
  width: "180px",
};

const buttonStyle = {
  padding: "10px 20px",
  background: "#3b82f6",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer",
};

const navContainer = {
  marginTop: "40px",
  display: "flex",
  justifyContent: "center",
  gap: "15px",
};

const navButton = {
  padding: "10px 15px",
  background: "#374151",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer",
};

export default Dashboard;