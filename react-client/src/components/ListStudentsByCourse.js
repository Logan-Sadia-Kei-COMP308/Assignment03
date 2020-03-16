import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import React, { useState } from "react";
import Banner from "../banner.png";

//
function ListStudentsByCourse(props) {
  //
  const studentId = props.screen;
  console.log("props.screen", props.screen);
  const [course, setCourse] = useState({
    _id: "",
    courseCode: "",
    courseName: "",
    section: "",
    semester: "",
    studentId: ""
  });
  const [showLoading, setShowLoading] = useState(false);
  //
  const apiUrl = "http://localhost:3000/api/courses/" + props.match.params.id;
  //
  const findCourse = e => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      courseCode: course.courseCode,
      courseName: course.courseName,
      section: course.section,
      semester: course.semester,
      studentId: studentId
    };
    //
    axios
      .post(apiUrl, data)
      .then(result => {
        setShowLoading(false);
        console.log("results from save course:", result.data);
        props.history.push("/showcourse/" + result.data._id);
      })
      .catch(error => setShowLoading(false));
  };
  //
  const onChange = e => {
    e.persist();
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  return (
    <div class="container div-style paddings">
      <div class="col-12">
        <h2 class="h2-style">Search Students</h2>
        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}

        <Jumbotron>
          <Form onSubmit={findCourse}>
            <Form.Group>
              <Form.Label>Course Code</Form.Label>
              <Form.Control
                type="text"
                name="courseCode"
                id="courseCode"
                placeholder="Enter course code."
                value={course.courseCode}
                onChange={onChange}
              />
            </Form.Group>
            <Button variant="primary col-12" type="submit">
              Find Creators
            </Button>
          </Form>
        </Jumbotron>
      </div>
    </div>
  );
}

export default withRouter(ListStudentsByCourse);