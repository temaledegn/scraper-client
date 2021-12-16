import React, { Component } from "react"; 
import LoginForm from "./login";
import SignupForm from "./register";


class LandingNA extends Component {
  render() {
    return (
      <div className="container" style={{ marginTop: "3%" }}>
        <div className="container">
            <LoginForm/>
        </div>
        <br />
      </div>
    );
  }
}
 

export default LandingNA;
