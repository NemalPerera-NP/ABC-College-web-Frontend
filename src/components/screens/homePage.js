import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import styles from "../styles/home.module.css";



function HomePage() {
  const navigate = useNavigate();
  return (
    <div className={styles.home_container}>
      <Header />
      
    </div>
  );
}

export default HomePage;
