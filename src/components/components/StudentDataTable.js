import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../styles/studenttable.module.css";

const StudentDataTable = () => {
  const [students, setStudents] = useState([]);
  const token = localStorage.getItem("TOKEN");
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
    const intervalId = setInterval(fetchStudents, 60000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const fetchStudents = async () => {
    try {
      console.log("fetchStudents....");

      const response = await axios.get(
        `http://localhost:8080/api/register/get-setudents`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success && Array.isArray(response.data.data.students)) {
        setStudents(response.data.data.students);
        console.log("reponse....", response.data);
      } else {
        setStudents([]); // Ensure students is always an array
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

  //working correctly
  const handleDelete = async (studentId) => {
    if (window.confirm("Are you sure you want to delete this student data?")) {
      try {
        console.log("studentId....", studentId);
        const response = await axios.delete(
          `http://localhost:8080/api/register/delete-setudents/${studentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("response....", response);

        if (response.status === 200) {
          console.log("Student delet successful", response.data);

          alert("Student deleted successfully");
          fetchStudents(); // Refresh the list after deletion
        }
      } catch (error) {
        if (error.response) {
          alert(`delete failed: ${error.response.data.message}`);
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
                    // onClick={() => navigate(`/studentdetails`,student.id,"view")}
                    onClick={() =>
                      navigate(`/studentdetails`, {
                        state: { studentId: student.id, action: "view" },
                      })
                    }
                  >
                    View
                  </button>
                  <button
                    className={styles.update_btn}
                    onClick={() =>
                      navigate(`/studentdetails`, {
                        state: { studentId: student.id, action: "update" },
                      })
                    }

                    // onClick={() =>
                    //   //   navigate(`/studentdetails/${student.id},${"edit"}`)
                    //   navigate(`/studentdetails`, student.id, "edit")

                    // }
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
      </div>
    </div>
  );
};

export default StudentDataTable;
