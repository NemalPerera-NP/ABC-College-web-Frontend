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

function NewStudentForm({ action, studentID }) {
  const [formData, setFormData] = useState({
    name_with_initials: "",
    address: "",
    date_of_birth: "",
    gender: "",
    nic: "",
    student_id: "",
    email: "",
    contact_number: "",
    parent_number: "",
    enrolled_date: "",
  });
  const [studentCreatingError, setStudentCreatingError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [buttonTittle, setButtonTittle] = useState("Add Student");
  const [isViewAction, setIsViewAction] = useState("");
  const [read, setRead] = useState(false);

  const emailVal = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  // Assuming studentData is provided for edit, and empty for create
  useEffect(() => {
    console.log("action...form..", action);
    console.log("studentId...form...", studentID);

    if (action === "update" || action === "view") {
      if (action === "update") {
        setButtonTittle("Update Student");
        setIsEditing(true);
        setRead(false);
      } else {
        setIsViewAction("View");
        setRead(true);
      }

      fetchStudentById();
    }
  }, [studentID, action]);

  const fetchStudentById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/register/get-setudents/${studentID}`
      );
      if (response.data.success) {
        console.log("reponse....", response.data);

        const student = response.data.students;
        console.log("student....", student);
        console.log("student API....", response.data.students);

        const updatedFormData = {
          ...student,
          date_of_birth: formatDate(student.date_of_birth),
          enrolled_date: formatDate(student.enrolled_date),
        };

        console.log("updatedFormData....", updatedFormData);
        setFormData(updatedFormData);
      } else {
        console.log("Fetch student failed: ", response);
      }
    } catch (error) {
      if (error.response) {
        alert(`data fetching failed: ${error.response.data.message}`);
      } else if (error.request) {
        //no response received
        console.log(error.request);
      } else {
        // Something happened in the request
        console.log("Error", error.message);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleChange = (e) => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });
    if (!read) {
      console.log("isViewAction,,,,,,,,", read);
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = isEditing
      ? `http://localhost:8080/api/register/update-students/${formData.studentID}`
      : "http://localhost:8080/api/register/student";

    try {
      if (emailVal.test(formData.email)) {
        console.log("email is in correct format");
        // const response = await axios.post(apiUrl, formData);
        const response = await axios({
          method: isEditing ? "PUT" : "POST",
          url: apiUrl,
          data: formData,
        });

        if (response.status === 201) {
          console.log("Student creation successful", response.data);
          alert(
            isEditing
              ? "Student updated successfully"
              : "Student added successfully"
          );
          resetFormData();
        } else {
          // other statuses
          console.log("Other status:", response.data.message);
          setStudentCreatingError(response.data.message);
        }
      } else {
        setStudentCreatingError("Enter a Valid Email address");
        console.log("Email not valid");
      }
    } catch (error) {
      if (error.response) {
        console.log("erroorrrr,,,,,", error.response.data.message);
        console.log("error.response.data......", error.response.data);
        console.log("error.response.status.......", error.response.status);
        console.log("error.response.headers.......", error.response.headers);
        setStudentCreatingError(
          `Signup failed: ${error.response.data.message}`
        );
      } else if (error.request) {
        //no response received
        console.log(error.request);
      } else {
        // Something happened in the request
        console.log("Error", error.message);
      }
    }
  };

  const resetFormData = () => {
    setFormData({
      name_with_initials: "",
      address: "",
      date_of_birth: "",
      gender: "",
      nic: "",
      student_id: "",
      email: "",
      contact_number: "",
      parent_number: "",
      enrolled_date: "",
    });
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
              readOnly={read}
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
              readOnly={read}
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
              readOnly={read}
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
              readOnly={read}
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
              readOnly={read}
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
              readOnly={read}
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
              readOnly={read}
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
              readOnly={read}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.form_input_block}>
            <label htmlFor="parent_number">Parent Contact Number :</label>
            <input
              type="text"
              id="parent_number"
              name="parent_number"
              value={formData.parent_number}
              onChange={handleChange}
              readOnly={read}
              className={styles.input}
            />
          </div>
          <div className={styles.form_input_block}>
            <label htmlFor="enrolled_date">Enroled Date :</label>
            <input
              type="date"
              id="enrolled_date"
              name="enrolled_date"
              value={formData.enrolled_date}
              onChange={handleChange}
              required
              readOnly={read}
              className={styles.input}
            />
          </div>

          {!isViewAction && (
            <button type="submit" className={styles.green_btn}>
              {action === "update" ? "Update Student" : "Add Student"}
            </button>
          )}
          {studentCreatingError && (
            <div className={styles.error_msg}>{studentCreatingError}</div>
          )}
        </form>
        {/* <button type="submit" className={styles.green_btn}>
            {buttonTittle}
          </button> */}
        {/* </form> */}
      </div>
    </div>
  );
}

export default NewStudentForm;
