import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/login.module.css";
import Logo from "../assets/logo/logo1.jpg";
import axios from "axios";

//logo image should be png
function LoginPage() {
  //setting up navigation between screeens
  const navigate = useNavigate();

  //loccal states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [regkey, setRegkey] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleRegistering = () => setIsRegistering(!isRegistering);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {});

  const verifyRegistrationKey = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/reg-key",
        {
          regkey,
        }
      );
      if (response.status === 200) {
        // Registration key is valid, navigate to signup page
        navigate("/signup");
      } else {
        setLoginError("...........", response);
      }
    } catch (error) {
      console.error(
        "Error verifying registration key:..........",
        error.message
      );
      setLoginError("Error verifying registration key. Please try again.");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      clearlogin();
      console.log("isRegistering true......", isRegistering);
      await verifyRegistrationKey();
    } else {
      console.log("isRegistering false......", isRegistering);

      try {
      } catch (error) {}
    }
  };

  const clearlogin = () => {
    setPassword("");
    setUsername("");
  };
 

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.login_form_container_sub}>
          <div className={styles.login_logo_container}>
            <img src={Logo} alt="Logo" />
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
                  required
                />
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  required
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
                required
              />
            )}

            <button type="submit" className={styles.green_btn}>
              {isRegistering ? "Verify Key" : "Login In"}
            </button>
            {loginError && <div className={styles.error_msg}>{loginError}</div>}

            <div className={styles.login_fotter}>
              {!isRegistering && <h5>New Here? </h5>}
              {isRegistering ? (
                <button
                  className={styles.green_btn}
                  onClick={toggleRegistering}
                  type="button"
                >
                  Back to Login
                </button>
              ) : (
                <button
                  className={styles.white_btn}
                  onClick={toggleRegistering}
                  type="button"
                >
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
