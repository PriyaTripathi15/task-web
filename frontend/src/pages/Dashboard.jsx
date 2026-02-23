import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("All");

  const token = localStorage.getItem("token");

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    }
  }, [token]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const addTask = async () => {
    if (!title.trim()) return alert("Title required");

    await axios.post(
      "http://localhost:3000/tasks",
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTitle("");
    fetchTasks();
  };

  const toggle = async (id) => {
    await axios.patch(
      `http://localhost:3000/tasks/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const filtered =
    filter === "All"
      ? tasks
      : tasks.filter((t) => t.status === filter);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative p-8"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1492724441997-5dc865305da7')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10  shadow-2xl rounded-2xl p-8 max-w-3xl mx-auto bg-white/20 border border-white/30">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Task Dashboard
          </h1>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        {/* Add Task */}
        <div className="flex mb-6">
          <input
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
          />
          <button
            onClick={addTask}
            className="ml-3 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            Add
          </button>
        </div>

        {/* Filters */}
        <div className="flex space-x-3 mb-6 justify-center">
          {["All", "Pending", "Completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg transition ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {filtered.length === 0 && (
            <p className="text-center text-gray-500">
              No tasks available
            </p>
          )}

          {filtered.map((task) => (
            <div
              key={task._id}
              className="bg-gray-100 p-4 rounded-xl flex justify-between items-center shadow-sm"
            >
              <div>
                <h2 className="font-bold text-lg text-gray-800">
                  {task.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date(task.createdAt).toLocaleString()}
                </p>
                <span
                  className={`font-semibold ${
                    task.status === "Completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {task.status}
                </span>
              </div>

              <button
                onClick={() => toggle(task._id)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
              >
                Toggle
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;