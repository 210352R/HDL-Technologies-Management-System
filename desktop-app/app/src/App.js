import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { AuthProvider } from "./context/auth";
import HomePage from "./pages/home/HomePage";

// firebase configuration
import { initializeApp } from "@firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";
import AddBillForm from "./pages/services/bill/NewBillPage";

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
            <Route path="/admin/newbill" element={<AddBillForm />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
