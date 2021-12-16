import React, { Component } from "react";

class NotFound extends Component {
  render() {
    return (
      <div className="container" style={{ marginTop: "10%" }}>
        <h1 style={{ fontSize: "xxx-large" }}>Page Not Found</h1>
        <br />
        <a href="/" className="btn btn-lg btn-warning">
          <i className="fa fa-home"></i>&ensp;Back To Home
        </a>
      </div>
    );
  }
}

export default NotFound;
