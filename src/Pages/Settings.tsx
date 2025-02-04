import React, { useState } from "react";

const Settings: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [newPassword, setNewPassword] = useState("");

  const handleSaveSettings = () => {
    localStorage.setItem("settings", JSON.stringify({ darkMode, emailNotifications, newPassword }));
    alert("Settings updated successfully!");
  };

  return (
    <div className={`flex justify-center items-center h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Settings</h2>

        {/* Theme Toggle */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-gray-700">Dark Mode</span>
          <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)}
            className="transform scale-125" />
        </div>

        {/* Notification Toggle */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-gray-700">Email Notifications</span>
          <input type="checkbox" checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)}
            className="transform scale-125" />
        </div>

        {/* Change Password */}
        <div className="mb-4">
          <label className="block text-gray-700">New Password</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded-md" />
        </div>

        <button onClick={handleSaveSettings}
          className="w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
