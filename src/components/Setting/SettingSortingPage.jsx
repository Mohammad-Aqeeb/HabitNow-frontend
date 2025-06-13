import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/SettingSortingPage.module.css';
import { IoChevronBackSharp } from 'react-icons/io5';
import { SiTicktick } from "react-icons/si";
import { GoTrophy } from "react-icons/go";
import { IoMdRepeat } from 'react-icons/io';


const SettingSortingPage = () => {
  const router = useRouter();
  const [openSection, setOpenSection] = useState('todo');

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className={styles.settingsContainer}>

      <div className={styles.header}>
        <IoChevronBackSharp onClick={() => router.back()} className={styles.backButton} />
        <h2 className={styles.heading}>Sorting options</h2>
      </div>

     <div className={styles.settingList}>
      <div className={styles.section}>
        <div className={styles.sectionHeader} onClick={() => toggleSection('todo')}>
          <span className={styles.checkIcon}><SiTicktick /></span>
          <span>To-do list order criteria</span>
        </div>
        {openSection === 'todo' && (
          <div className={styles.criteria}>
            <div className={styles.item}>
              <span>First</span>
              <span className={styles.value}>By priority</span>
            </div>
            <div className={styles.item}>
              <span>Second</span>
              <span className={styles.value}>By time</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader} onClick={() => toggleSection('habits')}>
          <span className={styles.icon}><GoTrophy /></span>
          <span>'Habits' section order criteria</span>
        </div>
        {openSection === 'habits' && (
          <div className={styles.criteria}>
            <div className={styles.item}>
              <span>First</span>
              <span className={styles.value}>By priority</span>
            </div>
            <div className={styles.item}>
              <span>Second</span>
              <span className={styles.value}>Alphabetical</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader} onClick={() => toggleSection('recurring')}>
          <span className={styles.icon}><IoMdRepeat /></span>
          <span>'Recurring tasks' section order criteria</span>
        </div>
        {openSection === 'recurring' && (
          <div className={styles.criteria}>
            <div className={styles.item}>
              <span>First</span>
              <span className={styles.value}>By date</span>
            </div>
            <div className={styles.item}>
              <span>Second</span>
              <span className={styles.value}>By tag</span>
            </div>
          </div>
        )}
      </div>
     </div>
    </div>
  );
};

export default SettingSortingPage;