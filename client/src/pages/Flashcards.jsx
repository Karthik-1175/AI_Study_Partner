import { useStudy } from "../context/StudyContext";
import { useState } from "react";

function Flashcards() {
  const { currentStudy } = useStudy();
  const [flippedIndex, setFlippedIndex] = useState(null);

  if (!currentStudy) {
    return <p>No study material generated yet.</p>;
  }

  const handleFlip = (index) => {
    setFlippedIndex(index === flippedIndex ? null : index);
  };

  return (
    <div>
      <h1>🧠 Flashcards</h1>

      <div style={{ marginTop: "20px", display: "grid", gap: "15px" }}>
        {currentStudy.flashcards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleFlip(index)}
            style={{
              background: "#374151",
              padding: "20px",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            {flippedIndex === index ? (
              <>
                <strong>Answer:</strong>
                <p style={{ marginTop: "10px" }}>{card.answer}</p>
              </>
            ) : (
              <>
                <strong>Question:</strong>
                <p style={{ marginTop: "10px" }}>{card.question}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Flashcards;