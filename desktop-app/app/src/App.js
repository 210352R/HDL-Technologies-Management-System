import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { AuthProvider } from "./context/auth";
import HomePage from "./pages/home/HomePage";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          {/* Define routes here */}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
