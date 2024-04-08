import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import styles from "../styles/home.module.css";
import StudentDataTable from "../components/StudentDataTable";

function HomePage() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("UserName");

  // useEffect(() => {
  // });
  return (
    <div className={styles.home_container}>
      <div className={styles.header_container}>
        <Header />
      </div>
      <div className={styles.title_container}>
        <h2>Hi!... {userName}</h2>
      </div>
      <div className={styles.body_container}>
        {/* <h2>Nemal :</h2>
        <h2>Home Page</h2> */}
        <StudentDataTable />
      </div>
    </div>
  );
}

export default HomePage;
