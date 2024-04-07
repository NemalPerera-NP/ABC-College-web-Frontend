import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/signup.module.css";
import styleslogin from "../styles/login.module.css";
import axios from "axios";

function SignupPage() {
  const navigate = useNavigate();

  // useEffect(() => {
  // });

  //local states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nic, setNic] = useState("");
  const [employeeID, setEployeeID] = useState("");
  const [signupError, setSignuprror] = useState("");

  const emailVal = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const valEmpID = /^[0-9]+$/;

  //navigate("/"); function to navigate to login page

  const submitSignup = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log("submit pressed");

    try {
      if (emailVal.test(email)) {
        console.log("Email valid");
        if (password.length > 6) {
          console.log("Password is within range");
          if (employeeID.length === 8 && valEmpID.test(employeeID)) {
            console.log("Employee ID is according to the format");
            if (password !== confirmpassword) {
              setSignuprror("Passwords do not match");
              console.log("Passwords do not match");
            } else {
              console.log("form validated correctly");

              const employeeIDInt = parseInt(employeeID, 10);

              const response = await axios.post(
                "http://localhost:8080/api/auth/signup",
                {
                  Name: name,
                  Nic: nic,
                  Username: username,
                  Email: email,
                  EmpId: employeeIDInt,
                  password: password,
                }
              );
              if (response.status === 201) {
                // success
                console.log("Signup successful", response.data);
                clear();
                navigate("/");
              } else {
                // other statuses
                console.log("Other status:", response.data.message);
                setSignuprror(response.data.message);
              }
            }
          } else {
            console.log("Employee ID Should be 8 characters and only numbers");
            setSignuprror("Enter a valid Employee ID");
          }
        } else {
          console.log("Pasword Should be more than 6 characters");
          setSignuprror("Pasword Should be more than 6 characters");
        }
      } else {
        setSignuprror("Enter a Valid Email address");
        console.log("Email not valid");
      }
    } catch (error) {
      if (error.response) {
        console.log("erroorrrr,,,,,", error.response.data.message);
        console.log("error.response.data......", error.response.data);
        console.log("error.response.status.......", error.response.status);
        console.log("error.response.headers.......", error.response.headers);
        setSignuprror(`Signup failed: ${error.response.data.message}`);
      } else if (error.request) {
        //no response received
        console.log(error.request);
      } else {
        // Something happened in the request
        console.log("Error", error.message);
      }
    }
  };

  const clear = () => {
    setUsername("");
    setPassword("");
    setConfirmpassword("");
    setEmail("");
    setName("");
    setNic("");
    setEployeeID("");
    setSignuprror("");
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
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignupPage;
