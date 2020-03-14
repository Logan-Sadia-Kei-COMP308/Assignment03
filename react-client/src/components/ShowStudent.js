import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

function ShowStudent(props) {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/students/" + props.match.params.id;

  const [courseData, setCourseData] = useState([]);
  const [showCourseLoading, setShowCourseLoading] = useState(true);
  const apiUrlCourse = "http://localhost:3000/api/courses";


  // courselist

  useEffect(() => {
    setShowLoading(false);
    setShowCourseLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);

      const resultCourse = await axios(apiUrlCourse);
      setCourseData(resultCourse.data);
      setShowCourseLoading(false);

    };

    fetchData();

  }, []);

  const editStudent = id => {
    props.history.push({
      pathname: "/edit/" + id
    });
  };

  const deleteStudent = id => {
    setShowLoading(true);
    const student = {
      studentId: data.studentId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      program: data.program,
      address: data.address,
      city: data.city
    };

    axios
      .delete(apiUrl, student)
      .then(result => {
        setShowLoading(false);
        props.history.push("/list");
      })
      .catch(error => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <Jumbotron>
        <h1>
          Name: {data.firstName}, {data.lastName}
        </h1>
        <p>Email: {data.email}</p>
        <p>Student Id: {data.studentId}</p>
        <p>
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              editStudent(data._id);
            }}
          >
            Edit
          </Button>
          &nbsp;
          <Button
            type="button"
            variant="danger"
            onClick={() => {
              deleteStudent(data._id);
            }}
          >
            Delete
          </Button>
        </p>

        <h3>
          Courses for {data.firstName} {data.lastName}
        </h3>
        <div class="col-6 center">
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Section</th>
                <th>Semester</th>
              </tr>
            </thead>
            {courseData.map((course) => {
              return (
                <tr>
                  <td>{course.courseCode}</td>
                  <td>{course.courseName}</td>
                  <td>{course.section}</td>
                  <td>{course.semester}</td>
                </tr>
              )

            })}
          </table>
        </div>

      </Jumbotron>
    </div>
  );
}

export default withRouter(ShowStudent);
