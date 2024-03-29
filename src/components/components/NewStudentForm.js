/*reusable component (form) to enter student details,view and edit details*/

import React, { useState, useEffect } from "react";
import styles from "../styles/newstudentform.module.css";

function NewStudentForm({ studentData, onSubmit, action }) {
  // Initialize form fields with student data if available, else empty strings

  const [formData, setFormData] = useState({
    name: studentData?.name || "",
    age: studentData?.age || "",
    // ... any other fields
  });

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
    <div id={styles.student_form_container}>
      <div id={styles.form_container}>
        <form id={styles.student_form} onSubmit={handleSubmit}>
          <div className={styles.form_input_block}>
            <label>Name</label>
            <input
            type="text"
            id="stname"
            name="stname"
            value={formData.name}
            onChange={handleChange}
            />
          </div>
          <button type="submit">{action === 'create' ? 'Add Student' : 'Update Details'}</button>

        </form>
      </div>
    </div>
  );
}

export default NewStudentForm;
