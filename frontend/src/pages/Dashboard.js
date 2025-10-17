import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";
import TaskForm from "../components/TaskForm";
import { jwtDecode } from "jwt-decode"; // fixed import

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  // ← Put token decoding here
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const userId = decoded?.id;
  const userRole = decoded?.role;

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to fetch tasks";
      alert(msg);
    }
  };

  const handleAdd = async (title) => {
    try {
      await createTask({ title });
      fetchTasks();
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create task";
      alert(msg);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to delete task";
      alert(msg);
    }
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
  };

  const handleUpdate = async (id) => {
    try {
      await updateTask(id, { title: editingTitle });
      setEditingTaskId(null);
      setEditingTitle("");
      fetchTasks();
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update task";
      alert(msg);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2>Dashboard</h2>
      <TaskForm onAdd={handleAdd} />

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
          >
            {editingTaskId === task.id ? (
              <>
                <input
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  style={{ flex: 1, padding: "5px" }}
                />
                <button onClick={() => handleUpdate(task.id)} style={{ marginLeft: "5px" }}>
                  Save
                </button>
                <button onClick={() => setEditingTaskId(null)} style={{ marginLeft: "5px" }}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span style={{ flex: 1 }}>{task.title}</span>
                <button onClick={() => handleEdit(task)}>Edit</button>
                {(task.userId === userId || userRole === "Admin") && (
                  <button
                    onClick={() => handleDelete(task.id)}
                    style={{ marginLeft: "5px", background: "red", color: "#fff" }}
                  >
                    Delete
                  </button>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
