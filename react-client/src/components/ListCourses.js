import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import { withRouter } from "react-router-dom";
import Banner1 from "../centennial-college.jpg";

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

  return (
    <div class="container">
      <div class="span12 div-style">
        <div>
          <img
            src={Banner1}
            alt="Centennial College Banner1"
            class="img-style-1"
          />
        </div>
        <h2 class="h2-style">List Of Students</h2>
        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        <ListGroup>
          {data.map((item, idx) => (
            <ListGroup.Item
              key={idx}
              action
              onClick={() => {
                showDetail(item._id);
              }}
            >
              {"Course Code:  " + item.courseCode}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default withRouter(ListCourses);
