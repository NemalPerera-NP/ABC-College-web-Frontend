import React, { useEffect, useState } from "react";
import styles from "../styles/newstudent.module.css";
import Header from "../components/header";
import { useLocation } from "react-router-dom";
import NewStudentForm from "../components/NewStudentForm";

function Studentdetail() {
  // Use the useLocation hook to access location state
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 70); // adjust scroll position to accommodate header heigh
  }, []);

  return (
    <div className={styles.student_container}>
      <div className={styles.header_container}>
        <Header />
      </div>
      <div className={styles.body_container}>
        <NewStudentForm
          action={location.state.action}
          studentData={location.state.studentId}
        />
      </div>
    </div>
  );
}

export default Studentdetail;
