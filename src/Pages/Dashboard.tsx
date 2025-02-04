import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaHome, FaPlus, FaList, FaCog, FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-white shadow-lg p-6 flex flex-col space-y-6 border-r h-full">
        <h2 className="text-2xl font-bold text-center text-indigo-700">Task Manager</h2>

        <Link to="/dashboard" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-100 transition">
          <FaHome className="text-indigo-600" />
          <span className="font-medium">Dashboard</span>
        </Link>

        <Link to="/add-task" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-100 transition">
          <FaPlus className="text-indigo-600" />
          <span className="font-medium">Add Task</span>
        </Link>

        <Link to="/task-list" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-100 transition">
          <FaList className="text-indigo-600" />
          <span className="font-medium">Task List</span>
        </Link>

        <Link to="/settings" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-100 transition">
          <FaCog className="text-indigo-600" />
          <span className="font-medium">Settings</span>
        </Link>

        {/* Logout Button */}
        <button onClick={handleLogout} className="mt-auto flex items-center space-x-3 p-3 rounded-lg hover:bg-red-100 text-red-600 transition">
          <FaSignOutAlt />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-8 relative">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Welcome to Your Task Manager</h1>
        <p className="text-gray-600 mt-2 text-center">Manage your tasks efficiently and stay organized.</p>

        {/* Task Overview Section */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg border w-full mx-auto">
          <h2 className="text-xl font-semibold text-gray-700">Today's Tasks</h2>
          <ul className="mt-4 text-gray-600 space-y-2">
            <li className="flex items-center">
              ✅ <span className="ml-2">Complete project documentation</span>
            </li>
            <li className="flex items-center">
              ⏳ <span className="ml-2">Review submitted tasks</span>
            </li>
            <li className="flex items-center">
              🚀 <span className="ml-2">Deploy the latest updates</span>
            </li>
          </ul>
        </div>

        {/* Calendar Section (Top Right) */}
        <div className="absolute top-6 right-6 w-80 bg-white shadow-lg p-6 rounded-lg border">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Calendar</h2>
          <Calendar onChange={setDate} value={date} className="w-full shadow-md rounded-lg p-4" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
