import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../styles/studenttable.module.css";

const StudentDataTable = () => {
  const [students, setStudents] = useState([]);
  const [studentDataTableError, setStudentDataTableError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      console.log("fetchStudents....");

      const response = await axios.get(
        `http://localhost:8080/api/register/get-setudents`
      );
      if (response.data.success && Array.isArray(response.data.data.students)) {
        setStudents(response.data.data.students);
        console.log("reponse....", response.data);
      } else {
        setStudents([]); // Ensure students is always an array
      }
    } catch (error) {
        if (error.response) {
            console.log("erroorrrr,,,,,", error.response.data.message);
            console.log("error.response.data......", error.response.data);
            console.log("error.response.status.......", error.response.status);
            console.log("error.response.headers.......", error.response.headers);
            setStudentDataTableError(
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

  const handleDelete = async (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        console.log("studentId....",studentId)
        const response = await axios.delete(
          `http://localhost:8080/api/register/delete-setudents/${studentId}`
        );
        console.log("response....",response)

        if (response.status === 200) {
            console.log("Student delet successful", response.data);

          alert("Student deleted successfully");
          fetchStudents(); // Refresh the list after deletion
        }
      } catch (error) {
        if (error.response) {
            console.log("erroorrrr,,,,,", error.response.data.message);
            console.log("error.response.data......", error.response.data);
            console.log("error.response.status.......", error.response.status);
            console.log("error.response.headers.......", error.response.headers);
            setStudentDataTableError(
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
    }
  };

  return (
    <div className={styles.student_table_maimn_container}>
      <div className={styles.student_table_container}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Number</th>
              <th>Index</th>
              {/* Add other headers as needed */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name_with_initials}</td>
                <td>{student.contact_number}</td>
                <td>{student.student_id}</td>

                {/* Add other data cells as needed */}
                <td>
                  <button
                    className={styles.view_btn}
                    onClick={() =>
                      navigate(`/studentdetail/view/${student.id}`)
                    }
                  >
                    View
                  </button>
                  <button
                    className={styles.update_btn}
                    onClick={() =>
                      navigate(`/studentdetail/edit/${student.id}`)
                    }
                  >
                    Update
                  </button>
                  <button
                    className={styles.delete_btn}
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {studentDataTableError && (
            <div className={styles.error_msg}>{studentDataTableError}</div>
          )}
      </div>
    </div>
  );
};

export default StudentDataTable;
