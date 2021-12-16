import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css"; 

class NavBarNA extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/" style={{marginLeft:"5%"}}>
          INSA Scraper Tools
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{marginRight:"10%"}}>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/login">
                LOGIN
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/signup">
                SIGNUP
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBarNA;
