import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTask: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");
  const navigate = useNavigate();

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = { title, description, dueDate, priority, status };
    
    // Save task to localStorage (or backend API)
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Redirect to task list or dashboard
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Add New Task</h2>
        <form onSubmit={handleAddTask}>
          <div className="mb-4">
            <label className="block text-gray-700">Task Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-md" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md"></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Due Date</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-2 border rounded-md" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}
              className="w-full p-2 border rounded-md">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border rounded-md">
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
          <button type="submit" className="w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
