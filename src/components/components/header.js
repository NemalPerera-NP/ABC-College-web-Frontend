import React, { useState } from "react";
import styles from "../styles/header.module.css";
import Logo from "../assets/logo/logo1.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

  const handleLKeyChange = () => {
    const oldkey = prompt("Please enter the old registration key:");
    const newkey = prompt("Please enter the new registration key:");

    if (oldkey && newkey) {
      if (oldkey === newkey) {
        alert("Both Keeys are the same ");
      } else {
        updateRegistrationKey(oldkey, newkey);
      }
    }
  };

  const updateRegistrationKey = async (oldkey, newkey) => {
    try {
      const response = await axios.put(
        "http://localhost:8080/api/auth/update/reg-key",
        { oldkey, newkey },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          },
        }
      );
      if (response.status === 201) {
        alert("Registration key updated successfully!");
      } else {
        alert(
          "Registration key updated unsuccessfully!",
          response.data.message
        );
      }
    } catch (error) {
      alert(
        `Failed to update registration key: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

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
