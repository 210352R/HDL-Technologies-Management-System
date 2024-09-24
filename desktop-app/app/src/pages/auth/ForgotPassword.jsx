import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";

import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";

function ForgotPassword() {
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailVal = e.target.email.value;
    sendPasswordResetEmail(auth, emailVal)
      .then((data) => {
        alert("Check your email for password reset instructions");
        history("/");
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Forgot Password
        </h1>
        <p className="text-sm text-gray-600 mb-4">
          Please enter your email address associated with your account. We will
          send you an email with instructions to reset your password. Make sure
          to check your inbox and follow the instructions.
        </p>
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              name="email"
              type="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Send Password Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
