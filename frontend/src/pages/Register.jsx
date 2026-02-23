import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("All fields are required");
    }

    if (password.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:3000/auth/register", {
        email,
        password,
      });

      alert("Registered Successfully 🎉");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "User already exists");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1508780709619-79562169bc64')",
      }}
    >
      <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8 w-96 text-white">
        <h2 className="text-3xl font-semibold mb-6 text-center tracking-wide">
          Create Account
        </h2>

        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-3 rounded-lg bg-white/30 placeholder-white text-white outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-3 rounded-lg bg-white/30 placeholder-white text-white outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm mt-5 text-center">
          Already have account?{" "}
          <Link to="/login" className="text-blue-300 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;