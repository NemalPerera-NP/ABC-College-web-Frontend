import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import styles from "../styles/home.module.css";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className={styles.home_container}>
      <div className={styles.header_container}>
        <Header />
      </div>
      <div className={styles.body_container}>
        <h2>Nemal Page</h2>
        <h1>hii</h1>
        <h2>Home Page</h2>
        <h1>hii</h1>
        <h2>Home Page</h2>
        <h1>hii</h1>
      </div>
    </div>
  );
}

export default HomePage;
