import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Login submit handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Retrieve user email and password from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Check if the entered email and password match
    if (user.email === email && user.password === password) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="w-full p-2 bg-indigo-600 text-black rounded-md hover:bg-indigo-700">
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Don't have an account? <a href="/register" className="text-indigo-600">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
