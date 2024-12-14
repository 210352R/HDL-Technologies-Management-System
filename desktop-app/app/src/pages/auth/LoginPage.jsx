import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom"; // Import Link from react-router-dom
import { doSignInWithEmailAndPassword } from "../../firebase/auth";
import { useAuth } from "../../context/auth/index";

const LoginPage = () => {
  const { userLoggedIn } = useAuth();
  const { isCompanyUser } = useAuth();

  // State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  console.log("Signing in... Is company user", isCompanyUser);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    console.log("Email:", email);
    console.log("Password:", password);

    if (!isSigningIn) {
      setIsSigningIn(true); // Set signing state

      try {
        const res = await doSignInWithEmailAndPassword(email, password);
        console.log("res", res);
        console.log(
          "Sign in successful ------------------------------------------------"
        );

        // Check if the response is valid
        if (!res) {
          console.log(
            "Sign in failed ------------------------------------------------"
          );
          setErrorMessage("Invalid email or password");
          alert("Invalid email or password"); // Show alert
        }
      } catch (error) {
        // Handle errors here
        console.error("Error during sign in:", error);
        setErrorMessage(error.message || "An error occurred during sign in");
        alert(error.message || "An error occurred during sign in"); // Show alert
      } finally {
        setIsSigningIn(false); // Reset signing state
      }
    }
  };

  return (
    <div>
      {userLoggedIn && !isCompanyUser && <Navigate to="/home" replace={true} />}
      {userLoggedIn && isCompanyUser && (
        <Navigate to="/company" replace={true} />
      )}

      <div className="min-h-screen flex items-center justify-center bg-gray-400">
        <div className="card w-full max-w-sm shadow-md bg-white">
          <div className="card-body">
            <h2 className="text-center text-2xl font-bold text-gray-700">
              Login
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Email input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                />
              </div>

              {/* Password input */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                />
              </div>

              {/* Submit button */}
              <div className="form-control mt-6">
                <button className="btn btn-primary w-full" type="submit">
                  Login
                </button>
              </div>
            </form>

            {/* Forgot password link */}
            <div className="text-center mt-4">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
