import React from "react";

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import AddTask from "./Pages/AddTask";
import Settings from "./Pages/Settings";
import TaskList from "./Pages/TaskList";

// Private route to protect Dashboard access
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/task-list" element={<TaskList />} />
      </Routes>
    </Router>
  );
};



export default App;
