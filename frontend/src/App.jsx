import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* Protected Route */}
      <Route
        path="/"
        element={token ? <Dashboard /> : <Navigate to="/" />}
      />

      {/* Public Routes */}
      <Route
        path="/login"
        element={!token ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!token ? <Register /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;