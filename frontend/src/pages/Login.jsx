import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("All fields required");
    }

    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      console.log("Login Response:", res.data);

      // 👇 IMPORTANT FIX
      localStorage.setItem(
        "token",
        res.data.access_token || res.data.token
      );

      navigate("/");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 shadow-lg rounded w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mb-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full mb-3 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-green-500 text-white w-full p-2 rounded hover:bg-green-600 transition">
            Login
          </button>
        </form>

        <p className="text-sm mt-3 text-center">
          Don't have account?{" "}
          <Link to="/register" className="text-green-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;