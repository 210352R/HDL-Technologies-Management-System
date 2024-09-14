import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom"; // Import Link from react-router-dom
import { doSignInWithEmailAndPassword } from "../../firebase/auth";

const LoginPage = () => {
  const { userLoggedIn } = useAuth();

  // State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    console.log("Email:", email);
    console.log("Password:", password);
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(email, password);
      console.log(
        "Sign in successful ------------------------------------------------"
      );
      // doSendEmailVerification()
    }
  };

  return (
    <div>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
              <a
                href="/forgot-password"
                className="text-sm text-gray-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Register link */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?
                <Link
                  to="/register"
                  className="text-blue-500 hover:underline ml-1"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
