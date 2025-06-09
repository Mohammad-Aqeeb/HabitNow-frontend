"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa";
import styles from "@/styles/Sidenav.module.css";

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        !navRef.current?.contains(e.target) &&
        !btnRef.current?.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <button ref={btnRef} className={styles.toggleBtn} onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </button>

      <nav
        ref={navRef}
        className={`${styles.sidenav} ${isOpen ? styles.open : styles.closed}`}
      >
        <div className={styles.sidenavHeader}>
          <h2>HabitNow</h2>
          <p>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <ul className={styles.sidenavLinks}>
          <li className={pathname === "/" ? styles.active : ""}><Link href="/">Home</Link></li>
          <li className={pathname === "/profile" ? styles.active : ""}><Link href="/profile">Profile</Link></li>
          <li className={pathname === "/timer" ? styles.active : ""}><Link href="/timer">Timer</Link></li>
          <li className={pathname === "/categories" ? styles.active : ""}><Link href="/categories">Categories</Link></li>
          <li className={pathname === "/customize" ? styles.active : ""}><Link href="/customize">Customize</Link></li>
          <li className={pathname === "/setting" ? styles.active : ""}><Link href="/setting">Settings</Link></li>
          <li className={pathname === "/backups" ? styles.active : ""}><Link href="/backups">Backups</Link></li>
          <li className={pathname === "/premium" ? styles.active : ""}><Link href="/premium">Get Premium</Link></li>
          <li className={pathname === "/rate" ? styles.active : ""}><Link href="/rate">Rate this App</Link></li>
          <li className={pathname === "/contact" ? styles.active : ""}><Link href="/contact">Contact Us</Link></li>
          <li className={pathname === "/login" ? styles.active : ""}><Link href="/login">Login</Link></li>
        </ul>
      </nav>
    </>
  );
};

export default Sidenav;