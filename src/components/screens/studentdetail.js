import React,{useEffect} from "react";
import styles from "../styles/newstudent.module.css";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import NewStudentForm from "../components/NewStudentForm";

function Studentdetail() {
  useEffect(() => {
    window.scrollTo(0, 70); // adjust scroll position to accommodate header height
  }, []);

  return (
    <div className={styles.student_container}>
        <div className={styles.header_container}>
        <Header />
        </div>
      <div className={styles.body_container}>
        {/* <NewStudentForm /> */}
        <NewStudentForm action="create" />
      </div>
    </div>
  );
}

export default Studentdetail;
