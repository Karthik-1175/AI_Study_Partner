import { useStudy } from "../context/StudyContext";
import { useState } from "react";

function Quiz() {
  const { currentStudy } = useStudy();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  if (!currentStudy) {
    return <p>No study material generated yet.</p>;
  }

  const questions = currentStudy.quiz;
  const currentQuestion = questions[currentIndex];

  const handleAnswer = (selectedOption) => {
    if (selectedOption === currentQuestion.answer) {
      setScore(score + 1);
    }

    const nextIndex = currentIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div>
        <h1>📝 Quiz Result</h1>
        <h2 style={{ marginTop: "20px" }}>
          Your Score: {score} / {questions.length}
        </h2>
      </div>
    );
  }

  return (
    <div>
      <h1>📝 Quiz</h1>

      <div style={{ marginTop: "20px" }}>
        <h3>
          Question {currentIndex + 1} of {questions.length}
        </h3>

        <p style={{ margin: "15px 0" }}>{currentQuestion.question}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              style={{
                padding: "10px",
                background: "#374151",
                border: "none",
                borderRadius: "6px",
                color: "white",
                cursor: "pointer",
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Quiz;