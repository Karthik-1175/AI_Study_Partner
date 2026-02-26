import { useEffect, useState } from "react";
import API from "../api/axios";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data } = await API.get("/api/study");
      setHistory(data.data || []);
    } catch (error) {
      console.error("History fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/study/${id}`);

      // Remove instantly from UI
      setHistory((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting item");
    }
  };

  if (loading) return <p>Loading history...</p>;

  return (
    <div>
      <h2 style={{ marginBottom: "25px" }}>📚 History</h2>

      {history.length === 0 ? (
        <p>No study materials generated yet.</p>
      ) : (
        history.map((item) => (
          <div key={item._id} style={cardStyle}>
            <div>
              <strong>{item.topic}</strong> ({item.difficulty})
            </div>

            <button
              style={deleteButtonStyle}
              onClick={() => handleDelete(item._id)}
            >
              🗑 Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

/* Styles */

const cardStyle = {
  background: "#1f2937",
  padding: "15px 20px",
  borderRadius: "10px",
  marginBottom: "15px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
};

const deleteButtonStyle = {
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
  background: "#ef4444",
  color: "white",
  cursor: "pointer",
};

export default History;