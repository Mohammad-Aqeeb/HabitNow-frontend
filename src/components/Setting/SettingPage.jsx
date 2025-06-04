// File: pages/settings.js

import { useState } from "react";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: "English",
  });

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setSettings({ ...settings, [name]: checked });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSave = () => {
    alert("Settings updated successfully!");
    // Save logic here (e.g., localStorage or API call)
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "400px", margin: "auto" }}>
      <h1>Settings</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Notifications
        </label>
        <input
          type="checkbox"
          name="notifications"
          checked={settings.notifications}
          onChange={handleToggle}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Dark Mode
        </label>
        <input
          type="checkbox"
          name="darkMode"
          checked={settings.darkMode}
          onChange={handleToggle}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Language
        </label>
        <select
          name="language"
          value={settings.language}
          onChange={handleSelectChange}
          style={{ padding: "0.5rem", width: "100%" }}
        >
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Spanish">Spanish</option>
        </select>
      </div>

      <button
        onClick={handleSave}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Save Changes
      </button>
    </div>
  );
};

export default SettingsPage;