import logo from "./logo.svg";
import "./App.css";
import QRCodeDisplay from "./qr/QRCodeDisplay";
import LoginPage from "./pages/auth/LoginPage";

function App() {
  return (
    <div className="App">
      <LoginPage />
    </div>
  );
}

export default App;
