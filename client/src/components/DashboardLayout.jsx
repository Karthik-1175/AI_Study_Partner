import { NavLink, Outlet, useNavigate } from "react-router-dom";

function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          background: "linear-gradient(180deg, #0f172a, #1e293b)",
          padding: "30px 20px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2 style={{ marginBottom: "40px", fontWeight: "bold" }}>
            Study AI 🚀
          </h2>

          <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

            {/* NEW DASHBOARD BUTTON */}
            <NavLink to="/dashboard" end style={navLinkStyle}>
              🏠 Dashboard
            </NavLink>

            <NavLink to="notes" style={navLinkStyle}>
              📘 Notes
            </NavLink>

            <NavLink to="flashcards" style={navLinkStyle}>
              🧠 Flashcards
            </NavLink>

            <NavLink to="quiz" style={navLinkStyle}>
              📝 Quiz
            </NavLink>

            <NavLink to="history" style={navLinkStyle}>
              📚 History
            </NavLink>
          </nav>
        </div>

        <button onClick={handleLogout} style={logoutStyle}>
          Logout
        </button>
      </div>

      {/* Content */}
      {/* Content Area */}
<div
  style={{
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "40px",
    background: "linear-gradient(135deg, #1f2937, #0f172a)",
    color: "white",
  }}
>
  <div
    style={{
      width: "100%",
      maxWidth: "1000px",
      background: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(10px)",
      padding: "40px",
      borderRadius: "20px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
      minHeight: "600px",
    }}
  >
    <Outlet />
  </div>
</div>
    </div>
  );
}

/* NavLink Styling */
const navLinkStyle = ({ isActive }) => ({
  textDecoration: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  color: "white",
  background: isActive ? "#2563eb" : "#334155",
  fontWeight: isActive ? "bold" : "normal",
  transition: "0.3s",
});

/* Logout Button */
const logoutStyle = {
  padding: "10px",
  background: "#ef4444",
  border: "none",
  borderRadius: "8px",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

export default DashboardLayout;