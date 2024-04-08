import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/login.module.css";
import Logo from "../assets/logo/logo1.jpg";
import axios from "axios";

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
        console.log("valid Registration Key");
        // Registration key is valid, navigate to signup page
        clearReg();
        clearlogin();
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
      clearReg();
      console.log("login.... and regkey...", regkey);

      console.log("isRegistering false......", isRegistering);

      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/login",
          { username, password }
        );
        if (response.status === 200) {
          // success
          // console.log("Login successful", response.data);
          // console.log("Login successful data......", response.data.data);
          // console.log("Login successful token......", response.data.token);

          localStorage.setItem("UserId", response.data.data.id);
          localStorage.setItem("TOKEN", response.data.token);
          localStorage.setItem("UserName", response.data.data.name);

          navigate("/home");
        } else {
          // other statuses
          console.log("Other status:", response.data.message);
          setLoginError(response.data.message);
        }
      } catch (error) {
        if (error.response) {
          // console.log("erroorrrr,,,,,", error.response.data.message);
          // console.log("error.response.data......", error.response.data);
          // console.log("error.response.status.......", error.response.status);
          // console.log("error.response.headers.......", error.response.headers);
          setLoginError(`Login failed: ${error.response.data.message}`);
        } else if (error.request) {
          //no response received
          console.log(error.request);
        } else {
          // Something happened in the request
          console.log("Error", error.message);
        }
      }
    }
  };

  const clearlogin = () => {
    setPassword("");
    setUsername("");
    setLoginError("");
  };
  const clearReg = () => {
    setLoginError("");
    setRegkey("");
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
