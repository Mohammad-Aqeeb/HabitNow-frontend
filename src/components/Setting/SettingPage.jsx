import React from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/SettingPage.module.css';
import { IoChevronBackSharp } from "react-icons/io5";
import { MdLanguage, MdNotificationsNone, MdOutlineAppSettingsAlt, MdOutlineBackup, MdOutlineList, MdOutlinePlayCircle, MdOutlineScreenLockPortrait } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { BiSolidColorFill } from "react-icons/bi";

const SettingsPage = () => {
  const router = useRouter();

  return (
    <div className={styles.settingsPage}>
      <div className={styles.header}>
        <IoChevronBackSharp onClick={() => router.back()} className={styles.icon} />
        <h2 className={styles.heading}>Settings</h2>
      </div>

      <div className={styles.settingsList}>
        <div className={styles.settingItem} onClick={()=>{router.push('setting/ToDoAndHabitList')}}>
          <span className={styles.icon}><MdOutlineList /></span>
          <span className={styles.label}>To-do and Habit lists</span>
        </div>
        <div className={styles.settingItem}>
          <span className={styles.icon}><MdNotificationsNone /></span>
          <span className={styles.label}>Notifications and Alarms</span>
        </div>
        <div className={styles.settingItem} onClick={()=>{router.push('/cu')}}>
          <span className={styles.icon}><BiSolidColorFill /></span>
          <span className={styles.label}>Customize</span>
        </div>
        <div className={styles.settingItem}>
          <span className={styles.icon}><MdOutlineScreenLockPortrait /></span>
          <span className={styles.label}>Lock Screen</span>
        </div>
        <div className={styles.settingItem}>
          <span className={styles.icon}><MdOutlinePlayCircle /></span>
          <span className={styles.label}>Autostart permission</span>
        </div>
        <div className={styles.settingItem}>
          <span className={styles.icon}><MdOutlineAppSettingsAlt /></span>
          <span className={styles.label}>Xiaomi extra alarm permissions</span>
        </div>
        <div className={styles.settingItem}>
          <span className={styles.icon}><MdOutlineBackup /></span>
          <span className={styles.label}>Backups</span>
        </div>
        <div className={styles.settingItem}>
          <span className={styles.icon}><MdLanguage /></span>
          <span className={styles.label}>Language</span>
        </div>
        <div className={styles.settingItem}>
          <span className={styles.icon}><IoMdInformationCircleOutline /></span>
          <span className={styles.label}>Licenses</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;