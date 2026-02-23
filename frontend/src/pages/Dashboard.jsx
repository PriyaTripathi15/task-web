import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("All");

  const token = localStorage.getItem("token");

  // 🔒 Redirect if not logged in
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
      console.log("Fetch Error:", err.response?.data || err.message);

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

    try {
      await axios.post(
        "http://localhost:3000/tasks",
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const toggle = async (id) => {
    try {
      await axios.patch(
        `http://localhost:3000/tasks/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const filtered =
    filter === "All"
      ? tasks
      : tasks.filter((t) => t.status === filter);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Task Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="mb-4">
        <input
          className="border p-2 mr-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />
        <button
          onClick={addTask}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <div className="mb-4 space-x-3">
        {["All", "Pending", "Completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.map((task) => (
        <div
          key={task._id}
          className="bg-white p-4 mb-3 shadow rounded flex justify-between"
        >
          <div>
            <h2 className="font-bold">{task.title}</h2>
            <p className="text-sm text-gray-500">
              {new Date(task.createdAt).toLocaleString()}
            </p>
            <span
              className={
                task.status === "Completed"
                  ? "text-green-600"
                  : "text-yellow-600"
              }
            >
              {task.status}
            </span>
          </div>

          <button
            onClick={() => toggle(task._id)}
            className="bg-purple-500 text-white px-3 py-1 rounded"
          >
            Toggle
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;