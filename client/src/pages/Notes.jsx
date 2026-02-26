import { useStudy } from "../context/StudyContext";

function Notes() {
  const { currentStudy } = useStudy();

  if (!currentStudy) {
    return <p>No study material generated yet.</p>;
  }

  return (
    <div>
      <h1>📘 Notes</h1>
      <p style={{ marginTop: "20px", lineHeight: "1.6" }}>
        {currentStudy.notes}
      </p>
    </div>
  );
}

export default Notes;