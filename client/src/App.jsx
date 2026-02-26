import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import Flashcards from "./pages/Flashcards";
import Quiz from "./pages/Quiz";
import History from "./pages/History";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* 🔥 THIS WAS MISSING */}
          <Route index element={<Dashboard />} />

          <Route path="notes" element={<Notes />} />
          <Route path="flashcards" element={<Flashcards />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="history" element={<History />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;