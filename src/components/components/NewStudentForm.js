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
import axios from "axios";

function NewStudentForm({ studentData, onSubmit, action }) {
  // Initialize form fields with student data if available, else empty strings

  // const [formData, setFormData] = useState({
  //   name_with_initials: studentData?.name_with_initials || "",
  //   address: studentData?.address || "",
  //   date_of_birth: studentData?.date_of_birth || "",
  //   gender: studentData?.gender || "",
  //   nic: studentData?.nic || "",
  //   student_id: studentData?.student_id || "",
  //   email: studentData?.email || "",
  //   contact_number: studentData?.contact_number || "",
  //   parent_number: studentData?.parent_number || "", // Included if you decide it's needed
  // });

  const [formData, setFormData] = useState({
    name_with_initials: "",
    address: "",
    date_of_birth: "",
    gender: "", // Assuming default gender
    nic: "",
    student_id: "",
    email: "",
    contact_number: "",
    parent_number: "",
    enrolled_date: "", // Make sure to include this in your form if needed
  });
  const [studentCreatingError, setStudentCreatingError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const emailVal = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  // Update form data if studentData changes (for edit functionality)
  // useEffect(() => {
  //   if (studentData) {
  //     setFormData({
  //       name: studentData.name,
  //       age: studentData.age,
  //       // ... any other fields
  //     });
  //   }
  // }, [studentData]);

  // Assuming studentData is provided for edit, and empty for create
  useEffect(() => {
    if (studentData && Object.keys(studentData).length > 0) {
      setFormData({
        ...studentData,
      });
    }
  }, [studentData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const apiUrl =
  //     action === "edit" ? `` : "http://localhost:8080/api/register/student";

  //   try {
  //     if (emailVal.test(formData.email)) {
  //       console.log("email is in correct format");
  //       const response = await axios.post(apiUrl, formData);

  //       if (response.status === 201) {
  //         console.log("Student creation successful", response.data);
  //       } else {
  //         // other statuses
  //         console.log("Other status:", response.data.message);
  //         setStudentCreatingError(response.data.message);
  //       }
  //     } else {
  //       setStudentCreatingError("Enter a Valid Email address");
  //       console.log("Email not valid");
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       console.log("erroorrrr,,,,,", error.response.data.message);
  //       console.log("error.response.data......", error.response.data);
  //       console.log("error.response.status.......", error.response.status);
  //       console.log("error.response.headers.......", error.response.headers);
  //       setStudentCreatingError(
  //         `Signup failed: ${error.response.data.message}`
  //       );
  //     } else if (error.request) {
  //       //no response received
  //       console.log(error.request);
  //     } else {
  //       // Something happened in the request
  //       console.log("Error", error.message);
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
   // const isEditing = action === "edit";
    const apiUrl = isEditing
      ? `http://localhost:8080/api/register/update-students/${formData.student_id}`
      : "http://localhost:8080/api/register/student";

    try {
      const response = await axios({
        method: isEditing ? "PUT" : "POST",
        url: apiUrl,
        data: formData,
      });

      if (response.status === 200 || response.status === 201) {
        alert(
          isEditing
            ? "Student updated successfully"
            : "Student added successfully"
        );
      } else {
        setStudentCreatingError(
          `Failed to ${isEditing ? "update" : "add"} student. Please try again.`
        );
      }
    } catch (error) {
      setStudentCreatingError(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    }
  };

  return (
    <div className={styles.student_form_container}>
      <div className={styles.form_container}>
        <form className={styles.student_form} onSubmit={handleSubmit}>
          <div className={styles.form_input_block}>
            <label htmlFor="name_with_initials">Name with Initials :</label>
            <input
              type="text"
              id="name_with_initials"
              name="name_with_initials"
              value={formData.name_with_initials}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.form_input_block}>
            <label htmlFor="address">Address :</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.form_input_block}>
            <label htmlFor="date_of_birth">Date of Birth :</label>
            <input
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.form_input_block}>
            <label htmlFor="gender">Gender :</label>

            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className={styles.inputdrop}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className={styles.form_input_block}>
            <label htmlFor="nic">NIC Number :</label>
            <input
              type="text"
              id="nic"
              name="nic"
              value={formData.nic}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.form_input_block}>
            <label htmlFor="student_id">Student ID :</label>
            <input
              type="text"
              id="student_id"
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.form_input_block}>
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.form_input_block}>
            <label htmlFor="contact_number">Contact Number :</label>
            <input
              type="text"
              id="contact_number"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          {studentCreatingError && (
            <div className={styles.error_msg}>{studentCreatingError}</div>
          )}
          <button type="submit" className={styles.green_btn}>
            {/* {action === "edit" ? "Update Details" : "Add Student"} */}
            {isEditing ? "Update Student" : "Add Student"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewStudentForm;
