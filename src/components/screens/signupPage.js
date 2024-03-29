import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/signup.module.css";
import styleslogin from "../styles/login.module.css";

function SignupPage() {
  const navigate = useNavigate();

  //local states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nic, setNic] = useState("");
  const [employeeID, setEployeeID] = useState("");
  const [signupError, setSignuprror] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  const emailVal = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  //navigate("/"); function to navigate to login page

  const submitSignup = async () => {
    console.log("submit pressed");
  };

  ///testing function
  const change = () => {
    setIsEditable(true);
  };

  return (
    <div className={styleslogin.login_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.signup_form_container_sub}>
          <form className={styles.form_container} onSubmit={submitSignup}>
            <input
              type="text"
              id="Name"
              placeholder="Name with Initials"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles.input}
            />
            <input
              type="text"
              id="NIC"
              placeholder="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              required
              readOnly={!isEditable}
              className={styles.input}
            />
            <input
              type="text"
              id="username"
              placeholder="UserName"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={styles.input}
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
            <input
              type="text"
              id="employeeID"
              placeholder="Employee ID"
              value={employeeID}
              onChange={(e) => setEployeeID(e.target.value)}
              required
              className={styles.input}
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
            <input
              type="password"
              id="confirmpassword"
              placeholder="Confirm Password"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              required
              className={styles.input}
            />

            {signupError && (
              <div className={styles.error_msg}>{signupError}</div>
            )}
            <button type="submit" className={styles.green_btn}>
              Sing Up
            </button>
            {/* this is a button to check the isEditable option in input fields so delete before final release */}
            <button type="Change" className={styles.green_btn} onClick={change}>
              Change Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignupPage;
