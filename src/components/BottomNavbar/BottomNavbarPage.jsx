"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaTasks, FaCheckCircle, FaList, FaStopwatch } from "react-icons/fa";
import styles from "../../styles/BottomNavbar.module.css";

const BottomNavbarPage = () => {
  const pathname = usePathname();

  return (
    <div className={styles.bottomNavbar}>
      <Link href="/" className={`${styles.navItem} ${pathname === "/" ? styles.active : ""}`}>
        <FaHome className={styles.icon} />
        <p>Today</p>
      </Link>

      <Link href="/habit" className={`${styles.navItem} ${pathname === "/habit" ? styles.active : ""}`}>
        <FaTasks className={styles.icon} />
        <p>Habits</p>
      </Link>

      <Link href="/myTask" className={`${styles.navItem} ${pathname === "/myTask" ? styles.active : ""}`}>
        <FaCheckCircle className={styles.icon} />
        <p>Task</p>
      </Link>

      <Link href="/categories" className={`${styles.navItem} ${pathname === "/categories" ? styles.active : ""}`}>
        <FaList className={styles.icon} />
        <p>Categories</p>
      </Link>

      <Link href="/timer" className={`${styles.navItem} ${pathname === "/timer" ? styles.active : ""}`}>
        <FaStopwatch className={styles.icon} />
        <p>Timer</p>
      </Link>
    </div>
  );
};

export default BottomNavbarPage;
