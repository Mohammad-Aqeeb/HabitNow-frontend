"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa";
import styles from "../../styles/Sidenav.module.css"; // Use CSS Module

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const sidenavRef = useRef(null);
  const toggleRef = useRef(null);

  const toggleSidenav = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isOpen &&
        sidenavRef.current &&
        !sidenavRef.current.contains(e.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/profile", label: "Profile" },
    { href: "/timer", label: "Timer" },
    { href: "/categories", label: "Categories" },
    { href: "/customize", label: "Customize" },
    { href: "/setting", label: "Settings" },
    { href: "/backups", label: "Backups" },
    { href: "/premium", label: "Get Premium" },
    { href: "/rate", label: "Rate this App" },
    { href: "/contact", label: "Contact Us" },
    { href: "/login", label: "Login" },
  ];

  return (
    <>
      <button ref={toggleRef} className={styles.toggleBtn} onClick={toggleSidenav}>
        <FaBars />
      </button>

      <div
        ref={sidenavRef}
        className={`${styles.sidenav} ${isOpen ? styles.open : styles.closed}`}
      >
        <div className={styles.sidenavHeader}>
          <h2 className="mt-4 p-2">HabitNow</h2>
          <p className="mt-2">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <ul className={styles.sidenavLinks}>
          {links.map((link) => (
            <li
              key={link.href}
              className={pathname === link.href ? styles.active : ""}
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidenav;