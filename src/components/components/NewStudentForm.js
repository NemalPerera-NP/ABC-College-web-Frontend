/*reusable component (form) to enter student details,view and edit details*/
/*
Student Form Must Contain
Name with Initials/
address/
DOB/
gender/
NIC/
Student ID Number/
Email/
Contact Number/


*/
import React, { useState, useEffect } from "react";
import styles from "../styles/newstudentform.module.css";

function NewStudentForm({ studentData, onSubmit, action }) {
  // Initialize form fields with student data if available, else empty strings

  const [formData, setFormData] = useState({
    name: studentData?.name || "",
    address: studentData?.address || "",
    dob: studentData?.dob || "",
    nic: studentData?.nic || "",
    email: studentData?.email || "",
    stId: studentData?.stId || "",
    contactNum: studentData?.contactNum || "",
    gender: studentData?.gender || "",
    // ... any other fields
  });
  const [signupError, setSignuprror] = useState("");

  // Update form data if studentData changes (for edit functionality)
  useEffect(() => {
    if (studentData) {
      setFormData({
        name: studentData.name,
        age: studentData.age,
        // ... any other fields
      });
    }
  }, [studentData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, action); // onSubmit is a prop function handling the actual POST/PUT request
  };

  return (
    <div className={styles.student_form_container}>
      <div className={styles.form_container}>
        <form className={styles.student_form} onSubmit={handleSubmit}>
          <div className={styles.form_input_block}>
            <label>Name with Initials :</label>
            <input
              type="text"
              id="stname"
              name="stname"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.form_input_block}>
            <label>Address :</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.form_input_block}>
            <label>Date of Birth :</label>
            <input
              type="text"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.form_input_block}>
            <label>Gender :</label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.form_input_block}>
            <label>NIC Number :</label>
            <input
              type="text"
              id="stnic"
              name="stnic"
              value={formData.nic}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.form_input_block}>
            <label>Student ID :</label>
            <input
              type="text"
              id="stId"
              name="stId"
              value={formData.stId}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.form_input_block}>
            <label>Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.form_input_block}>
            <label>Contact Number :</label>
            <input
              // adjust the type based on requirment
              type="text"
              id="contactnum"
              name="contactnum"
              value={formData.contactNum}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          {signupError && (
              <div className={styles.error_msg}>{signupError}</div>
            )}
            <button type="submit" className={styles.green_btn}>
            {action === "create" ? "Add Student" : "Update Details"}
            </button>
        </form>
        
      </div>
    </div>
  );
}

export default NewStudentForm;
