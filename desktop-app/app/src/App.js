import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/auth/LoginPage";

function App() {
  return (
    <div className="App">
      <Router>
        {/* Define routes here */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
