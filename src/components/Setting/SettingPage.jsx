// import { useState } from "react";

// const SettingsPage = () => {
//   const [settings, setSettings] = useState({
//     notifications: true,
//     darkMode: false,
//     language: "English",
//   });

//   const handleToggle = (e) => {
//     const { name, checked } = e.target;
//     setSettings({ ...settings, [name]: checked });
//   };

//   const handleSelectChange = (e) => {
//     const { name, value } = e.target;
//     setSettings({ ...settings, [name]: value });
//   };

//   const handleSave = () => {
//     alert("Settings updated successfully!");
//     // Save logic here (e.g., localStorage or API call)
//   };

//   return (
//     <div style={{ padding: "1rem", maxWidth: "400px", margin: "auto" }}>
//       <h1>Settings</h1>

//       <div style={{ marginBottom: "1rem" }}>
//         <label style={{ display: "block", marginBottom: "0.5rem" }}>
//           Notifications
//         </label>
//         <input
//           type="checkbox"
//           name="notifications"
//           checked={settings.notifications}
//           onChange={handleToggle}
//         />
//       </div>

//       <div style={{ marginBottom: "1rem" }}>
//         <label style={{ display: "block", marginBottom: "0.5rem" }}>
//           Dark Mode
//         </label>
//         <input
//           type="checkbox"
//           name="darkMode"
//           checked={settings.darkMode}
//           onChange={handleToggle}
//         />
//       </div>

//       <div style={{ marginBottom: "1rem" }}>
//         <label style={{ display: "block", marginBottom: "0.5rem" }}>
//           Language
//         </label>
//         <select
//           name="language"
//           value={settings.language}
//           onChange={handleSelectChange}
//           style={{ padding: "0.5rem", width: "100%" }}
//         >
//           <option value="English">English</option>
//           <option value="Hindi">Hindi</option>
//           <option value="Spanish">Spanish</option>
//         </select>
//       </div>

//       <button
//         onClick={handleSave}
//         style={{
//           padding: "0.5rem 1rem",
//           backgroundColor: "#4CAF50",
//           color: "#fff",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//       >
//         Save Changes
//       </button>
//     </div>
//   );
// };

// export default SettingsPage;


import React from 'react';
import { redirect, useRouter } from 'next/navigation';
import styles from '@/styles/SettingPage.module.css';
import { IoChevronBackSharp } from "react-icons/io5";
import { MdLanguage, MdNotificationsNone, MdOutlineAppSettingsAlt, MdOutlineBackup, MdOutlineList, MdOutlinePlayCircle, MdOutlineScreenLockPortrait } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { BiSolidColorFill } from "react-icons/bi";


const SettingsPage = () => {
  const router = useRouter()
  const settings = [
    { icon: <MdOutlineList />, label: 'To-do and Habit lists', redirect : "ToDoAndHabitList"},
    { icon: <MdNotificationsNone />, label: 'Notifications and Alarms', redirect : "/ToDoAndHabitList"},
    { icon: <BiSolidColorFill />, label: 'Customize', redirect : "/ToDoAndHabitList" },
    { icon: <MdOutlineScreenLockPortrait />, label: 'Lock Screen', redirect : "/ToDoAndHabitList" },
    { icon: <MdOutlinePlayCircle />, label: 'Autostart permission', redirect : "/ToDoAndHabitList" },
    { icon: <MdOutlineAppSettingsAlt />, label: 'Xiaomi extra alarm permissions', redirect : "/ToDoAndHabitList" },
    { icon: <MdOutlineBackup />, label: 'Backups', redirect : "/ToDoAndHabitList" },
    { icon: <MdLanguage />, label: 'Language', redirect : "/ToDoAndHabitList" },
    { icon: <IoMdInformationCircleOutline />, label: 'Licenses', redirect : "/ToDoAndHabitList" },
  ];

  return (
    <div className={styles.settingsPage}>
      <div className={styles.header}>
        <IoChevronBackSharp onClick={()=>{router.back()}} className={styles.icon}/>
        <h2 className={styles.heading}>Settings</h2>
      </div>
      <div className={styles.settingsList}>
        {settings.map((item, index) => (
          <div className={styles.settingItem} key={index} onClick={()=>{router.push("/setting/ToDoAndHabitList")}}>
            <span className={styles.icon}>{item.icon}</span>  
            <span className={styles.label}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;