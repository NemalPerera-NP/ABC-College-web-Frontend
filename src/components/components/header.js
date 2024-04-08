import React, { useState } from "react";
import styles from "../styles/header.module.css";
import Logo from "../assets/logo/logo1.jpg";
import { useNavigate } from "react-router-dom";
//header Component
function Header() {
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const onclicknavigate = () => {
    navigate(`/studentdetails`, {
      state: { studentId: null, action: "Create" },
    });
  };

  const handleLogout = () => {
    // confirmation alert
    const isConfirmed = window.confirm("Are you sure you want to logout?");
    if (isConfirmed) {
      localStorage.clear(); // to Clear all local storage items
      navigate("/");
    }
  };

  const handleLKeyChange = () => {};

  return (
    <header className={styles.header}>
      <div className={styles.logoAndNav}>
        <div className={styles.logo}>
          {/* Logo */}
          <img src={Logo} alt="Logo" />
        </div>
        <nav className={styles.navLinks}>
          <a href="/home">Home</a>
          <button onClick={onclicknavigate} className={styles.linkButton}>
            New Student
          </button>
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
            <button onClick={handleLKeyChange} className={styles.linkButton}>
              Change Key
            </button>
            <button onClick={handleLogout} className={styles.linkButton}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
