import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import Banner from "../banner.png";

function ShowCourse(props) {
  console.log("props.match.params", props.match.params.id);
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/courses/" + props.match.params.id;
  const apiUrlBase = "http://localhost:3000/api/courses";
  const [studentData, setStudentData] = useState([]);
  const [showStudentLoading, setShowStudentLoading] = useState(true);
  const apiUrlStudent = "http://localhost:3000/students";

  useEffect(() => {
    setShowLoading(false);
    setShowStudentLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      console.log("results from courses", result.data);

      setData(result.data);
      setShowLoading(false);

      const resultStudent = await axios(apiUrlStudent);
      console.log("results from students", resultStudent.data);

      setStudentData(resultStudent.data);
      setShowStudentLoading(false);
    };

    fetchData();
  }, []);

  const editCourse = id => {
    props.history.push({
      pathname: "/editCourse/" + id
    });
  };
  const listCourse = id => {
    axios
      .get(apiUrlBase)
      .then(result => {
        setShowLoading(false);
        props.history.push("/login");
      })
      .catch(error => setShowLoading(false));
  };

  const deleteCourse = id => {
    setShowLoading(true);
    const course = {
      courseCode: data.courseCode,
      courseName: data.courseName,
      section: data.section,
      semester: data.semester
    };
    //
    axios
      .delete(apiUrl, course)
      .then(result => {
        setShowLoading(false);
        props.history.push("/listcourses");
      })
      .catch(error => setShowLoading(false));
  };

  //
  const displayStudentTable = studentData.map(student => {
    console.log(student);
    console.log("data   ---" + data.creator._id);
    if (student._id === data.creator._id) {
      return (
        <tr>
          <td>{student.firstName}</td>
          <td>{student.lastName}</td>
          <td>{student.program}</td>
          <td>{student.email}</td>
        </tr>
      );
    }
  });

  return (
    <div class="container">
      <div class="span12 div-style">
        <div>
          <img
            src={Banner}
            alt="Centennial College Banner"
            class="img-style-2"
          />
        </div>
        <h2 class="h2-style">Course Detail</h2>
        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        <Jumbotron>
          <h1>Course Code: {data.courseCode}</h1>
          <p>Course Name: {data.courseName}</p>
          <p>Section: {data.section}</p>
          <p>Semester: {data.semester}</p>
          <p>
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                editCourse(data._id);
              }}
            >
              Edit
            </Button>
            &nbsp;
            <Button
              type="button"
              variant="danger"
              onClick={() => {
                deleteCourse(data._id);
              }}
            >
              Delete
            </Button>
            &nbsp;
            <Button
              type="button"
              variant="success"
              onClick={() => {
                listCourse();
              }}
            >
              View All Courses
            </Button>
          </p>
          <h3>Students enrolled for {data.courseCode}</h3>

          <div class="col-12 center">
            <table class="table table-striped">
              <thead class="thead-dark">
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Program</th>
                  <th>Email</th>
                </tr>
              </thead>
              {displayStudentTable}
            </table>
          </div>
        </Jumbotron>
      </div>
    </div>
  );
}

export default withRouter(ShowCourse);
