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
import ForgotPassword from "./pages/auth/ForgotPassword";
import BackupScreen from "./pages/backup/BackupScreen";
import BillList from "./pages/bills/DispalyAllBills";
import UserList from "./pages/users/UserList";
import SettingPage from "./pages/settings/SettingPage";

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
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/memory-backup" element={<BackupScreen />} />
            <Route path="/all-bills" element={<BillList />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/settings" element={<SettingPage />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
