import { useStudy } from "../context/StudyContext";

function Notes() {
  const { currentStudy } = useStudy();

  if (!currentStudy) {
    return <p>No study material generated yet.</p>;
  }

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>
        📘 {currentStudy.topic} ({currentStudy.difficulty})
      </h2>

      <div style={contentStyle}>
        {currentStudy.notes}
      </div>
    </div>
  );
}

const contentStyle = {
  background: "#1f2937",
  padding: "20px",
  borderRadius: "10px",
  lineHeight: "1.8",
  fontSize: "16px",
  whiteSpace: "pre-line", // 👈 VERY IMPORTANT
};

export default Notes;