import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/SettingPage.module.css';
import { IoChevronBackSharp } from "react-icons/io5";
import {
  MdOutlineListAlt, MdOutlineCalendarToday, MdOutlineCheckBox,
  MdFormatSize, MdOutlineSwapCalls, MdVibration, MdExpandMore,
  MdOutlineAnimation, MdEmojiEvents, MdFlag
} from "react-icons/md";

const settings = [
  { icon: <MdOutlineListAlt />, label: 'Sorting options' },
  { icon: <MdOutlineCalendarToday />, label: 'First day of week', value: 'Sunday' },
  { icon: <MdOutlineCheckBox />, label: 'Hide completed activities', value: 'Send to bottom' },
  { icon: <MdFormatSize />, label: 'To-do list items text size', value: 'Default' },
  { icon: <MdOutlineSwapCalls />, label: 'Swap tap and long tap', toggle: true },
  { icon: <MdVibration />, label: 'Vibration effects', toggle: true, default: true },
  { icon: <MdExpandMore />, label: 'Collapse habit cards', toggle: true },
  { icon: <MdOutlineAnimation />, label: 'Animations', toggle: true, default: true },
  { icon: <MdEmojiEvents />, label: 'Show Awards', toggle: true, default: true },
  { icon: <MdFlag />, label: 'Show priorities', toggle: true, default: true },
];

const ToDoAndHabitListPage = () => {
  const router = useRouter();

  const [toggles, setToggles] = useState(
    settings.reduce((acc, item, index) => {
      if (item.toggle) acc[index] = item.default || false;
      return acc;
    }, {})
  );

  const handleToggle = (index) => {
    setToggles(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className={styles.settingsPage}>
      <div className={styles.header}>
        <IoChevronBackSharp className={styles.backButton} onClick={() => router.back()} />
        <h2 className={styles.heading}>To-do and Habit lists</h2>
      </div>

      <div className={styles.settingsList}>
        {settings.map((item, index) => (
          <div className={styles.settingItem} key={index}>
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>

            {item.value && <span className={styles.value}>{item.value}</span>}

            {item.toggle !== undefined && (
              <div
                className={`${styles.toggleSwitch} ${toggles[index] ? styles.on : ''}`}
                onClick={() => handleToggle(index)}
              >
                <div className={styles.circle}></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoAndHabitListPage;