import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/SettingPage.module.css';
import { IoChevronBackSharp } from "react-icons/io5";
import {
  MdOutlineListAlt, MdOutlineCalendarToday, MdOutlineCheckBox,
  MdFormatSize, MdOutlineSwapCalls, MdVibration, MdExpandMore,
  MdOutlineAnimation, MdEmojiEvents, MdFlag
} from "react-icons/md";

const ToDoAndHabitListPage = () => {
  const router = useRouter();

  const [swapTap, setSwapTap] = useState(false);
  const [vibration, setVibration] = useState(true);
  const [collapseCards, setCollapseCards] = useState(false);
  const [animations, setAnimations] = useState(true);
  const [showAwards, setShowAwards] = useState(true);
  const [showPriorities, setShowPriorities] = useState(true);

  const renderToggle = (value, setter) => (
    <div
      className={`${styles.toggleSwitch} ${value ? styles.on : ''}`}
      onClick={() => setter(!value)}
    >
      <div className={styles.circle}></div>
    </div>
  );

  return (
    <div className={styles.settingsPage}>
      <div className={styles.header}>
        <IoChevronBackSharp className={styles.backButton} onClick={() => router.back()} />
        <h2 className={styles.heading}>To-do and Habit lists</h2>
      </div>

      <div className={styles.settingsList}>
        <div className={styles.settingItem} onClick={()=>{router.push("ToDoAndHabitList/sorting")}}>
          <span className={styles.icon}><MdOutlineListAlt /></span>
          <span className={styles.label}>Sorting options</span>
        </div>

        <div className={styles.settingItem}>
          <span className={styles.icon}><MdOutlineCalendarToday /></span>
          <span className={styles.label}>First day of week</span>
          <span className={styles.value}>Sunday</span>
        </div>

        <div className={styles.settingItem}>
          <span className={styles.icon}><MdOutlineCheckBox /></span>
          <span className={styles.label}>Hide completed activities</span>
          <span className={styles.value}>Send to bottom</span>
        </div>

        <div className={styles.settingItem}>
          <span className={styles.icon}><MdFormatSize /></span>
          <span className={styles.label}>To-do list items text size</span>
          <span className={styles.value}>Default</span>
        </div>

        <div className={styles.settingItem}>
          <span className={styles.icon}><MdOutlineSwapCalls /></span>
          <span className={styles.label}>Swap tap and long tap</span>
          {renderToggle(swapTap, setSwapTap)}
        </div>

        <div className={styles.settingItem}>
          <span className={styles.icon}><MdVibration /></span>
          <span className={styles.label}>Vibration effects</span>
          {renderToggle(vibration, setVibration)}
        </div>

        <div className={styles.settingItem}>
          <span className={styles.icon}><MdExpandMore /></span>
          <span className={styles.label}>Collapse habit cards</span>
          {renderToggle(collapseCards, setCollapseCards)}
        </div>

        <div className={styles.settingItem}>
          <span className={styles.icon}><MdOutlineAnimation /></span>
          <span className={styles.label}>Animations</span>
          {renderToggle(animations, setAnimations)}
        </div>

        <div className={styles.settingItem}>
          <span className={styles.icon}><MdEmojiEvents /></span>
          <span className={styles.label}>Show Awards</span>
          {renderToggle(showAwards, setShowAwards)}
        </div>

        <div className={styles.settingItem}>
          <span className={styles.icon}><MdFlag /></span>
          <span className={styles.label}>Show priorities</span>
          {renderToggle(showPriorities, setShowPriorities)}
        </div>
      </div>
    </div>
  );
};

export default ToDoAndHabitListPage;