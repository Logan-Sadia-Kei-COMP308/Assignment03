import React, { useState, useEffect } from "react";
//import ReactDOM from 'react-dom';
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
//
import View from "./View";
import Banner2 from "../login.png";
//
function App() {
  //state variable for the screen, admin or user
  const [screen, setScreen] = useState("auth");
  //store input field data, user name and password
  const [studentId, setStudentId] = useState();
  const [password, setPassword] = useState();
  const apiUrl = "http://localhost:3000/signin";
  //send username and password to the server
  // for initial authentication
  const auth = async () => {
    console.log("calling auth");
    console.log(studentId);
    try {
      //make a get request to /authenticate end-point on the server
      const loginData = { auth: { studentId, password } };
      //call api
      const res = await axios.post(apiUrl, loginData);
      console.log(res.data.auth);
      console.log(res.data.screen);
      //process the response
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (e) {
      //print the error
      console.log(e);
    }
  };

  //check if the user already logged-in
  const readCookie = async () => {
    try {
      console.log("--- in readCookie function ---");

      //
      const res = await axios.get("/read_cookie");
      //
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (e) {
      setScreen("auth");
      console.log(e);
    }
  };
  //runs the first time the view is rendered
  //to check if user is signed in
  useEffect(() => {
    readCookie();
  }, []); //only the first render
  //
  return (
    <div class="container">
      <div class="span12 div-style">
        <div>
          <img
            src={Banner2}
            alt="Centennial College Banner1"
            class="img-style-login"
          />
        </div>
        <h2 class="h2-style">Student Login</h2>

        {screen === "auth" ? (
          <div class="container">
            <div class="form-group">
              <label>Student Id: </label>
              <input
                type="text"
                onChange={e => setStudentId(e.target.value)}
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label>Password: </label>
              <br />
              <input
                type="password"
                onChange={e => setPassword(e.target.value)}
                class="form-control"
              />
            </div>
            <div class="form-group">
              <button
                onClick={auth}
                class="btn btn-outline-primary margin-bottom col-12"
              >
                Login
              </button>
            </div>
          </div>
        ) : (
          <View screen={screen} setScreen={setScreen} />
        )}
      </div>
    </div>
  );
}

export default App;
