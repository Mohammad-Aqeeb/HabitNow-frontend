'use client';

import { usePathname } from 'next/navigation';
import { FaCalendarAlt, FaQuestionCircle, FaSearch } from 'react-icons/fa';
import { IoFilter } from "react-icons/io5";
import { BiArchiveIn } from "react-icons/bi";
import styles from '@/styles/Navbar.module.css';

function Navbar() {
  const pathname = usePathname();

  // Set default icons to false
  let showSearch = false;
  let showFilter = false;
  let showCalendar = false;
  let showHelp = false;
  let showArchive = false;
  let title = 'Today';

  // Conditional logic based on current route
  if (pathname.startsWith('/myTask')) {
    showSearch = true;
    showFilter = true;
    showArchive = true;
    title = 'Tasks';
  } else if (pathname.includes('/habit')) {
    showSearch = true;
    showFilter = true;
    showArchive = true;
    title = 'Habit';
  } else {
    // Assume HomePage or default route
    showSearch = true;
    showFilter = true;
    showCalendar = true;
    showHelp = true;
    title = 'Today';
  }

  return (
    <div className={styles.navbar}>
      <span className={styles.navbarTitle}>{title}</span>
      <div className={styles.navbarIcons}>
        {showSearch && <FaSearch className={styles.icon} />}
        {showFilter && <IoFilter className={styles.icon}/>}
        {showCalendar && <FaCalendarAlt className={styles.icon} />}
        {showHelp && <FaQuestionCircle className={styles.icon} />}
        {showArchive && <BiArchiveIn className={styles.icon} />}
      </div>
    </div>
  );
}

export default Navbar;
