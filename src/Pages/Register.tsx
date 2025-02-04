import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Registration submit handler
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation (you can add more)
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Here you would typically send the data to the server
    // After successful registration, navigate to the Login page
    // For now, we're simulating that the registration is successful
    localStorage.setItem("user", JSON.stringify({ email, password }));

    // Redirect to login page after successful registration
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <button type="submit" className="w-full p-2 bg-indigo-600 text-black rounded-md hover:bg-indigo-700">
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Already have an account? <a href="/login" className="text-indigo-600">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
