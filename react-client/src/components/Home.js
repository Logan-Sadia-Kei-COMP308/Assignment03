import { withRouter } from "react-router-dom";

import React, { Component } from "react";
import Banner from "../banner.png";

function Home(props) {
  return (
    <div class="container">
      <div class="span12 div-style">
        <div>
          <img src={Banner} alt="Centennial College Banner" class="img-style" />
        </div>
        <h2 class="h2-style"> Centennial College Student Course App</h2>
        <p class="p-style">
          React front-end calls Express REST API to add, list, update, or delete
          a user, create a course etc.
        </p>
      </div>
    </div>
  );
}

export default withRouter(Home);
