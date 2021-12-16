import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "font-awesome/css/font-awesome.min.css";
import "../css/navbar.css";

class Footer extends Component {
  render() {
    return (
      <footer class="footer pt-4">
        <div class="container-fluid text-center text-md-left">
          <div class="row">
            <div class="col-md-6 mt-md-0 mt-3">
              <h5 class="text-uppercase">INSA Scrapper Tools</h5>
              <p>Scraped content of social medias</p>
            </div>

            <hr class="clearfix w-100 d-md-none pb-3" />

            <div class="col-md-3 mb-md-0 mb-3">
              <h5 class="text-uppercase">Links</h5>

              <ul class="list-unstyled">
                <li>
                  <a href="#!">Link 1</a>
                </li>
                <li>
                  <a href="#!">Link 2</a>
                </li>
              </ul>
            </div>
            <div class="col-md-3 mb-md-0 mb-3">
              <h5 class="text-uppercase">Links</h5>

              <ul class="list-unstyled">
                <li>
                  <a href="#!">Link 1</a>
                </li>
                <li>
                  <a href="#!">Link 2</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-copyright text-center py-3">
          © 2020 Copyright:
          <a href="/"> OSINT Team</a>
        </div>
      </footer>
    );
  }
}

export default Footer;
