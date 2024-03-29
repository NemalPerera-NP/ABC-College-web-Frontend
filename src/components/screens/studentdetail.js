import React from "react";
import styles from "../styles/newstudent.module.css";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import NewStudentForm from "../components/NewStudentForm";

function Studentdetail() {
  return (
    <div className={styles.student_container}>
      <Header />
      <div className={styles.body_container}>
        <NewStudentForm/>
      </div>
    </div>
  );
}

export default Studentdetail;
