import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import { withRouter } from "react-router-dom";

function ListCourses(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/courses";

  useEffect(() => {
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



  let array = [];
  data.map(item => {

    if (!array.find(
      course => course.courseCode === item.courseCode
        && course.courseName === item.courseName
        && course.section === item.section
        && course.semester === item.semester
    )) {
      array.push(item);
      return item;
    }

    // if(array.length === 0) {
    //   array.push(item);
    // } else {      
    //   if(!array.find(course => course.courseCode === item.courseCode)) {
    //   array.push(item);
    //   }  
    // }
  });

  const displayCourseTable =

    array.map((course) => {

      return (
        <tr onClick={() => {
          showDetail(course._id);
        }}>
          <td>{course.courseCode}</td>
          <td>{course.courseName}</td>
          <td>{course.section}</td>
          <td>{course.semester}</td>
        </tr>
      )
    })







  return (
    <div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
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
          {displayCourseTable}
        </table>
      </div>
    </div>
  );
}

export default withRouter(ListCourses);
