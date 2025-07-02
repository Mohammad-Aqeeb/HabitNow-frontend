"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiBars3BottomLeft } from "react-icons/hi2";
import styles from "@/styles/Sidenav.module.css";
import { useModal } from "@/context/ModalContext";

const Sidenav = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  const { openRateModal } = useModal();
  const hiddenToggleRoutes = ["/login", "/rate", "/contact", "/premium", "/timer", "/categories","/setting"];
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
      {!hiddenToggleRoutes.some(route => pathname.startsWith(route)) && (
        <button ref={btnRef} className={styles.toggleBtn} onClick={() => setIsOpen(!isOpen)}>
          <HiBars3BottomLeft />
        </button>
      )}

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
          <li className={pathname === "/" ? styles.active : ""} onClick={()=>{setIsOpen(false)}}><Link href="/">Home</Link></li>
          <li className={pathname === "/profile" ? styles.active : ""} onClick={()=>{setIsOpen(false)}}><Link href="/profile">Profile</Link></li>
          <li className={pathname === "/timer" ? styles.active : ""} onClick={()=>{setIsOpen(false)}}><Link href="/timer">Timer</Link></li>
          <li className={pathname === "/categories" ? styles.active : ""} onClick={()=>{setIsOpen(false)}}><Link href="/categories">Categories</Link></li>
          <li className={pathname === "/customize" ? styles.active : ""} onClick={()=>{setIsOpen(false)}}><Link href="/customize">Customize</Link></li>
          <li className={pathname === "/setting" ? styles.active : ""} onClick={()=>{setIsOpen(false)}}><Link href="/setting">Settings</Link></li>
          <li className={pathname === "/backups" ? styles.active : ""} onClick={()=>{setIsOpen(false)}}><Link href="/backups">Backups</Link></li>
          <li className={pathname === "/premium" ? styles.active : ""} onClick={()=>{setIsOpen(false)}}><Link href="/premium" >Get Premium</Link></li>
          <li className={pathname === "/rate" ? styles.active : ""} onClick={() => {setIsOpen(false); openRateModal()}} >Rate this App</li>
          <li className={pathname === "/contact" ? styles.active : ""} onClick={()=>{setIsOpen(false)}}><Link href="/contact">Contact Us</Link></li>
          <li className={pathname === "/login" ? styles.active : ""} onClick={()=>{setIsOpen(false)}}><Link href="/login">Login</Link></li>
          <li className={pathname === "/register" ? styles.active : ""} onClick={()=>{setIsOpen(false)}}><Link href="/register">Sign up</Link></li>
        </ul>
      </nav>
    </>
  );
};

export default Sidenav;