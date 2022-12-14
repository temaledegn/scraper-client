import React, { Component } from "react";
import "../css/user-guide.css";

class Configuration extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
            <div className="container">
                <div>
                    <br></br>
                    <div style={{textAlign:"center"}}>
                    <h4>Facebook Configuration</h4>
                    </div>
                    <div>
                        <b><h5>Scraping accounts</h5></b>
                    </div>

                </div>
                <div style={{textAlign:"center"}}>
                    <br></br>
                    <h4>Twitter Configuration</h4>
                </div>
            </div>


      </React.Fragment>
    );
  }
}

export default Configuration;
