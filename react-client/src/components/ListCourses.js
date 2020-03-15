import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import { withRouter } from "react-router-dom";
import Banner1 from "../centennial-college.jpg";

function ListCourses(props) {
  const studentId = props.screen;
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/courses";

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const showDetail = id => {
    props.history.push({
      pathname: "/showCourse/" + id
    });
  };

  const displayCourseList = data.map(course => {
    console.log(course.creator._id);
    if (course.creator.studentId == studentId) {
      return (
        <tr onClick={() => {
          showDetail(course._id);
        }}>
          <td>{course.courseCode}</td>
          <td>{course.courseName}</td>
          <td>{course.section}</td>
          <td>{course.semester}</td>
        </tr>
      );
    }
  });

  return (
    <div class="container">
      <div class="col-12 div-style">
        <h2 class="h2-style">List Of Courses</h2>
        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        <Jumbotron>
          <div class="col-12 center">
            <table class="table table-striped">
              <thead class="thead-dark">
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Section</th>
                  <th>Semester</th>
                </tr>
              </thead>
              {displayCourseList}
            </table>
          </div>
        </Jumbotron>
      </div>
    </div>
  );
}

export default withRouter(ListCourses);
