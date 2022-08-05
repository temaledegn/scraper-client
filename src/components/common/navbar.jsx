import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import "../css/navbar.css";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
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

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                HOME <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/pre-facebook">
                FACEBOOK
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/twitter">
                TWITTER
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/pre-telegram">
                TELEGRAM
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/linkedin">
                LINKEDIN
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/youtube">
                YOUTUBE
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" style={{color:'blue', backgroundColor:'#ee0'}} href="/common/keyword">
                KEYWORD SEARCH
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/user-guide">
                USER GUIDE
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/logout">
                LOGOUT
              </a>
            </li>
          </ul>
          {/* <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-secondary my-2 my-sm-0"
              type="submit"
            >
              <i className="fa fa-search"></i>
            </button>
          </form> */}
        </div>
      </nav>
    );
  }
}

export default NavBar;
