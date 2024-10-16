import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { publicRoutes, protectedRoutes } from "./Route";
import ProtectedRoute from "./ProtectedRoute";

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
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
