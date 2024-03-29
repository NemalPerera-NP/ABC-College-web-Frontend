import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/login.module.css";

//logo image should be png
function LoginPage() {
  //setting up navigation between screeens
  const navigate = useNavigate();

  //loccal states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [regkey, setRegkey] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isRegistering, setIsRegistering] = useState("");

  const toggleRegistering = () => setIsRegistering(!isRegistering);

  const submit = async () => {};

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.login_form_container_sub}>
          <div className={styles.login_logo_container}>
            <h2>ABC</h2>
            <h2>College</h2>
          </div>
          <form className={styles.form_container} onSubmit={submit}>
            {!isRegistering && (
              <>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.input}
                />
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                />
              </>
            )}
            {isRegistering && (
              <input
                type="password"
                id="registerkey"
                placeholder="Registration Key"
                value={regkey}
                onChange={(e) => setRegkey(e.target.value)}
                className={styles.input}
              />
            )}

            <button type="submit" className={styles.green_btn}>
              {isRegistering ? "Signup" : "Login In"}
            </button>
            {loginError && <div className={styles.error_msg}>{loginError}</div>}

            <div >
               {!isRegistering &&(<h5>New Here? </h5>)} 
              {isRegistering ? (
                <button className={styles.green_btn} onClick={toggleRegistering} type="button">
                  Back to Login
                </button>
              ) : (
                <button className={styles.green_btn} onClick={toggleRegistering} type="button">
                  Register
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
