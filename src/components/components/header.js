import React, { useState } from "react";
import styles from "../styles/header.module.css";
import Logo from "../assets/logo/logo1.jpg";
//header Component
function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className={styles.header}>
      <div className={styles.logoAndNav}>
        <div className={styles.logo}>
          {/* Logo here */}
          <img src={Logo} alt="Logo" />
        </div>
        <nav className={styles.navLinks}>
          <a href="/">Home</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/new-student">New Student</a>
        </nav>
      </div>
      <div className={styles.dropdown}>
        <svg
          onClick={toggleDropdown}
          className={styles.dropdownIcon}
          fill="#FFF"
          viewBox="0 0 100 80"
          width="40"
          height="40"
        >
          {/* Example icon; replace with your preferred icon */}
          <rect width="100" height="20"></rect>
          <rect y="30" width="100" height="20"></rect>
          <rect y="60" width="100" height="20"></rect>
        </svg>
        {isDropdownOpen && (
          <div className={styles.dropdownContent}>
            <a href="/profile">Profile</a>
            <a href="/logout">Logout</a>
            {/* Add more dropdown links here */}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
