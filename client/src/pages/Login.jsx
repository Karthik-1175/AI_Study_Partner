import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import logo from "../logo.png";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  return (
    <div style={containerStyle}>
      {/* LEFT SIDE */}
      <div style={leftStyle}>
        <img 
  src={logo} 
  alt="Study Partner Logo"
  style={{
    width: "180px",
    marginBottom: "20px"
  }}
/>

<h1 style={brandTitle}>Study Partner</h1>
        <p style={brandText}>
          Generate smart notes, flashcards, and quizzes instantly
          using AI. Study faster. Learn smarter.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div style={rightStyle}>
        <div style={cardStyle}>
          <h2 style={headingStyle}>Welcome Back</h2>

          <form onSubmit={handleLogin} style={formStyle}>
            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <button type="submit" style={buttonStyle}>
              Login
            </button>
          </form>

          <p style={bottomText} onClick={() => navigate("/register")}>
            Don’t have an account? Register
          </p>
        </div>
      </div>
    </div>
  );
}

/* STYLES */

const containerStyle = {
  display: "flex",
  height: "100vh",
  background: "linear-gradient(135deg, #1e3a8a, #0f172a)",
};

const leftStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  color: "white",
  padding: "40px",
};

const rightStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardStyle = {
  width: "450px",
  background: "#111827",
  padding: "50px",
  borderRadius: "18px",
  boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
  color: "white",
};

const brandTitle = {
  fontSize: "42px",
  marginBottom: "20px",
};

const brandText = {
  maxWidth: "400px",
  textAlign: "center",
  opacity: 0.8,
};

const headingStyle = {
  marginBottom: "30px",
  fontSize: "24px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const labelStyle = {
  fontSize: "14px",
  marginBottom: "6px",
  display: "block",
  opacity: 0.8,
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #334155",
  background: "#1f2937",
  color: "white",
  fontSize: "14px",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "none",
  background: "#2563eb",
  color: "white",
  fontWeight: "bold",
  fontSize: "15px",
  cursor: "pointer",
};

const bottomText = {
  marginTop: "20px",
  textAlign: "center",
  cursor: "pointer",
  opacity: 0.8,
};

export default Login;