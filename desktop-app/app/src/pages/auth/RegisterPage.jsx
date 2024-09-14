import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { useAuth } from "../../context/auth/index";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";

const RegisterPage = () => {
  // State for email, password, and confirm password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isRegistering, setIsRegistering] = useState(false);

  const { userLoggedIn } = useAuth();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    // Basic validation
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    // Log the registration data
    console.log("Email:", email);
    console.log("Password:", password);

    if (!isRegistering) {
      setIsRegistering(true);
      await doCreateUserWithEmailAndPassword(email, password);
      console.log(
        "Registration successful ------------------------------------------------"
      );
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="card w-full max-w-sm shadow-md bg-white">
          <div className="card-body">
            <h2 className="text-center text-2xl font-bold text-gray-700">
              Register
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

              {/* Confirm Password input */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="input input-bordered w-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state
                />
              </div>

              {/* Submit button */}
              <div className="form-control mt-6">
                <button className="btn btn-primary w-full" type="submit">
                  Register
                </button>
              </div>
            </form>

            {/* Already have an account link */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?
                <Link to="/" className="text-blue-500 hover:underline ml-1">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
