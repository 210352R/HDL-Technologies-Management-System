import logo from "./logo.svg";
import "./App.css";
import QRCodeDisplay from "./qr/QRCodeDisplay";

function App() {
  return (
    <div className="App">
      <QRCodeDisplay itemCode="12345" />
    </div>
  );
}

export default App;
