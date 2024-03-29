import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/login.module.css";

//logo image should be png
function LoginPage() {
  const navigate = useNavigate();

  return (

    <div className={styles.login_container}>Login Page
    <div className={styles.login_form_container}>
        <div className={styles.login_logo_container}></div>
        <form className={styles.login_form_container}>

        </form>


    </div>

  </div>
  );
  
}

export default LoginPage;
