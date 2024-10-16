import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/auth";
import { publicRoutes, protectedRoutes } from "./Route";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            {publicRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.element />}
              />
            ))}

            {/* Protected Routes */}
            {protectedRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  <ProtectedRoute>
                    <route.element />
                  </ProtectedRoute>
                }
              />
            ))}

            {/* Catch-all route for undefined paths */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
